from pysqlite2 import dbapi2 as sqlite
from db.tables import Table


import time

from threading import Thread

def siteCrawler(siteName, pageCrawlerFunction, urls, results):
    siteResults = []
    first = True
    for url in urls:
        if not first:
            time.sleep(5)
        else:
            first = False

        url = url.strip() # remove trailing newline and eventual spacing
        #print url

        ret = pageCrawlerFunction(url)
        if type(ret) != type([]):
            ret = [ret]
        siteResults.extend(ret)

    results[siteName] = siteResults

def main(db, *sites):
    threadsList = []
    results = {}
    for site in sites:
        try:
            module = __import__(site, globals(), locals(), [''])
        except ImportError, ex:
            raise SystemExit("Could not import information for site '%s': %s" % (site, ex))

        try:
            function = getattr(module, 'crawl')
        except AttributeError, ex:
            raise SystemExit("Could not locate function 'crawl' in module '%s': %s" % (site, ex))

        seeds = open('%s.txt' % site).readlines()
        t = Thread(target=siteCrawler, args=(site, function, seeds, results), name=site)
        threadsList.append(t)
        print "Running '%s'..." % site
        t.start()

    while [t for t in threadsList if Thread.isAlive(t)]:
        pass

    tables = {}
    for site in results:
        tables[site] = Table(db, site)
#        print "table name:", tables[site].name
#        print '== %s %s' % (site, '='*(76 - len(site)))
        print
        for d in results[site]:
            p = tables[site].getById(int(d['productId']))
            if not p:
                p = (d['productId'], d['url'], d['productName'], d['price'], 0)
            else:
                tables[site].delById(p[0])

            print p
            (id, url, name, price, reads) = p
            price += d['price']
            reads += 1

            tables[site].insert(id, url, name, price, reads)

        tables[site].save()


if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python %s <site1> [site2 ...]\n" % sys.argv[0])

    db = sqlite.connect('db/eProfit.db', detect_types = sqlite.PARSE_DECLTYPES)
    main(db, *sys.argv[1:])


