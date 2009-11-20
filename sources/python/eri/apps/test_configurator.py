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

        c = Config()

        self.assert_(c != None)
        self.assert_(c.__class__ == Config)

    def test_importMarker(self):
        """
        test instantiante and get a marker object
        """
        print '\t - Test apps.configurator.marker()'
        c = Config()
        m = c._create_marker({'marker':'MarkerColoring'}, 'eri')
        self.assert_(c != None)

        from eri.markercoloring import MarkerColoring as Marker
        self.assert_(m.__class__ == Marker)


    def test_importProof(self):
        """
        test instantiante and get a proof object
        """
        print '\t - Test apps.configurator.proof()'
        c = Config()
        p = c._create_proof({'proof':'TablesProof'}, 'eri')
        self.assert_(c != None)

        from eri.tablesproof import TablesProof as Proof
        self.assert_(p.__class__ == Proof)

    def test_importMetric(self):
        """
        test instantiante and get a metric object
        """
        print '\t - Test apps.configurator.metric()'
        c = Config('config_example.cnf')
        m = c._create_metric({'metric':'MetricBase'}, 'eri')
        self.assert_(c != None)

        from eri.metricbase import MetricBase as Metric
        self.assert_(m.__class__ == Metric)


if __name__ == '__main__':
    print "Test: apps.configurator"
    unittest.main()
