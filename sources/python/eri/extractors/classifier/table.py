# -*- coding: latin-1 -*-
from eri.extractors.distancebypair2.distancebypairbase import DistanceByPairBase as Base
import sys
from node import Node
from wekaclassifier import WekaClassifier
# chose match function
from eri.utils.match import match as match #mathc1
#from eri.utils.match import match2 as match #match2
#from eri.utils.match import treematch as match #match3
import os
import math

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
        self.csvoutfile = open('out.csv', 'w') #None

        self.head = False
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

    def count_table(self,node):
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

        if node.dom.localName == 'frame' or node.dom.localName == 'img'\
            or node.dom.localName == 'form':
            pass
            #return (0,0, False)

        for child in node.childNodes:
            (ctr,ctd, t) = self.count_table(child)

            if not t:
                pass
                #return (0,0, False)

            tr += ctr
            td += ctd
        return (tr,td, True)

    def count_tr_td(self,node, cells, text, lenght):
        td = 0
        tr = 0

        if node.dom.localName == 'td' or node.dom.localName == 'th':
            try:
                t = node.dom.textContent
            except UnicodeDecodeError:
                t = ""

            cells[-1] += 1

        elif node.dom.localName == 'tr':
            try:
                t = node.dom.textContent
            except UnicodeDecodeError:
                t = ""

            cells.append(0)
            text.append(len(text))
            lenght.append(0)
        elif len(cells) > 0:
            lenght[-1] += 1

        for child in node.childNodes:
            self.count_tr_td(child, cells, text, lenght)

    def c(self, node, pred=False):
#        print "NODE", node.tags
        print

        cells = []
        text = []
        lenght = []

        self.count_tr_td(node, cells, text, lenght)

        print cells
        print text
        print lenght

        f = {}

        f.update({"pred":pred})

        r = len(cells)

        if r == 0:
            r += 1
            cells.append(1)


        if max(cells) == 0:
            cells[0] = 1

        fc = sum(cells)/float(r)
        f.update({"fc":fc})

        fdc = 0
        for i in cells:
            fdc += (i - fc) * (i - fc)
        fdc = fdc / float(r)
        fdc = math.sqrt(fdc)
        f.update({"fdc":fdc})

        fr = sum(cells) / float(max(cells))
        f.update({"fr":fr})

        fdr = 0
        for i in cells:
            fdr += (i - fr) * (i - fr)
        fdr = fdr / float(max(cells))
        fdr = math.sqrt(fdr)
        f.update({"fdr":fdr})


        fcl = sum(text) / float(sum(cells))
        f.update({"fcl":fcl})


        fdcl = 0
        for i in text:
            fdcl += (i - fdcl) * (i - fdcl)
        fdcl = fdcl / float(sum(cells))
        fdcl = math.sqrt(fdcl)
        f.update({"fdcl":fdcl})

        fclc = sum(text) / float(sum(cells))
        f.update({"fclc":fclc})

        ci = [0] * len(cells)

        for i in xrange(len(cells)):
            ci[i] = 0

        tr, td, t = self.count_table(node)

        f.update({"tr":tr,"td":td})

        if tr == 0:
            tr += 1

        f.update({"td_tr": td / float(tr)})


        ftl = 0
        for i in node.tags:
            ftl += len(i)
        ftl = ftl / float(len(node.tags))
        f.update({"ftl":ftl})

        line = []
        for k,v in f.items():
            line.append(v)
            print k, v, " ",
            if not self.head and self.csvoutfile:
                print >> self.csvoutfile, k , ",",
        print
        if not self.head and self.csvoutfile:
            self.head = True
            print >> self.csvoutfile, "class"

        if self.csvoutfile:
            for v in line:
                print >> self.csvoutfile, v, ",",
            print >> self.csvoutfile, node.proof
        else:
            classification = self.classifier.classify(line)
#            print "mark:", classification
            if classification.strip() == 'table':
                return True
        return False


    def lf(self, dom, marker, process=2):
        tables = dom.getElementsByTagName('table')
        tree = Node().loadNodeTree(dom,0)

        itables = []
        self.tDfs(tree,itables)

        for table in itables:
            c = 0
            if process > 0:
                table.result = match(table, self.maxDist,self.height, self.tags)
                tr, td, t = self.count_table(table)

                #print table.result

                d = {}
                for o in table.result:
                    if o:
                        d.setdefault(o,0)
                        d[o]+=1

                for i in d:
                    c += d[i]

            pred = 0
            if c >= 2:
                if tr > 0 and td/float(tr) > 1:
                    pred = 1

            if process == 0 and self.c(table):
                marker.mark(table.dom, 'table')
            elif process == 1 and pred == 1:
                marker.mark(table.dom,'table')
            elif process == 2 and pred == 2 and self.c(table, pred):
                marker.mark(table.dom, 'table')

    def all(self, dom, marker):
        tables = dom.getElementsByTagName('table')
        tree = Node().loadNodeTree(dom,0)

        itables = []
        self.tDfs(tree,itables)
        for table in itables:
            c = 0
            table.result = match(table, self.maxDist,self.height, self.tags)
            tr, td, t = self.count_table(table)

            #print table.result

            d = {}
            for o in table.result:
                if o:
                    d.setdefault(o,0)
                    d[o]+=1

            for i in d:
                c += d[i]

            pred = 0
            if c >= 2:
                if tr > 0 and td/float(tr) > 1:
                    pred = 1

            self.c(table, pred)

            marker.mark(table.dom, 'table')
    def process(self, dom, marker):

        print ".",
        self._comp = 0
        #self.lf(dom, marker, 2)
        self.all(dom, marker)
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
#    print >> out, result

