window.onload = function() {


		if (typeof( window['existMenuFile'] ) != "undefined") {
		    initMenu();
		}

		if (typeof( window['existPopupFile'] ) != "undefined") {
		    //initPopupLinks();
		}

		if (typeof( window['existPresentListFile'] ) != "undefined" && $("subMenuListaPresente")) {
		    showPresentList();
		}


// Pascoa 2008 	
		
		if (typeof( window['menuPascoa2008'] ) != "undefined" && $("menuPrecoPascoa")) {
		    showPrecoPascoa();
		}
		
		
		if (typeof( window['menuPascoa2008'] ) != "undefined" && $("menuPesoPascoa")) {
		    showPesoPascoa();
		}
		
		
		if (typeof( window['menuPascoa2008'] ) != "undefined" && $("menuNumeroPascoa")) {
		    showNumeroPascoa();
		}
		
		if (typeof( window['menuPascoa2008'] ) != "undefined" && $("menuTipoPascoa")) {
		    showTipoPascoa();
		}
		
		
		if (typeof( window['menuPascoa2008'] ) != "undefined" && $("menuNomePascoa")) {
		    showNomePascoa();
		}
		
	
		
		
    // **************************************************************************************	
  

		if (typeof( window[ 'existOpenLinkClosePopup' ] ) != "undefined") {
		    getLinks_openLinkClosePopup();
		}

		if (typeof( window[ 'existVideoPopup' ] ) != "undefined") {
		    videoPopup();
		}

		if (typeof( window[ 'existFocus' ] ) != "undefined") {
		    windowFocus();
		}

		var page = "all";
		if (page) {
			pecaJa();
		}

		if (document.getElementsByTagName) { 
// Get all the tags of type object in the page. 
var objs = document.getElementsByTagName("object"); 
for (i=0; i<objs.length; i++) { 
// Get the HTML content of each object tag 
// and replace it with itself. 
objs[i].outerHTML = objs[i].outerHTML; 
} 
} 


} 


window.onunload = function() { 

	if (document.getElementsByTagName) { 

		//Get all the tags of type object in the page. 

		var objs = document.getElementsByTagName("object"); 

		for (i=0; i<objs.length; i++) { 

			// Clear out the HTML content of each object tag 

			// to prevent an IE memory leak issue. 

			objs[i].outerHTML = ""; 
	
		} 

	} 

}


