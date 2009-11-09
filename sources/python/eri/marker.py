# -*- coding: latin-1 -*-

class BaseMarker(object):
"""
    O marcador se destina a agrupar nós junto a um rótulo, tornando possível a
    aplicação de métricas de avaliação sobre o conjunto de nós rotulados.
"""
    def __init__(self):
    """
        Inicializa um objeto com o dicionário de rotulos vazio.
    """
        self.labels = {}


    def mark(self, node, label):
        """
        Adiciona um nó ao dicionario como pertencendo a um rótulo.

        @param XmlNode node: Nó a ser adicionado ao conjunto.
        @param str label: Rótulo ao qual o nó deve ser associado.
        """
        if self.labels.has_key(label):
            self.labels[label].append(node)
        else:
            self.labels[label] = [node]

    def process(self):
        """
        Aplica a marcação aos nós selecionadas. Esse marcador base cria um
        atributo para o nó e atribue o valor do rótulo a esse atributo.
        """
        if len(self.labels) == 0:
            return ""
        n = None
        for lable in self.labels:
            for node in self.labels[lable]:
                self.coloringNode(node, lable)
                n = node

        node = n
        while n:
            node = n
            n = n.parentNode

        return node.toString()

    def reset(self):
        """
        Reinicia o dicionário que guarda os nós associados aos rótulos.

        """
        self.labels = {}

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

        node.createAttribute('eri')
        node.setAttribute('eri', 'table')


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

