def distance(first, second):
    """Find the Levenshtein distance between two strings."""
    if len(first) > len(second):
        first, second = second, first
    if len(second) == 0:
        return len(first)
    first_length = len(first) + 1
    second_length = len(second) + 1
    distance_matrix = [[0] * second_length for x in range(first_length)]
    for i in range(first_length):
       distance_matrix[i][0] = i
    for j in range(second_length):
       distance_matrix[0][j]=j
    for i in xrange(1, first_length):
        for j in range(1, second_length):
            deletion = distance_matrix[i-1][j] + 1
            insertion = distance_matrix[i][j-1] + 1
            substitution = distance_matrix[i-1][j-1]
            if first[i-1] != second[j-1]:
                substitution += 1
            distance_matrix[i][j] = min(insertion, deletion, substitution)
    return distance_matrix[first_length-1][second_length-1]
#end

def combComp2(nodeList, K, T, start=0):
#    print "combComp2", len(nodeList), K, T, start
    maxDR = [0,0,0]

    if start >= len(nodeList):
        return []

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
                #if len(s1) > 2*len(s2) or len(s2) > 2*len(s1):
                #    ed = 1
                #else:
                #    ed = editDist(s1,s2,price)
                ed = distance(s1,s2)
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
        r2 = combComp2(nodeList, K, T, maxDR[1] + maxDR[2])
        for r in r2:
            ret.append(r)

        return ret
    return None

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


