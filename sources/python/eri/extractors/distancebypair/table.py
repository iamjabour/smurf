# -*- coding: latin-1 -*-
from eri.extractors.distancebypair.distancebypairbase import DistanceByPairBase
import sys
from eri.utils.distances import stringDistance
from eri.extractors.distancebypair.node import *

class Table(DistanceByPairBase):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def _mark(self, node, marker):
        self.__labels = {}
        self._submark(node)

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

    def _submark(self, node):
        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

            if not node.result[x]:
                self._submark(currNode)

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

    extractor = Table()
    result = extractor.process(dom, marker)
    print >> out, result

