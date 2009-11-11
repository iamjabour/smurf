# -*- coding: latin-1 -*-
import sys
from eri.utils.distances import stringDistance
from eri.extractors.distancebypair.node import *

class Coloring(DistanceByPairBase):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """
    def _mark(self, node, marker):
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
                self._mark(currNode, marker)

            do = False

            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
                do = True
            if x > 0 and node.result[x] == node.result[x-1]:
                do = True

            if node.result[x] and do:
                marker.mark(currNode.dom, colors[color])
            else:
                color = (color + 1) % 5

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

    extractor = Coloring()
    result = extractor.process(dom, marker)
    print >> out, result

