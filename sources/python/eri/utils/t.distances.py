from eri.utils.distances import stringDiff, stringDistance
a = "eturn one that starts earliest in"
b = "starts earliest in a, and of all those maximal matching"

for i in xrange(1, 10000):
    stringDiff(a,b)
    stringDistance(a,b)
