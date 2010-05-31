import xml.dom
import sanitizer
from forceencode import *
from libxml2dom import parseString
import os
# imports chardet module if avaiable
try:
    import chardet.universaldetector
except ImportError:
    chardet = None

class ParseDom(object):
    """
    Create a Dom tree from provided string
    """

    def __init__(self):
        """
        Initialization for the PreProcessor basically instantiates
        a Parser object which will be used when processing Documents.
        """

        # attemps to instantiate a chardet object
        self._detector = None
        if chardet:
            self._detector = chardet.universaldetector.UniversalDetector()

    def parse(self, file, encoding='utf8'):
        import urlparse
        scheme = urlparse.urlparse(file).scheme
        if scheme == 'http':
            import urllib
            string = urllib.urlopen(file).read()
        elif scheme == '':
            string = open(file,'r').read()
        else:
            raise SystemExit, "Parser nao sabe tratar esse tipo de path"

        return self.parseString(string,encoding)

    def parseString(self, htmlString, encoding='utf-8'):
        """
        This is the base implementation for the processing.

        @param str path: the path from html document to be processed
        @param str encoding: the character encoding to be used, if any
        @return: dom documet -- the w3c dom document tree
        """
        dom = None

        if encoding != 'utf8' or encoding != 'utf-8':
            #Convert to utf8 encoding
            unicodeHtml = convertStringToUTF8(htmlString, encoding)
            if unicodeHtml:
                htmlString = unicodeHtml

#        html = sanitizer.removeJavaScript(htmlString)
#        html = sanitizer.removeNoScript(html)
        html = sanitizer.cleanHtml(htmlString)
#        htmlString = sanitizer.replaceHtmlForDiv(htmlString)
#        print html
        if chardet:
            # Resets any content that may be on the buffer
            self._detector.reset()

        try:
            # Try processing the webpage
            # If the doc.encoding attribute is set, it is used to speed up the
            # process and bypass encoding detection
            dom = self._parse(html)

        except UnicodeDecodeError, ex:
            if not chardet:
                # module is not avaiable, forward exception
                msg = "ERROR: Could not parse document because encoding detection is not available."
                raise SystemExit, msg

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
                dom = self._parse(html, encoding)
                #self.__logObj.addInfo( \
                #    "Detected encoding '%s' for document" % \
                #    (encoding))
            except UnicodeDecodeError, ex2:
                # This document cannot be processed
                # We'll forward the exception
                #self.__logObj.addError("Could not parse document " + \
                #    "because encoding detection failed.")
                msg = "Could not parse document because encoding detection failed."
                raise SystemExit, msg

        return dom

    def _parse(self, htmlString, encode='utf8'):
        """
        Parse HTML to DOM Document
        """
        if len(htlString) < 2:
            return None
        if encode:
            dom = parseString(htmlString, html=1, unfinished=1, htmlencoding=encode)
            self._testDom(dom)
        else:
            dom = parseString(htmlString, html=1, unfinished=1)
            self._testDom(dom)

        return dom

    def _testDom(self, domNode):
        v = ""
        v = domNode.textContent
        v = domNode.nodeValue
        v = domNode.value

        for child in domNode.childNodes:
            self._testDom(child)
