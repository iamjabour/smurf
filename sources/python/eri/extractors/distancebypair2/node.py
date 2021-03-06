class Node(object):
    """
    No da arvore utilizada para o processamento do extrator DistanceByPair
    """

    __id = 0

    def __init__(self, xml=None):
        self.id = Node.__id
        Node.__id += 1
        self.dom = xml
        self.result = []

        self.childNodes = []
        self.maxC = 0
        self.parent = None
        self.length = 1
        self.height = 1
        self.depth = 0
        self.str = ""
        self.text = ""
        self.tags = []

    #def __init__

    @staticmethod
    def loadNodeTree(xmlNode, depth=0, useText=False):
        """
        Load all tre from provided root of xmlnode

        @param xmlNode: Node to load subtree
        @param depth: Corrent depth of tree
        """

        treeNode = Node(xmlNode)
        treeNode.depth = depth

        if depth > 0:
            if xmlNode.localName != None:
                treeNode.str = xmlNode.localName.lower().strip()
                treeNode.tags.append(xmlNode.localName.lower().strip())

            else:
                treeNode.str = "erro"
                treeNode.tags.append("erro")

            if useText:
                treeNode.text = xmlNode.textContent.encode('utf8')

            treeNode.tag = xmlNode.localName

        for x in xrange(0,len(xmlNode.childNodes)):
            xmlChild = xmlNode.childNodes[x]
            if xmlChild.nodeType == xmlChild.ELEMENT_NODE:
                if xmlChild.localName == 'script':
                    continue
                elif xmlChild.localName == 'hr':
                    continue
                elif xmlChild.localName == 'style':
                    continue
                elif xmlChild.localName == 'noscript':
                    continue

                childNode = Node.loadNodeTree(xmlChild, depth + 1, useText)
                childNode.parent = treeNode
                treeNode.str += childNode.str
                if useText:
                    treeNode.text += childNode.dom.textContent.encode('utf8')
                treeNode.tags.extend(childNode.tags)
                treeNode.length += childNode.length
                treeNode.height += max(childNode.height, treeNode.height)
                treeNode.childNodes.append(childNode)
        #for

        treeNode.maxC = len(treeNode.childNodes)

        for c in treeNode.childNodes:
            if c.maxC > treeNode.maxC:
                treeNode.maxC = c.maxC
        return treeNode

    #loadNodeTree

