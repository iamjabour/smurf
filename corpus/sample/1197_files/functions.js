function goURLfromPopup(nome, url, closePopup) {			

	window.self.name = nome;
	window.opener.location.href = url;
	if (closePopup) {
		self.close();
	}
	
}

function windowFocus() {
	window.focus();
}

function submitSearchForm() {

	/* Versao q manda a busca para a busca OPN */
	var url = "http://www.americanas.com.br/cgi-bin/WebObjects/buscaopn.woa/wa/busca?";
	for(i = 0; i < document.getElementById("searchSelect").options.length; i++) {

		if(document.getElementById("searchSelect").options[i].selected
		&& document.getElementById("searchSelect").options[i].value != '') {
			url += 'departmentId=' + document.getElementById("searchSelect").options[i].value;
			url += '&';
		}
	}

	url += 'keyword=' + document.getElementById("searchString").value;

	parent.window.location.href = url;

	document.returnValue = false;
	
	return;	    

/* Versao original q manda a consulta diretamente para a busca do site 2007
var url = "http://www.americanas.com.br/home/begin.do?";
		
	for(i = 0; i < document.getElementById("searchSelect").options.length; i++) {

		if(document.getElementById("searchSelect").options[i].selected
		&& document.getElementById("searchSelect").options[i].value != '') {
			url += 'departmentId=' + document.getElementById("searchSelect").options[i].value;
			url += '&';
		}
	}

	url += 'query=' + document.getElementById("searchString").value;
						
	url += '&home=acomSearch';
						
	parent.window.location.href = url;

	document.returnValue = false;
	return;
*/	

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


function setValue(id, element){
	$(id).value = element.value;
}

function doTarget(form) {
      target
}

//FUNCOES PAGINA CARTAO AMERICANAS.

	function montaLink() {

			if (gup("po") && gup("email") && gup("vari") && gup("idLmt")) {
				//var url = "https://carrinho.americanas.com.br/MktFaiWeb/begin.do?i=0";
				var url = "http://carrinho.americanas.com.br/MktFaiWeb/MktFaiController.jpf?";    
			}
			else if (gup("login") && gup("codigoPO") && gup("variante") && gup("idLmt")) {
				var url = "http://carrinho.americanas.com.br/MktFaiWeb/MktFaiController.jpf?"; 
			}
			else {
				//var url = "http://www.americanastaii.com.br/AmericanasCom/Default.aspx?clickRegistrado=1";
				var url = "http://maraberto.americanas.com.br/MarAbertoPortalWeb/marAberto.portal?id=01";

				if (gup("chave") != "" && gup("chave") == "hotsitecartao") {
					//var url = "http://www.americanastaii.com.br/referer/Default.aspx?IdParceiro=007&TipoEntrada=02";
					  var url = "http://maraberto.americanas.com.br/MarAbertoPortalWeb/marAberto.portal?id=01&cardCampaignId=02";
				}
				else if (gup("chave") != "" && gup("chave") == "rodapeemail") {
					//var url = "http://www.americanastaii.com.br/referer/Default.aspx?IdParceiro=007&TipoEntrada=04";
					  var url = "http://maraberto.americanas.com.br/MarAbertoPortalWeb/marAberto.portal?id=01&cardCampaignId=04";
				}
				else if (gup("chave") != "" && gup("chave") == "emailconfirmacao") {
					//var url = "http://www.americanastaii.com.br/referer/Default.aspx?IdParceiro=007&TipoEntrada=06";
					var url = "http://maraberto.americanas.com.br/MarAbertoPortalWeb/marAberto.portal?id=01&cardCampaignId=06";
				}
				else if (gup("chave") != "" && gup("chave") == "emailmktacom") {
					//var url = "http://www.americanastaii.com.br/referer/Default.aspx?IdParceiro=007&TipoEntrada=03";
					var url = "http://maraberto.americanas.com.br/MarAbertoPortalWeb/marAberto.portal?id=01&cardCampaignId=03";
				}

			}
		
			if (gup("opn") != "") {
				url = url + "&opn=" + gup("opn");
			}

			
			if (gup("par") != "") {
				url = url + "&par=" + gup("par");
			}

			if (gup("po") != "") {
				url = url + "&codigoPO=" + gup("po");
			}

			if (gup("codigoPO") != "") {
				url = url + "&codigoPO=" + gup("codigoPO");
			}


			if (gup("email") != "") {
				url = url + "&login=" + gup("email");
			}

			if (gup("login") != "") {
				url = url + "&login=" + gup("login");
			}

			
			if (gup("vari") != "") {
				url = url + "&variante=" + gup("vari");
			}

			if (gup("variante") != "") {
				url = url + "&variante=" + gup("variante");
			}
			
			if (gup("chave") != "") {
				url = url + "&chave=" + gup("chave");
			}

			if (gup("idLmt") != "") {
				url = url + "&idLmt=" + gup("idLmt");
			}
			
			return url; 

	}

	function goLink() {

		if (gup("po") != "" && gup("email") != "" && gup("vari") != "") {
			location.href = montaLink();
		}
		else {
			location.href = montaLink();
		}
		
	}

	function gup( name )
	{
	  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	  var regexS = "[\\?&]"+name+"=([^&#]*)";
	  var regex = new RegExp( regexS );
	  var results = regex.exec( window.location.href );
	  if( results == null )
		return "";
	  else
		return results[1];
	}
	
	function pecaJa() {

		var v_url = document.getElementById("pecaja");
              if (v_url != null) {
		    v_url.href = montaLink();
              }

	}


	function setPositionOriginal(i) {
		var flash_coords = [270,10];
		var elem = $A($('mainContent').getElementsByTagName("li"));
		var product = $A(elem[0].getElementsByTagName("img"));
		//product[1].src = "http://images.americanas.com.br/Applications/site2007/img/tags/tag7g.gif";
		var product_position = Position.cumulativeOffset(product.first());
		$("dhtml").setStyle({
			left: (product_position[0] - flash_coords[0]) + 'px',
			top: (product_position[1] - flash_coords[1]) +  i + 'px',
			position: 'absolute',
			'z-index': '10'
		});
						
	}

	function setPosition(i) {
		var flash_coords = [-70,387];
		var elem = $A($('mainContent').getElementsByTagName("li"));
		var product = $A(elem[0].getElementsByTagName("img"));
		//product[1].src = "http://images.americanas.com.br/Applications/site2007/img/tags/tag7g.gif";
		var product_position = Position.cumulativeOffset(product.first());
		$("dhtml").setStyle({
			left: flash_coords[0] + 'px',
			top: flash_coords[1] +  i + 'px',
			position: 'absolute',
			'z-index': '10'
		});
						
	}

	function showFlash(url, w, h) {
		var faixaCond = new SWFObject(url, "dhtml", "571", "306", "7", "#0a320c");
		faixaCond.addParam("wmode", "transparent");
		faixaCond.addParam("allowscriptaccess", "always");
		faixaCond.write("dhtml");
	}

	function showFlash2(url, w, h) {
		var faixaCond = new SWFObject(url, "dhtml", w, h, "7", "#0a320c");
		faixaCond.addParam("wmode", "transparent");
		faixaCond.addParam("allowscriptaccess", "always");
		faixaCond.write("dhtml");
	}

	function popupRegraEmail() {
		
		if (gup("opn") == "WKBMQO" && gup("par") == "emailacom") {
			window.open('http://www.americanas.com.br/Applications/site2007/htmls/pop_regras1407.html','RegraEmail','toolbar=no,location=no,status=yes,menubar=no,resizable=no,scrollbars=yes,width=425,height=500');
		}

       }

// Foto Produto
        var fotos = new Array();
        var exibir = 0;
    
        fotos[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/poster_1.jpg";
        fotos[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/poster_2.jpg";
      
		
        function voltarProduto() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria.src = fotos[exibir];
            }
        }
        function avancarProduto() {
            if (exibir < fotos.length-1) {
            exibir++;
            document.images.fotoGaleria.src = fotos[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
  //	Revelação Livro Plus
		
       var fotos1 = new Array();
        var exibir = 0;
        fotos1[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroPlus3.jpg";
        fotos1[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroPlus1.jpg";
        fotos1[2] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroPlus2.jpg";
       
       function voltarLivroP() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria1.src = fotos1[exibir];
            }
        }
        function avancarLivroP() {
            if (exibir < fotos1.length-1) {
            exibir++;
            document.images.fotoGaleria1.src = fotos1[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
		
//	Revelação Livro Super
	
		 var fotos2 = new Array();
        var exibir = 0;
    
        fotos2[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroSuper1.jpg";
        fotos2[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroSuper3.jpg";
	    fotos2[2] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/livroSuper2.jpg";
    
		
        function voltarLivroS() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria2.src = fotos2[exibir];
            }
        }
        function avancarLivroS() {
            if (exibir < fotos2.length-1) {
            exibir++;
            document.images.fotoGaleria2.src = fotos2[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
		
		
		
		
		//	Revelação Livro Classic
	
		 var fotos3 = new Array();
        var exibir = 0;
    
        fotos3[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/classic3.jpg";
        fotos3[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/classic2.jpg";
	
        function voltarLivroClassic() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria3.src = fotos3[exibir];
            }
        }
        function avancarLivroClassic() {
            if (exibir < fotos3.length-1) {
            exibir++;
            document.images.fotoGaleria3.src = fotos3[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
		
			
		//	Revelação Livro Basic
	
		 var fotos4 = new Array();
        var exibir = 0;
        fotos4[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/basic2.jpg";
        fotos4[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/troca_img/basic3.jpg";
		fotos4[2] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotolivro/basic.jpg";
	
        function voltarLivroBasic() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria4.src = fotos4[exibir];
            }
        }
        function avancarLivroBasic() {
            if (exibir < fotos4.length-1) {
            exibir++;
            document.images.fotoGaleria4.src = fotos4[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
		
		//	Foto Produto MOUSE PAD
	
		 var fotos5 = new Array();
        var exibir = 0;
        fotos5[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/image_revela.gif";
        fotos5[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/image_revela_b.gif";
        function voltarProdutoPAD() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria5.src = fotos5[exibir];
            }
        }
        function avancarProdutoPAD() {
            if (exibir < fotos5.length-1) {
            exibir++;
            document.images.fotoGaleria5.src = fotos5[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }
		
		
		
		//	Foto Produto quebra cabeca
	
		 var fotos6 = new Array();
        var exibir = 0;
        fotos6[0] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/image_revela-05b.jpg";
        fotos6[1] = "http://images.americanas.com.br/Applications/site2007/img/revelacao/images/fotoproduto/troca_img/image_revela-05.gif";
        function voltarProdutoQcab() {
            if (exibir > 0) {
                window.status = '';
                exibir--;
                document.images.fotoGaleria6.src = fotos6[exibir];
            }
        }
        function avancarProdutoQcab() {
            if (exibir < fotos6.length-1) {
            exibir++;
            document.images.fotoGaleria6.src = fotos6[exibir];
            } else {
                window.status = 'Fim da Galeria';
            }
        }

function openChat(chatId)
{
  var url = 'http://200.189.215.134/chat51/';
  window.open(url+'default.aspx?chat='+chatId+'&group=suporte&url='+window.location,'chat','width=400,height=470,resizable=no,toolbar=0,location=0,directories=0,status=no,menubar=0,scrollbars=0');
}  

function closeDHTML()
{
   $('dhtml').remove();
}








// PASCOA 2009**********************************************************************************************

var menuPascoa2008 = true;

function showPrecoPascoa() {
  
    var showTimer_l;
    var hideTimer_l;
    if (document.getElementById)
    {
        navRoot_l = $("menuPrecoPascoa");
        navRoot_l.onmouseover=function() {
            if(hideTimer_l != undefined) {
                clearTimeout(hideTimer_l);
            }
            showTimer_l = setTimeout("if(!Element.visible('precotLisBox')){new Effect.Appear('precotLisBox', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });}", 200);
        }
        navRoot_l.onmouseout=function() {
            if(showTimer_l != undefined) {
                clearTimeout(showTimer_l);
            }
            hideTimer_l = setTimeout("new Effect.Fade('precotLisBox', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} });", 400);
        }
    }
      
}




function showPesoPascoa() {
  
    var showTimer_l;
    var hideTimer_l;
    if (document.getElementById)
    {
        navRoot_l = $("menuPesoPascoa");
        navRoot_l.onmouseover=function() {
            if(hideTimer_l != undefined) {
                clearTimeout(hideTimer_l);
            }
            showTimer_l = setTimeout("if(!Element.visible('pesotLisBox')){new Effect.Appear('pesotLisBox', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });}", 200);
        }
        navRoot_l.onmouseout=function() {
            if(showTimer_l != undefined) {
                clearTimeout(showTimer_l);
            }
            hideTimer_l = setTimeout("new Effect.Fade('pesotLisBox', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} });", 400);
        }
    }
      
}




function showNumeroPascoa() {
  
    var showTimer_l;
    var hideTimer_l;
    if (document.getElementById)
    {
        navRoot_l = $("menuNumeroPascoa");
        navRoot_l.onmouseover=function() {
            if(hideTimer_l != undefined) {
                clearTimeout(hideTimer_l);
            }
            showTimer_l = setTimeout("if(!Element.visible('numerotLisBox')){new Effect.Appear('numerotLisBox', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });}", 200);
        }
        navRoot_l.onmouseout=function() {
            if(showTimer_l != undefined) {
                clearTimeout(showTimer_l);
            }
            hideTimer_l = setTimeout("new Effect.Fade('numerotLisBox', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} });", 400);
        }
    }
      
}




function showTipoPascoa() {
  
    var showTimer_l;
    var hideTimer_l;
    if (document.getElementById)
    {
        navRoot_l = $("menuTipoPascoa");
        navRoot_l.onmouseover=function() {
            if(hideTimer_l != undefined) {
                clearTimeout(hideTimer_l);
            }
            showTimer_l = setTimeout("if(!Element.visible('tipotLisBox')){new Effect.Appear('tipotLisBox', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });}", 200);
        }
        navRoot_l.onmouseout=function() {
            if(showTimer_l != undefined) {
                clearTimeout(showTimer_l);
            }
            hideTimer_l = setTimeout("new Effect.Fade('tipotLisBox', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} });", 400);
        }
    }
      
}



function showNomePascoa() {
  
    var showTimer_l;
    var hideTimer_l;
    if (document.getElementById)
    {
        navRoot_l = $("menuNomePascoa");
        navRoot_l.onmouseover=function() {
            if(hideTimer_l != undefined) {
                clearTimeout(hideTimer_l);
            }
            showTimer_l = setTimeout("if(!Element.visible('nometLisBox')){new Effect.Appear('nometLisBox', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });}", 200);
        }
        navRoot_l.onmouseout=function() {
            if(showTimer_l != undefined) {
                clearTimeout(showTimer_l);
            }
            hideTimer_l = setTimeout("new Effect.Fade('nometLisBox', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} });", 400);
        }
    }
      
}


//************************************************************************************************

function openExtendedFlash() {
	$("extendedFlash").setStyle({
		'clip' : 'rect(0px, 210px, 440px, 0px)'
	});
}

function closeExtendedFlash() {
	$("extendedFlash").setStyle({
		'clip' : 'rect(0px, 210px, 110px, 0px)'
	});
}




function openExtendedFlashFull() {
	$("extendedFlashFull").setStyle({
		'clip' : 'rect(0px, 610px, 306px, 0px)'
	});
}

function closeExtendedFlashFull() {
	$("extendedFlashFull").setStyle({
		'clip' : 'rect(210px, 610px, 306px, 0px)'
	});
}