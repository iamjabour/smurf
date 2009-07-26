import xml.dom
from libxml2dom import parseString

def parse(htmlString, encoding=None, url='', category='', language=''):
    """
        Parse HTML to DOM Document
    """

    result = parseString(htmlString, html=1, unfinished=1, htmlencoding='utf8')
    return result

