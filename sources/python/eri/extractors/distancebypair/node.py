class Node(object):

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
    #def __init__

    def loadNodeTree(self, xmlNode, depth):

        treeNode = Node(xmlNode)
        treeNode.depth = depth

        if depth > 0:
            treeNode.str = xmlNode.localName.lower().strip()

        for x in xrange(0,len(xmlNode.childNodes)):
            xmlChild = xmlNode.childNodes[x]
            if xmlChild.nodeType == xmlChild.ELEMENT_NODE:
                childNode = self.loadNodeTree(xmlChild, depth + 1)
                childNode.parent = treeNode
                treeNode.str += childNode.str
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
#Node
