/* U•Near
	*funcao callweb recebe os seguintes parametros
		- cliente = código numérico do cliente
		- departamente = código numérico do departamento
		- setor = código numérico do setor
		- familia = código numérico da familia com as informações referente a familia
		- subfamilia = código numérico com as informações referente a subfamilia
		- item = código numérico do item
		- valor = informações dos valores em formato 9.99
		* a informações serão concatenadas e passadas por header para a aplicação interna da Unear.


	*funcao AjaxWeb, cria a camada de solicitação assincrona do ajax.
		- recebe a url concatenada com as informações recebidas. */

XMLHTTP = function(unearUrlNotify) {

  var _maximumRequestLength = 1500
  var _apiURL = '';
  
  var _unearUrlNotify = unearUrlNotify; // Url de notificação do Uweb

  this.status = null
  this.statusText = null
  this.responseText = null
  this.responseXML = null
  this.synchronous = false
  this.readyState = 0
  
  this.onreadystatechange =  function() { }
  this.onerror = function() { }
  this.onload = function() { }
  
  this.abort = function() {
    _stop = true
    _destroyScripts()
  }
  
  this.getAllResponseHeaders = function() {
    // Returns all response headers as a string
    var result = ''
    for (property in _responseHeaders)
      result += property + ': ' + _responseHeaders[property] + '\r\n'
    return result
  }
  
  this.getResponseHeader = function(name) {
    // Returns a response header value
    // Note, that the search is case-insensitive
    for(property in _responseHeaders) {
      if(property.toLowerCase() == name.toLowerCase())
        return _responseHeaders[property]
    }
    return null
  }
  
  this.overrideMimeType = function(type) {
    _overrideMime = type
  }
  
  this.open = function(method, url, sync, userName, password) {
    // Setting the internal values
    if (!_checkParameters(method, url)) return
    _method = (method) ? method : ''
    _url = (url) ? url : ''
    _userName = (userName) ? userName : ''
    _password = (password) ? password : ''
    _setReadyState(1)
  }
  
  this.openRequest = function(method, url, sync, userName, password) {
    // This method is inserted for compatibility purposes only
    return this.open(method, url, sync, userName, password)
  }
  
  this.send = function(data) {
    if (_stop) return
    var src = _createQuery(data)
    _createScript(_unearUrlNotify)
//    _setReadyState(2)
  }
  
  this.setRequestHeader = function(name, value) {
    // Set the request header. If the defined header
    // already exists (search is case-insensitive), rewrite it
    if (_stop) return
    for(property in _requestHeaders) {
      if(property.toLowerCase() == name.toLowerCase()) {
        _requestHeaders[property] = value; return
      }
    }
    _requestHeaders[name] = value
  }
  
  var _method = ''
  var _url = ''
  var _userName = ''
  var _password = ''
  var _requestHeaders = {
    "HTTP-Referer": document.location,
    "Content-Type": "application/x-www-form-urlencoded"
  }
  var _responseHeaders = { }
  var _overrideMime = ""
  var self = this
  var _id = ''
  var _scripts = []
  var _stop = false
  
  var _throwError = function(description) {
    // Stop script execution and run
    // the user-defined error handler
    self.onerror(description)
    self.abort()
    return false
  }
  
  var _createQuery = function(data) {
    if(!data) data = ''
    var headers = ''
    for (property in _requestHeaders)
      headers += property + '=' + _requestHeaders[property] + '&'
    var originalsrc = _method
    + '$' + _id
    + '$' + _userName
    + "$" + _password
    + "$" + headers
    + '$' + _escape(data)
    + '$' + _url
    var src = originalsrc
    var max =  _maximumRequestLength, request = []
    var total = Math.floor(src.length / max), current = 0
    while(src.length > 0) {
      var query = _apiURL + '?'
      + 'multipart' 
      + '$' + _id
      + '$' + current++
      + '$' + total
      + '$' + src.substr(0, max)
      request.push(query)
      src = src.substr(max)
    }
    if(request.length == 1)
      src = _apiURL + '?' + originalsrc
    else
      src = request
    return src
  }
  
  var _checkParameters = function(method, url) {
    // Check the method value (GET, POST, HEAD)
    // and the prefix of the url (http://)
    if(!method)
      return _throwError('Please, specify the query method (GET, POST or HEAD)')
    if(!url)
      return _throwError('Please, specify the URL')
    if(method.toLowerCase() != 'get' &&
      method.toLowerCase() != 'post' &&
      method.toLowerCase() != 'head')
      return _throwError('Please, specify either a GET, POST or a HEAD method')
    if(url.toLowerCase().substr(0,7) != 'http://')
      return _throwError('Only HTTP protocol is supported (http://)')
    return true
  }

  var _createScript = function(src) {
    if ('object' == typeof src) {
      for(var i = 0; i < src.length; i++)
        _createScript(src[i])
      return
    }
    // Create the SCRIPT tag
    var script = document.createElement('script')
    script.src = src;
    script.type = 'text/javascript'
    if (navigator.userAgent.indexOf('Safari'))
      script.charset = 'utf-8' // Safari bug
    script = document.getElementsByTagName('head')[0].appendChild(script)
    _scripts.push(script)
    return script
  }
  
  var _escape = function(string) {
    // Native escape() function doesn't quote the plus sign +
    string = escape(string)
    string = string.replace('+', '%2B')
    return string
  }
  
  var _destroyScripts = function() {
    // Removes the SCRIPT nodes used by the class
    for(var i = 0; i < _scripts.length; i++)
      if(_scripts[i].parentNode)
        _scripts[i].parentNode.removeChild(_scripts[i])
  }
  
  var _registerCallback = function() {
    // Register a callback variable (in global scope)
    // that points to current instance of the class
    _id = 'v' + Math.random().toString().substr(2)
    window[_id] = self
  }
  
  var _setReadyState = function(number) {
    // Set the ready state property of the class
    self.readyState = number
    self.onreadystatechange()
    if(number == 4) self.onload()
  }
    
  var _parseXML = function() {
      var type = self.getResponseHeader('Content-type') + _overrideMime
      if(!(type.indexOf('html') > -1 || type.indexOf('xml') > -1)) return
      if(document.implementation &&
	      document.implementation.createDocument &&
	      navigator.userAgent.indexOf('Opera') == -1) {
        var parser = new DOMParser()
        var xml = parser.parseFromString(self.responseText, "text/xml")
        self.responseXML = xml
      } else if (window.ActiveXObject) {
        var xml = new ActiveXObject('MSXML2.DOMDocument.3.0')
        if (xml.loadXML(self.responseText))
        	self.responseXML = xml
      } else {
        var xml = document.body.appendChild(document.createElement('div'))
        xml.style.display = 'none'
        xml.innerHTML = self.responseText
        _cleanWhitespace(xml, true)
        self.responseXML = xml.childNodes[0]
        document.body.removeChild(xml)
     }
  }
  
  var _cleanWhitespace = function(element, deep) {
    var i = element.childNodes.length; if(i == 0) return
    do {
      var node = element.childNodes[--i]
      if (node.nodeType == 3 && !_cleanEmptySymbols(node.nodeValue))
        element.removeChild(node)
      if (node.nodeType == 1 && deep)
        _cleanWhitespace(node, true)
    } while(i > 0)
  }

  var _cleanEmptySymbols = function(string) {
    string = string.replace('\r', '')
    string = string.replace('\n', '')
    string = string.replace(' ', '')
  	return (string.length == 0) ? false : true 
  }
 
  this._parse = function(object) {
    // Parse the received data and set all
    // the appropriate properties of the class
    if(_stop) return
    if(object.multipart) return
    if(!object.success)
      return _throwError(object.description)
    _responseHeaders = object.responseHeaders
    this.status = object.status
    this.statusText = object.statusText
    this.responseText = object.responseText
    _parseXML()
    _destroyScripts()
    _setReadyState(4)
  }
    
   _registerCallback()

}

<!--
var req;


//função de camada do Ajax 
function AjaxWeb(url) 
{
	//alert(url);
	xmlhttp = new XMLHTTP(url);
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState==4) 
		{
			// disabled for now
		}
	}
}

//função de recepção de parametros e solicitações
function CallUweb(cliente,departamento,setor,familia,subfamilia,item,valor) 
{
	if(GetCookie('businessObjectId'))
	{
		var businessObjectId = GetCookie('businessObjectId');
		try 
		{	
			if(navigator.appName=="Microsoft Internet Explorer") {
				var url = 'http://uwebamericanas.umail.com.br/NotifyNavigation.ashx?cliente='+cliente+'&departamento='+departamento+'&setor='+setor+'&familia='+familia+'&subfamilia='+subfamilia+'&item='+item+'&valor='+valor+'&businessObjectId='+businessObjectId;
				AjaxWeb(url);
			}
		}
		catch (e)
		{
			//document.write(url);
			//document.write(e);
		}
	}
}
//---------------------------------		Funções Set/Read Cookies	-----------------------------------------------------------------------
function SetCookie(name,value,days, path, domain, secure)
{
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
	document.cookie = name+"="+value+expires+ "; path=/" + path + "; domain=" + domain;
}


// this function gets the cookie, if it exists

function GetCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function DeleteCookie(name)
{
	createCookie(name,"",-1);
}


//---------------------------------		FIM Funções Set/Read Cookies	-----------------------------------------------------------------------
//-->