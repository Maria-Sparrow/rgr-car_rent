from datetime import datetime


class Deal:
    def __init__(self, deal_date=datetime.now(), price=12000, rent_time=45, collateral_amount=2000,
                 user_id=1,
                 dwelling_id=1,
                 active = True
                 ):
        self.deal_date = deal_date
        self.price = price
        self.rent_time = rent_time
        self.collateral_amount = collateral_amount
        self.user_id = user_id
        self.dwelling_id = dwelling_id
        self.active = active