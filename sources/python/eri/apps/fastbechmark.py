import sys
from eri.utils.dynamicimport import *
from eri.marker import Marker

tables = []
def dfs(node):
    global tables
    if node.localName and node.localName.lower() == 'table':
        if node.hasAttribute('genuinetable'):
            tables.append(node)
            return
    for child in node.childNodes:
        dfs(child)

def proof(dom):
    global tables
    tables = []
    dfs(dom)
    return tables

if __name__ == '__main__':
    import os
    import optparse
    import eri.extractors
    from eri.utils.parsedom import ParseDom
    from eri.metric import Metric

    modules = eri.extractors.modules

    #create an option parser
    usage  = """%(prog)s [options] <extractor> <file> [file ...]
  <extractor>\t\tUser an module name [%(modules)s]
  <file>     \t\tOne or any path to html file(s)""" % \
  {'prog':sys.argv[0], 'modules': '| '.join(modules)}

    parser = optparse.OptionParser(usage=usage)

    parser.add_option('-o', '--output', default='stdout', \
      dest='output', \
      help="Create and redirect stdout to file")

    (opt, args) = parser.parse_args()

    if len(sys.argv) < 3:
        raise SystemExit(parser.print_help())

    # importando o extrator dinamicamente
    extractor = dimport("eri.extractors.%s" % args[0].lower(), args[0])

    count = 0

    for filePath in args[1:]:
        count += 1
        if filePath[0:4] == "http":
            import urllib
            htmlString = urllib.urlopen(filePath).read()
        else:
            htmlString = open(filePath, 'r').read()

        parser = ParseDom()
        marker = Marker()
        metric = Metric()

        dom = parser.parse(htmlString)
        t = proof(dom)
        r = extractor.process(dom, marker)

        import pprint
        pprint.pprint(marker.labels)

        for p in marker.labels['table']:
            print p.toString()

        print 'tables'
        pprint.pprint(t)

        x = metric.table_Recall(marker.labels['table'], t)
        print "Accuracy:", x

        if opt.output != 'stdout':
            out = open('%d%s' % (count, opt.output), 'w')
            print >>out, r
        else:
            print 'Document:%d' % count
            print r
