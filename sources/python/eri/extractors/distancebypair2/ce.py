# -*- coding: latin-1 -*-
from eri.extractors.distancebypair2.distancebypairbase import DistanceByPairBase as Base
import sys
from eri.extractors.distancebypair2.node import Node

class Ce(Base):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def _mark(self, node, marker):
        """
        Marca a sub arvore dos nos recortados como sendo tabela, utilizando o markador recebido

        @param node: No para iniciar o procedimento de marcacao
        @param marker: Marcador utilizado para realizar a marcacao
        """

        table = []
        self.__labels = {}
        self._submark(node)

#        print self.__labels

        lists = []
        for k, v in self.__labels.iteritems():
#            print k, v
            for i in v:
                pass
#                print i.str
                marker.mark(i.dom, 'product')
            lists.append(v[0].parent)

        for i in lists:
            if len(i.childNodes) > 4:
                marker.mark(i.dom, 'productlist')


        return

        for i in self.__labels:
            lines = 0
            for x in self.__labels[i]:

                if x.str[0:5] == "table":
                    table.append(x)
                    #marker.mark(x.dom, 'table')
                if x.str[0:2] == "td" or x.str[0:2] == "tr" or x.str[0:2] == "th":
                    lines += 1
            if lines > 0:
                name = ""
                while name != "table":
                    name = x.parent.dom.localName.lower()
                    x = x.parent
                table.append(x)
                #marker.mark(x.dom, 'table')

#            marker.mark(n.dom, 'table')

    def _submark(self, node):
        """
        Retorna apenas os nos que contem um cluster com tamannho de pelo menos 2 elementos
        """
        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

#            print x, node.result
            if not node.result[x]:
                self._submark(currNode)
            else:
                pass
#                print currNode.parent.dom.tagName, currNode.str

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

        self._comp = 0
        tree = Node().loadNodeTree(dom,0)
        self.dfs(tree, maxDist=0, height=2)
        self._mark(tree, marker)
        result = marker.process()

        if not result:
            print '\n\nResultado Vazio\n\n'
            return dom.toString()
        else:
            return dom.toString()

if __name__ == '__main__':

    from eri.utils.parsedom import ParseDom
    from eri.markercoloring import MarkerColoring as Marker
#    from eri.markerbase import MarkerBase as Marker

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
    dom = parser.parse(filePath)

    extractor = Ce()
    result = extractor.process(dom, marker)
    print >> out, result

