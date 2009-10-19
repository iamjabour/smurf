# -*- coding: latin-1 -*-

class Metric(object):
    def __init__(self, markers=[]):
        self._markers = markers

    def table_Recall(self, extracted=[], proof=[]):
        acc = 0
        for node in proof:
            if node in extracted:
                acc += 1
                print "table"
            else:
                print "erro",
                pass

        if len(proof) == 0:
            return 0
        return float(acc)/len(proof)
