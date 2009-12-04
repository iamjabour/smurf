import sys
from eri.utils.dynamicimport import *
from eri.utils.parsedom import ParseDom
import urllib

# Essa funcao devera ser uma classe banchmark


class Benchmark(object):
    def __init__(self, extractors=[], proof=[]):
        self.parser = ParseDom()
        self.extractors = extractors
        self.proofs = proof
        self.files = filespath
        pass

    def process(self, output=None):
        print "Doc\tPre\tRec\tlext\tlpro\tfile_name"

        for proof in self.proofs:
            metrics = proof.metrics
            files = proof.files
            proofpath = proof.path

            for metric in metrics:
                marker = metric.markers

                for marker in markers:
                    for id, filepath in enumarete(files):
                        #clean marker to new interation
                        marker.reset()

                        fileName = filePath.split('/')[-1]

                        if filePath[0:4] == "http":
                            htmlString = urllib.urlopen(filePath).read()
                        else:
                            htmlString = open(filePath, 'r').read()

                        dom = self.parser.parse(htmlString)

                        # check if the actual dom have the annotation or is needed load a new tree
                        p = proof.getProof(dom)

                        for extractor in self.extractores
                            # check if extractor is compatrible with marker
                            r = extractor.process(dom, marker)

                        v = 0
                        t = len(p)
                        if marker.labels.has_key('table'):
                            v = len(marker.labels['table'])

                        if t == 0:
                            if v == 0:
                                x = (1,1)
                            else:
                                x = (0,1)

                        elif v > 0:
                            x = metric.process(marker.labels['table'], p)

                        precision = x[0]
                        recall = x[1]
                        print "%d\t%.02f\t%0.2f\t%d\t%d\t%s" % \
                            (id+1, precision, recall, v, t, fileName)

                        if output:
                            out = open('out/%d.html' % (id+1), 'w')
                            print >>out, r
                        else:
                            pass
                #            print 'Document:%d' % count
                #            print r



# Esses imports devem ser dinamicos
from eri.markercoloring import MarkerColoring as Marker
from eri.tablesproof import TablesProof

if __name__ == '__main__':
    import os
    import optparse
    import eri.extractors
    from eri.apps.configurator import Configurator as Conf

    # Esse import devera ser dinamico
    from eri.metricbase import MetricBase as Metric

    # gambiarra para permitir a listagem dos modulos disponiveis
    modules = eri.extractors.modules

    #create an option parser
    usage  = """%(prog)s [options] <extractor> <file|cPath> [file ...]
  <extractor>\t\tUser an module name [%(modules)s]
  <file|cPath>\t\tOne or any path to html file(s) or
    \t\t\ta corpus file if you use --limit  parameter

* To more options use benchmark.py
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

    (opt, args) = parser.parse_args()

    if len(sys.argv) < 3:
        raise SystemExit(parser.print_help())

    # importando o extrator dinamicamente
    m, c = args[0].split('.')
    extractor = dimport("eri.extractors.%s" % m.lower(), c)

    files = []
    if not opt.limit:
        files = [1:]
#        file(args[1:], extractor, opt.output)
    elif opt.limit <= -1:
        paths = os.listdir(args[1])
        #paths.sort()

        for x,dir in enumerate(paths):
            if x*(-1) <= int(opt.limit) and int(opt.limit) < -1:
                break
            path = os.path.join(args[1], dir)
            files.append(path)
        #file(list, extractor, opt.output)
    else:
        print opt.limit
        for x in xrange(1, opt.limit+1):
            path = os.path.join(args[1], '%03d' % x, 'index.html')
            if os.path.exists(path):
                files.append(path)
        #file(list, extractor, opt.output)


    c = Conf(opt.config)




class Proof(object):
    metrics = metrics
    files = files
    proofpath = path

class Metric(object):
    markers = markers
