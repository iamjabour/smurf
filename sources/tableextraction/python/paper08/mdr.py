import htmltodom
import sys

class Node(object):

    __id = 0

    def __init__(self, xml):
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

def dfs(node):

    print node.id, node.str, '\n'
    for c in node.childNodes:
        dfs(c)


from find import *

def mdr(node, K, T, qnt):
#    print node.depth
    exist = []
    result = []
    if node.depth >= 3:# and len(node.str) <= 150:
        list = []
#        print list
        for c in node.childNodes:
            list.append(c.str)
        r = combComp2(list, K, T)
        if len(r) > 1:
            result = (r,node)
            node.result = result
#            print len(list) ,len(node.childNodes), node.result
    for child in node.childNodes:
        mdr(child, node.maxC, T,qnt)
#mdr

def printresult(f, list, orig, node):
#    f.write(node.dom.toString())

    ret = False
    for i in list:
#        print i
        flag = False
        if len(i) < 3:
            continue
        out = ''
        for x in xrange(i[1], i[1]+i[2]):
#            print x
            if x >= len(orig) :
                break
#            print x, orig[x].str
            out += ''.join(orig[x].dom.toString())
            flag = True
        if flag:# and len(out.strip()) > 0:
            ret = True

    if ret:
        f.write(node.dom.toString())
        f.write('<hr>\n\n')
    return ret

def defresult(f, node):
    if node.result:
#        print "#"*80
#        print 'id', node.id, 'depth', node.depth
#        print node.result
        if printresult(f, node.result[0], node.childNodes, node):
            #return
            pass
    for c in node.childNodes:
        defresult(f, c)

if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise SystemExit, "use: %s <URI>" % sys.argv[0]

    filePath = sys.argv[1]

    if filePath[0:4] == "http":
        import urllib
        htmlString = urllib.urlopen(filePath).read()
    else:
        htmlString = open(filePath, 'r').read()

    dom = htmltodom.parse(htmlString)

    tree = Node(None).loadNodeTree(dom, 0)

#    dfs(tree)
#    raise

    mdr(tree,tree.maxC,0.005,0)
    f = open(sys.argv[2],'w')
    f.write('<html><body>')
    print "#" *80
    defresult(f,tree)
    f.write('</body></html>')
    f.close()

#    print tree.maxC

