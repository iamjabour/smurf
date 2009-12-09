
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

        if node.localName and node.localName.lower() == 'table':
            if node.hasAttribute('genuinetable') and \
              node.getAttribute('genuinetable') == 'yes':
                self.labels['table'].append(node)
#            else:
#                self.labels['other'].append(node)
        for child in node.childNodes:
            self.dfs(child)

    def getProof(self, dom):
        """
        Get a set of nodes
        """
#        self.labels = {'table':[], 'other':[]}
        self.labels = {'table':[]}
        self.dfs(dom)
        return self.labels
