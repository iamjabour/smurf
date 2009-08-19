import Numeric


def editDist(s1,s2, c={'change':1,'del':1,'add':1}):

	if len(s1) == 0 and len(s2) == 0:
		return 0

	if len(s2) == 0:
		return editDist(s1[0:-1], s2,c) + c['add']

	if len(s1) == 0:
		return editDist(s1,s2[0:-1],c) + c['del']


	if s1[-1] == s2[-1]:
		return editDist(s1[0:-1],s2[0:-1],c)
	
	change = editDist(s1[0:-1],s2[0:-1],c) + c['change']
	delete =  editDist(s1,s2[0:-1],c) + c['del']
	add = editDist(s1[0:-1], s2,c) + c['add']

	return min(change,delete,add)
#editDist
# print editDist("aba","aa")

# arrumar forma de nao repetir sequencias como comentado no paper
def combComp(nodeList,K):
	for i in xrange(0,K+1):
		for j in xrange(1,K+1):
			if i+2*j <= len(nodeList):
				St = i
				k = i+j
				while k < len(nodeList):
					if k+j <= len(nodeList):
						print "%s %s" % (nodeList[St:k], nodeList[k:k+j])
						St = k
					k = k+ j
				#while
			#if
		#for
	#for
#combComp
combComp(["1","2","3","4","5","6"],3)

def llc(s1, s2, p):
    """
    Given 2 strings returns the length of the longest common subsequence.
    Returns 0 if this length is shorter than p times the shortest string
    length. Use this method to improve performance.
    """
    if len(s1) > len(s2): s1,s2 = s2,s1
    m=len(s1)
    n=len(s2)
    if m==0 or n==0: return 0
    L = Numeric.zeros((m+1,n+1))
    for i in xrange(1,m+1):
        for j in xrange(1,n+1):
            if s1[i-1] == s2[j-1]: L[i,j] = L[i-1,j-1]+1
            else: L[i,j] = max(L[i,j-1],L[i-1,j])
    if m - i + L[i,n-1] < p * m: return 0
    return L[m,n]
#editDist
