# -*- coding: utf-8 -*-
import sys
from eri.utils.dynamicimport import dimport
from eri.apps.configurator import Configurator
from eri.corpus import Corpus
import os

class Benchfile:
    def __init__(self, corpusPath, configFile=None, extractors=[], limit=int(2**31-1), output=None):
        if not configFile:
            if os.path.exists('config_example.cnf'):
                config = Configurator('config_example.cnf')
            else:
                config = Configurator('apps/config_example.cnf')
        else:
            config = Configurator(configFile)

        if output == None:
            output = sys.stdout

        self.output = output
        self.metric = config.metric()
        self.marker = self.metric.marker()
        self.corpus = Corpus(corpusPath)
        self.extractors = extractors
        self.limit = limit

        self.benchmark = []

    def _process(self, doc):
        proof = self.corpus.getProof(doc)
        result = (0.0,0.0)
        for extractor in self.extractors:
            extractor.process(doc.content, self.marker)
            extracted = self.marker.labels
            result = self.metric.process(extracted, proof)

        self.benchmark.append(result)

    def process(self, file=False):
        """
        Executa o benchmark, amarzenando os resultados parciais em
        self.benchmark. para visualizar o resultado de forma adequada utilize
        pprint()
        """
        if file:
            doc = self.corpus.getDocument(file)
            print "process Document:", doc.path
            print
            self._process(doc)
            return

        count = 0

        while True:
            count += 1
            doc = self.corpus.getDocument()
            if doc == None or count > self.limit:
                break

            self._process(doc)

    def pprint(self):
        """
        Consolida o benchmark e imprime o resultado na saida padrão
        """
        result = {}

        for key in self.benchmark[0]:
            result.update({key:[0,0,0]})

        for id,doc in enumerate(self.benchmark):
            print id, doc
            for key in doc:
                result[key][0] += doc[key][0]
                result[key][1] += doc[key][1]
                result[key][2] += doc[key][2]

        print
        print 'total'
        print result

        r = {}
        for k in result:
            if result[k][1] > 0:
                if result[k][2] > 0:
                    precision = result[k][0]/float(result[k][2])
                else:
                    precision = 1

                recall = result[k][0]/float(result[k][1])
                r.update({k: [recall, precision]})
            else:
                r.update({k: [1, 1 if result[k][1] == 0 else 0]})


        print
        print >> self.output, 'key\trecall\tprecision'
        print >> self.output, r
        return r

if __name__ == '__main__':
    import optparse
    import eri.extractors

    # gambiarra para permitir a listagem dos modulos disponiveis
    modules = eri.extractors.modules

    #create an option parser
    usage  = """%(prog)s [options] <extractor> <cPath> <file>
  <extractor>\t\tUser an module name [%(modules)s]
  <cPath>\t\tCorpus path
    """ % \
  {'prog':sys.argv[0], 'modules': ' | '.join(modules)}

    parser = optparse.OptionParser(usage=usage)

    parser.add_option('-o', '--output', default='stdout', \
      dest='output', \
      help="Create and redirect stdout to file")

    parser.add_option(
        '-c', '--config', action='store', type='string', default='config_example.cnf', \
        help="Configuration file to set Marker, ProofClass, and Marker, if omited fastbenchmark use config_example.cnf (make sure provided corpus is ProofTable based)")

    (opt, args) = parser.parse_args()

    if len(sys.argv) < 3:
        raise SystemExit(parser.print_help())

    output = None

    if opt.output == 'stdout':
        output = sys.stdout
    else:
        output = open(opt.output, 'w')

    # importando o extrator dinamicamente
    m, c = args[0].split('.')
    extractor = dimport("eri.extractors.%s" % m.lower(), c)
    print 'benchmark'
    b = Benchfile(args[1], opt.config, [extractor], output=output)

    b.process(args[2])
    b.pprint()


