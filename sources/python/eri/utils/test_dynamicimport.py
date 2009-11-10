import unittest
from eri.utils.dynamicimport import dimport
import eri.utils.parsedom as parserdom

class TestDynamicimport(unittest.TestCase):
    """
    Unittest from class dimport
    """

    def test_dimport(self):
        """
        Test if dimport can import an existent class
        """
        p = dimport('eri.utils', 'ParseDom')

        # can statiate an object
        self.assert_(None != p)

if __name__ == '__main__':
    print "Test: utils.dynamicimport"
    unittest.main()

