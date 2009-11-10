# -*- coding: latin-1 -*-
from markerbase import MarkerBase

class MarkerColoring(MarkerBase):
    """
    Marcador que colore os nós agrupados com cores alternadas.
    """

    def coloringNode(self, node, color):
        """
        Colore os nós das componetes, alternando entre a lista de cores.
        """
        style = "border: 2px solid %(c)s; background-color: %(c)s;" %\
            {'c':color}

        if node.hasAttribute('style'):
            att = node.getAttribute('style')
            node.setAttribute('style', style)
        else:
            node.createAttribute('style')
            node.setAttribute('style', style)

        node.createAttribute('eri')
        node.setAttribute('eri', 'table')

    def process(self):
        """
        Aplica a marcação aos nós selecionadas. Esse marcador base cria um
        atributo para o nó e atribue o valor do rótulo a esse atributo.
        """
        if len(self.labels) == 0:
            return ""
        n = None
        for lable in self.labels:
            for node in self.labels[lable]:
                self.coloringNode(node, lable)
                n = node

        node = n
        while n:
            node = n
            n = n.parentNode

        return node.toString()
