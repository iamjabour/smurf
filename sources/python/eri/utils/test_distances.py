import unittest
import eri.utils.distances as distances

class TestDistances(unittest.TestCase):
    """
    Unittest from class Distances
    """

    def setUp(self):
        pass

    def test_stringDistance(self):
        """
        Test if costs and distance value are correct
        """
        print '\n - Test: utils.distances.stringDistance()'
        add = 1
        change = 2
        delete = 4
        cost = { 'a': add, 'd': delete, 'c': change }

        dist = distances.stringDistance('aa','aba', cost)
        self.assertEqual(dist, add, '1: %d!=%d' % (dist, change))

        dist = distances.stringDistance('a', 'ab', cost)
        self.assertEqual(dist, add, '2: %d!=%d' % (dist, change))

        dist = distances.stringDistance('a', 'ba', cost)
        self.assertEqual(dist, add, '3: %d!=%d' % (dist, change))

        dist = distances.stringDistance('a', 'b', cost)
        self.assertEqual(dist, change, '4: %d!=%d' % (dist, change))

        dist = distances.stringDistance('ba', 'a', cost)
        self.assertEqual(dist, delete, '5: %d!=%d' % (dist, change))

        dist = distances.stringDistance('aba', 'aa', cost)
        self.assertEqual(dist, delete, '6: %d!=%d' % (dist, change))

if __name__ == '__main__':
    print "Test: utils.distances"
    unittest.main()

