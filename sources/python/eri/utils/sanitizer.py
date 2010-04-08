
import re


# regular expressions for HTML sanitization
regexes = {}
regexes['script'] = re.compile(r'<script[^>]*>.*?</script>', \
    re.IGNORECASE | re.DOTALL)
regexes['html'] = re.compile(r'<(/?)html>', re.IGNORECASE)
regexes['noscript'] = re.compile(r'<noscript[^>]*>.*?</noscript>', \
    re.IGNORECASE | re.DOTALL)


def removeTag(docString, tag, replacement=''):
    """
    Removes a given tag from the HTML. This function supports nested tags.
    For example, consider this example:

    <div>some text</div>
    <p>more text</p>
    <div>
      <div>hello</div>
      <p>cruel</p>
      <div>world</div>
    </div>
    <p>even more text</p>
    <div>footer</div>

    Removing all <div> tags would return this:

    <p>more text</p>
    <p>even more text</p>

    This is superior to a single regular expression, as it does not suffer
    from greediness (or lack thereof). Instead, it follows the structure of
    the HTML document correctly.
    """

    tag = tag.lower() # for case insensitivity
    open = []
    restartAppend = -1
    str = ''

    for i in xrange(len(docString)):
        # should cover '<tag>*', '<tag *' and '</tag>'
        temp = docString[i:i+len(tag)+3].lower()
        if temp[:-1] == '<'+tag+'>' or temp[:-1] == '<'+tag+' ':
            open.append(i)
        elif temp == '</'+tag+'>':
            open.pop()
            if len(open) == 0: # closed an outermost instace of <tag>
                restartAppend = i+len(tag)+3
        else:
            if len(open) == 0 and restartAppend <= i: # not matching any tag
                if restartAppend == i: # put replacement here
                    str += replacement
                str += docString[i] # append to result

    return str

def removeJavaScript(docString):
    """
    JavaScript code containing literal HTML tags cause the parser to create
    new nodes, breaking the script code and producing garbage in the DOM tree,
    even if the code is surrounded by <!-- html comment //--> tags.

    This function truncates the script code to a simple comment.
    """

    # Mozilla Firefox considers script code everything up to the "</script>"
    # character sequence. As such, a simple ungreedy regular expression should
    # be enough to cover the majority of cases.

    return removeTag(docString, 'script', '<!-- script-REMOVED //-->')
    return regexes['script'].sub(
        '<script><!--   REMOVED   //--></script>',
        docString
    )

def removeNoScript(docString):
    """
    JavaScript code containing literal HTML tags cause the parser to create
    new nodes, breaking the script code and producing garbage in the DOM tree,
    even if the code is surrounded by <!-- html comment //--> tags.

    This function truncates the script code to a simple comment.
    """

    # Mozilla Firefox considers script code everything up to the "</script>"
    # character sequence. As such, a simple ungreedy regular expression should
    # be enough to cover the majority of cases.

    return removeTag(docString, 'noscript', '<!-- noscript-REMOVED //-->')
    return regexes['noscript'].sub(
        '<noscript><!--   REMOVED   //--></noscript>',
        docString
    )

def cleanHtml(docString):
    html = docString
#    html = removeTag(html, 'script', '')
#    html = removeTag(html, 'noscript', '')
#    html = removeTag(html, 'style', '')
    return html

def replaceHtmlForDiv(docString):
    """
    Documents with more than a single <HTML> tag can sometimes cause
    unexpected behaviour on the parser, such as not parsing content that
    is inside an outer <HTML> but outside a nested, inner <HTML> tag.

    This function tries to avoid this by replacing the <HTML> tags for
    <DIV> tags, which the parser can handle without much hassle.

    It is unknown at this point if this might affect the parser in
    identifying the correct encoding by looking at the <meta> tags, since
    it seems it does give special treatment to <HTML> tags.

    The outer <HTML> tags could be preserved, but at this point this just
    generates unnecessary overhead.
    """

    return regexes['html'].sub('<\\1div>', docString)








