# -*- coding: utf-8 -*-

import eri.utils.parsedom as parsedom
import unittest

class TestParseDom(unittest.TestCase):
    """
    Unittest from ParseDom class
    """

    def setUp(self):
        self.parser = parsedom.ParseDom()

    def test_parse(self):
        """
        test parse some basi html
        """
        print '\t - Test: utils.parsedom.parse()'
        ret = self.parser.parseString("<html><body>Hi</body></html>")
        self.assert_(ret != None)

        ret = self.parser.parseString("<html><body>Ho")
        self.assert_(ret != None)

if __name__ == '__main__':
    print "Test: utils.parsedom"
    unittest.main()
