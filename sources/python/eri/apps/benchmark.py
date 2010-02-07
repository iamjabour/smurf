# -*- coding: utf-8 -*-
import sys
from eri.utils.dynamicimport import dimport
from eri.apps.configurator import Configurator
from eri.corpus import Corpus
import os

class Benchmark:
    def __init__(self, corpusPath, configFile=None, extractors=[], limit=int(2**31-1), output=None, pfilenames=False):
        if not configFile:
            if os.path.exists('config_example.cnf'):
                config = Configurator('config_example.cnf')
            else:
                config = Configurator('apps/config_example.cnf')
        else:
            config = Configurator(configFile)

        if output == None:
            output = sys.stdout

        if not limit:
            limit = int(2**31-1)
        self.pfilenames = pfilenames
        self.output = output
        self.metric = config.metric()
        self.marker = self.metric.marker()
        self.corpus = Corpus(corpusPath)
        self.extractors = extractors
        self.limit = limit

        self.benchmark = []

    def process(self):
        """
        Executa o benchmark, amarzenando os resultados parciais em
        self.benchmark. para visualizar o resultado de forma adequada utilize
        pprint()
        """
        count = 0

        while True:
            count += 1
            doc = None
            print count, self.limit
            if  count <= self.limit:
                doc = self.corpus.getDocument()
            elif self.limit <= 0:
                doc = self.corpus.getDocument(id=abs(self.limit))
                count = int(2**31-1) #infinito
                self.limit = count
            else:
                break

            if not doc:
                break

            proof = self.corpus.getProof(doc)
            result = (0.0,0.0)
            for extractor in self.extractors:
                print doc.id,  doc.path
                if not self.pfilenames:
                    self.marker.reset()
                    extractor.process(doc.content, self.marker)
                    extracted = self.marker.labels
                    result = self.metric.process(extracted, proof)

            self.benchmark.append(result)

    def pprint(self):
        """
        Consolida o benchmark e imprime o resultado na saida padrão
        """
        result = {}

        if len(self.benchmark) == 0:
            print 'Nao foi gerado nenhum resultado'
            return {}

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
                r.update({k: [1, 1 if result[k][2] == 0 else 0]})


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
    usage  = """%(prog)s [options] <extractor> <cPath>
  <extractor>\t\tUser an module name [%(modules)s]
  <cPath>\t\tCorpus path
    """ % \
  {'prog':sys.argv[0], 'modules': ' | '.join(modules)}

    parser = optparse.OptionParser(usage=usage)

    parser.add_option('-o', '--output', default='stdout', \
      dest='output', \
      help="Create and redirect stdout to file")

    # logging-related options
    parser.add_option(
        '-l', '--limit', action='store', type='int', \
        default=False, \
        help="Set limit to hierarchical corpus" + \
         "(default use no hierarchical corpus) or -1 to directory with files (use -l < -1 to limit # of files"
        )

    parser.add_option(
        '-c', '--config', action='store', type='string', default='config_example.cnf', \
        help="Configuration file to set Marker, ProofClass, and Marker, if omited fastbenchmark use config_example.cnf (make sure provided corpus is ProofTable based)")

    parser.add_option('-n', '--names', action='store', type='int', \
        default=False, help='just print file names')
    (opt, args) = parser.parse_args()

    if len(sys.argv) < 3:
        raise SystemExit(parser.print_help())

    output = None

    if opt.output == 'stdout':
        output = sys.stdout
    else:
        output = open(opt.output, 'w')

    if opt.names:
        names = True
    else:
        names = False
    # importando o extrator dinamicamente
    m, c = args[0].split('.')
    extractor = dimport("eri.extractors.%s" % m.lower(), c)
    print 'benchmark'
    b = Benchmark(args[1], opt.config, [extractor], limit= opt.limit, output=output, pfilenames = names)

    b.process()
    b.pprint()


