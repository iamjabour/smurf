
#from rcd.node import Node
from htmltodom import parse as parseDOM

class Parser(object):

    def __createNode(self, domNode, parentNode):
        """
        """

        nodeName = domNode.nodeName
        if nodeName != None:
            nodeName = nodeName.lower()

        thisNode = Node(nodeName)
        thisNode.text = domNode.nodeValue or ''
        thisNode.equivalentDOMNodes.append(domNode)

        thisNode.parentNode = parentNode
        parentNode.childNodes.append(thisNode)

        for childNode in domNode.childNodes:
            self.__createNode(childNode, thisNode)

    def process(self, document, encoding=None):
        """
        Processes a document and renders a tree where tags become nodes.

        The trees will be returned as the 'document.tree' and
        'document.domTree' attributes of the Document passed as argument.

        @param Document document: a Document object to be processed
        @return void: processed data is assigned to 'document.tree' property
        """

        if encoding == '':
            encoding = None # sanity check

        dom = parseDOM(
            document)
            #encoding=encoding,
            #url=document.url,
            #category=document.category,
            #language=document.language
#        )

        dom.normalize()
		return dom

        # restarts the node id numbering for the new document
#        Node.resetAutoIdNumbering()
#
#        treeRoot = Node('tree_root')
#        treeRoot.equivalentDOMNodes.append(dom)
#        for child in dom.childNodes:
#            self.__createNode(child, treeRoot)
#
#        document.tree = treeRoot
#        document.domTree = dom




