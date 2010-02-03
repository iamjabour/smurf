
import libxml2dom

debug = False

def crawl(url, out=None):
    global debug
    #doc = libxml2dom.parse('%s?&limit=100000' %url, html=1, unfinished=1, htmlencoding='latin1')
    doc = libxml2dom.parse('%s' %url, html=1, unfinished=1, htmlencoding='latin1')
    L = []

    productList = doc.xpath('//div[@class="productVitrine"]/ul')
    if len(productList) == 1:
        node = productList[0]
        if debug:
            print 'achou a lista de produtos:', node.localName
    elif debug and len(productList) > 1:
        print 'tem mais de 1?'
    else:
        print '\nERROR: Nao foi encontrado nenhuma lista de produtos'
        return


    products = doc.xpath('//div[@class="productVitrine"]/ul/li')

    if debug:
        print len(products)

    productList[0].createAttribute('proof_productlist')
    productList[0].setAttribute('proof_productlist', 'true')

    for product in products:
        product.createAttribute('proof_product')
        product.setAttribute('proof_product', 'true')


    if out != None:
        print >>out, doc.toString()

if __name__ == '__main__':
    import sys
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python %s <department url> [out.html]\n" % sys.argv[0])

    out = sys.stdout

    if len(sys.argv) > 2:
        out = open(sys.argv[2],'w')

    crawl(sys.argv[1], out)


