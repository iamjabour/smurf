# -*- coding: utf-8 -*-
from forceencode import convertStringToUTF8
import unittest

class TestForceEncode(unittest.TestCase):
    """
    Unittest from ParseDom class
    """

    def test_convertStringToUTF8(self):
        """
        Test forceencode functions
        """
        print '\t - Test: utils.parsedom._convertStringToUTF8()'
        ret = convertStringToUTF8('ã').strip()
        self.assertEqual(ret, 'ã', '1: String can not be converted!')

        # testa se uma string dada em unicode (Á) pode ser convertida para UTF8
        ret = convertStringToUTF8('\xc1').strip()
        self.assertEqual(ret, u'\xc1'.encode('utf8'))

if __name__ == '__main__':
    print "Test: utils.forceencode"
    unittest.main()
