
def wordbag(string):
    bag = {}
    validchar = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
    word = ''
    for s in string:
        if s in validchar:
            word += s
            continue

        if len(word) > 0:
            if bag.has_key(word):
                bag[word] += 1
            else:
                bag.update({word:1})
        word = ''

    if len(word) > 0:
        if bag.has_key(word):
            bag[word] += 1
        else:
            bag.update({word:1})

    return bag

def matchwordbag(a,b):
    acc = 0
    less = 0
    err = 0
    diff_a_b = 0

    for key, value in a.iteritems():
        #print key, value
        if b.has_key(key):
            acc += value if (value <= b[key]) else b[key]
            less += (value - b[key]) if (value > b[key]) else 0
        else:
            less += value
        #print acc, less, diff_a_b

    for key, value in b.iteritems():
        if a.has_key(key):
            err += value - a[key] if a[key] < value else 0
            print key, value, err
        else:
            err += value
            print key, value, err


    return acc, err, less

def rp(acc,err,less):
    print acc, err, less
    recall = 1
    precision = 1

    if acc+less > 0:
        recall = acc/float(acc+less)
    if acc+err > 0:
        precision = acc/float(acc+err)

    return recall, precision

if __name__ == '__main__':
    a = wordbag('A B C')
    b = wordbag('A D')
    print rp(*matchwordbag(a,b))

    a = wordbag('A A A')
    b = wordbag('A A D')
    print rp(*matchwordbag(a,b))

    a = wordbag('A A')
    b = wordbag('B A C')
    print rp(*matchwordbag(a,b))

    a = wordbag('A')
    b = wordbag('A A A')
    print rp(*matchwordbag(a,b))
