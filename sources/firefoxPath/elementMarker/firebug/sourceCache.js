/* See license.txt for terms of usage */

FBL.ns(function() { with (FBL) {

// ************************************************************************************************
// Constants

const Cc = Components.classes;
const Ci = Components.interfaces;
const nsIIOService = Ci.nsIIOService;
const nsIRequest = Ci.nsIRequest;
const nsICachingChannel = Ci.nsICachingChannel;
const nsIScriptableInputStream = Ci.nsIScriptableInputStream;
const nsIUploadChannel = Ci.nsIUploadChannel;
const nsIHttpChannel = Ci.nsIHttpChannel;

const IOService = Cc["@mozilla.org/network/io-service;1"];
const ioService = IOService.getService(nsIIOService);
const ScriptableInputStream = Cc["@mozilla.org/scriptableinputstream;1"];
const chromeReg = CCSV("@mozilla.org/chrome/chrome-registry;1", "nsIToolkitChromeRegistry");

const LOAD_FROM_CACHE = nsIRequest.LOAD_FROM_CACHE;
const LOAD_BYPASS_LOCAL_CACHE_IF_BUSY = nsICachingChannel.LOAD_BYPASS_LOCAL_CACHE_IF_BUSY;

const NS_BINDING_ABORTED = 0x804b0002;

// ************************************************************************************************

Firebug.SourceCache = function(window, context)
{
    this.window = window;
    this.context = context;
    this.cache = {};
};

Firebug.SourceCache.prototype =
{
	isCached: function(url)
	{
		return this.cache.hasOwnProperty(url);
	},
	
    loadText: function(url, method, file)
    {
        var lines = this.load(url, method, file);
        return lines ? lines.join("\n") : null;
    },

    load: function(url, method, file)
    {
        if ( this.cache.hasOwnProperty(url) )
            return this.cache[url];

        var d = FBL.splitDataURL(url);  //TODO the RE should not have baseLine
        if (d)
        {
            var src = d.encodedContent;
            var data = decodeURIComponent(src);
            var lines = data.split(/\r\n|\r|\n/);
            this.cache[url] = lines;

            return lines;
        }

        var j = FBL.reJavascript.exec(url);
        if (j)
        {
            var src = url.substring(FBL.reJavascript.lastIndex);
            var lines = src.split(/\r\n|\r|\n/);
            this.cache[url] = lines;

            return lines;
        }

        var c = FBL.reChrome.test(url);
        if (c)
        {
            if (Firebug.filterSystemURLs)
                return;  // ignore chrome

            var chromeURI = ioService.newURI(url, null, null);
            var localURI = chromeReg.convertChromeURL(chromeURI);
            return this.loadFromLocal(localURI.spec);
        } 
         
        c = FBL.reFile.test(url);
        if (c)
        {
        	return this.loadFromLocal(url);
        }

        // Unfortunately, the URL isn't available so, let's try to use FF cache. 
        // Notice that additional network request to the server can be made in 
        // this method (double-load).
        return this.loadFromCache(url, method, file);
    },

    loadFromLocal: function(url)
    {
        // if we get this far then we have either a file: or chrome: url converted to file:
        var src = getResource(url);
        if (src)
        {
        	var lines = src.split(/\r\n|\r|\n/);
            this.cache[url] = lines;

            return lines;
        }  
    },
    
    loadFromCache: function(url, method, file)
    {
        var doc = this.context.window.document;
        if (doc)
            var charset = doc.characterSet;
        else
            var charset = "UTF-8";

        var channel;
        try
        {
            channel = ioService.newChannel(url, null, null);
            channel.loadFlags |= LOAD_FROM_CACHE | LOAD_BYPASS_LOCAL_CACHE_IF_BUSY;

            if (method && (channel instanceof nsIHttpChannel))
            {
                var httpChannel = QI(channel, nsIHttpChannel);
                httpChannel.requestMethod = method;
            }
        }
        catch (exc)
        {
            return;
        }

        if (url == this.context.browser.contentWindow.location.href)
        {
            if (channel instanceof nsIUploadChannel)
            {
                var postData = getPostStream(this.context);
                if (postData)
                {
                    var uploadChannel = QI(channel, nsIUploadChannel);
                    uploadChannel.setUploadStream(postData, "", -1);
                }
            }

            if (channel instanceof nsICachingChannel)
            {
                var cacheChannel = QI(channel, nsICachingChannel);
                cacheChannel.cacheKey = getCacheKey(this.context);
            }
        }
        else if ((method == "PUT" || method == "POST") && file)
        {
            if (channel instanceof nsIUploadChannel)
            {
                // In case of PUT and POST, don't forget to use the original body.
                var postData = getPostText(file, this.context);
                if (postData)
                {
                    var postDataStream = getInputStreamFromString(postData);
                    var uploadChannel = QI(channel, nsIUploadChannel);
                    uploadChannel.setUploadStream(postDataStream, "application/x-www-form-urlencoded", -1);
                }
            }
        }

        var stream;
        try
        {
            stream = channel.open();
        }
        catch (exc)
        {
            return ["sourceCache.load FAILS for url="+url, exc.toString()];
        }

        try
        {
            var data = readFromStream(stream, charset);
            var lines = data.split(/\r\n|\r|\n/);
            this.cache[url] = lines;
            return lines;
        }
        catch (exc)
        {
            return ["sourceCache.load FAILS for url="+url, exc.toString()];
        }
        finally
        {
            stream.close();
        }
    },

    store: function(url, text)
    {
        var lines = splitLines(text);
        return this.storeSplitLines(url, lines);
    },
    
    storeSplitLines: function(url, lines)  
    {
    	return this.cache[url] = lines;
    },

    invalidate: function(url)
    {
        delete this.cache[url];
    },

    getLine: function(url, lineNo)
    {
        var lines = this.load(url);
        if (lines)
        {
        	if (lineNo <= lines.length)
        		return lines[lineNo-1];
        	else
        		return (lines.length == 1) ? lines[0] : "("+lineNo+" out of range "+lines.length+")";
        }
        else
        	return "(no source for "+url+")";
    }
};

// xxxHonza getPostText and readPostTextFromRequest are copied from
// net.js. These functions should be removed when this cache is
// refactored due to the double-load problem.
function getPostText(file, context)
{
    if (!file.postText)
        file.postText = readPostTextFromPage(file.href, context);

    if (!file.postText)
        file.postText = readPostTextFromRequest(file.request, context);

    return file.postText;
}

// ************************************************************************************************

function getPostStream(context)
{
    try
    {
        var webNav = context.browser.webNavigation;
        var descriptor = QI(webNav, Ci.nsIWebPageDescriptor).currentDescriptor;
        var entry = QI(descriptor, Ci.nsISHEntry);

        if (entry.postData)
        {
            // Seek to the beginning, or it will probably start reading at the end
            var postStream = QI(entry.postData, Ci.nsISeekableStream);
            postStream.seek(0, 0);
            return postStream;
        }
     }
     catch (exc)
     {
     }
}

function getCacheKey(context)
{
    try
    {
        var webNav = context.browser.webNavigation;
        var descriptor = QI(webNav, Ci.nsIWebPageDescriptor).currentDescriptor;
        var entry = QI(descriptor, Ci.nsISHEntry);
        return entry.cacheKey;
     }
     catch (exc)
     {
     }
}

function doublePostForbiddenMessage(url)
{
    var msg = "Firebug needs to POST to the server to get this information for url: "+url+"\n";
    msg += " This second POST can interfere with some sites.\n"
    msg += " If you want to send the POST again, open a new tab in Firefox, use URL 'about:config', ";
    msg += "set boolean value 'extensions.firebug.allowDoublePost' to true\n";
    msg += " This value is reset every time you restart Firefox\n";
    msg += " This problem will disappear when https://bugzilla.mozilla.org/show_bug.cgi?id=430155 is shipped\n";

    return msg.split('\n');
}

// ************************************************************************************************

}});
