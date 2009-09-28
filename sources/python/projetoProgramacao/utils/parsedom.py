import xml.dom
from libxml2dom import parseString

# imports chardet module if avaiable
try:
    import chardet.universaldetector
except ImportError:
    chardet = None

class ParseDom(object):

    def __init__(self):
        """
        Initialization for the PreProcessor basically instantiates
        a Parser object which will be used when processing Documents.
        """

        # attemps to instantiate a chardet object
        self._detector = None
        if chardet:
            self._detector = chardet.universaldetector.UniversalDetector()

    def __forceencode(self, string, fencode='utf8'):
        try:
            unicode = string.decode(fencode)
            return unicode.encode('utf8')
        except UnicodeDecodeError:
            return None

    def _convertStringToUTF8(self, string, encoding=None):
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
                unicodeLine = self.__forceencode(line, fencode)
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

    def parse(self, htmlString, encoding=None):
        """
        This is the base implementation for the processing.

        @param str path: the path from html document to be processed
        @param str encoding: the character encoding to be used, if any
        @return: dom documet -- the w3c dom document tree
        """
        dom = None

        if encoding != 'uft8' and encoding != 'utf-8':
            #Convert to utf8 encoding
            encoding = 'utf-8'
            unicodeHtml = self._convertStringToUTF8(htmlString, encoding)
            if unicodeHtml:
                htmlStrong = unicodeHtml

        if chardet:
            # Resets any content that may be on the buffer
            self._detector.reset()

        try:
            # Try processing the webpage
            # If the doc.encoding attribute is set, it is used to speed up the
            # process and bypass encoding detection
            dom = self._parse(htmlString)

        except UnicodeDecodeError, ex:
            if not chardet:
                # module is not avaiable, forward exception
                self.__logObj.addError("Could not parse document " + \
                    "because encoding detection is not available.")
                raise UnicodeDecodeError(ex)

            # feed the HTML in blocks of 4Kb to the UniversalDetector until
            # it is ready to identify the encoding

            fullBlocks = len(doc) / 4096
            for k in xrange(0, fullBlocks+1):
                self._detector.feed( doc.html[ k*4096 : (k+1)*4096 - 1 ] )
                if self._detector.done:
                    break

            self._detector.close()
            encoding = self._detector.result['encoding']

            try:
                # Try processing the webpage with the detected encoding
                dom = self._parse(htmlString)
                self.__logObj.addInfo( \
                    "Detected encoding '%s' for document" % \
                    (encoding))
            except UnicodeDecodeError, ex2:
                # This document cannot be processed
                # We'll forward the exception
                self.__logObj.addError("Could not parse document " + \
                    "because encoding detection failed.")
                raise UnicodeDecodeError(ex2)

        return dom

    def _parse(self, htmlString):
        """
        Parse HTML to DOM Document
        """

        result = parseString(htmlString, html=1, unfinished=1, htmlencoding='utf8')
        return result

