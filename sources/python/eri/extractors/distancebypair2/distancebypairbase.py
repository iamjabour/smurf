# -*- coding: latin-1 -*-
import sys
from eri.utils.distances import stringDistance
from eri.utils.distances import simpleTreeMatching
from eri.utils.match import match2
from eri.utils.match import match as match1
from eri.utils.match import treematch

class DistanceByPairBase(object):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """


    def m2(self, node, esp, maxDist, height, tags=False, printtag=False):
        s1 = None
        s2 = None

        result = [False] * len(node.childNodes)
        match = False

        for x in xrange(0,len(node.childNodes)):
            c = node.childNodes[x]

            if x == 0 or c.height < height:
                s1 = c
                match = False
                self._comp += 1
                continue

            s2 = c

            if printtag:
                print 'str:', s1.tag, s2.tag
            d = float(simpleTreeMatching(s1,s2))/max(len(s1.tags), len(s2.tags),1)
            print 'distancia', d
            if 1-d < maxDist :
                s1 = c
                result[x] = self._comp
                if not match:
                    result[x-1] = self._comp

                match = True
            else:
                s1 = c

                match = False
                self._comp += 1
        #for
        return result

    def m(self, node, esp, maxDist, height, tags=False, printtag=False):
        global s1
        global s2
        s1 = ""
        s2 = ""

        result = [False] * len(node.childNodes)
        match = False

        for x in xrange(0,len(node.childNodes)):
            c = node.childNodes[x]

            if x == 0 or c.height < height:
                if tags:
                    s1 = c.tags
                else:
                    s1 = c.str

                match = False
                self._comp += 1
                continue

            if tags:
                s2 = c.tags
            else:
                s2 = c.str

            if printtag:
                print 'str:', s1, s2

            if len(s1) <= (len(s2) * (1.0+maxDist)) and\
              len(s2) <= (len(s1) * (1.0+maxDist)):
                if float(stringDistance(s1,s2))/max(len(s1), len(s2)) > maxDist :
                    if tags:
                        s1 = c.tags
                    else:
                        s1 = c.str

                    match = False
                    self._comp += 1
                    continue
                else:
                    if tags:
                        s1 = c.tags
                    else:
                        s1 = c.str

                    result[x] = self._comp
                    if not match:
                        result[x-1] = self._comp

                    match = True
            else:
                if tags:
                    s1 = c.tags
                else:
                    s1 = c.str

                match = False
                self._comp += 1
        #for
        return result

    def dfs(self, node, maxDist=0.5, height=3):
        """
        Navega em profundidade na árvore buscando nós adjacentes com distancia
        de edição menor que maxDist e os agrupa na mesma componente.

        @param Node node: No atual da dfs
        @param int esp: Nível da árvore
        @param float maxDist: Proporção máxima de diferença para ser agrupado
        na mesma componente
        """

#        print 'maxDist', maxDist
#        node.result = match1(node, maxDist,height=3, tags=True)
#        node.result = match2(node, 0.6,height=3, tags=True)
#        node.result = self.m2(node, 0, maxDist, height, tags=True)
#        node.result = match2(node,maxDist, tags=True)
        node.result = treematch(node, maxDist)

        for x in xrange(0,len(node.childNodes)):
            if not node.result[x]:
                self.dfs(node.childNodes[x], maxDist, height)


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
        pass
#        tree = Node(None).loadNodeTree(dom, 0)
#
#        self._comp = 0
#        self.dfs(tree)
#        print self._comp
#        self._mark(tree, marker)
#
#        return marker.process()


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

