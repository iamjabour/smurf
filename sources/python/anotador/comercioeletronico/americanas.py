
import libxml2dom

debug = False

def crawl(url, out=None):
    global debug
    #doc = libxml2dom.parse('%s?&limit=100000' %url, html=1, unfinished=1, htmlencoding='latin1')
    doc = libxml2dom.parse('%s' %url, html=1, unfinished=1, htmlencoding='latin1')
    L = []

    productList = doc.xpath('//div[@class="box"]')
#    lastline = doc.xpath('//ul[@class="productList last"]')

#    if lastline != None:
#        [productList.append(p) for p in lastline]

    if len(productList) == 1:
        node = productList[0]
        if debug:
            print 'achou a lista de produtos:', node.localName
    elif len(productList) > 1:
        if debug:
            print 'Achou as listas de produtos corretamente', node.localName
    else:
        print '\nERROR: Nao foi encontrado nenhuma lista de produtos'
        return


    products = doc.xpath('//ul[@class="productList"]/li')
    lastline = doc.xpath('//ul[@class="productList last"]/li')

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
    if len(sys.argv) < 2:
        raise SystemExit("Usage: python %s <department url> [out.html]\n" % sys.argv[0])

    out = sys.stdout

    if len(sys.argv) > 2:
        out = open(sys.argv[2],'w')

    crawl(sys.argv[1], out)


