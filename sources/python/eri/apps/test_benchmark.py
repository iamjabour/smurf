# -*- coding: utf-8 -*-

import unittest

class TestGeral(unittest.TestCase):
    """
    Unittest from ParseDom class
    """
    def test_benchmark(self):
        from eri.extractors.distancebypair.table import Table
        from eri.apps.benchmark import Benchmark
        e = Table()
        corpusPath = '/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html'
        b = Benchmark(corpusPath, extractors=[e], limit=2)
        b.process()

        b.pprint()

    def test_benchmark_limit(self):
        from eri.extractors.distancebypair.table import Table
        from eri.apps.benchmark import Benchmark
        e = Table()
        corpusPath = '/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html'
        b = Benchmark(corpusPath, extractors=[e], limit=10)
        b.process()

        b.pprint()

if __name__ == '__main__':
    print "Test: apps.configurator"
    unittest.main()


