import sys
sys.path.append('/home/iamjabour/workspacePessoal/tese/sources/tableextraction/python/paper08/')
import htmltodom
from node import *

def distance(first, second):
    """Find the Levenshtein distance between two strings."""
    if len(first) > len(second):
        first, second = second, first
    if len(second) == 0:
        return len(first)
    first_length = len(first) + 1
    second_length = len(second) + 1
    distance_matrix = [[0] * second_length for x in range(first_length)]
    for i in range(first_length):
       distance_matrix[i][0] = i
    for j in range(second_length):
       distance_matrix[0][j]=j
    for i in xrange(1, first_length):
        for j in range(1, second_length):
            deletion = distance_matrix[i-1][j] + 1
            insertion = distance_matrix[i][j-1] + 1
            substitution = distance_matrix[i-1][j-1]
            if first[i-1] != second[j-1]:
                substitution += 1
            distance_matrix[i][j] = min(insertion, deletion, substitution)
    return distance_matrix[first_length-1][second_length-1]

def dfs(node, esp=0, maxDist=0.3):
    global s1
    global s2
    s1 = ""
    s2 = ""

    result = [False] * len(node.childNodes)
    comp = 0
    match = False

    for x in xrange(0,len(node.childNodes)):
        c = node.childNodes[x]

        if x == 0 or c.height < 3:
            s1 = c.str
            match = False
            comp += 1
            continue

        s2 = c.str

        if len(s1) <= (len(s2) * (1.0+maxDist)) and\
          len(s2) <= (len(s1) * (1.0 +maxDist)):
            if float(distance(s1,s2))/max(len(s1), len(s2)) > maxDist :
                s1 = c.str
                match = False
                comp += 1
                continue
            else:
                s1 = c.str
                result[x] = comp
                if not match:
                    result[x-1] = comp

                match = True
        else:
            s1 = c.str
            match = False
            comp += 1
    #for

    node.result = result
    for x in xrange(0,len(node.childNodes)):
        if not result[x]:
            dfs(node.childNodes[x], esp+1)

def printNodes(node, esp=0, file=sys.stdout):
    table = False

    for x in xrange(0, len(node.childNodes)):
        c = node.childNodes[x]

        if not node.result[x]:
            printNodes(c,esp+1, file)
            continue

        do = False

        if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
            do = True
        if x > 0 and node.result[x] == node.result[x-1]:
            do = True

        if do and node.result[x] != table and c.str[0] == 't' and\
          (c.str[1] == 'r' or c.str[1] == 'h' or c.str[1] == 'd'):
            if table:
                print >> file, "</table>"
                pass
            print >> file, "<table>"
            table = node.result[x]
        elif not do:
            if table:
                print >> file, "</table>"
                table = False
            print >> file, "<hr>"

        print >> file, node.id, x, node.result[x], c.str
        print >> file, c.dom.toString()
        comp = node.result[x]

    if table:
        print >> file,  "</table>"
        pass

colors = ['magenta','yellow','lime','#9370db','cyan']

def coloringNodes(node):
    color = 0

    for x in xrange(0, len(node.childNodes)):
        c = node.childNodes[x]
        style = "border: 2px solid %(c)s; background-color: %(c)s;" %\
            {'c':colors[color]}

        if not node.result[x]:
            coloringNodes(c)

        do = False

        if x < len(node.childNodes)-1 and node.result[x] == node.result[x+1]:
            do = True
        if x > 0 and node.result[x] == node.result[x-1]:
            do = True

        if node.result[x] and do:
            print 'colore', node.result, x
            if c.dom.hasAttribute('style'):
                att = c.dom.getAttribute('style')
                c.dom.setAttribute('style', style)
            else:
                c.dom.createAttribute('style')
                c.dom.setAttribute('style', style)
        else:
            color = (color + 1) % 5

if __name__ == '__main__':
    if len(sys.argv) < 2:
        raise SystemExit, "use: %s <URI>" % sys.argv[0]

    filePath = sys.argv[1]

    if len(sys.argv) > 2:
        out = open(sys.argv[2], 'w')
    else:
        out = sys.stdout

    if filePath[0:4] == "http":
        import urllib
        htmlString = urllib.urlopen(filePath).read()
    else:
        htmlString = open(filePath, 'r').read()

    dom = htmltodom.parse(htmlString)

    tree = Node(None).loadNodeTree(dom, 0)

    dfs(tree)
    print '#' * 80
    print >> out, "<html><body>"
    printNodes(tree, 0, out)
#    coloringNodes(tree)
    print >> out, tree.dom.toString()
    print >> out, "</html></body>"
#    raise
#    print tree.maxC

