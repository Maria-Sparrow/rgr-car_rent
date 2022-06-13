from datetime import datetime


class Deal:
    def __init__(self, deal_date=datetime.now(), deal_price=12000, rent_time=45, collateral_amount=2000,
                 user_id=1,
                 car_id=1,
                 active = True
                 ):
        self.date = deal_date
        self.price = deal_price
        self.rent_time = rent_time
        self.collateral_amount = collateral_amount
        self.user_id = user_id
        self.car_id = car_id
        self.active = active
        self.fine_paid = False