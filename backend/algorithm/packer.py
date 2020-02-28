from backend.algorithm.Vector import Vector
from backend.algorithm.data import VectorData
from backend.config import d_rules
import itertools
class PreferenceVector(Vector):
    def __init__(self, data, rules=d_rules):
        super().__init__(data)
        self._rules = set(rules)
    """for debug"""
    def __repr__(self):
        return "{}".format(self.unroll())
    def unroll(self):
        return [int(v) for k, v in self._data.items() if k in self._rules]
    def __sub__(self, other):
        other_d = other.unroll()
        current_d = self.unroll()
        return sum((x - y)**2 for x, y in itertools.zip_longest(other_d, current_d, fillvalue=0))
    @staticmethod
    def build_vector(json):
        return PreferenceVector(VectorData(json))

if __name__ == "__main__":
    test_dict = {"REN": 0, "RENA": 1}
    v = PreferenceVector.build_vector(test_dict)
    print(v)