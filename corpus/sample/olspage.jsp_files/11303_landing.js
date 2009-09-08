var ci_vid=11303;
var ci_cookieDomain=".bestbuy.com";
var ci_refDomain=".bestbuy.com";
var ci_imgs=[];

function ci_FP(ci_pix_url,protocol){var ci_pic=document.createElement('img');ci_pic.src=(protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://'))+ci_pix_url;ci_imgs[ci_imgs.length]=ci_pic;}
function ci_FP_FRAME(ci_pix_url, protocol){document.write('<iframe width="0" scrolling="no" height="0" frameborder="0" src="' + (protocol !== undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + ci_pix_url + '"></iframe>');}

function ci_RQV(name,dValue){
    var qArg=new RegExp('[\\?&]'+name+'=?([^&#]*)','i').exec(window.document.location);
    if(qArg===null){return dValue===undefined?null:dValue;}else if(qArg.length<2){return '';}else{return qArg[1];}
}
function CI_ExternalJS(link, protocol){
  var script  = document.createElement('script');
  script.src  = (protocol!==undefined ? protocol + '://' : (window.location.protocol.toLowerCase() == 'http:' ? 'http://' : 'https://')) + link;
  script.type = 'text/javascript';
  script.defer = true;
  document.getElementsByTagName('head').item(0).appendChild(script);
}
function ci_CC(name,value,daysTillExpire){
	if (daysTillExpire){
		var exDate=new Date();
		exDate.setTime(exDate.getTime()+(daysTillExpire*24*60*60*1000));
		document.cookie=name+'='+value+'; expires='+exDate.toGMTString()+'; domain='+ci_cookieDomain+'; path=/';
	}else{
		document.cookie=name+'='+value+'; domain='+ci_cookieDomain+'; path=/';
	}
}
function CI_ReadCookie(ci_cookieName) {
	var ci_cookieParts = document.cookie.split(';');
	ci_cookieName += '=';
	for (var ci_cookiePartIndex=0;ci_cookiePartIndex<ci_cookieParts.length;ci_cookiePartIndex++)
	{
		var ci_cookiePart=ci_cookieParts[ci_cookiePartIndex];
		while (ci_cookiePart.charAt(0)===' '){ci_cookiePart=ci_cookiePart.substring(1,ci_cookiePart.length);}
		if (ci_cookiePart.indexOf(ci_cookieName)===0){return ci_cookiePart.substring(ci_cookieName.length,ci_cookiePart.length);}
	}
	return null;
}
function ci_padleft(val, ch, num) {
    var re = new RegExp(".{" + num + "}$");
    var pad = "";
    if (!ch) ch = " ";
    do  {
        pad += ch;
    }while(pad.length < num);
    return re.exec(pad + val);
}
function ci_UID(value){
	var today=new Date();
	var UID=ci_vid+"-"+value+"-"+Math.floor(Math.random()*9999999999)+today.getFullYear().toString()+today.getMonth().toString()+ today.getDay().toString()+today.getHours().toString()+today.getMinutes().toString()+today.getSeconds().toString()+today.getMilliseconds().toString();
	return UID;
}
function ci_PIX(loc,eid,tid,src,sku,tag){
	var url='';
	if (loc===1){url='origin.channelintelligence.com/log.asp?';}
	if (loc===2){url='cts-log.channelintelligence.com?';}
	url+='vid='+ci_vid+'&eid='+eid+'&tid='+tid;
	if(src!==null){url+='&src='+src;}
	if(sku!==null){url+='&sku='+sku;}
	if(tag!==null){url+='&tag='+tag;}
	url += "&ref="+escape(document.referrer);
	return ci_FP(url, 'http');
}
function ci_cnet_populateRelatedIcsCsids(relatedIcsCsids){
	try{
		if (relatedIcsCsids){
			var ci_strCSIDsRP = '';
			for (var i=0; i<relatedIcsCsids.length; i++){
				if (i >0) ci_strCSIDsRP = ci_strCSIDsRP + ','
				ci_strCSIDsRP = ci_strCSIDsRP + relatedIcsCsids[i] 
			}
			ci_FP('xs.ics0.com/ics/2/view.gif?sellerId=39&ts='+ci_dateNumber+'&csid='+ci_strCSIDsRP+'&sid='+ci_session);
		}
	}catch(err){}
}
function ci_cnet_populateAccessoriesIcsCsids(accessoriesIcsCsids){
	try{
		ci_accessoriesIcsCsids = accessoriesIcsCsids;
		if (accessoriesIcsCsids && ci_accessoriesClicked === true){
			var ci_strCSIDsAT = '';
			for (var i=0; i<accessoriesIcsCsids.length; i++){
				if (i >0) ci_strCSIDsAT = ci_strCSIDsAT + ','
				ci_strCSIDsAT = ci_strCSIDsAT + accessoriesIcsCsids[i] 
			}
			ci_FP('xs.ics0.com/ics/2/view.gif?sellerId=39&ts='+ci_dateNumber+'&csid='+ci_strCSIDsAT+'&sid='+ci_session);
		}
	}catch(err){}
}
function ci_cnet_accessoriesIcsCsidsAddToCart(accessoriesIcsCsids)
{
	if (accessoriesIcsCsids){
		var ci_strCSIDsAT = '';
		for (var i=0; i<accessoriesIcsCsids.length; i++){
			if (i >0) ci_strCSIDsAT = ci_strCSIDsAT + ','
			ci_strCSIDsAT = ci_strCSIDsAT + accessoriesIcsCsids[i] 
		}
		ci_CC('ci_IcsCsid', ci_strCSIDsAT);
	}
}
function newSetTabParameter(tabNum){
	//CNET Cross Sell View Accessories Tab
	if (tabNum === "3"){
		try{
			ci_accessoriesClicked = true;
			ci_cnet_populateAccessoriesIcsCsids(ci_accessoriesIcsCsids);
		}catch(err){}
	}
	CI_setTabParameter.apply(this, arguments);
}
function newfnAddItemToCartWithIcsAccessories(){
	try{
		ci_CC('ci_IcsCsid', document.frmCart.icsIds.value);	
		}catch(err){}
	CI_fnAddItemToCartWithIcsAccessories.apply(this, arguments);	
}
try {
	var ci_cpncode=ci_RQV('cpncode');
	var ci_srccode=ci_RQV('srccode');
	var ci_src=ci_RQV('ci_src');
	var ci_sku=ci_RQV('ci_sku');
	var ci_tag=ci_RQV('ci_tag');
	var ci_tid=ci_UID(ci_sku);
	var ci_skuid=ci_RQV('skuId');
	var ci_session=CI_ReadCookie('ci_session');
	var ci_csid=ci_RQV('IcsCsid', "");
	var ci_type=ci_RQV('type');
	var ci_accessoriesClicked = false;
	var ci_accessoriesIcsCsids = null;
	
	if(ci_session===null){
		var ci_randnum=Math.floor(Math.random()*1000000000000001);
		ci_session=ci_randnum;
		ci_CC('ci_session', ci_session);
	}
	
	ci_CC('ci_IcsCsid', ci_csid);
	var ci_d=new Date();
    var ci_dateNumber=new ci_padleft(ci_d.getFullYear(), '0', 4) + new ci_padleft(ci_d.getMonth()+1, '0', 2) +  new ci_padleft(ci_d.getDate(), '0', 2) + new ci_padleft(ci_d.getHours(), '0', 2) + new ci_padleft(ci_d.getMinutes(), '0', 2) + new ci_padleft(ci_d.getSeconds(), '0', 2) + new ci_padleft(ci_d.getMilliseconds(), '0', 3);

	//CNET Cross Sell Click
	if(ci_csid!==''){
		ci_FP('xs.ics0.com/ics/2/click.gif?sellerId=39&ts='+ci_dateNumber+'&csid='+ci_csid+'&sid='+ci_session);
	}	
	//CNET Page View
	if(ci_type=='product'){
		ci_FP('xs.ics0.com/ics/2/pview.gif?&sellerId=39&ts='+ci_dateNumber+'&productId='+ci_skuid+'&sid='+ci_session);
	}
	//CNET Cross Sell View Accessories Tab
	if (window.setTabParameter !== undefined){
		CI_setTabParameter = setTabParameter;
		setTabParameter = newSetTabParameter;
	}
	//CNET Accessory CSIDs Added to Cart
	if (window.fnAddItemToCartWithIcsAccessories !== undefined){
		CI_fnAddItemToCartWithIcsAccessories = fnAddItemToCartWithIcsAccessories;
		fnAddItemToCartWithIcsAccessories = newfnAddItemToCartWithIcsAccessories;
	}
	var ci_st=ci_RQV('st');
	if(ci_st!==null&&ci_st.indexOf('processingtime')===-1){ci_FP('truetag.channelintelligence.com?eid=32&v='+ci_vid+'&search='+ci_st,'http');}	

	if(ci_tag===null&&ci_src===null&&ci_cpncode===null){
		var ci_ref=ci_RQV('ref');
		var ci_loc=ci_RQV('loc');
		var ci_aid=ci_RQV('AID');
		if(ci_ref==='39'&&ci_aid===null){
			//Do not log.  This IF will be removed once traffic stops from the BBY manually created CJ links.
		}else{
			ci_tag=ci_ref==='59'&&ci_loc!==null?ci_ref+":"+ci_loc:ci_tag=ci_ref;
		}
	}
	//START TAPESTRY	
	if(document.referrer.toLowerCase().indexOf('espanol.bestbuy.com/')>-1&&document.referrer!==''&&location.href.toLowerCase().indexOf('www.bestbuy.com/')>-1){
		ci_FP('switch.atdmt.com/action/chgbby_EspanolEnglishButton_1');
	}
	if(location.href.toLowerCase().indexOf('espanol')!==-1){
		var ci_urlid=ci_RQV('id');
		
		if(CI_CatName!==null&&CI_CatName!==''){
			ci_FP('switch.atdmt.com/action/chgbby_'+CI_CatName.replace(/\+/g,'_')+'CategorySpanish_1');
		}else if(ci_urlid!==null&&ci_urlid=='cat12090'){
			ci_FP('switch.atdmt.com/action/chgbby_StoreLocatorSpanish_1');
		}else if(ci_urlid!==null&&ci_urlid=='pcat17000'){
			ci_FP('switch.atdmt.com/action/chgbby_chgbby_WishListLoginPageSpanish_1');
		}else if(ci_urlid!==null&&ci_urlid=='cat12054'){
			ci_FP('switch.atdmt.com/action/chgbby_chgbby_WishListLoginConfirmationPage_1');	
		}
	}
	//END TAPESTRY
	if(ci_cpncode!==null){
		ci_CC('ci_cpncode',ci_cpncode,14);
		ci_CC('ci_src',ci_srccode,14);
		ci_CC('ci_tid',"",-1);
	} else if(ci_src!==null && ci_sku!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,14);
		ci_CC('ci_src',ci_src,14);
		ci_PIX(2,23,ci_tid,ci_src,ci_sku,null);
	} else if(ci_tag!==null) {
		ci_CC('ci_cpncode',"",-1);
		ci_CC('ci_tid',ci_tid,14);
		ci_CC('ci_tag',ci_tag,14);
		ci_PIX(2,7,ci_tid,null,null,ci_tag);
	} else if(document.referrer.toLowerCase().indexOf(ci_refDomain)===-1&&document.referrer!==''){
	    ci_PIX(2,13,null,null,null,null);
	}
    //AvenueA
	CI_ExternalJS('switch.atdmt.com/jaction/bb_website_pages/v3/atc1.'+(ci_RQV('skuid','')===''?ci_RQV('id',''):ci_RQV('skuid',''))+'/atc2.'+document.title.replace(' ','+')+'/atc3.PROD');
 	
 	//Teracent
 	ci_FP_FRAME('int.teracent.net/tase/int?adv=134&fmt=html&sec=0&pid=prod&sku='+ci_RQV('skuid','')+'&id='+ci_RQV('id','')+'&pTitle='+document.title.replace(' ','+'));
 	
 	//Tumri
 	ci_FP('ats.tumri.net/ats/ats?cmd=RT&MerchantID=BESTBUY&ActionID=50091&ActionName=SiteVisit&ut1='+ci_RQV('skuid','')+'&ut2='+ci_RQV('id','')+'&ut3='+document.title.replace(' ','+')+'&cachebuster=');
}    
catch(err){}