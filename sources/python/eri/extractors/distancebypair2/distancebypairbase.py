# -*- coding: latin-1 -*-
import sys

class DistanceByPairBase(object):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def _mark(self, node, marker):
        """
        Colore os nós das componetes, alternando entre a lista de cores.
        """
        l = 0

        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

            if not node.result[x]:
                self._mark(currNode, marker)

            do = False

            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
                do = True
            if x > 0 and node.result[x] == node.result[x-1]:
                do = True

            if node.result[x] and do:
                marker.mark(currNode.dom, l)
            else:
                l += 1

    def process(self, dom, marker):
        """
        Processa o Documento enviado procurando por componentes semelhantes.
        """
        return False


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

    extractor = DistanceByPairBase()
    result = extractor.process(dom, marker)
    print >> out, result

