from eri.metricbase import MetricBase

class MetricTables(MetricBase):
    def process(self, labels={}, proof=[]):
        v = 0
        t = len(proof)
        if labels.has_key('table'):
            v = len(labels['table'])

        if t == 0:
            if v == 0:
                x = (1,1)
            else:
                x = (0,1)

        elif v > 0:
            x = self._process(labels['table'], proof)

        recall = x[0]
        precision = x[1]

        return (recall, precision)

