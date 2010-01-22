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

    def tDfs(self, node, vet):
        """
        entrada: no
        saida: a lista das tabelas 'mais internas' da arvore
        """
        i = False
        for child in node.childNodes:
            findTable = self.tDfs(child,vet)
            i = i or findTable

        if node.dom.tagName == 'table' and not i:
            vet.append(node)
            i = True

        return i

    def _mark(self, node, marker):
        """
        Marca a sub arvore dos nos recortados como sendo tabela, utilizando o markador recebido

        @param node: No para iniciar o procedimento de marcacao
        @param marker: Marcador utilizado para realizar a marcacao
        """

        table = []
        self.__labels = {}
        self._submark(node)

        print self.__labels

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

        print 'table'
#        print table

        te = []
        for t in table:
            vet = []
            re = self.tDfs(t, vet)
            if re:
                for r in vet:
#                    print r.str
                    if not r in te:
                        te.append(r)
#            else:
#                if not t in te:
#                    te.append(t)


#        for x in xrange(0,len(te)):
#            if not self.morethentwocoluns(te[x]):
#                #te.pop(x)
#                print 'retirando o', x


        print
        print 'te'
#        print te
        for n in te:
#            print n.str
            marker.mark(n.dom, 'table')


    def _submark(self, node):
        """
        Sub rotina para verificar uma sub arvore e marcar apenas tabelas genuinas
        """
        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

            print x, node.result
            if not node.result[x]:
                self._submark(currNode)
            else:
                print currNode.parent.dom.tagName, currNode.str

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


    def morethentwocoluns(self, node):
        if node.dom.tagName == 'tr':
            coluns = 0
            for child in node.childNodes:
                if child.dom.tagName == 'td' and len(child.dom.textContent) > 2:
                    coluns += 1

            if coluns > 2:
                return True
            else:
                return False

        ret = False
        for child in node.childNodes:
            ret = self.morethentwocoluns(child) or ret
            if ret: break

        return ret

if __name__ == '__main__':

    from eri.utils.parsedom import ParseDom
    from eri.markercoloring import MarkerColoring as Marker

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

    extractor = Table()
    result = extractor.process(dom, marker)
    print >> out, result

