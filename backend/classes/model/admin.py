class Admin:
    __instance = None

    def __init__(self, username, real_name, phone, password, logged_in_value):
        if not Admin.__instance:
            self.username = username
            self.real_name = real_name
            self.phone = phone
            self.password = password
            self.logged_in_value = logged_in_value

    @classmethod
    def getInstance(cls):
        if not cls.__instance:
            cls.__instance = Admin()
        return cls.__instance
