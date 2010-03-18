from eri.utils.distances import stringDistance
from eri.utils.distances import simpleTreeMatching

__debug = False

def match2(node, maxDist=0, height=0, tags=False, printtag=False):
    if __debug:
        print "Debug mode: eri.utils.match.match2()"

    s1 = None
    s2 = None
    result = [False] * len(node.childNodes)
    match = False
    _comp = 0

    for x in xrange(0,len(node.childNodes)):
        c = node.childNodes[x]

        #primary test to not match low height
        if x == 0 or c.height < height:
            s1 = c
            match = False
            _comp += 1
            continue

        s2 = c

        if printtag or __debug:
            print 'str:', s1.tag, s2.tag

        d = float(simpleTreeMatching(s1,s2))/max(len(s1.tags), len(s2.tags),1)

        if __debug:
            print 'distance:', 1-d

        #match test
        if 1-d <= maxDist :
            s1 = c
            result[x] = _comp
            result[x-1] = _comp if not match else result[x-1]
            match = True
        else:
            s1 = c
            match = False
            _comp += 1
    #for
    if __debug:
        print "return: eri.utils.match.match2()"

    return result

def match(node, maxDist=0, height=0, tags=False, printtag=False):
    global __debug
    if __debug:
        print "Debug mode: eri.utils.match.match()"

    s1 = ""
    s2 = ""
    result = [False] * len(node.childNodes)
    match = False
    _comp = 0

    for x in xrange(0,len(node.childNodes)):
        c = node.childNodes[x]

        #primary test to not match low height
        if x == 0 or c.height < height:
            s1 = c.tags if tags else c.str
            match = False
            _comp += 1
            continue

        s2 = c.tags if tags else c.str

        if printtag or __debug:
            print 'str:', s1, s2

        # match test
        if len(s1) <= (len(s2) * (1.0+maxDist)) or\
          len(s2) <= (len(s1) * (1.0+maxDist)):
            d = float(stringDistance(s1,s2))/max(len(s1), len(s2))
            if __debug:
                print 'distance:', d
            #save match component
            if d <= maxDist :
                s1 = c.tags if tags else c.str
                result[x] = _comp
                result[x-1] = _comp if not match else result[x-1]
                match = True
                continue

        # not match
        s1 = c.tags if tags else c.str
        match = False
        _comp += 1
    #for

    if __debug:
        print "return: eri.utils.match.match()"

    return result


def treematch(node, maxDist=0.0):

    __comp = 1
    start = 0

    minMatch = 2
    matchCount = 0
    result = [False] * (len(node.childNodes))
    while start < len(node.childNodes):
#        print 'etapa', start, len(node.childNodes)

        matchId, matchCount = findmatch(node, start, maxDist, minMatch)


        if matchCount >= minMatch:
            r = matchId-(start)

            if __debug:
                print 'matchcount, refid, matchid, r:', matchCount, start, matchId, r
            finish = (matchCount *r)+start+r
            maxMatch = check(node, maxDist,  r, start, finish)



#            print 'maxmatch!', maxMatch

            if maxMatch:
                for i in xrange(start, min(maxMatch,len(node.childNodes))):
                    result[i] = __comp
                start = maxMatch
            else:
                start += 1
                __comp+=1

        else:
            start += 1

        __comp +=1

    return result

def findmatch(node,start, maxDist, minMatch):
#    for i in xrange(0, len(node.childNodes)):
        refid = start
        ref = node.childNodes[refid]
        matchId = False
        matchCount = 0

        j = refid
        while True:
            j += matchId - refid if matchId else 1

            if j >= len(node.childNodes):
                break

            c = node.childNodes[j]

            if __debug:
                print refid, ref.tags
                print j, c.tags #, c.text.replace('\n', '|').replace(' ', '')

            d = float(simpleTreeMatching(ref,c))/max(len(ref.tags), len(c.tags),1)

            if 1-d <= maxDist:
                matchCount += 1
                matchId = j if not matchId else matchId

        if matchCount >= minMatch:
            return matchId, matchCount

        return matchId, matchCount

def check(node, maxDist, r, first, last):
    if __debug:
        print "Check", maxDist, r, first, last

    maxmatch = False
    i = first+r
    while i+r < last:
#        print i, i+r, last
        for k in xrange(0, r):
#            print k , first+k, i+k
            a = node.childNodes[first+k]
            b = node.childNodes[i+k]
            d = float(simpleTreeMatching(a,b))/max(len(a.tags), len(b.tags),1)

            if 1-d <= maxDist:
                maxmatch = (r*i)+k
            else:
#                print 'not match'
                return maxmatch-k

        i += r
    return maxmatch

if __name__ == "__main__":
    print "Test utils.match functions"

    import libxml2dom
    from eri.extractors.distancebypair2.node import Node
    import test_trees

    html = test_trees.tree3
    dom = libxml2dom.parseString(html)
    root = Node(dom)
    root = root.loadNodeTree(dom, 0, True)

    div1 = root.childNodes[0].childNodes[0].childNodes[0]
    div2 = root.childNodes[0].childNodes[0].childNodes[1]

    body = root.childNodes[0].childNodes[0]
#    print 'div1', div1.tags
#    print 'div2', div2.tags
    print 'body', body.tags

    __debug = True

    print treematch(body)
    #tree2
    if False:
        r = treematch(body)
        if not r == [False, 2, 2, 2, 2, 2, 2, False, 4, 4, 4, 4, 4, 4]:
            print "Flase", r

    if False:#tree1 and 2
        __debug = False
        r = match2(div1, maxDist=.00, height=0, tags=False, printtag=False)
        if not r == [1,1,False] :
            print "Flase:", r

        r = match(div1, maxDist=.00, height=0, tags=False, printtag=False)
        if not r == [1,1,False] :
            print "Flase:", r



        r = match2(div1, maxDist=.4, height=0, tags=False, printtag=False)
        if not r == [1,1,1] :
            print "Flase:", r

        r = match(div1, maxDist=.4, height=0, tags=False, printtag=False)
        if not r == [1,1,1] :
            print "Flase:", r
