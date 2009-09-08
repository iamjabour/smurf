//AcessoryTagLogic.java
var adittionalSkus = null;
var value2 = "";
var value1 = "";
function insertValue(field) {
  if(adittionalSkus == null) {
    adittionalSkus = new Array(document.getElementsByName('checkboxAdditionalSku').length);
  }
  if(field.checked) {
    insertSku(field.value);
  } else  {
    removeSku(field.value);
  }
}

function insertSku(sku) {
  //alert('add:'+sku);
  for(i = 0; i < adittionalSkus.length; i++) {
    if(adittionalSkus[i] == null) {
      adittionalSkus[i] = sku;
      break;
    }
  }
}

function removeSku(sku) {
  //alert('rmv:'+sku);
  for(i = 0; i < adittionalSkus.length; i++) {
    if(adittionalSkus[i] == sku) {
      adittionalSkus[i] = null;
      break;
    }
  }
}

function verifySkus() {
  var adittionalSkusStr = '';
  if (adittionalSkus != null) {
    for(i = 0; i < adittionalSkus.length; i++) {
      if(adittionalSkus[i] != null) {
        adittionalSkusStr += (',' + adittionalSkus[i]);
      }
    }
    document.formEscolheSKU.sku.value += adittionalSkusStr;
  }
}

// Validar se a URL nao eh construida por rewrite
function urlValidator() {
	var uri = document.URL;
	for (i=0; i<uri.length-8; i++){
		str = uri.substr(i,8);
		if (str=='begin.do'){
			return true;
		}
		str = uri.substr(i,12);
		if (str=='begin.search'){
			return true;
		}
	}
	return false;
}

// Retornar a url da pagina sem o parametro page
function urlPaginator(page){
	var uri = document.URL;
	var begin = 0;
	var end = 0;
	var occur = 0;
	var exclam = false;
	for (i=0; i<uri.length; i++){
	  if (begin!=0 && end == 0) {
		str = uri.substr(i,1);
		if (str=='&'){
			end = i;
		}
	  } else {
		  str = uri.substr(i,5);
		  if (str=="page="){
			begin = i;
		  } 
	  }
	}
	
	if (begin==0) {
	    url = uri;
	} else if (end==0){
		url = uri.substr(0,begin-1);
	} else {
		url = uri.substr(0,begin);
		url = url+uri.substr(end+1,uri.length);
	}
	for (i=0; i<url.length; i++){
		if (occur == 0) {
			str = url.substr(i,1);
			if (str == "?" || str == "&"){
				occur = i;
				if (str == "?") {
					exclam = true;
				}
			}
		}
	}
	if (occur != 0) {
		if (exclam) {
		    url1 = url.substr(0,occur);
			url2 = url.substr(occur+1, url.length);
			url = url1+page+"&"+url2;
		} else {
			url1 = url.substr(0,occur);
			url2 = url.substr(occur, url.length);
			url = url1+page+url2;
		}
	} else {
		url = url+page;
	}
	return url;
}

//RecommendTagLogic.java
function validate(form1) {
	if (form1.emailTo.value == "") { 
		alert('Por favor, preencha o campo Email do Destinatario.'); 
		document.MM_returnValue = false; 
		return; 
	} 
	else { 
		var val = form1.emailTo.value; 
		var p = val.indexOf('@'); 
        if (p < 1 || p == (val.length-1)) { 
		alert('O campo Email deve conter um endere?o de email.'); 
		document.MM_returnValue = false; 
		return; 
	  } 
	} 
	document.MM_returnValue = true;
}

//FormComentarioTagLogic.java
var linetype = "";
function validate(form) {
	if (form.titulo.value == "") {
		alert("Preencha o campo titulo");
		return false;
	}
	if (form.comentarios.value == "") {
		alert("Preencha o campo comentarios");
		return false;
	}
	if (form.nome.value == "") {
		alert("Preencha o campo nome");
		return false;
	}
	if (form.email.value == "") {
		alert("Preencha o campo email");
		return false;
	}
	if (form.email.value.indexOf("@") < 0) {
		alert("Preencha o campo email corretamente");
		return false;
	}
	if (form.cidade.value == "") {
		alert("Preencha o campo cidade");
		return false;
	}
	if (form.estado.value == "") {
		alert("Selecione o estado");
		return false;
	}
	
	var vazio = true; 
	for(var i = 0; i < form.rating.length; i++){
		if(form.rating[i].checked) {
			vazio = false;
		}
	}
	if(vazio) {
		alert("Voce precisa classificar sua opiniao atraves das estrelas");
		return false;
	}
}

// MenuTagLogic
function submitListaArtista(form) {
	if (form.firstLetter.value != '0') {
		form.submit();
	}
	return;
}

// SkusTagLogic
function sku_validation(formSku) { 
    verifySkus();
    if(!formSku.sku.length){ 
		index = Math.max(formSku.sku.alt.indexOf('110V'),formSku.sku.alt.indexOf('220V')); 
		if(index >= 0) { 
			alt = formSku.sku.alt; 
			voltagem = alt.substring(index, (index+4)); 
			if(confirm('O produto escolhido so funciona em ' + voltagem + '. Colocar na sacola?')){ 
				formSku.submit();
			}
		} else { 
			formSku.submit();
		} 
        return; 
    } 
    if(formSku.sku.length > 0){ 
        for(i=0; i < formSku.sku.length; i++ ){ 
            if(formSku.sku[i].checked){ 
				index = Math.max(formSku.sku[i].alt.indexOf('110V'),formSku.sku[i].alt.indexOf('220V')); 	
				if(index >= 0) { 
					alt = formSku.sku[i].alt; 
					voltagem = alt.substring(index, (index+4)); 
					if(confirm('O produto escolhido so funciona em ' + voltagem + '. Colocar na sacola?')){ 
						formSku.submit();
					}
				} else { 
					formSku.submit();
				} 
                return; 
            } 
        } 
    } 
    alert('Por favor escolha um item para Colocar na Sacola'); 
    return false; 
    return; 
}

// WarrantyTagLogic
function setExtndWarranty(formSku, formWarranty){
	var skuId = formSku.sku[0].value;
	for(i=0; i < formSku.sku.length; i++) {
		if(formSku.sku[i].checked){
			skuId = formSku.sku[i].value;
		}
	}
	if(formWarranty.tagName == 'FORM') {
		var garantiaEstendida = formWarranty.garantiaEstendida.value;
		formWarranty.sku.value = skuId + ',' + garantiaEstendida;
	}
	else {
		for(i=0; i < formWarranty.length; i++){
			var garantiaEstendida = formWarranty[i].garantiaEstendida.value;
			formWarranty[i].sku.value = skuId + ',' + garantiaEstendida; 
		}
	}
}

// ShowProductPictureTagLogic
function setImage(thumbName){
	document.mainImage.src = thumbName;
}

// ProductViewPhotosTagLogic

var qtdeImages;
var aryImages;
var baseUrlProductView;
function loadProductPictures(arrayImages, baseUrl) {
	qtdeImages = arrayImages.length;
	aryImages = arrayImages;
	baseUrlProductView = baseUrl;

	for (i=0; i < aryImages.length; i++) {
		var preload = new Image();
		preload.src = aryImages[i];
	}
	if (qtdeImages > 1)
		swap(0);
}

function swap(imgIndex) {
	if (qtdeImages > 1) {
		reset_setas();
		if (imgIndex == aryImages.length-1) {
			document['seta_next'].src = '' + baseUrlProductView + 'img/nextImageOff.gif';
		}
		if(imgIndex == 0) {
			document['seta_prev'].src = '' + baseUrlProductView + 'img/prevImageOff.gif';
		}
		document['imgMain'].src = aryImages[imgIndex];
		
	} else {
		document['imgMain'].src = aryImages[imgIndex];
	}
}

function reset_setas() {
	document['seta_prev'].src = '' + baseUrlProductView + 'img/prevImageOn.gif';
	document['seta_next'].src = '' + baseUrlProductView + 'img/nextImageOn.gif';
}

function swap_next() {
	for (i=0; i<aryImages.length-1; i++) {
		if (document['imgMain'].src == aryImages[i]) {
			swap(i+1);
			break;
		}
	}
}
            
function swap_previous() {
	for (i=1; i<aryImages.length; i++) {
		if (document['imgMain'].src == aryImages[i]) {
			swap(i-1);
			break;	
		}
	}
}


function getParameter( parameterName ) {
		var queryString = window.top.location.search.substring(1);


		var parameterName = parameterName + "=";
		if ( queryString.length > 0 ) {

			begin = queryString.indexOf ( parameterName );

			if ( begin != -1 ) {
				begin += parameterName.length;

				end = queryString.indexOf ( "&" , begin );

				if ( end == -1 ) {
					end = queryString.length
				}

				// Return the string
				return unescape ( queryString.substring ( begin, end ) );
			}


		}

}


function initSearchSelect() {
	var departmentId = getParameter( 'departmentId' );

	for(i = 0; i < document.getElementById("searchSelect").options.length; i++) {

		if(document.getElementById("searchSelect").options[i].value == departmentId) {

			document.getElementById("searchSelect").options[i].selected = true;
		}


	}
}

function init(){
	initSearchSelect();
}


// Suba
function subaUrl(url) {
	//window.location.href = url;
	parent.location = url;
}

// OutOfStock
function submitOutOfStockForm2() {
	if (document.getElementById('name').value == '') {
		alert('Por favor preencha o nome.');
	} else if (document.getElementById('email').value == '') {
		alert('Por favor preencha o e-mail.');
	} else {
		document.oosForm.submit();
	}
}

// Validacao Forms
function isEmpty(field){

	if(field.value == '' ||
	   field.value == 0 ||
       trimAll(field.value).length < 1){

		return true;

	}

    return false;

}

function isAcomProd(){
	var uri = document.URL;
	for (i=0; i<uri.length; i++){
	  str = uri.substr(i,8);
	  if (str=="AcomProd"){
		return true;
	  } 
	}
	return false;
}

function isAcomLine(){
	var uri = document.URL;
	for (i=0; i<uri.length; i++){
	  str = uri.substr(i,8);
	  if (str=="AcomLine"){
		return true;
	  } 
	}
	return false;
}

function isEmail(s)
{
    
    var filter=/^[A-Za-z][A-Za-z0-9_\.]*@[A-Za-z0-9_]+\.[A-Za-z0-9_.]+[A-za-z]$/;

        if (filter.test(s)){
            return true;
        }else{

            return false;
        }
}

function trimAll(sString)
{
    while (sString.substring(0,1) == ' '){
        sString = sString.substring(1, sString.length);
    }

    while (sString.substring(sString.length-1, sString.length) == ' '){
        sString = sString.substring(0,sString.length-1);
    }

    return sString;
}


function $name(name){
    return document.getElementsByName(name)[0];
}

function validateMailMarketing(formName){
    
    var emailIsIncorrect = false;
    var withoutValue = false;

    form = $name(formName);
    for(i = 0; i < form.elements.length; i++){
        element = form.elements[i];
        var validation = element.name;

        if (validation.indexOf('email') != -1) {
            if(!isEmail(element.value)){
                emailIsIncorrect= true; 
            }
        }
        msgNumber = element.id.charAt((element.id.length - 1));
        validationLength = validation.substring(validation.length - 2, validation.length - 1);
        if(isEmpty(element) || element.value.length < validationLength){
	     withoutValue = true;
        }
    }

    if(emailIsIncorrect){
        alert('Formato de e-mail incorreto.');		
        return;
    } else if (withoutValue){
        alert('Ainda existem campos para serem preenchidos.');
        return;
    }
    form.submit();
}

function validateComment2(formName){
    
    var emailIsIncorrect = false;
    var withoutValue = false;

    form = $name(formName)
    for(i = 0; i < form.elements.length; i++){
        element = form.elements[i];
        var validation = element.name;

        if(((validation.indexOf('replyTo') != -1 || validation.indexOf('email') != -1)) && validation.indexOf('mostra_email') == -1){
            if(!isEmail(element.value)){
                emailIsIncorrect= true; 
            }
        }
        msgNumber = element.id.charAt((element.id.length - 1));
        validationLength = validation.substring(validation.length - 2, validation.length - 1);
        if(isEmpty(element) || element.value.length < validationLength){
	     withoutValue = true;
        }
    }

    if(emailIsIncorrect){
        alert('Formato de e-mail incorreto.');		
        return;
    }else if (withoutValue){
        alert('Ainda existem campos para serem preenchidos.');
        return;
    }

    form.submit();
}
var value2 = "";

function setValue(id, element){
	$(id).value = element.value;
}

function submitOutOfStockForm(){

	var form = $name('oosForm');
	for(var i=0; i < form.elements.length; i++){
		var elementAux = form.elements[i];

		if( (elementAux.name).indexOf('email') != -1 ){
	
			if( !isEmail(elementAux.value)){
				alert('Preencha seu e-mail corretamente.');
				return;
			}
		}
	
		if( (elementAux.name).indexOf('skuId') != -1 ){
			if( elementAux.value == null || elementAux.value == '' || elementAux.value == 'UNDEFINED' ){
				alert('Preencha todos os campos.');
				return;
			}
		}
	
		if( (elementAux.name).indexOf('name') != -1 ){
	
			if( elementAux.value == null || elementAux.value == '' || elementAux.value == 'UNDEFINED'){
				alert('Preencha seu nome corretamente.');
				return;
			}
		}	
	}
	document.oosForm.submit();
}

// URL utilizada na busca de palavras sugeridas
function urlSearchConstructor(parametro){
	var URL = "http://www.americanas.com.br/busca/";
	URL = URL + parametro;
	location.href = URL; 
}

function urlConstructorBookSearch(input){
	var URL = null;
	URL = "http://www.americanas.com.br/busca/1472/";
	if (input.tagName == "INPUT"){  
		if (input.type = "text") {
			parametro = input.value;
			if (parametro.indexOf(" ") != -1){
   				parametro =parametro.replace(" ","%20");
   			}
   			URL = URL + parametro;
  		} 
 	}   
 	location.href = URL; 
 	document.returnValue = false; 
 	return;
}

// Funcao que monta a URL correta dependendo dos itens selecionados.
// No form, eh resgatado o valor do campo select e a URL eh montada baseada nesse valor, e a URL eh montada 
// juntando o item selecionado e o valor do campo text preenchido pelo usuario.

function urlRedirector(form){
 var objectTextIndex = 0;
 var objectTextName = null;
 var parametro = null;
 var URL = form.action;
 var element = null; 

 for (i = 0; i< form.elements.length; i++){ 

  element = form.elements[i];
  parametro = "";

  if (element.type == "select-one"){
   objectTextName = element.options[element.selectedIndex].value;
   parametro = "&" + parametro + objectTextName + "=" + form.elements[objectTextIndex].value;
  } 
  else {

   if (element.type == "text"){  
    objectTextIndex = i;
   }
   else{  
    if (element.tagName != "FIELDSET")
    parametro = "&" + parametro + element.name + "=" + element.value;    
   }
  }  

  URL = URL + parametro;

 }

 location.href = URL  
 document.returnValue = false; 
 return;

}


// Limpar os campos de um determinado componente.
function cleanField(field){
 field.value = "";
}

//Retornar a url de busca em produtos sugeridos. 
function searchUrl2(form){
	var objectTextIndex = 0;
	var objectTextName = null;
	var parametro = null;
	var parametros = "";
	var element = null;
	var parametro = "";
	var url ="";
	bPrimeiroTermo = true;
	for (i = 0; i< form.elements.length; i++){
		element = form.elements[i];
		parametro = "";
		if (bPrimeiroTermo == false){
			parametro = parametro + "+";
		}
		if (element.type == "select-one"){
			objectTextName = element.options[element.selectedIndex].value;
			parametro = parametro + objectTextName;
			bPrimeiroTermo = false;
		}
		parametros = parametros + parametro;
	}
	url = getSearchURL(parametros);
	location.href = url;
	document.returnValue = false;
	return;
}

//Retornar a url com o novo parametro da query com rewrite
function getUrlQueryRewrite(newValue){
	var uri = document.URL;
	var begin = 0;
	for (i=0; i<uri.length; i++){
	  str = uri.substr(i,1);
	  if (str=="/"){
		begin = i;
	  }
	}
	if (begin==0) {
		url = uri;
	} else {
		url = uri.substr(0,begin);
	}
	url = url+"/"+newValue;
	return url;
}

//Retornar a url com o novo parametro da query
function getUrlQuery(newValue){
	var uri = document.URL;
	var begin = 0;
	var end = 0;
	var queryValue = 'query';
	for (i=0; i<uri.length; i++){
	  if (begin!=0 && end == 0) {
		str = uri.substr(i,1);
		if (str=='&'){
			end = i;
		}
	  } else {
		  str = uri.substr(i,6);
		  if (str=="query="){
			begin = i;
			queryValue = str;
		  } else {
			str = uri.substr(i,10);
			if (str=="queryName="){
				begin = i;
				queryValue = str;
			} else if (str=="queryIsbn="){
				begin = i;
				queryValue = str;
			} else {
				str = uri.substr(i,13);
				if (str=="queryArtists="){
					begin = i;
					queryValue = str;
				} else {
					str = uri.substr(i,15);
					if (str=="queryPublisher="){
						begin = i;
						queryValue = str;
					}
				}
			}
		  }  
	  }
	}
	if (begin==0) {
		url = uri;
	} else if (end==0){
		url = uri.substr(0,begin-1);
	} else {
		url = uri.substr(0,begin);
		url = url+uri.substr(end+1,uri.length);
	}
	url=url+'&'+queryValue+newValue;
	return url;
}

//Retornar a URL da busca
function getSearchURL(newValue) {
	if (urlValidator()) {
		return getUrlQuery(newValue);
	} else {
		return getUrlQueryRewrite(newValue);
	}

}



function validateSearchURL(){
	if (document.sortingForm.order.value=='') {
		location.href = removePage(removeOrder());
		document.returnValue = false;
	} else {
		document.sortingForm.submit();
	}
}

function removePage(uri){
	var begin = 0;
	var end = 0;
	var occur = 0;
	var exclam = false;
	for (i=0; i<uri.length; i++){
	  if (begin!=0 && end == 0) {
		str = uri.substr(i,1);
		if (str=='&'){
			end = i;
		}
	  } else {
		  str = uri.substr(i,5);
		  if (str=="page="){
			begin = i;
		  } 
	  }
	}
	
	if (begin==0) {
	    url = uri;
	} else if (end==0){
		url = uri.substr(0,begin-1);
	} else {
		url = uri.substr(0,begin);
		url = url+uri.substr(end+1,uri.length);
	}
	return url;
}

function removeOrder(){
	var uri = document.URL;
	var begin = 0;
	var end = 0;
	var occur = 0;
	var exclam = false;
	for (i=0; i<uri.length; i++){
	  if (begin!=0 && end == 0) {
		str = uri.substr(i,1);
		if (str=='&'){
			end = i;
		}
	  } else {
		  str = uri.substr(i,6);
		  if (str=="order="){
			begin = i;
		  } 
	  }
	}
	
	if (begin==0) {
	    url = uri;
	} else if (end==0){
		url = uri.substr(0,begin-1);
	} else {
		url = uri.substr(0,begin);
		url = url+uri.substr(end+1,uri.length);
	}
	return url;
}

function getSectorId(url){
        if (url != null && url != "undefined") {
		var value = '';
		for (i=0; i<url.length; i++){
			str = url.substr(i,1);
			if (str!='&' && str!='?'){
				value=value+str;
			} else {
			   break;
			}
		}
		return value;
	}
	return url;
}


// Funcoes necessarias para o Auto Complete da Busca
var timerId = 0;
var m3_u = (location.protocol == 'https:' ? 'https://'+getHost() : 'http://'+getHost()); 
var basicUrl = m3_u + "/B2WAutoComplete";  
var lastParam = ""; 

function search(param) {
	clearTimeout (timerId);	
	timerId = setTimeout("effectiveSearch('"+param+"')", 500);

}
            
function effectiveSearch(param) {
	var qty = 10; 
	param = param.replace(/^\s+|\s+$/g,""); 
	if (param.length > 3){ 
		if (lastParam == param) {
			return;
		} else {
			lastParam = param;
		} 
		if (!qty){
			qty = 10;
		} 
		var url = basicUrl + "/AutoComplete?word="+encodeURIComponent(param)+"&qty="+qty+""; 
		new Ajax.Request(url, {
			method: 'get',onSuccess: 
			function(transport) {
				var json = transport.responseText.evalJSON(); 
				if (json) {
					var suggestions = json.autocomplete;
					if (!$$('#results>ul.searchResultList')) {
						ulResults = new Element("ul", {"class":"searchResultList"});
						$('results').update(ulResults);
					}
					if (suggestions) {
						if (suggestions.length>0){
							$('results').style.display = 'block';
							for (itx=0; itx<suggestions.length; itx++) {
								$$('#results>ul.searchResultList')[0].innerHTML += "<li>" + suggestions[itx] + '</li>';
							}
						}else{
							$$('#results>ul.searchResultList')[0].innerHTML = '';
							$('results').style.display = 'none';
							lastParam = '';
						}}
					}
				}
			}
		);
	} else {
		$$('#results>ul.searchResultList')[0].innerHTML = '';
		$('results').style.display = 'none';
		lastParam = '';
	}
}

function getHost() {
	var url = window.location.href;	
	var host = url.split('//')[1];	
	url = host.split('/');
	host = url[0];
	return host;
}

// CARRINHO NO TOPO

dateNow = new Date()
hourNow = dateNow.getHours()

if (hourNow < 12)
	greeting = "Bom dia";
else
	if (hourNow < 18)
		greeting = "Boa tarde";
	else
		greeting = "Boa noite";

function headerSaudacao(){
         document.getElementById("saudacao").innerHTML= greeting;
}

var w3cookies = {
	date: new Date(),
	// Cria o(s) cookie(s)
	// Forma de uso: w3cookies.create('nome_do_cookie','valor',dias_para_expirar);
	create: function(strName, strValue, intDays) {
			if ( intDays ) {
				this.date.setTime(this.date.getTime()+(intDays*24*60*60*1000));
				var expires = "; expires=" + this.date.toGMTString();
			} else {
				var expires = "";
			}
			document.cookie = strName + "=" + strValue + expires + "; path=/";
		},
	// Ler as informações de um cookie em específico
	// Forma de uso: w3cookies.read('nome_do_cookie');
	//verifica se existe se o cookie carrinho_topo existe
	read: function(strName) {
		var strNameIgual = strName + "=";
		var arrCookies = document.cookie.split(";");
		for ( var i = 0, strCookie; strCookie = arrCookies[i]; i++ ) {
			while ( strCookie.charAt(0) == " ") {
				strCookie = strCookie.substring(1,strCookie.length);
			}
			
			if ( strCookie.indexOf(strNameIgual) == 0 ) {
				return strCookie.substring(strNameIgual.length,strCookie.length);
			}
		}
		return null;
	},
	// Delete um cookie desejado
	// Forma de uso: w3cookies.erase('nome_do_cookie');
	erase: function(strName) {
		this.create(strName,"",-1);
	}
}

//verifica se existe se o cookie carrinho_topo existe
if(w3cookies.read('carrinho_topo')!=null){
	valueCookie = w3cookies.read('carrinho_topo'); // le o coookie carrinho_topo completo e grava na variavel value
	value1 = valueCookie.split('|',1); //aqui pego o primeiro valor correspondente ao nome OBS: função split divide uma string a onde achar o caracter "/"
	valorbarra = valueCookie.indexOf("|",valueCookie);
	tamanhototal = valueCookie.length;
	value2 = valueCookie.substring(valorbarra + 1, tamanhototal); //
	if(value2=='')value2="0";
}
if(value2<2){
	imprima = " Item";
}else{
	imprima = " Itens";
}

function carregar_camada() {
    if(value1 != null && value1 != ''){
    	 if (value1[0] != null){
    	 	valueFormatted = value1[0];
    	 }else{
    	 	valueFormatted = value1;
    	 }
    	 if (valueFormatted.length!=null && valueFormatted.length>15){
    	 	var ind = valueFormatted.indexOf(" ");
    	 	if (ind > 15 || ind < 1){
    			ind = 15;
    		}
    		document.getElementById("nome").innerHTML= valueFormatted.substring(0,ind);
    	 }
    	 else{ 
            	document.getElementById("nome").innerHTML= valueFormatted;
    	 }
        }
    document.getElementById("itens_sacola").innerHTML= value2 + imprima;
}