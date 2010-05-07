# -*- coding: latin-1 -*-
from distancebypairbase import DistanceByPairBase as Base
import sys
from node import Node
from wekaclassifier import WekaClassifier
# chose match function
from eri.utils.match import match as match #mathc1
#from eri.utils.match import match2 as match #match2
#from eri.utils.match import treematch as match #match3
import os

class Table(Base):
    """
    Esse módulo busca nós adjecentes com distancia de edição menor que uma
    proporção, passada por parametro, e os agrupa em componentes.
    """

    def __init__(self):
        eri = os.environ["ERI"]
        model = os.path.join(eri, "extractors", "classifier", "model.model")
        corpora = os.path.join(eri, "extractors", "classifier", "model.arff")
        self.maxDist = 0.5
        self.height = 0 #use in match 1 and 2
        self.tags = True #use in mathc1
        self.csvoutfile = False
        #self.csvoutfile = open('out.csv', 'w') #None
        

        #print model, corpora
        self.classifier = WekaClassifier(model, corpora)

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

    def count_tr_td(self,node):
        td = 0
        tr = 0

        if node.dom.localName == 'td' or node.dom.localName == 'th':
            try:
                text = node.dom.textContent
            except UnicodeDecodeError:
                text = ""

            if len(text.strip()) > 2:
                td += 1
        elif node.dom.localName == 'tr':
            try:
                text = node.dom.textContent
            except UnicodeDecodeError:
                text = ""

            if len(text.strip()) > 2:
                tr += 1

        for child in node.childNodes:
            (ctr,ctd) = self.count_tr_td(child)
            tr += ctr
            td += ctd
        return (tr,td)


    def _mark2(self, dom, marker, postProcess=False):

        tables = dom.getElementsByTagName('table')
        tree = Node().loadNodeTree(dom,0)

        itables = []
        self.tDfs(tree,itables)

#        print 'tables',  len(tables)
#        print 'itables', len(itables)

        for table in itables:
            table.result = match(table, self.maxDist,self.height, self.tags)

            #print table.result

            d = {}
            for o in table.result:
                if o:
                    d.setdefault(o,0)
                    d[o]+=1

            c = 0
            for i in d:
                c += d[i]

            td, tr = 0, 1

            if postProcess:
                (tr,td) = self.count_tr_td(table)
                if c >= 2:
                    if tr > 0 and td/float(tr) > 1:
 #                       print td/float(tr)
#                        marker.mark(table.dom,'table')
                        pass
            else:
                if c >= 2:
#                    marker.mark(table.dom,'table')
                    pass


            if tr == 0:
                tr += 1

            line = (len(table.text)/max(float(c),1.0), c, td, tr, td/float(tr), table.depth)

            if self.csvoutfile:
                for element in line:
                    print >> self.csvoutfile, element, ",",
                print >> self.csvoutfile, table.proof
            else:
                classification = self.classifier.classify(line)

    #            print "mark:", classification
                if classification.strip() == 'table':
                    marker.mark(table.dom, 'table')


    def _mark(self, dom, marker, post=False):
        tables = dom.getElementsByTagName('table')
        tree = Node().loadNodeTree(dom,0)

        itables = []
        self.tDfs(tree,itables)

        print 'tables',  len(tables)
        print 'itables', len(itables)

        for table in itables:
            (tr,td) = self.count_tr_td(table)
            if tr > 0 and td/float(tr) > 1:
#                print 'mark', td/float(tr)
                marker.mark(table.dom,'table')


    def process(self, dom, marker):

        print ".",
        self._comp = 0
        self._mark2(dom, marker, True)
#        self._mark(dom,marker)
        result = marker.process()

        if not result:
#            print '\n\nResultado Vazio\n\n'
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

    extractor = Table()
    result = extractor.process(dom, marker)
    print >> out, result

