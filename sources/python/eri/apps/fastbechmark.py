import sys
from eri.utils.dynamicimport import *
from eri.markerbase import MarkerBase as Marker

LIMIT = 300

tables = []
def dfs(node):
    global tables
    if node.localName and node.localName.lower() == 'table':
        if node.hasAttribute('genuinetable'):
            tables.append(node)
#            return
    for child in node.childNodes:
        dfs(child)

def proof(dom):
    global tables
    tables = []
    dfs(dom)
    return tables

def file(files, extractor, output=None):
    import urllib
    parser = ParseDom()
    marker = Marker()
    metric = Metric()

    print "Doc\tPre\tRec\tlext\tlpro\tfile_name"
    for id, filePath in enumerate(files):
        fileName = filePath.split('/')[-1]
        marker.reset()
        if filePath[0:4] == "http":
            htmlString = urllib.urlopen(filePath).read()
        else:
            htmlString = open(filePath, 'r').read()

        dom = parser.parse(htmlString)
        p = proof(dom)
        r = extractor.process(dom, marker)

#        import pprint
#        pprint.pprint(marker.labels)

#        for p in marker.labels['table']:
#            print p.toString()

#        print 'tables'
#        pprint.pprint(t)

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
    from eri.metricbase import MetricBase as Metric

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

    (opt, args) = parser.parse_args()

    if len(sys.argv) < 3:
        raise SystemExit(parser.print_help())

    # importando o extrator dinamicamente
    extractor = dimport("eri.extractors.%s" % args[0].lower(), args[0])

    count = 0

    if not opt.limit:
        file(args[1:], extractor, opt.output)
    elif opt.limit <= -1:
        list = []
        paths = os.listdir(args[1])
        #paths.sort()

        for x,dir in enumerate(paths):
            if x*(-1) <= int(opt.limit) and int(opt.limit) < -1:
                break
            path = os.path.join(args[1], dir)
            list.append(path)
        file(list, extractor, opt.output)
    else:
        print opt.limit
        list = []
        for x in xrange(1, opt.limit+1):
            path = os.path.join(args[1], '%03d' % x, 'index.html')
            if os.path.exists(path):
                list.append(path)
        file(list, extractor, opt.output)
