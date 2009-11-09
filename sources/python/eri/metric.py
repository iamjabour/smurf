# -*- coding: latin-1 -*-

class BaseMetric(object):
    """
    Métrica base para a avaliação dos resultados.
    """

    def __init__(self, markers=[]):
        """
        Inicia o conjunto de marks que podem ser utilizados com essa métrica.

        @parm (mark) markers: markadores que podem ser utilizados em conjunto a 
        essa métrica.
        """
        self._markers = markers

    def table(self, extracted=[], proof=[]):
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
            return 0
        return (float(acc)/len(extracted), float(acc)/len(proof))
