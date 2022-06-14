from abc import ABCMeta, abstractmethod

class Sorting:
    def __init__(self):
        self.comparator = DefaultSort()
        
    def sort(self, data, asc):
        return self.comparator.execute(data,asc)
        
    
class ISortBy(metaclass=ABCMeta):
    @abstractmethod
    def execute(self, data):
        pass

class SortByYear(ISortBy):
    def execute(self, data, asc):
        return sorted(data, key=lambda x: x["year"], reverse=(not asc))
    
class SortByPrice(ISortBy):
    def execute(self, data, asc):
        return sorted(data, key=lambda x: x["price_in_USD"], reverse=(not asc))

class DefaultSort(ISortBy):
    def execute(self, data,asc):
        return data