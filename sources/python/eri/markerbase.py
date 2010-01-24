# -*- coding: latin-1 -*-

class MarkerBase(object):
    """
    O marcador se destina a agrupar nós junto a um rótulo, tornando possível a
    aplicação de métricas de avaliação sobre o conjunto de nós rotulados.

    Este marcador base cria um atibuto para o nó e coloca seu rótulo como valor.
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
            if not node in self.labels[label]:
                self.labels[label].append(node)
        else:
            self.labels[label] = [node]

    def reset(self):
        """
        Reinicia o dicionário que guarda os nós associados aos rótulos.

        """
        self.labels = {}

    def setattribute(self, node, label):
        """
        Colore os nós das componetes, alternando entre a lista de cores.
        """
        if node.hasAttribute('eri_label'):
            att = node.getAttribute('eri_label')
            node.setAttribute('eri_label', label)
        else:
            node.createAttribute('eri_label')
            node.setAttribute('eri_label', label)

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
                self.setattribute(node, lable)
                n = node

        node = n
        while n:
            node = n
            n = n.parentNode

        return node.toString()
