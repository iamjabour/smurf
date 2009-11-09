

def forceencode(string, fencode='utf8'):
    """
    Force encode change to utf8, if is not possible return None
    """
    try:
        unicode = string.decode(fencode)
        return unicode.encode('utf8')
    except UnicodeDecodeError:
        return None

def convertStringToUTF8(string, encoding=None):
    """
    Convert string to unicode

    @param str string: String to try convert
    @param str encoding: Actual string encoding
    @return str: original string converted to unicode. If one line not be 
    converted this line not's added to this string.
    """
    if encoding:
        # Test user encoding to decode
        try:
            unicode = string.decode(encoding)
            return unicode.encode('utf8')
        except UnicodeDecodeError:
             pass
             #User encoding isn't right, continue process to try convert
    #if

    #Encoding list to try decode original string
    decodes = ['utf8', 'latin1']
    lostLine = 0
    unicodeString = ''

    for line in string.split('\n'):
        for fencode in decodes:
            goodEncode = False
            unicodeLine = forceencode(line, fencode)
            if unicodeLine:
                break

        if not unicodeLine:
            #Didn't have good encode!
            lostLine += 1
        else:
            unicodeString += unicodeLine + '\n'

    #return new string
    if unicodeString != '':
        return unicodeString

    #didn't have success in decode
    return None

