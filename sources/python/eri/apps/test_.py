# -*- coding: utf-8 -*-

from eri.corpus import Corpus
import unittest

class TestGeral(unittest.TestCase):
    """
    Unittest from ParseDom class
    """

    def setUp(self):
        pass

    def test_Corpus(self):
        """
        test instatiate a new configurator
        """

        print '\t - Test geral'

        #teste sem description.inf
        c = Corpus('/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html')

        print 'path', c.path
        print 'parser', c.parser
        print 'proof', c.proof
        print 'documents len', len(c.documents)

        #teste com description.inf
        c = Corpus('/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html_desc')

        print 'path', c.path
        print 'parser', c.parser
        print 'proof', c.proof
        print 'documents len', len(c.documents)


    def test_Corpus_interacao(self):
        #teste com description.inf
        c = Corpus('/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html')

        print 'path', c.path
        print 'parser', c.parser
        print 'proof', c.proof
        print 'documents len', len(c.documents)

        x = 0
        while True:
            d = c.getDocument()
            x += 1
            if d == None or x > 0:
                break

            print d.path

    def test_Corpus_getproof(self):
        #teste com description.inf
        c = Corpus('/home/iamjabour/workspacePessoal/tese/corpus/machine_learning_tableextraction_paper2/webtablegrnd/html')

        print 'path', c.path
        print 'parser', c.parser
        print 'proof', c.proof
        print 'documents len', len(c.documents)

        x = 0
        while True:
            d = c.getDocument()
            x += 1
            if d == None or x > 10:
                break
            print d, d.id, d.path, d.content
            p = c.getProof(d)
            print p


if __name__ == '__main__':
    print "Test: apps.configurator"
    unittest.main()
