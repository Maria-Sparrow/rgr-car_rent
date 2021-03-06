from sorting import DefaultSort, SortByPrice, SortByYear, Sorting
from constants import *
import string
import random


def price_comparator(element):
    return element['price_in_USD']


def year_comparator(element):
    return element['year']


# def filter_cars(brand: str, year: str, price: str, cars: list):
#     if len(cars) == 0:
#         return []

#     if price == price_constants['asc']:
#         cars.sort(key=price_comparator)
#     elif price == price_constants['desc']:
#         cars.sort(key=price_comparator, reverse=True)

#     if year == year_constants['asc']:
#         cars.sort(key=year_comparator)
#     elif year == year_constants['desc']:
#         cars.sort(key=year_comparator, reverse=True)

#     return cars

by_default = DefaultSort()
by_price = SortByPrice()
by_year = SortByYear()


def filter_cars(price: str, year: str, cars: list):
    sorting = Sorting()
    if len(cars) == 0:
        return []

    if price in ("ascending", "descending"):
        sorting.comparator = by_price
        cars = sorting.sort(cars, price == "ascending")
    elif year in ("ascending", "descending"):
        sorting.comparator = by_year
        cars = sorting.sort(cars, year == "ascending")
    else:
        cars = sorting.sort(cars, True)
    
    # if price == price_constants['asc']:
    #     cars.sort(key=price_comparator)
    # elif price == price_constants['desc']:
    #     cars.sort(key=price_comparator, reverse=True)

    # if year == year_constants['asc']:
    #     cars.sort(key=year_comparator)
    # elif year == year_constants['desc']:
    #     cars.sort(key=year_comparator, reverse=True)

    return cars


def can_user_be_logged_in(username: str, password: str, users: list):
    if len(users) == 0:
        return False

    for user in users:
        if user['username'] == username and user['password'] == password:
            return user['logged_in_value']
    return False


def does_user_exists(username: str, phone: str, users: list):
    if len(users) == 0:
        return False

    for user in users:
        if user['username'] == username:
            return 'username'
    for user in users:
        if user['phone'] == phone:
            return 'phone'
    return False


def generate_logged_in_value(username: str):
    characters = string.ascii_letters + string.digits
    logged_in_value = username

    while len(logged_in_value) < 100:
        logged_in_value = logged_in_value + random.choice(characters)
    return logged_in_value


def did_user_login(logged_in_value: str, users: list):
    for user in users:
        if user['logged_in_value'] == logged_in_value:
            return True
    return False


def did_user_is_logged(logged_in_value: str, users: list):
    for user in users:
        if user['logged_in_value'] == logged_in_value:
            return ['user.id']
    return False
