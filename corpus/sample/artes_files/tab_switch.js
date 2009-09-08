/**  Seleciona a aba.
 *  
 * Param:
 * 		'tabPrefix' - Prefixo id da aba.
 *		'contentPrefix' - Prifixo id do conteudo da aba, caso exista um para cada aba.
 *		'tabNumber' - Numero da aba a ser selecionada.
 *		'totalTabs' - Numero total de abas.
 * 
 **/

function openBox(tabPrefix, tabNumber, totalTabs) {
	var field = tabNumber;
	var i = 0;
	var totalTabs = parseInt(totalTabs)
	
	$(tabPrefix+tabNumber).className = "open";		
	
	for( i ; i < totalTabs; i++ ) {
		if( i != parseInt(field) ) {
			$(tabPrefix+i.toString()).removeClassName("open");
		} 
	}
}


function switchTab(tabPrefix, contentPrefix, tabNumber, totalTabs) {
	var field = tabNumber;
	var i = 1;
	var totalTabs = parseInt(totalTabs)
	for( i ; i <= totalTabs; i++ ) {
		if( i == parseInt(field) ){
			$(tabPrefix+field).className = "selected";
			$(tabPrefix+field).style.zIndex = totalTabs;
			
			if(contentPrefix != "") {
				$(contentPrefix+field).style.display = "";
			}
			
		} else {
			$(tabPrefix+i.toString()).className = "";
			$(tabPrefix+i.toString()).style.zIndex = totalTabs-i;
			
			if(contentPrefix != "") {
				$(contentPrefix+i.toString()).style.display = "none";
			}
		}
	}				
}

function switchToList(contentId, toListLinkId, toGridLinkId) {
	if(toListLinkId != null) {
		$(toListLinkId).className = "listVitrine selected"	
	}
	if(toGridLinkId != null) {
		$(toGridLinkId).className = "gridVitrine"
	}
	if(contentId != null) {
		$(contentId).className = "productList"
	}
	switchToListAux();
}

function switchToGrid(contentId, toListLinkId, toGridLinkId) {
	if(toListLinkId != null) {
		$(toListLinkId).className = "listVitrine"
	}
	if(toGridLinkId != null) {
		$(toGridLinkId).className = "gridVitrine selected"
	}
	if(contentId != null) {
		$(contentId).className = "productList grid"
	}
	switchToGridAux();
}

function switchToListProt(contentId, toListLinkId, toGridLinkId) {
	if(toListLinkId != null) {
		$(toListLinkId).addClassName('selected');	
	}
	if(toGridLinkId != null) {
		
		$(toGridLinkId).removeClassName('selected');
	}
	if(contentId != null) {
		$(contentId).removeClassName('grid');
	}
	switchToListAux();
}


function switchToGridProt(contentId, toListLinkId, toGridLinkId) {
	if(toListLinkId != null) {
		$(toListLinkId).removeClassName('selected');
	}
	if(toGridLinkId != null) {
		$(toGridLinkId).addClassName('selected');
	}
	if(contentId != null) {
		$(contentId).addClassName('grid');
	}
	switchToGridAux();
}

function switchToListAux() {
	
	if($('pageListTop')) {
	
		//Altera o link da paginacao superior, acrescentando o parametro 'visualization' com valor 'list'
		var pageListTop = $('pageListTop').getElementsByTagName("a");
		
		//Para todos os links
		for (var i=0; i< pageListTop.length; i++) {
			
			//Se ja tiver parametros
		    if(pageListTop[i].href.indexOf("?") >= 0){
		    
		    	//Se tiver o parametro 'visualization=grid', altera para 'visualization=list'
		        if(pageListTop[i].href.indexOf("visualization=grid") >= 0){
					pageListTop[i].href = pageListTop[i].href.substring(0, (pageListTop[i].href.length -18));
					pageListTop[i].href += "visualization=list";
		        }
		        //Se ja tiver o parametro 'visualization=list', mantem o parametro
		        if(pageListTop[i].href.indexOf("visualization=list") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=list' ao link
		        else {
		            pageListTop[i].href += "&visualization=list";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=list' ao link
		    else {
		        pageListTop[i].href += "?visualization=list";
		    }
		}
	}
	
	if($('pageListBotton')) {
		
		//Altera o link da paginacao inferior, acrescentando o parametro 'visualization' com valor 'list'
		var pageListBotton = $('pageListBotton').getElementsByTagName("a")
		
		//Para todos os links
		for (var i=0; i< pageListBotton.length; i++) {
		
			//Se ja tiver parametros
		    if(pageListBotton[i].href.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=grid', altera para 'visualization=list'
		        if(pageListBotton[i].href.indexOf("visualization=grid") >= 0){
					pageListBotton[i].href = pageListBotton[i].href.substring(0, (pageListBotton[i].href.length -18));
					pageListBotton[i].href += "visualization=list";
		        }
		        //Se ja tiver o parametro 'visualization=list', mantem o parametro
		        if(pageListBotton[i].href.indexOf("visualization=list") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=list' ao link
		        else {
		            pageListBotton[i].href += "&visualization=list";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=list' ao link
		    else {
		        pageListBotton[i].href += "?visualization=list";
		    }
		}
	}
	
	if($('ordenacao')) {
		
		//Altera o link da ordenacao, acrescentando o parametro 'visualization' com valor 'list'
		var ordenacao = $('ordenacao').getElementsByTagName("option")
		
		//Para todos os links
		for (var i=0; i< ordenacao.length; i++) {
		
			//Se ja tiver parametros
		    if(ordenacao[i].value.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=grid', altera para 'visualization=list'
		        if(ordenacao[i].value.indexOf("visualization=grid") >= 0){
					ordenacao[i].value = ordenacao[i].value.substring(0, (ordenacao[i].value.length -18));
					ordenacao[i].value += "visualization=list";
		        }
		        //Se ja tiver o parametro 'visualization=list', mantem o parametro
		        if(ordenacao[i].value.indexOf("visualization=list") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=list' ao link
		        else {
		            ordenacao[i].value += "&visualization=list";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=list' ao link
		    else {
		        ordenacao[i].value += "?visualization=list";
		    }
		}
	}
	
	if($('itempp')) {
		
		//Altera o link da quantidade de itens por pagina, acrescentando o parametro 'visualization' com valor 'list'
		var itempp = $('itempp').getElementsByTagName("option")
		
		//Para todos os links
		for (var i=0; i< itempp.length; i++) {
		
			//Se ja tiver parametros
		    if(itempp[i].value.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=grid', altera para 'visualization=list'
		        if(itempp[i].value.indexOf("visualization=grid") >= 0){
					itempp[i].value = itempp[i].value.substring(0, (itempp[i].value.length -18));
					itempp[i].value += "visualization=list";
		        }
		        //Se ja tiver o parametro 'visualization=list', mantem o parametro
		        if(itempp[i].value.indexOf("visualization=list") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=list' ao link
		        else {
		            itempp[i].value += "&visualization=list";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=list' ao link
		    else {
		        itempp[i].value += "?visualization=list";
		    }
		}
	}
}


function switchToGridAux() {
	
	if($('pageListTop')) {
		
		//Altera o link da paginacao superior, acrescentando o parametro 'visualization' com valor 'grid'
		var pageListTop = $('pageListTop').getElementsByTagName("a");
		
		//Para todos os links
		for (var i=0; i< pageListTop.length; i++) {
			
			//Se ja tiver parametros
		    if(pageListTop[i].href.indexOf("?") >= 0){
		    
		    	//Se tiver o parametro 'visualization=list', altera para 'visualization=grid'
		        if(pageListTop[i].href.indexOf("visualization=list") >= 0){
					pageListTop[i].href = pageListTop[i].href.substring(0, (pageListTop[i].href.length -18));
					pageListTop[i].href += "visualization=grid";
		        }
		        //Se ja tiver o parametro 'visualization=grid', mantem o parametro
		        if(pageListTop[i].href.indexOf("visualization=grid") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=grid' ao link
		        else {
		            pageListTop[i].href += "&visualization=grid";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=grid' ao link
		    else {
		        pageListTop[i].href += "?visualization=grid";
		    }
		}
	}
	
	if($('pageListBotton')) {
		
		//Altera o link da paginacao inferior, acrescentando o parametro 'visualization' com valor 'grid'
		var pageListBotton = $('pageListBotton').getElementsByTagName("a")
		
		//Para todos os links
		for (var i=0; i< pageListBotton.length; i++) {
		
			//Se ja tiver parametros
		    if(pageListBotton[i].href.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=list', altera para 'visualization=grid'
		        if(pageListBotton[i].href.indexOf("visualization=list") >= 0){
					pageListBotton[i].href = pageListBotton[i].href.substring(0, (pageListBotton[i].href.length -18));
					pageListBotton[i].href += "visualization=grid";
		        }
		        //Se ja tiver o parametro 'visualization=grid', mantem o parametro
		        if(pageListBotton[i].href.indexOf("visualization=grid") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=grid' ao link
		        else {
		            pageListBotton[i].href += "&visualization=grid";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=grid' ao link
		    else {
		        pageListBotton[i].href += "?visualization=grid";
		    }
		}
	}
	
	if($('ordenacao')) {
		
		//Altera o link da ordenacao, acrescentando o parametro 'visualization' com valor 'grid'
		var ordenacao = $('ordenacao').getElementsByTagName("option")
		
		//Para todos os links
		for (var i=0; i< ordenacao.length; i++) {
		
			//Se ja tiver parametros
		    if(ordenacao[i].value.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=list', altera para 'visualization=grid'
		        if(ordenacao[i].value.indexOf("visualization=list") >= 0){
					ordenacao[i].value = ordenacao[i].value.substring(0, (ordenacao[i].value.length -18));
					ordenacao[i].value += "visualization=grid";
		        }
		        //Se ja tiver o parametro 'visualization=grid', mantem o parametro
		        if(ordenacao[i].value.indexOf("visualization=grid") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=grid' ao link
		        else {
		            ordenacao[i].value += "&visualization=grid";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=grid' ao link
		    else {
		        ordenacao[i].value += "?visualization=grid";
		    }
		}
	}
	
	if($('itempp')) {
		
		//Altera o link da quantidade de itens por pagina, acrescentando o parametro 'visualization' com valor 'grid'
		var itempp = $('itempp').getElementsByTagName("option")
		
		//Para todos os links
		for (var i=0; i< itempp.length; i++) {
		
			//Se ja tiver parametros
		    if(itempp[i].value.indexOf("?") >= 0){
		    	
		    	//Se tiver o parametro 'visualization=list', altera para 'visualization=grid'
		        if(itempp[i].value.indexOf("visualization=list") >= 0){
					itempp[i].value = itempp[i].value.substring(0, (itempp[i].value.length -18));
					itempp[i].value += "visualization=grid";
		        }
		        //Se ja tiver o parametro 'visualization=grid', mantem o parametro
		        if(itempp[i].value.indexOf("visualization=grid") >= 0){}
		        //Se nao tiver o parametro, acrescenta '&visualization=grid' ao link
		        else {
		            itempp[i].value += "&visualization=grid";
		        }
		    }
		    //Se nao tiver parametros, acrescenta '?visualization=grid' ao link
		    else {
		        itempp[i].value += "?visualization=grid";
		    }
		}
	}
}










function ajaxUpdater(container, url, params) {
	var myAjax = new Ajax.Updater(container, url, params);
}