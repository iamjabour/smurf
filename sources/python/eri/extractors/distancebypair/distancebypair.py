# -*- coding: latin-1 -*-
import sys
from eri.utils.distances import stringDistance
from eri.extractors.distancebypair.node import *

class DistanceByPair(object):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def dfs(self, node, esp=0, maxDist=0.3):
        """
        Navega em profundidade na árvore buscando nós adjacentes com distancia
        de edição menor que maxDist e os agrupa na mesma componente.
        @param Node node: No atual da dfs
        @param int esp: Nível da árvore
        @param float maxDist: Proporção máxima de diferença para ser agrupado
        na mesma componente
        """
        global s1
        global s2
        s1 = ""
        s2 = ""

        result = [False] * len(node.childNodes)
        match = False

        for x in xrange(0,len(node.childNodes)):
            c = node.childNodes[x]

            if x == 0 or c.height < 3:
                s1 = c.str
                match = False
                self._comp += 1
                continue

            s2 = c.str
#            print 'str:', s1, s2
            if len(s1) <= (len(s2) * (1.0+maxDist)) and\
              len(s2) <= (len(s1) * (1.0 +maxDist)):
                if float(stringDistance(s1,s2))/max(len(s1), len(s2)) > maxDist :
                    s1 = c.str
                    match = False
                    self._comp += 1
                    continue
                else:
                    s1 = c.str
                    result[x] = self._comp
                    if not match:
                        result[x-1] = self._comp

                    match = True
            else:
                s1 = c.str
                match = False
                self._comp += 1
        #for

        node.result = result
        for x in xrange(0,len(node.childNodes)):
            if not result[x]:
                self.dfs(node.childNodes[x], esp+1)


    def _mark1(self, node, marker):
        """
        Colore os nós das componetes, alternando entre a lista de cores.
        """
        colors = ['magenta','yellow','lime','#9370db','cyan']
        color = 0

        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]
            style = "border: 2px solid %(c)s; background-color: %(c)s;" %\
                {'c':colors[color]}

            if not node.result[x]:
                self._mark1(currNode, marker)

            do = False

            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
                do = True
            if x > 0 and node.result[x] == node.result[x-1]:
                do = True

            if node.result[x] and do:
                marker.mark(currNode.dom, colors[color])
            else:
                color = (color + 1) % 5

    def _mark2(self, node, marker):
        self.__labels = {}
        self._mark2_1(node)

        for i in self.__labels:
            lines = 0
            for x in self.__labels[i]:

                if x.str[0:5] == "table":
                    marker.mark(x.dom, 'table')
                if x.str[0:2] == "td" or x.str[0:2] == "tr" or x.str[0:2] == "th":
                    lines += 1
            if lines > 0:
                name = ""
                while name != "table":
                    name = x.parent.dom.localName.lower()
                    x = x.parent
                marker.mark(x.dom, 'table')

    def _mark2_1(self, node):
        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

            if not node.result[x]:
                self._mark2_1(currNode)

            do = False

            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
                do = True
            if x > 0 and node.result[x] == node.result[x-1]:
                do = True

            if node.result[x] and do:
                if self.__labels.has_key(node.result[x]):
                    self.__labels[node.result[x]].append(currNode)
                else:
                    self.__labels.update({node.result[x]: [currNode]})


    def process(self, dom, marker):
        """
        Processa o Documento enviado procurando por componentes semelhantes.
        """
        tree = Node(None).loadNodeTree(dom, 0)

        self._comp = 0
        self.dfs(tree)
        self._mark2(tree, marker)

        return marker.process()


if __name__ == '__main__':

    from eri.utils.parsedom import ParseDom
    from eri.marker import Marker

    if len(sys.argv) < 2:
        raise SystemExit, "use: %s <URI> [output_file]" % sys.argv[0]

    filePath = sys.argv[1]

    if len(sys.argv) > 2:
        out = open(sys.argv[2], 'w')
    else:
        out = sys.stdout

    if filePath[0:4] == "http":
        import urllib
        htmlString = urllib.urlopen(filePath).read()
    else:
        htmlString = open(filePath, 'r').read()

    marker = Marker()
    parser = ParseDom()
    dom = parser.parse(htmlString)

    extractor = DistanceByPair()
    result = extractor.process(dom, marker)
    print >> out, result

