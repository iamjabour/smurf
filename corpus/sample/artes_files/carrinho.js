/**
 * Totalization properties
 */
var subTotal = 0;
var numSelectedItems = 0;

/**
 * Constants
 */
var URL_CARRINHO = 'http://www2.submarino.com.br/Basket.aspx?act=add';

/**
* Alterei a funcao para receber um mapa de info extras .
* para como por exemplo info de departamento e se o produto tem ou nao garantia extendida
*
* No caso de enviar vários produtos para o carrinho nao faz sentido ir para tela de garantia
sendo assim não é necessário passar o paramento "info"
* &prodTypeId
* &warranty
*/
function redirectCarrinho(productId, info) {
	if(productId != null || productId != '') {
		var url = URL_CARRINHO;
		var params = '&ProdId=' + productId;
		
		//no  warranty pode ser o id do produto, indicado que possui garantia
		if(info != null && info.warranty ==true && info.prodTypeId !=null) {			
			url = EXTENDED_WARRANTY_URL;
			var prodTypeId = info.prodTypeId;
			params = "?ProductTypeId=" + prodTypeId + "&ProductId=" + productId;
		}

		window.location = url + params;
	}
}

function addCookieMeuSub(productId, menuId) {

	if (window.meusubacomponent != undefined) {
		if(productId != null || productId != '') {
			meusubatracking.addBasketProduct(productId, menuId);
		}
	}	
	
}

function addProductsCarrinho(productList, menuId) {
	token = '#';
	if (productList != null) {
	
		arrayIds = productList.split(token);
		
		for(i = 0; i < arrayIds.length; i++) {
			addCookieMeuSub(arrayIds[i], menuId);
		}

		productList = productList.substring(0, productList.length);
		while (productList.indexOf(token) != -1) {		
			 productList = productList.replace(token, ',');
		}

		redirectCarrinho(productList);
	}
}

function formExists(form) {
	return ! ( (! form) || (! form.elements) );
}

function getSku(formId, prodId){
	var form = $(formId);
	// sem form de sku
	if(! formExists(form)) return prodId;
	
	var elements = form.elements;
	var options = new Array();
	for(var i = 0; i < elements.length; i++){
		var element = elements[i];
		if(element.type == 'select-one'){
			var select = element;
			if(select.options.length > 0){
				var option = select.options[select.selectedIndex];
				options.push(option.value);
			}
		}
	}
	
	if($('listColors') != null) {
		var lis = $('listColors').getElementsByTagName('li');
		for(var i1 = 0 ; i1 < lis.length ; i1++ ) {
			if (lis[i1].className.search(/selected/) != -1) {
				options.push(lis[i1].id);
			}
		}
	}
	
	if(options.length > 0){
		var result = options[0];
		if(options.length > 1){
			var array1 = result.split(' ');
			for(var i = 1; i < options.length; i++){
				if(options[i] != null){
					var array2 = options[i].split(' ');
					array1 = intersection(array1,array2);
				}
			}
			if(array1.length = 1)
				result = array1[0];
		}		
		if(result != null)
			return result;
	}
	return prodId;
}

function intersection(array1, array2){
	var result = new Array();
	for(var i = 0; i < array1.length; i++){
		for(var j = 0; j < array2.length; j++){
			if(array1[i] == array2[j]){
				result.push(array2[j]);
			}
		}
	}
	return result;
}

/**
 * Garantia Extendida
 */

var EXTENDED_WARRANTY_URL = 'http://www2.submarino.com.br/SubServices.aspx';

function hasExtendedWarranty(prodId) {
	var extendedWarrantyProducts = getExtendedWarrantyArray();
	
	if((! extendedWarrantyProducts)) {
		return false;
	}
	
	for(var i=0; i < extendedWarrantyProducts.length; i++) {
		var line = extendedWarrantyProducts[i];
		if(isExtendedWarranty(line, prodId)) {
			return true;
		}
	}
	
	return false;
}

function isExtendedWarranty(line, prodId) {
	var product_warranty = line.split('^');
	
	var product = trim(product_warranty[0]);
	var warranty = trim(product_warranty[1]);
	
	if(product == prodId && warranty == "true") {
		return true;
	}
	
	return false;
}

function trim(str) {
	return str.replace(/^\s+|\s+$/g, '');
}

function getExtendedWarrantyArray() {
	var elements = document.getElementsByTagName("input");
	if(! elements) {
		return false;
	}
	
	var products = new Array();
	
	if(! elements.length) {
		if(isExtWarrantyElement(elements)) {
			products.push(elements.value);
			return products;
		}
	}
	
	for(var i =0; i < elements.length; i++) {
		var element = elements[i];
		if(isExtWarrantyElement(element)) {
			products.push(element.value);
		}
	}
	
	return products;
}

function isExtWarrantyElement(element) {
	if(element.type == "hidden" && element.name == "extWarrantyProds") {
		return true;
	}
	return false;
}

/*
*@deprecated
*/
function getProdTypeId() {
	var elements = document.getElementsByTagName("input");
	if(! elements) {
		return false;
	}
	
	if(! elements.length) {
		if(isProdTypeId(elements)) {
			return elements.value;
		}
	}
	
	for(var i =0; i < elements.length; i++) {
		var element = elements[i];
		if(isProdTypeId(element)) {
			return element.value;
		}
	}
	
	return false;
}
/*
*@deprecated
*/
function isProdTypeId(element) {
	if(element.type=="hidden" && element.name=="extWarrantySubaDepartmentId") {
		return true;
	}
	return false;
}