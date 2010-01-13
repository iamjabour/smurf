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

    def process(self, labels={}, proof={}):
        return self._process(labels, proof)

    def _process(self, extracted={}, proof={}):
        """
        Calculate Precision and Recall
        @param list extractred: list of tables extracted from document
        @parm list proof: list of tables proof to compare

        return: {key: [acc,proof,total]}
        """
#        print extracted, proof

        result = {}

        for key in proof:
            #acc, err
            result.update({key:[0,len(proof[key]), len(extracted[key]) if extracted.has_key(key) else 0]})

        for key in proof:
            for p_node in proof[key]:
                if extracted.has_key(key):
                    if p_node in extracted[key]:
                        result[key][0] += 1
#                    else:
#                        result[key][1] += 1
#                else:
#                    result[key][1] += len(proof[key])
#                    break

        return result
