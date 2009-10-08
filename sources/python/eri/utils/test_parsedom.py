# -*- coding: utf-8 -*-

import eri.utils.parsedom as parsedom
import unittest

class TestParseDom(unittest.TestCase):
    def setUp(self):
        self.parser = parsedom.ParseDom()

    def test_convertStringToUTF8(self):
        print '\t - Test: utils.parsedom._convertStringToUTF8()'
        ret = self.parser._convertStringToUTF8('ã').strip()
        self.assertEqual(ret, 'ã', '1: String can not be converted!')

        # testa se uma string dada em unicode (Á) pode ser convertida para UTF8
        ret = self.parser._convertStringToUTF8('\xc1').strip()
        self.assertEqual(ret, u'\xc1'.encode('utf8'))

    def test_parse(self):
        print '\t - Test: utils.parsedom.parse()'
        ret = self.parser.parse("<html><body>Hi</body></html>")
        self.assert_(ret != None)

        ret = self.parser.parse("<html><body>Ho")
        self.assert_(ret != None)

if __name__ == '__main__':
    print "Test: utils.parsedom"
    unittest.main()
