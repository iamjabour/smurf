def editDist(s1, s2, c={'change':1,'del':1,'add':1, 'm':100},at=0):

    if at > c['m']:
        return c['m']

#    print ">",s1,"<",">", s2,"<"
    if len(s1) <=0 and len(s2) <= 0:
        return 0

    if len(s2) <= 0:
        return editDist(s1[0:-1], s2, c, at+c['add']) + c['add']

    if len(s1) <= 0:
        return editDist(s1, s2[0:-1], c,at+c['del']) + c['del']


    if s1[-1] == s2[-1]:
        return editDist(s1[0:-1], s2[0:-1], c, at)

    change = editDist(s1[0:-1], s2[0:-1], c, at+c['change']) + c['change']
    delete =  editDist(s1, s2[0:-1], c, at+c['del']) + c['del']
    add = editDist(s1[0:-1], s2, c,at+c['add']) + c['add']

    return min(change,delete,add)
#editDist

#print editDist("aac", "abdef")


def editDist2(s1="", s2="", l1=0, l2=0, max=1, at=0):

    print l1,l2
    if l1 < 0 and l2 < 0:
#        print 'fim'
        return at

    if float(len(s1)-at)/len(s1) > max:
        print "sai 1"
#        print float(at)/len(s1)
        return at

    if l2 < 0:
#        print 'l2<0'
        return editDist2(s1,s2,l1-1,l2,max,at + 1)

    if l1 < 0:
#        print 'l1<0'
        return editDist2(s1,s2,l1,l2-1,max,at+1)

    while l1 <0 and l2 < 0 and cmp(s1[l1],s2[l2]) == 0:
#        print '%s==%s' % (s1[l1], s2[l2])
        l1 -= 1
        l2 -= 1

    if l1 < 0 and l2 < 0:
        return at

    print 'c'
    c = editDist2(s1,s2,l1-1,l2-1,max,at + 1)
    print 'd'
    d = editDist2(s1,s2,l1-1,l2,max,at + 1)
    print 'a'
    a = editDist2(s1,s2,l1,l2-1,max,at + 1)

    return min(c,d,a)
#editDist2

#a = float(editDist2("aab", "baa", 2, 2))
#print a, a/3

def conflito(y, list):
    i = list[y]
    r = -1
    x = y
    while x >= 0:
        j = list[x]
        if i == j:
            x -= 1
            continue
        elif (i[0] > j[1]):
            return x
        x -= 1

    return r
#...


def _maxmatch(j, p, list):
    if j <= 0:
        return (0,[])
    (v1,s1) = _maxmatch(p[j],p,list)
    (v2,s2) = _maxmatch(j-1,p,list)
    v1 += list[j][2]
    if v1 >= v2:
        return (v1, [list[j]]+ s1)
    else:
        return (v2, s2)
#_maxmatch

def maxmatch(list):

    list.sort(lambda x, y: cmp(x[1], y[1]))

    p = range(0,len(list))

    x = len(list) - 1
    while x >= 0:
        p[x] = conflito(x,list)
        x -= 1

    (v,s) = _maxmatch(len(list)-1, p, list)
    return (v,s)
#maxmatch


def combComp2(nodeList, K, T, start=0):
#    print "combComp2", len(nodeList), K, T, start
    maxDR = [0,0,0]

    if start >= len(nodeList):
        return [[]]

    for i in xrange(1,K+1):
#        print "for i ", i
        for f in xrange(start,i):
#            print "for f", f
            flag = True
            curDR = [0,0,0]
            for j in xrange(f,len(nodeList)+1):
#                if (2 * i + j) > len(nodeList):
#                    break

#                print "for j", j
                fim = j + i
                fim2 = j + (2*i)
                s1 = "".join(nodeList[j:j + i])
                s2 = "".join(nodeList[j+i:j + (2 * i) ])

#                print j, fim, s1
#                print fim, fim2, s2
#                print T * len(s1), len(s1), len(s2)
                price = {'add':1,'change':1,'del':1,'m':T*min(len(s1),len(s2))}
                if len(s1) > 2*len(s2) or len(s2) > 2*len(s1):
                    ed = 1
                else:
                    ed = editDist(s1,s2,price)

                if float(ed)/(min(len(s1),len(s2))+1) <= T:
#                    print "sim"
                    if flag:
#                        print "cria curDR", i, j, 2*i
                        curDR = [i,j,2*i]
                        flag = False
                    else:
#                        print "append curDR", curDR[0], curDR[1], curDR[2] + i
                        curDR[2] +=  i
                elif not flag:
#                    print "break"
                    break


            if maxDR[2] < curDR[2] \
              and (maxDR[1] == 0 or curDR[1] < maxDR[1]):
#                print "atualiza maxDR"
                maxDR = curDR

    if maxDR[2] != 0 \
      and maxDR[1] + maxDR[2]  != len(nodeList):
#        print "cont na lista"
        ret = []
        ret.append(maxDR)
        ret.append(combComp2(nodeList, K, T, maxDR[1] + maxDR[2]))
        return ret
    return []

# arrumar forma de nao repetir sequencias como comentado no paper
#     0   1   2   3   4   5   6   7   8   9   10  11  12
#a = ["3","3","0","3","3","1","2","1","1","1","1","1"]
#a = []
#print a
#r = combComp2(a,2,0)
#print r

#printresult(r,a)

def combComp(nodeList,K, T):
    sol = []
    for i in xrange(0,K+1):
        for j in xrange(1,K+1):
            if i+2*j <= len(nodeList):
                St = i
                k = i+j
                while k < len(nodeList):
                    if k+j <= len(nodeList):
                        s1 = "".join(nodeList[St:k])
                        s2 = "".join(nodeList[k:k+j])
                        price = {'add':1,'change':1,'del':1,'m':T}
                        d = editDist(s1, s2,price)
                        if d <= T:
                            print "%s %s" % (s1, s2)
                            sol.append([St,k+j,k+j-St])

                        St = k
                    k = k+ j
                #while
            #if
        #for
    #for
    #print sol
    sol = maxmatch(sol)
    print sol
    return sol
#combComp


#old


# arrumar forma de nao repetir sequencias como comentado no paper
def combCompOld(nodeList,K):
    for i in xrange(0,K+1):
        for j in xrange(1,K+1):
            if i+2*j <= len(nodeList):
                St = i
                k = i+j
                while k < len(nodeList):
                    if k+j <= len(nodeList):
                        s1 = "".join(nodeList[St:k])
                        s2 = "".join(nodeList[k:k+j])

                        print "%s %s" % (s1, s2)
                        print editDist(s1, s2)

                        St = k
                    k = k+ j
                #while
            #if
        #for
    #for
#combComp


