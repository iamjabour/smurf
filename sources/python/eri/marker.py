# -*- coding: latin-1 -*-

class Marker(object):
    def __init__(self, output=None):
#        print 'marker'
        self.output = output
        self.labels = {}

    def mark(self, node, label):
#        print node, label
        try:
            self.labels[label].append(node)
        except KeyError:
            self.labels[label] = [node]

#        print self.labels

    def process(self):
#        print self.labels
        n = None
        for lable in self.labels:
            for node in self.labels[lable]:
#                print node
                self.coloringNode(node, lable)
                n = node

        node = n
        while n:
            node = n
            n = n.parentNode

        return node.toString()

    def coloringNode(self, node, color):
        """
        Colore os nós das componetes, alternando entre a lista de cores.
        """
        style = "border: 2px solid %(c)s; background-color: %(c)s;" %\
            {'c':color}

        if node.hasAttribute('style'):
            att = node.getAttribute('style')
            node.setAttribute('style', style)
        else:
            node.createAttribute('style')
            node.setAttribute('style', style)


#    def printNodes(self, node, esp=0, file=sys.stdout):
#        """
#        Imprime as componentes em forma HTML, somente as componentes
#        """
#        table = False
#
#        for x in xrange(0, len(node.childNodes)):
#            c = node.childNodes[x]
#
#            if not node.result[x]:
#                printNodes(c,esp+1, file)
#                continue
#
#            do = False
#
#            if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
#                do = True
#            if x > 0 and node.result[x] == node.result[x-1]:
#                do = True
#
#            if do and node.result[x] != table and c.str[0] == 't' and\
#              (c.str[1] == 'r' or c.str[1] == 'h' or c.str[1] == 'd'):
#                if table:
#                    print >> file, "</table>"
#                    pass
#                print >> file, "<table>"
#                table = node.result[x]
#            elif not do:
#                if table:
#                    print >> file, "</table>"
#                    table = False
#                print >> file, "<hr>"
#
#            print >> file, node.id, x, node.result[x], c.str
#            print >> file, c.dom.toString()
#            comp = node.result[x]
#
#        if table:
#            print >> file,  "</table>"
#            pass

