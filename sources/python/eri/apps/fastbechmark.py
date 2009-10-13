import sys
from eri.utils.dynamicimport import *
from eri.marker import Marker

if __name__ == '__main__':
    import os
    import optparse

    import eri.extractors
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


    extractor = dimport("eri.extractors.%s" % args[0].lower(), args[0])

    from eri.utils.parsedom import ParseDom

    filePath = args[1]

    if filePath[0:4] == "http":
        import urllib
        htmlString = urllib.urlopen(filePath).read()
    else:
        htmlString = open(filePath, 'r').read()

    parser = ParseDom()
    marker = Marker()
    dom = parser.parse(htmlString)
    r = extractor.process(dom, marker)

    print r
