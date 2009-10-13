import unittest
from node import Node
from libxml2dom import parseString

class TestNode(unittest.TestCase):

    def setUp(self):
        pass

    def test_TreeStructure(self):
        html = """
<html>
    <body>
        <div>
            Ola
            <div>
                Mundo
            </div>
            <div>
                <a>
                !
                </a>
            </div>
        </div>
    </body>
</html>
        """

        dom = parseString(html, html=1)

        tree = Node().loadNodeTree(dom,0)

        self.assert_(tree.dom == dom)
        self.assertEquals(tree.childNodes[0].dom.localName, 'html')
        self.assert_(tree.childNodes[0].dom == dom.childNodes[0])

#        print tree.childNodes[0].childNodes[0].dom.localName
        self.assertEquals(tree.childNodes[0].childNodes[0].str, "bodydivdivdiva")

#        print ttree.childNodes[0].childNodes[0].childNodes[0].childNodes[1].str
        self.assertEquals(tree.childNodes[0].childNodes[0].childNodes[0].childNodes[1].str, "diva")

    def test_TreeContent(self):
        html = """
<html>
    <body>
        <div>
            Ola
            <div>
                Mundo
            </div>
            <div>
                <a>
                !
                </a>
            </div>
        </div>
    </body>
</html>
        """

        dom = parseString(html, html=1)

        tree = Node().loadNodeTree(dom,0)
        print tree.childNodes[0].childNodes[0].dom.localName
        self.assertEquals(tree.childNodes[0].childNodes[0].depth, 2)
        self.assertEquals(tree.childNodes[0].childNodes[0].height, 5)

#        print tree.childNodes[0].childNodes[0].childNodes[0].childNodes[1].str
        self.assertEquals(tree.childNodes[0].childNodes[0].childNodes[0].childNodes[1].depth, 4)
        self.assertEquals(tree.childNodes[0].childNodes[0].childNodes[0].childNodes[1].height, 2)

if __name__ == '__main__':
    print "Test: distancebypair.node"
    unittest.main()

