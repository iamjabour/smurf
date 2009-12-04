# -*- coding: latin-1 -*-

class MetricBase(object):
    """
    Métrica base para a avaliação dos resultados.
    """

    def __init__(self, marker=[]):
        """
        Inicia o conjunto de marks que podem ser utilizados com essa métrica.

        @parm (mark) markers: markadores que podem ser utilizados em conjunto a 
        essa métrica.
        """
        self._marker = marker

    def setMarkers(self, marker):
        self._marker = marker

    def marker(self):
        return self._marker

    def process(self, labels={}, proof=[]):
        extracted = []
        for key in labels:
            for item in labels[key]:
                extracted.append(item)

        return self._process(extracted, proof)

    def _process(self, extracted=[], proof=[]):
        """
        Calculate Precision and Recall
        @param list extractred: list of tables extracted from document
        @parm list proof: list of tables proof to compare

        return: (precision, recall)
        """
        acc = 0
        for node in proof:
            if node in extracted:
                acc += 1
            else:
                pass

        if len(proof) == 0:
            return (0.0,0.0)
        return (float(acc)/len(proof), float(acc)/len(extracted))

