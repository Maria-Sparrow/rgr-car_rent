from sqlalchemy.orm import relationship

from classes.model.deal import Deal
from classes.model.car import Car
from classes.model.fine import Fine
from classes.model.user import User
import datetime
from constants import *
from utils import filter_cars, can_user_be_logged_in, \
    does_user_exists, generate_logged_in_value, did_user_login, filter_cars

from flask import Flask, request, jsonify, abort
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

from flask_cors import CORS, cross_origin

import json
import copy

with open('secret.json') as secret:
    SECRET = json.load(secret)

DB_URI = "mysql+mysqlconnector://{user}:{password}@{host}:{port}/{db}".format(
    user=SECRET["user"],
    password=SECRET["password"],
    host=SECRET["host"],
    port=SECRET["port"],
    db=SECRET["db"],
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

db = SQLAlchemy(app)
ma = Marshmallow(app)


class RestCar(Car, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    img = db.Column(db.Text, unique=False)
    title = db.Column(db.String(90), unique=False)
    brand = db.Column(db.String(90), unique=False)
    year = db.Column(db.Integer, unique=False)
    price_in_USD = db.Column(db.Float, unique=False)
    deals = db.relationship("RestDeal", backref="rest_car")

    def __init__(self, img, title, brand, year, price_in_USD):
        super().__init__(img, title, brand, year, price_in_USD)


class CarShema(ma.Schema):
    class Meta:
        fields = ('id', 'img', 'title', 'brand', 'year',
                  'price_in_USD')


car_schema = CarShema()
cars_schema = CarShema(many=True)


@app.route("/car", methods=["GET"])
@cross_origin()
def get_cars():
    cars = RestCar.query.all()
    result = cars_schema.dump(cars)
    return jsonify({'cars': result})


@app.route("/car/filter", methods=["GET"])
@cross_origin()
def get_filtered_car():
    cars = RestCar.query.all()
    cars = cars_schema.dump(cars)
    price = request.args.get('price')
    year = request.args.get('year')

    result = filter_cars(price, year, cars)
    return jsonify({'cars': result})


@app.route("/car/<id>", methods=["GET"])
@cross_origin()
def get_car(id):
    car = RestCar.query.get(id)
    if not car:
        abort(404)
    return car_schema.jsonify(car)


@app.route("/car", methods=["POST"])
# @cross_origin()
def add_car():
    new_car = RestCar(request.json['img'], request.json['title'],
                                request.json['brand'], request.json['year'],
                                 request.json['price_in_USD'])

    db.session.add(new_car)
    db.session.commit()
    return car_schema.jsonify(new_car)


@app.route("/car/<id>", methods=["PUT"])
# @cross_origin()
def update_car(id):
    car = RestCar.query.get(id)
    if not car:
        abort(404)
    old_car = copy.deepcopy(car)
    car.img = request.json['img']
    car.title = request.json['title']
    car.title = request.json['brand']
    car.title = request.json['year']
    car.price_in_USD = request.json['price_in_USD']


    db.session.commit()
    return car_schema.jsonify(old_car)


@app.route("/car/<id>", methods=["DELETE"])
# @cross_origin()
def delete_car(id):
    car = RestCar.query.get(id)
    if not car:
        abort(404)

    db.session.delete(car)
    db.session.commit()
    return car_schema.jsonify(car)

class RestUser(User, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), unique=True)
    real_name = db.Column(db.String(45), unique=False)
    phone = db.Column(db.String(45), unique=True)
    password = db.Column(db.String(45), unique=False)
    logged_in_value = db.Column(db.Text, unique=False)

    deals = db.relationship("RestDeal", backref="rest_user")

    def __init__(self, username, real_name, phone, password, logged_in_value):
        super().__init__(username, real_name, phone, password, logged_in_value)


class UserShema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'real_name', 'phone', 'password', 'logged_in_value')


user_schema = UserShema()
users_schema = UserShema(many=True)


class RestDeal(Deal, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=False)
    price = db.Column(db.Integer, unique=False)
    rent_time = db.Column(db.Integer, unique=False)
    collateral_amount = db.Column(db.Integer, unique=False)

    user_id = db.Column(db.Integer, db.ForeignKey('rest_user.id'))  # important
    car_id = db.Column(db.Integer, db.ForeignKey('rest_car.id'))  # important

    active = db.Column(db.Boolean, unique=False)
    fine_paid = db.Column(db.Boolean, unique=False)
    fines = db.relationship("RestFine", backref="rest_deal")
    def __init__(self, deal_date, deal_price, rent_time, collateral_amount, user_id, car_id, active):
        super().__init__(deal_date, deal_price, rent_time, collateral_amount,  user_id, car_id, active)


class DealShema(ma.Schema):
    class Meta:
        fields = ('active', 'collateral_amount', 'date', 'car_id','fine_paid', 'id', 'price', 'rent_time', 'user_id')

deal_schema = DealShema()
deals_schema = DealShema(many=True)


class RestFine(Fine, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fine_price = db.Column(db.Integer, unique=False)
    pay_time = db.Column(db.Integer, unique=False)

    deal_id = db.Column(db.Integer, db.ForeignKey('rest_deal.id'))
    def __init__(self, fine_price, pay_time, deal_id):
        super().__init__(fine_price, pay_time, deal_id)



class FineShema(ma.Schema):
    class Meta:
        fields = ('id', 'fine_price', 'pay_time', 'deal_id')


fine_schema = FineShema()
fines_schema = FineShema(many=True)

@app.route("/user/login", methods=["POST"])
@cross_origin()
def login_user():
    users = RestUser.query.all()
    users = users_schema.dump(users)
    data = request.json

    result = can_user_be_logged_in(data['username'], data['password'], users)
    return jsonify({'loggedInValue': result})


@app.route("/user/register", methods=["POST"])
@cross_origin()
def register_user():
    data = request.json
    users = RestUser.query.all()
    users_schema = UserShema(many=True, only=['username', 'phone'])
    users = users_schema.dump(users)

    exists = does_user_exists(data['username'], data['phone'], users)
    if exists:
        result = exists
    else:
        result = True
        logged_in_value = generate_logged_in_value(data['username']);
        new_user = RestUser(data['username'], data['real_name'], data['phone'], data['password'], logged_in_value)
        db.session.add(new_user)
        db.session.commit()

    return jsonify({'result': result})


@app.route("/user/check_logged_in", methods=["POST"])
@cross_origin()
def check_logged_user_in():
    logged_in_value = request.json['loggedInValue']
    if logged_in_value == None:
        result = False
    else:
        users = RestUser.query.all()
        users_schema = UserShema(many=True, only=['logged_in_value'])
        users = users_schema.dump(users)
        result = did_user_login(logged_in_value, users)

    return jsonify({'result': result})


@app.route("/deal", methods=["GET"])
@cross_origin()
def get_deals():
    deals = RestDeal.query.all()
    result = deals_schema.dump(deals)
    return jsonify({'deals': result})


@app.route("/deal/<id>", methods=["GET"])
@cross_origin()
def get_deal(id):
    deal = RestDeal.query.get(id)
    if not deal:
        abort(404)
    return deal_schema.jsonify(deal)


@app.route("/deal", methods=["POST"])
# @cross_origin()
def add_deal():
    new_deal = RestDeal(request.json['date'], request.json['price'], request.json['rent_time'],
                        request.json['collateral_amount'], request.json['user_id'], request.json['car_id'],
                        request.json['active'])
    db.session.add(new_deal)
    db.session.commit()
    return deal_schema.jsonify(new_deal)


@app.route("/deal/register", methods=["POST"])
def register_deal():
    # data = request.json
    # deals = RestDeal.query.all()
    # deals_schema = DealShema(many=True)
    # deals = users_schema.dump(deals)
    result = True

    date_now = datetime.datetime.now()
    user = RestUser.query.get(1)
    # if check_logged_user_in():
    #     user_id = check_user_id()
    car = RestCar.query.get(request.json['car_id'])
    user_id = user.id
    car_id = car.id
    active = True
    new_deal = RestDeal(date_now, request.json['price'], request.json['rent_time'],
                        request.json['collateral_amount'], user_id, car_id, active)
    db.session.add(new_deal)
    db.session.commit()

    return jsonify({'result': result})


@app.route("/deal/<id>", methods=["PUT"])
# @cross_origin()
def update_deal(id):
    deal = RestDeal.query.get(id)
    if not deal:
        abort(404)
    old_deal = copy.deepcopy(deal)
    deal.date = request.json['date']
    deal.price = request.json['price']
    deal.rent_time = request.json['rent_time']
    deal.collateral_amount = request.json['collateral_amount']
    deal.user_id = request.json['user_id']
    deal.car_id = request.json['car_id']
    deal.active = request.json['active']
    deal.fine_paid = request.json['fine_paid']

    db.session.commit()
    return deal_schema.jsonify(old_deal)


@app.route("/deal/<id>", methods=["DELETE"])
# @cross_origin()
def delete_deal(id):
    deal = RestDeal.query.get(id)
    if not deal:
        abort(404)

    db.session.delete(deal)
    db.session.commit()
    return deal_schema.jsonify(deal)


@app.route("/fine", methods=["GET"])
@cross_origin()
def get_fines():
    fines = RestFine.query.all()
    result = fines_schema.dump(fines)
    return jsonify({'deals': result})


@app.route("/fine/<id>", methods=["GET"])
@cross_origin()
def get_fine(id):
    fine = RestFine.query.get(id)
    if not fine:
        abort(404)
    return fine_schema.jsonify(fine)


@app.route("/fine", methods=["POST"])
# @cross_origin()
def add_fine():
    deal = RestDeal.query.get(1)
    deal_id = deal.id
    new_fine = RestFine(request.json['fine_price'],
                        request.json['pay_time'],
                        deal_id)

    db.session.add(new_fine)
    db.session.commit()
    return fine_schema.jsonify(new_fine)


@app.route("/fine/<id>", methods=["PUT"])
# @cross_origin()
def update_fine(id):
    fine = RestFine.query.get(id)
    if not fine:
        abort(404)
    old_fine = copy.deepcopy(fine)
    fine.fine_price = request.json['fine_price']
    fine.pay_time = request.json['pay_time']
    fine.pay_time = request.json['deal_id']

    db.session.commit()
    return fine_schema.jsonify(old_fine)


@app.route("/fine/<id>", methods=["DELETE"])
# @cross_origin()
def delete_fine(id):
    fine = RestFine.query.get(id)
    if not fine:
        abort(404)

    db.session.delete(fine)
    db.session.commit()
    return fine_schema.jsonify(fine)


if __name__ == "__main__":
    db.create_all()
    app.run(debug=True, host='127.0.0.1')
