
class TablesProof(object):
    """
    Class proof is a correct set of nodes extracted from a provided annotated file
    """

    def __init__ (self):
        self.labels = {}

    def dfs(self, node):
        """
        Get from provided tree all proof nodes. That's means, tables nodes with
        attribute genuinetable = yes
        """
        if self.getProofInf(node) == 'table':
            self.labels['table'].append(node)

        for child in node.childNodes:
            self.dfs(child)

    def tDfs(self, node, vet):
        """
        entrada: no
        saida: a lista das tabelas 'mais internas' da arvore
        """
        i = False
        for child in node.childNodes:
            findTable = self.tDfs(child,vet)
            i = i or findTable

        if node.tagName == 'table' and not i:
            vet.append(node)
            i = True

        return i


    def getProof(self, dom):
        """
        Get a set of nodes
        """
#        self.labels = {'table':[], 'other':[]}


        self.labels = {'table':[]}
        tables = dom.getElementsByTagName('table')

        itables = []
        self.tDfs(dom,itables)

        for table in itables:
            if self.getProofInf(table) == 'table':
                self.labels['table'].append(table)

        return self.labels

    def getProofInf(self, node):
        if node == None:
            return 'other'
        if node.localName and node.localName.lower() == 'table':
            if node.hasAttribute('genuinetable') and \
              node.getAttribute('genuinetable') == 'yes':
                return 'table'
#                self.labels['table'].append(node)
            else:
#                self.labels['other'].append(node)
                return 'other'

