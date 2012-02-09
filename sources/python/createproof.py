"""
This module try to provide a easy way to create a corpus to create the classifiers
and to run experiments to bet some benchmarks.
"""

import libxml2dom
debug = False

class Path():
    def plist(doc):
        return None
    def products(doc):
        return None
    def last(doc):
        return None

class Americanas(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//ul[@class="pList"]')
    @staticmethod
    def products(doc):
        return doc.xpath('//ul[@class="pList"]/li')
    @staticmethod
    def last(doc):
        return doc.xpath('//ul[@class="productList last"]/li')

class BestBuy(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//div[@id="listView"]')
    @staticmethod
    def products(doc):
        return doc.xpath('//div[@id="listViews"]/div')

class CircuytCity(Path):
    @staticmethod
    def plist(doc):
        return [doc.xpath('//form[@name="frmCompare"]/table')[0]]
    @staticmethod
    def products(doc):
        list = CircuytCity.list(doc)
        return list[0].childNodes

class DealExtreme(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//td[@class="ProductsDisplay]"')
    @staticmethod
    def products(doc):
        p = doc.xpath('//td[@class="ProductsDisplay"]/div[@style]')
        p.pop()
        return p

class EBay(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//div[@class="lview"]')
    @staticmethod
    def products(doc):
        return doc.xpath('//div[@class="lview"]/table[@class="lview nol"]')

class MySimon(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//div[@id="centerColumn"]')
    @staticmethod
    def products(doc):
        return doc.xpath('//div[@class="productWrapper compare"]')

class Submarino(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//div[@class="productVitrine"]/ul')
    @staticmethod
    def products(doc):
        return doc.xpath('//div[@class="productVitrine"]/ul/li')

class Target(Path):
    @staticmethod
    def plist(doc):
        return doc.xpath('//div[@id="searchResultDisplay"]/ol')
    @staticmethod
    def products(doc):
        doc.xpath('//div[@id="searchResultsDisplay"]/ol/li')

def create_proof(url, parse=None,	out=None):
    """
    Create a HTML document with new attributes to provide a proof to benchmarks and 
    some other functions executed by this framework.
    The basic annotations are: 'proof_productlist' and 'proof_product'.
    """

    if not parse:
        parse = Path()

    # use libxml2 to parse the HTML document
    doc = libxml2dom.parse('%s' %url, html=1, unfinished=1, htmlencoding='latin1')
    L = []

    # check if the parse can find a list of products
    productList = parse.plist(doc)

    if len(productList) == 1:
        node = productList[0]
        if debug:
            print 'found a product list!', node.localName
    elif debug and len(productList) > 1:
        if debug:
            print 'found more then one product list!!!', node.localName
    else:
        print '\nERROR: Cannot found a list of products using corrent xpath'
        return


    products = parse.products(doc)
    lastline = parse.last(doc)

    if lastline != None:
        [products.append(p) for p in lastline]

    if debug:
        print len(products)

    for pl in productList:
        pl.createAttribute('proof_productlist')
        pl.setAttribute('proof_productlist', 'true')

    for product in products:
        product.createAttribute('proof_product')
        product.setAttribute('proof_product', 'true')


    if out != None:
        print >>out, doc.toString()

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 3:
        raise SystemExit("Usage: python %s <retail> <url> [out.html]\n" % sys.argv[0])

    out = sys.stdout

    retails = {
        'americanas': Americanas,
        'bestbuy': BestBuy,
        'circuytcity': CircuytCity,
        'dealExtreme': DealExtreme,
        'ebay': EBay,
        'mysimon': MySimon,
        'submarino': Submarino,
        'target': Target,
    }

    if not retails.has_key(sys.argv[1]):
        raise SystemExit("Use a valid retail: %s" % ', '.join(retails.keys()))

    if len(sys.argv) > 3:
        out = open(sys.argv[3],'w')

    create_proof(sys.argv[2], retails[sys.argv[1]], out)


