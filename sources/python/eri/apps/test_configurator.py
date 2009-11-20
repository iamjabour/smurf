# -*- coding: utf-8 -*-

from eri.apps.configurator import Configurator as Config
import unittest

class TestParseDom(unittest.TestCase):
    """
    Unittest from ParseDom class
    """

    def setUp(self):
        pass

    def test_instatiate(self):
        """
        test instatiate a new configurator
        """

        print '\t - Test apps.configurator()'

        c = Config('config_example.cnf')

        self.assert_(c != None)
        self.assert_(c.__class__ == Config)

    def test_importMarker(self):
        """
        test instantiante and get a marker object
        """
        print '\t - Test apps.configurator.marker()'
        c = Config('config_example.cnf')
        self.assert_(c != None)

        from eri.markercoloring import MarkerColoring as Marker
        self.assert_(c.marker().__class__ == Marker)


    def test_importProof(self):
        """
        test instantiante and get a proof object
        """
        print '\t - Test apps.configurator.proof()'
        c = Config('config_example.cnf')
        self.assert_(c != None)

        from eri.tablesproof import TablesProof as Proof
        self.assert_(c.proof().__class__ == Proof)

    def test_importMetric(self):
        """
        test instantiante and get a metric object
        """
        print '\t - Test apps.configurator.metric()'
        c = Config('config_example.cnf')
        self.assert_(c != None)

        from eri.metricbase import MetricBase as Metric
        self.assert_(c.metric().__class__ == Metric)


if __name__ == '__main__':
    print "Test: apps.configurator"
    unittest.main()
