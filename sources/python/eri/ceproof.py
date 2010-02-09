
class CeProof(object):
    """
    Class proof is a correct set of nodes extracted from a provided annotated file
    """

    def __init__ (self):
        self.labels = {}
        self.__resetLabels()

    def __resetLabels(self):
        self.labels = {'productlist':[], 'product': []}

    def dfs(self, node):
        """
        Get from provided tree all proof nodes. That's means, tables nodes with
        attribute genuinetable = yes
        """

#        print 'load proof'
#        if node.localName and node.localName.lower() == 'table':
        if node.hasAttribute('proof_productlist') and \
          node.getAttribute('proof_productlist') == 'true':
            print 'find productlist'
            self.labels['productlist'].append(node)
        elif node.hasAttribute('proof_product') and \
          node.getAttribute('proof_product') == 'true':
            self.labels['product'].append(node)

        for child in node.childNodes:
            self.dfs(child)

    def getProof(self, dom):
        """
        Get a set of nodes
        """
        self.__resetLabels()
        self.dfs(dom)
        return self.labels
