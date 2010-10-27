# -*- coding: latin-1 -*-
from eri.extractors.distancebypair2.distancebypairbase import DistanceByPairBase as Base
import sys
from eri.extractors.distancebypair2.node import Node
#from eri.utils.match import match as match
#from eri.utils.match import match2 as match
from eri.utils.match import treematch as match

class Ce(Base):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def __init__(self):
        self.maxDist = 0.6
        self.height = 0
        self.tags = True


    def markall(self, node, marker):
        if node.dom.nodeType == node.dom.ELEMENT_NODE:
            marker.mark(node.dom, 'productlist')
        for x in xrange(len(node.childNodes)):
            self.markall(node.childNodes[x], marker)


    def dfs(self, node, maxDist, height, tags):
        """
        Navega em profundidade na árvore buscando nós adjacentes com distancia
        de edição menor que maxDist e os agrupa na mesma componente.

        @param Node node: No atual da dfs
        @param int esp: Nível da árvore
        @param float maxDist: Proporção máxima de diferença para ser agrupado
        na mesma componente
        """

        node.result = match(node, maxDist, height, tags)

        for x in xrange(0,len(node.childNodes)):
            if not node.result[x]:
                self.dfs(node.childNodes[x], maxDist, height, tags)

    def _mark(self, node, marker, post=False):
        """
        Marca a sub arvore dos nos recortados como sendo tabela, utilizando o markador recebido

        @param node: No para iniciar o procedimento de marcacao
        @param marker: Marcador utilizado para realizar a marcacao
        """

        table = []
        self.__labels = {}
        self._submark(node)
        # labels são as componentes criadas pela dfs retiradas da arvore

        biggestComponent = False
        lastValid = False
        biggestsText = []
        biggestParent = False
        moreimage = False

#        print self.__labels
        if not post:
            for k, v in self.__labels.iteritems():
                marker.mark(v[1].parent.dom, 'productlist')

            return

        biggestComponent = self._biggestComponent()
#        lastValid = self._lastValid()
#        biggestsText = self._biggestsText()
#        biggestParent = self._biggestParent()

        moreimage = self._moreimage()
#        print 'biggestComponent', biggestComponent.text[:100].strip()
#        print 'lastValid', lastValid.text[:100].strip()
#        print 'biggestParent', biggestParent.tags[:50], biggestParent.text[:100].strip()
#        print 'biggestsText', biggestsText

        biggestNode = None
        if biggestComponent:
            find = False
            for i in biggestComponent:
                if len(i.text.strip())> 0 and self._countimg(i.parent) >= 2:
#                    while i.dom.name != "div":
#                        i = i.parent
#                    print 'a', i.dom.name
                    marker.mark(i.parent.dom, 'productlist')
                    biggestNode = i.parent
                    find = True
                    break
            if find:
                for i in biggestComponent:
                   marker.mark(i.dom, 'product')

        if moreimage:
            if biggestNode == None or not self._notAncestral(biggestNode, moreimage[1].parent):
                i = moreimage[1]
#                while i.dom.name != "div":
#                    i = i.parent
#                print 'b', i.dom.name, i.text
                marker.mark(i.parent.dom, 'productlist')
                for i in moreimage:
                    marker.mark(i.dom, 'product')


#        if lastValid:
#            marker.mark(lastValid.dom, 'productlist')

#        if biggestParent:
#            marker.mark(biggestParent.dom, 'productlist')

#        for i in biggestsText:
#            pass
#            print i.result
#            print 'biggestText', len(i.text), i.text[:100]
#            marker.mark(i.dom, 'productlist')

    def _notAncestral(self, node, ancestral):

        if node.parent == ancestral:
            return True

        elif node.parent == None:
            return False

        return self._notAncestral(node.parent, ancestral)

    def _biggestParent(self):
        lists = []
        MIN = 200
        biggestParent = False
        for k, v in self.__labels.iteritems():
            if not biggestParent:
                biggestParent = v[0].parent
            elif len(biggestParent.text) < len(v[0].parent.text) and \
             len(v[0].parent.text) > MIN:
                biggestParent = v[0].parent
        return biggestParent

    def _biggestsText(self):
        lists = []

        biggestText = 0
        for k, v in self.__labels.iteritems():
                biggestText = max(biggestText, len(v[0].text))
                lists.append(v[0])

        plists = []
        for i in lists:
            if self._c(i.text,biggestText,5):
                if i.parent not in plists:
                    plists.append(i.parent)

        return plists

    def _lastValid(self):
        """
            retorna o ultimo no com mais de um filho valido
            (com mais de x caracteres)
        """

        lists = []
        CHILDMIN = 2
        TEXTMIN = 150
        # create productlist candidates

        biggestList = False
        for k, v in self.__labels.iteritems():
            vale = 0
            for i in v:
                if  TEXTMIN < len(i.text):
                    vale += 1
            if vale > 2:
                lists.append(v[0].parent)

        pl = False
        for i in lists:
            if pl and  i.id > pl.id:
                pl = i
            elif not pl:
                pl = i

        return pl

    def _moreimage(self):

        size, biggest = 0, False
        for k, v in self.__labels.iteritems():
            imgs = 0
            ig = 0
            if v[0].parent.depth > 3:
                for i in v:
                    imgs += self._countimg(i)
                ig = self._countimg(v[0].parent)
                #print v
                #print len(v), v[0].parent.depth, ig, imgs
            if imgs >= size or ig >= size:
                biggest = v
                size = max(imgs, ig)


#        print 'size', size
        return biggest

    def _countimg(self, node):
        count = 0
        for i in node.tags:
            if i.strip() == "img":
                count += 1
        return count

    def _biggestComponent(self):
        """
            return biggest component
        """
        v = []
        # create productlist candidates
        biggestList = []
        for k, v in self.__labels.iteritems():
            if len(biggestList) == 0 or \
                len(v) >= len(biggestList):
                biggestList = v
#                print len(v)

        # retornar o no da maior lista como sendo o productlist
        if v:
#            print len(biggestList)
            return biggestList
        else:
            return False

    def _c(self, a, val, m ):
        if abs(len(a) - val) < m:
            return True
        return False

    def _submark(self, node):
        """
        Retorna apenas os nos que contem um cluster com tamannho de pelo menos 2 elementos
        """
        self._comp+= 1
        for x in xrange(0, len(node.childNodes)):
            currNode = node.childNodes[x]

            #print x, node.result
            if not node.result[x]:
                self._submark(currNode)
            else:
                pass
                #print currNode.parent.dom.tagName, currNode.str

            do = False

            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
                do = True
            if x > 0 and node.result[x] == node.result[x-1]:
                do = True

            if node.result[x] and do:
                if self.__labels.has_key(self._comp):
                    self.__labels[self._comp].append(currNode)
                else:
                    self.__labels.update({self._comp: [currNode]})
            else:
                self._comp += 1

    def process(self, dom, marker):

        self._comp = 0
        tree = Node().loadNodeTree(dom, 0, True)
        self.dfs(tree, 0.6, self.height, self.tags)
        self._mark(tree, marker, True)
#        self.markall(tree, marker)
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

    marker = Marker()
    parser = ParseDom()
    dom = parser.parse(filePath)

    extractor = Ce()
    result = extractor.process(dom, marker)
    print >> out, result

