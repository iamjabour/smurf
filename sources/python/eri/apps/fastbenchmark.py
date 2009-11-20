import sys
from eri.utils.dynamicimport import *

def file(files, extractor, configurator, output=None):
    """
    Roda uma extrator com as configuracoes especificadas para um conjunto de arquivos
    """
    import urllib
    parser = ParseDom()
    marker = configurator.marker()
    metric = configurator.metric()

    proof = configurator.proof()

    print "Doc\tPre\tRec\tlext\tlpro\tfile_name"
    for id, filePath in enumerate(files):
        fileName = filePath.split('/')[-1]
        marker.reset()
        if filePath[0:4] == "http":
            htmlString = urllib.urlopen(filePath).read()
        else:
            htmlString = open(filePath, 'r').read()

        dom = parser.parse(htmlString)
        p = proof.getProof(dom)
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



if __name__ == '__main__':
    import os
    import optparse
    import eri.extractors
    from eri.utils.parsedom import ParseDom
    from eri.apps.configurator import Configurator as Conf

    # Esse import devera ser dinamico
    from eri.metricbase import MetricBase as Metric

    # gambiarra para permitir a listagem dos modulos disponiveis
    modules = eri.extractors.modules

    #create an option parser
    usage  = """%(prog)s [options] <extractor> <file|cPath> [file ...]
  <extractor>\t\tUser an module name [%(modules)s]
  <file|cPath>\t\tOne or any path to html file(s) or
    \t\t\ta corpus file if you use --limit  parameter""" % \
  {'prog':sys.argv[0], 'modules': '| '.join(modules)}

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
        files = args[1:]
    elif opt.limit <= -1:
        paths = os.listdir(args[1])
        #paths.sort()

        for x,dir in enumerate(paths):
            if x*(-1) <= int(opt.limit) and int(opt.limit) < -1:
                break
            path = os.path.join(args[1], dir)
            files.append(path)
    else:
        print opt.limit
        for x in xrange(1, opt.limit+1):
            path = os.path.join(args[1], '%03d' % x, 'index.html')
            if os.path.exists(path):
                files.append(path)

    # importando as configuracoes do arquivo de config
    cnf = Conf(opt.config)
    file(files, extractor, cnf, opt.output)
