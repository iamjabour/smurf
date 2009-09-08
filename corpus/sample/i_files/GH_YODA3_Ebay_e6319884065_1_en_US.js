
vjo.ctype("vjo.darwin.core.encoding.Enc").needs("vjo.dsf.Enc","").inits(function(){if(vjo.darwin.core.encoding.Enc.loaded){return;}
vjo.darwin.core.encoding.Enc.loaded=true;var vjoDecodeURI=window.decodeURI;window.decodeURI=function(str){try{return vjoDecodeURI(str);}catch(e){return unescape(str);}};var vjoDecodeURIComponent=window.decodeURIComponent;window.decodeURIComponent=function(str){try{return vjoDecodeURIComponent(str);}catch(e){return unescape(str);}};}).endType();

vjo.ctype("vjo.darwin.core.dynamicmenu.Show").needs("vjo.dsf.utils.JsLoader").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){this.id=_1;},handle:function(_2){var _3=vjo.Registry.get(this.id),url=_3.getHandlerSource(),handler=_3.getHandler();if(url!==null&&typeof(window[handler])=="undefined"){this.vj$.JsLoader.load(url,_3.setup,_3);}else{_3.setup();}}}).endType();

vjo.ctype("vjo.darwin.core.dynamicmenu.Hide").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){this.id=_1;},handle:function(_2){vjo.Registry.get(this.id).hide();}}).endType();

vjo.ctype("vjo.darwin.core.dynamicmenu.Stay").satisfies("vjo.dsf.common.IJsHandler").protos({constructs:function(_1){this.id=_1;},handle:function(_2){vjo.Registry.get(this.id).clear();}}).endType();

vjo.ctype("vjo.darwin.core.dynamicmenu.DynamicMenu").needs(["vjo.dsf.document.Element","vjo.dsf.document.Positioning","vjo.dsf.document.Shim","vjo.dsf.utils.Object","vjo.dsf.client.Browser","vjo.darwin.core.dynamicmenu.Show","vjo.darwin.core.dynamicmenu.Hide","vjo.darwin.core.dynamicmenu.Stay"]).protos({constructs:function(_1,_2,_3,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14){this.iMouseOutTimer=null;this.iMouseOverTimer=null;this.iLeftPadding=_b;this.iTopPadding=_c;this.iRightPadding=_d;this.sAnchorId=_1;this.sContainerLayerId=_2;this.sContentLayerId=_3;this.iMouseOutDelay=_4;this.iMouseOverDelay=_5;this.iHighResDocWidth=_6;this.iLowResDocWidth=_7;this.iHighResColumns=_8;this.iMediumResColumns=_9;this.iLowResColumns=_a;this.sHandler=_e;this.sCollName=_f;this.sWidth=_10;this.sAnchorMouseOverClass=_11;this.sAnchorMouseOutClass=_12;this.iframeShim=null;this.sHTML=null;this.oAnchor=null;this.sTemplate=null;this.sAnchorText=_13;this.sDomain=_14;this.sHandlerSource=null;if(this.sAnchorId=="Help"){this.iLeftPadding-=5;}
if(window.location.href.hasAny(".it.",".ebay.it")&&this.sAnchorId=="BrowseCategories"){this.sHandler="get_BrowseCategories_menu";}
this.oCobrand=null;},setHandlerSource:function(url){if(url){this.sHandlerSource=url;}},getHandlerSource:function(){return this.sHandlerSource;},getHandler:function(){return this.sHandler;},setup:function(){var oL,oA,iL,iT,iWW,noc,iAL,iAW,iLW,op,oSI,bF=false,t,lh=window.location.href;var vd=vjo.dsf,D=vd.document,E=D.Element,P=D.Positioning,S=D.Shim,B=vd.client.Browser;var O=vd.utils.Object;var _19=0;var _1a=false;with(this){clear();if(sTemplate==null){t=E.get(sContentLayerId);if(t){sTemplate=t.innerHTML;}}
oL=E.get(sContainerLayerId);if(oL){op=oL.offsetParent;}
oA=E.get(sAnchorId);iAL=DynamicMenuGetOffsetLeft(oA);iAW=oA.offsetWidth;iT=P.getOffsetTop(oA)+(oA.offsetHeight)+iTopPadding;iWW=P.getClientWidth();if(typeof(iWW)=="undefined"){iWW=800;}
if(iWW>iHighResDocWidth){noc=iHighResColumns;}else{if(iWW>iLowResDocWidth&&iWW<=iHighResDocWidth){noc=iMediumResColumns;}else{if(iWW<=iLowResDocWidth){noc=iLowResColumns;}else{noc=5;}}}
if(sHTML==null){bF=true;if(B.bFirefox&&!lh.has("motors.")&&!lh.hasAny("shop.","local.","catalog.")){E.promoteToBody(sContainerLayerId);}
sHTML=getMenuHtml(noc);if(sHTML==null){return;}
oL.innerHTML=sHTML;}
iLW=oL.offsetWidth;var _1b=GetContainerDiv(),cw,bRA=false;if(sAnchorId=="Help"){bRA=true;}
if(_1b&&B.bIE&&!lh.hasAny("community","education")){cw=_1b.offsetWidth;if((iAL+iLW)>cw){bRA=true;}}
var bE=(sAnchorId=="EbxBrowseCategories")?true:false;if(lh.hasAny("securitycenter","payments.")&&lh.has(".hk")){iAL=P.getOffsetLeft(oA);}else{if(lh.hasAny("securitycentre","contact_ebay")&&lh.has(".au")){iAL=P.getOffsetLeft(oA);}else{if((typeof(pageName)!="undefined")?pageName.has("CCHP_"):false){iAL=P.getOffsetLeft(oA);}else{if(lh.hasAll("pages.","ebaymotors")){}else{if(lh.hasAny("/buy/")){iAL=P.getOffsetLeft(oA);}else{if(lh.hasAny("pages.",".html",".shtml","cgi.","tools.ebay.de","neighborhoods.","themenwelten.","neighbourhoods.","motors.ebay.co.uk","motors.uk.","ebaymotors.at","motors.at.","motors.ebay.de","motors.de.")){iAL=P.getOffsetLeft(oA);}else{if(lh.hasAny("annonces.")&&!(B.bIE&&B.iVer==6)){iAL=P.getOffsetLeft(oA);}else{if(typeof(bCenterAlignedPage)!="undefined"&&bCenterAlignedPage){iAL=P.getOffsetLeft(oA);}else{if(bE&&((typeof(pageName)!="undefined")?pageName.has("KP_HomePage"):false)){iAL=P.getOffsetLeft(oA);}else{if(sAnchorId=="StoreBrowseCats"&&lh.has("stores.")){iAL=P.getOffsetLeft(oA);}else{if(typeof(pageName)!="undefined"&&pageName=="HomePagePortal"){iAL=P.getOffsetLeft(oA);}}}}}}}}}}}
var _1d=E.get("2tabPopularProducts");if(_1d&&B.bIE){iAL=P.getOffsetLeft(oA);}
var _1e=false;if(lh.hasAny(".fr.","ebay.fr")&&sAnchorId=="Community"){_1e=true;}
if(!_1e&&((((iWW-iAL-iLW)<=10)&&iWW>iLW)||(iWW<(P.getOffsetLeft(oA)+iAW+iLW))||bRA||bE)){_19=iAW-iLW;iL=iAL+iAW-iLW;}else{iL=iAL;}
if(_1e){iL-=5;}
if(sAnchorId=="Buy"||sAnchorId=="BrowseCategories"){_1a=true;}
if(sAnchorId=="Buy"||sAnchorId=="Sell"||sAnchorId=="MyEbay"||sAnchorId=="OV"){iL=iAL;}
iL+=iLeftPadding;if(lh.has("securitycentre")&&lh.has(".sg")&&B.bIE){iL+=10;}else{if(lh.has("feedback")&&lh.has(".hk")&&B.bFirefox){iL+=7;}else{if(lh.has("my.")&&B.bFirefox){iL-=7;}else{if(lh.has("myworld")&&B.bIE){iL+=10;}else{if(bE){var sn=E.get("dynamicmenu-snavW");iT=P.getOffsetTop(sn)+(sn.offsetHeight)+iTopPadding;if(B.bFirefox){iL+=2;}
if(B.bIE&&((typeof(pageName)!="undefined")?pageName.has("KP_HomePage"):false)){iL-=9;}}else{if(lh.has("search.")&&sAnchorId=="BrowseCategories"&&B.bIE&&B.iVer==7){iL+=22;iT-=2;}else{if(!lh.has("motors.shop.")&&B.bIE){if(lh.has("shop.")){if(sAnchorId=="BrowseCategories"){iL+=5;}}else{if(lh.hasAny("catalog.")){iL+=15;iT-=2;}}}else{if(lh.has("hub.motors.")&&B.bIE&&B.iVer>6){iL-=8;}}}}}}}}
if(bF){oL.style.left=(iL>=0)?(iL-1)+"px":"14px";oL.style.top=(iT)+"px";if(lh.has("contact")||lh.has("catalog.")||(lh.has("resolutioncenter.")&&B.bIE&&B.iVer>6)){oL.style.position="absolute";var p1=P.getOffsetLeft(document.getElementById(sAnchorId));if(_1a){oL.style.left=(p1+5)+"px";}else{oL.style.left=(p1+_19)+"px";}
E.promoteToBody(oL.id);}
oL.style.zIndex="1000";if(lh.has("motors")||sAnchorId=="BrowseCategories"&&!lh.has("myworld")){iframeShim=this.add(oL,12);}else{iframeShim=this.add(oL);}}else{if(B.bIE){oL.appendChild(iframeShim);}}
oSI=E.get(sContainerLayerId+"-spacer");if(oSI&&bF){oSI.width=iLW-12;}
iMouseOverTimer=setTimeout(O.hitch(this,"show"),iMouseOverDelay);}},show:function(){var oA,E=vjo.dsf.document.Element;with(this){oA=E.get(sAnchorId);if(oA){oA.className=sAnchorMouseOverClass;}
E.toggleVisibility(sContainerLayerId,true);}},hide:function(){with(this){clearTimeout(iMouseOverTimer);iMouseOutTimer=setTimeout(vj$.Object.hitch(this,"close"),iMouseOutDelay);}},close:function(){var oA,E=vjo.dsf.document.Element;with(this){oA=E.get(sAnchorId);if(oA){oA.className=sAnchorMouseOutClass;}
E.toggleVisibility(sContainerLayerId,false);if(iframeShim){vj$.Shim.remove(E.get(sContainerLayerId),iframeShim);}}},clear:function(){clearTimeout(this.iMouseOutTimer);},sortByValue:function(_23,_24){if(_23.value.has("Everything")){return 1;}else{if(_24.value.has("Everything")){return-1;}else{return _23.value<_24.value?-1:(_23.value>_24.value?1:0);}}},getMenuHtml:function(_25){with(this){var i,j,c,n,h,ipc,html,img="",si,sTemp=".paradise.qa.ebay.com",sTemp2=".qa.ebay.com",u,ff,ll,sTemp3=".no-pool-name.qa.ebay.com";var E=vj$.Element;var lh=window.location.href;si="<img src='";if(document.location.protocol.has("https")){si+="https://secure";}else{si+="http://";}
si+="pics.ebaystatic.com/aw/pics/s.gif' height='1' width='1'  border='0' ";var _29=window[sHandler];if(!_29){return;}
var _2a=_29(),items=_2a[sCollName],l=items.length;if(sAnchorId=="BrowseCategories"&&lh.has("ebay.com/")){for(i=0;i<l;i++){if(items[i].value.has("eBay Motors")){items[i].value="Cars, Boats, Vehicles & Parts";items[i].url="http://www.motors.ebay.com";items.sort(sortByValue);break;}}}
ipc=Math.ceil(l/_25);h="<table bgcolor='white' border='0' cellpadding='0' cellspacing='0'";if(this.sWidth!=""){h+=" width='"+sWidth+"'";}
h+=">";for(i=0;i<ipc;i++){h+="<tr>";for(j=0;j<_25;j++){h+="<td nowrap>";if(i==0&&!E.get("EbxBrowseCategories-menu")){h+=si+"><br/>";img=si+" id='"+sContainerLayerId+"-spacer'>";}
n=i+(j)*ipc;c=items[n];if(c){if(typeof(c.url)!="undefined"){u=c.url;if(sDomain){if(c.url.indexOf(sTemp)!=-1){u=c.url.replace(sTemp,sDomain);}else{if(c.url.indexOf(sTemp3)!=-1){u=c.url.replace(sTemp3,sDomain);}else{if(c.url.indexOf(sTemp2)!=-1){u=c.url.replace(sTemp2,sDomain);}}}}
u=cobrandUrl(u);h+="<a href='"+u+"'>";h+=c.value;h+="</a>";}else{u=c.value;ff=u.indexOf("href=\"");if(ff==-1){h+=u;}else{ff+=6;ll=u.lastIndexOf("\"");u=u.substr(ff,ll-ff);h+=c.value.substr(0,ff)+cobrandUrl(u)+c.value.substr(ll);}}}else{h+="&nbsp;";}
h+="</td>";}
h+="</tr>";}
h+="</table>";html=h;if(sTemplate){html=sTemplate.replace("##1##",h).replace("##2##",img);}
return html;}},DynamicMenuGetOffsetLeft:function(e){var l=0,oCl=vjo.dsf.client.Browser,ex=(oCl.bIE||oCl.bSafari),lh=window.location.href;var bH=(typeof(isHomepage)!="undefined")?isHomepage:false;var _2e=false;if(e.offsetParent){l=e.offsetLeft;while(e=e.offsetParent){if(!_2e){_2e=e.innerHTML.has("snav");}
if(!e.id.toLowerCase().has("maincontent")&&!e.className.has("pagecontainer")){l+=e.offsetLeft;}
if(((e.className.is("pnav")||_2e)&&ex)&&e.offsetLeft!=0&&(!lh.hasAny("signin.","shop.","community","sitemap","/help/","/education/","blogs","feedback","my"))){return l;}else{if((e.className.is("pnav")||_2e)&&e.offsetLeft!=0&&oCl.bFirefox&&lh.has(".hk")&&(!lh.has("community")&&!bH)){return l;}else{if((e.className.is("pnav")||_2e)&&e.offsetLeft!=0&&oCl.bIE&&lh.has(".au")&&lh.hasAny("/help/")){return l;}}}}}
return l;},GetContainerDiv:function(){var d=document,aa,i,l;if(d.getElementsByTagName){aa=d.getElementsByTagName("div");}else{if(d.all){aa=d.all;}}
l=aa.length;for(i=0;i<l;i++){if(aa[i].className=="gbhdr"){return aa[i];}}},cobrandUrl:function(_30){var lh=window.location.href;if(!lh.has("sandbox.")){return _30;}
var u="undefined",cc,cf;if(this.oCobrand==null&&typeof(ebay)!=u&&typeof(ebay.oDocument)!=u){cc=ebay.oDocument._getControl("cobrandCollection");if(cc){cf=cc._getControl("cobrandFunctions");this.oCobrand=cf;}}else{cf=this.oCobrand;}
var lc=(_30.substring(_30.length)!="/")?"/":"";if(cf&&typeof(cf.cobrandURL)!=u){return cf.cobrandURL(_30+lc);}else{if(typeof(vjo.darwin.core.cobrand)!=u&&typeof(vjo.darwin.core.cobrand.EbaySandbox)!=u){return vjo.darwin.core.cobrand.EbaySandbox.cobrandURL(_30);}}
return _30;},add:function(_34,_35,_36){var f,p="px",w,h,s,S=vjo.dsf.document.Shim;if(vjo.dsf.client.Browser.bIE){w=_34.offsetWidth;h=_34.offsetHeight;w+=_35?_35:0;h+=_36?_36:0;f=document.createElement("IFRAME");s=f.style;s.width=w+p;s.height=h+p;s.filter="chroma(color='white')";f.frameBorder=0;s.position="absolute";s.left="0"+p;s.top="0"+p;s.zIndex="-1";s.filter="Alpha(Opacity=\"0\")";if(document.location.protocol.has("https")){f.src="https://securepics.ebaystatic.com/aw/pics/s.gif";}
_34.appendChild(f);return f;}},replaceJSONDataHandler:function(_38,_39){if(_38!=null){this.sHandler=_38;}
if(_39!=null){this.sDomain=_39;}}}).endType();

vjo.ctype("vjo.darwin.core.ebayheader.playground.Playground").needs(["vjo.dsf.typeextensions.string.Comparison","vjo.dsf.cookie.VjCookieJar","vjo.dsf.document.Element"]).protos({constructs:function(_1,_2){this.sLayerId=_1;this.sHandle=_2;},show:function(){var _3=vjo.dsf.cookie.VjCookieJar,sbf=_3.readCookie("ebay","sbf"),pcon=_3.getBitFlag(sbf,24),l,h,lid=this.sLayerId,E=this.vj$.Element;if(pcon){l=E.get(lid);h=window[this.sHandle];if(h&&l){l.innerHTML=h();E.toggleHideShow(lid,true);}}else{E.toggleHideShow(lid,false);}}}).endType();

vjo.ctype("vjo.darwin.core.ebayheader.timezone.TimeZone").needs("vjo.dsf.cookie.VjCookieJar").props({init:function(){this.vj$.VjCookieJar.writeCookielet("dp1","tzo",new Date().getTimezoneOffset().dec2Hex());}}).inits(function(){vjo.darwin.core.ebayheader.timezone.TimeZone.init();}).endType();


function get_Buy_menu(){return{"items":[{"value":"<a href=\"http://shop.ebay.com/allcategories/all-categories\">Browse Categories</a>"},{"value":"<a href=\"http://pages.ebay.com/quicktips/\">Help with bidding &amp; buying</a>"},{"value":"<a href=\"http://pages.ebay.com/buy/tools.html\">Buyer Tools</a>"},{"value":"<a href=\"http://reviews.ebay.com/\">Reviews &amp; Guides</a>"},{"value":"<a href=\"http://www.ebay.com/mobile/\">eBay Mobile</a>"}]};}
function get_Sell_menu(){return{"items":[{"value":"<a href=\"http://sell.ebay.com/sell\">Sell an item</a>"},{"value":"<a href=\"http://pages.ebay.com/sell/top10tips.html\">Selling Tips</a>"},{"value":"<a href=\"http://pages.ebay.com/sell/whatshot/\">What's Hot</a>"},{"value":"<a href=\"http://pages.ebay.com/sell/tools.html\">Seller tools &amp; eBay Stores</a>"},{"value":"<a href=\"http://pages.ebay.com/services/buyandsell/shipping.html\">Shipping center</a>"}]};}
function get_MyEbay_menu(){return{"items":[{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBaySummary&amp;ssPageName=STRK:ME:LNLK\" rel=\"nofollow\">Summary</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayWatching\" rel=\"nofollow\">Watching</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayBidding\" rel=\"nofollow\">Bidding</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayWon\" rel=\"nofollow\">Won</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayAllSelling&amp;ssPageName=STRK:ME:LNLK\" rel=\"nofollow\">Selling</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;CurrentPage=MyeBayAllFavorites\" rel=\"nofollow\">Saved Searches</a>"},{"value":"<a href=\"http://my.ebay.com/ws/eBayISAPI.dll?MyEbay&amp;gbh=1&amp;ssPageName=STRK:ME:LNLK&amp;CurrentPage=MyeBayMyMessages\" rel=\"nofollow\">Messages</a>"}]};}
function get_Community_menu(){return{"items":[{"value":"<a href=\"http://www2.ebay.com/aw/marketing.shtml\">Announcements</a>"},{"value":"<a href=\"http://pages.ebay.com/community/answercenter/index.html\">Answer Center</a>"},{"value":"<a href=\"http://forums.ebay.com\">Discussion Forums</a>"},{"value":"<a href=\"http://neighborhoods.ebay.com\">Neighborhoods</a>"},{"value":"<a href=\"http://groups.ebay.com/index.jspa?categoryID=1&amp;redirected=1\">Groups</a>"}]};}
function get_Help_menu(){return{"items":[{"value":"<a href=\"http://pages.ebay.com/help/index.html\">Help Topics</a>"},{"value":"<a href=\"http://pages.ebay.com/education/index.html\">Learning Center</a>"},{"value":"<a href=\"http://resolutioncenter.ebay.com\">Resolution Center</a>"},{"value":"<a href=\"http://pages.ebay.com/university/index.html\">eBay University</a>"},{"value":"<a href=\"http://pages.ebay.com/help/contact_us/_base/index.html\">Contact Us</a>"}]};}


vjo.ctype("vjo.darwin.core.ebayheader.searchbox.MiniSearchBox").needs("vjo.dsf.EventDispatcher").protos({constructs:function(_1){this.table=document.getElementById(_1.tableID);var D=vjo.dsf.EventDispatcher,is=this.table.getElementsByTagName("input");this.input=is[0];this.submit=is[1];this.defaultText=_1.defaultText;this.dispDftText();this.showDftText=true;D.addEventListener(this.input,"click",this.clearDftText,this);D.addEventListener(this.submit,"click",this.onSubmit,this);},clearDftText:function(){if(this.showDftText){this.input.value="";this.input.className="";this.showDftText=false;}},dispDftText:function(){this.input.value=this.defaultText;},onSubmit:function(){if(this.input.value==this.defaultText){this.input.value="";}
return true;}}).endType();

vjo.ctype("vjo.dsf.document.Select").needs("vjo.dsf.document.Element").props({E:vjo.dsf.document.Element,addOption:function(_1,_2,_3){var t=this,e=t.get(_1),o,os;if(e){o=t.createOption(_3,_2);os=e.options;os[os.length]=o;}},createOption:function(_5,_6){return this.createOption(_5,_6,false,false);},createOption:function(_7,_8,_9,_a){return new Option(_7,_8,_9,_a);},clear:function(_b){var e=this.get(_b),os,i,l;if(e){os=e.options;l=os.length;for(i=l-1;i>=0;i--){os[i]=null;}}},get:function(_d){var e=_d;if(typeof(_d)=="string"){e=this.E.get(_d);}
return e;}}).endType();

vjo.ctype("vjo.darwin.core.dynamicdropdown.DynamicDropdown").needs(["vjo.dsf.document.Element","vjo.dsf.document.Select"]).protos({constructs:function(_1,_2,_3,_4){this.sDropdownId=_1;this.sHandler=_2;this.sCollName=_3;this.iCondNo=_4;},fill:function(){var e,h,d,col,i,l,c,D=vjo.dsf.document,E=D.Element,S=D.Select;with(this){e=E.get(sDropdownId);if(e&&typeof(e.length)!="undefined"&&e.length>0){e=e[0];}
if(e&&e.options){if(iCondNo==-1||e.options.length<=iCondNo){h=window[sHandler];if(!h){return;}
d=h(),col=d[sCollName],l=col.length;for(i=0;i<l;i++){c=col[i];S.addOption(e,c.id,c.value);}}}}}}).endType();


vjo.ctype("vjo.darwin.core.ebayheader.rtm.GlobalHeaderRtmDec").endType();if(typeof(_oGlobalNavRTMInfo)=="undefined"){_oGlobalNavRTMInfo={};_oGlobalNavRTMInfo.aRTMPlacementData=[];}

vjo.ctype("vjo.dsf.typeextensions.string.Decode").endType();String.prototype.decodeBase64=function(){var rv=this,len=rv.length,ret="",i=0;if(len===0){return ret;}
var _2,chr2,chr3="";var _3,enc2,enc3,enc4="";var _4="ABCDEFGHIJKLMNOPQRSTUVWXYZ"+"abcdefghijklmnopqrstuvwxyz"+"0123456789+/=*";var _5=new RegExp("[^A-Za-z0-9+/=*]");if(_5.exec(rv)){return;}
do{_3=_4.indexOf(rv.charAt(i++));enc2=_4.indexOf(rv.charAt(i++));enc3=_4.indexOf(rv.charAt(i++));enc4=_4.indexOf(rv.charAt(i++));_2=(_3<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;ret+=String.fromCharCode(_2);if(!(enc3>=64)){ret+=String.fromCharCode(chr2);}
if(!(enc4>=64)){ret+=String.fromCharCode(chr3);}
_2=chr2=chr3=_3=enc2=enc3=enc4="";}while(i<len);return ret;};String.prototype.decodeUTF8=function(){var s=this,len=s.length;var rs="";var i=0;var c=0,c1=0,c2=0;while(i<len){c=s.charCodeAt(i);if(c<128){rs+=String.fromCharCode(c);i++;}else{if((c>191)&&(c<224)){c2=s.charCodeAt(i+1);rs+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=s.charCodeAt(i+1);c3=s.charCodeAt(i+2);rs+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}}
return rs;};

vjo.ctype("vjo.darwin.core.ebayheader.rtm.GlobalHeaderRtmCall").needs(["vjo.dsf.typeextensions.string.Decode","vjo.dsf.cookie.VjCookieJar","vjo.dsf.utils.Object"]).props({iTimer:null,submitRTMCall:function(_1){var un="undefined",lh=window.location.href;if(!lh.hasAny("catalog.")&&(lh.hasAny("offer.")||!(typeof(ebay)!=un&&typeof(ebay.oDocument)!=un&&ebay.oDocument._getControl("rtm")))&&!(typeof(vjo)!=un&&typeof(vjo.dsf)!=un&&typeof(vjo.dsf.ServiceEngine)!=un&&typeof(vjo.dsf.ServiceEngine.inProcHdl)!=un&&typeof(vjo.dsf.ServiceEngine.inProcHdl.svcHdls)!=un&&typeof(vjo.dsf.ServiceEngine.inProcHdl.svcHdls.RTM_CALLBACK_SERVICE)!=un)&&typeof(_oGlobalNavRTMInfo)!==un&&!(typeof(rtm)!=un)){if(_oGlobalNavRTMInfo.aRTMPlacementData.length>0){this.iTimer=window.setInterval(this.vj$.Object.hitch(this,"init"),1);}}else{if(_oGlobalNavRTMInfo.aRTMPlacementData.length>0){if(lh.hasAny("shop.","icatalog.","catalog.")&&!lh.hasAny("hub.")){this.init();}}}},getUid:function(){var _3=this.vj$.VjCookieJar.readCookie("dp1","u1p"),u1pDecoded;if(_3){u1pDecoded=_3.decodeBase64().decodeUTF8();}
return u1pDecoded;},getGuid:function(){return this.vj$.VjCookieJar.readCookie("ebay","sgj");},hasUid:function(_4){if(_4){return true;}
if(this.getUid().has("@@__@@__@@")){return false;}
return true;},init:function(){if(typeof(vjo.darwin.core.rtm)=="undefined"){return;}
if(this.iTimer!=null){window.clearInterval(this.iTimer);}
var _5=_oGlobalNavRTMInfo.aRTMPlacementData,data,widths=[],htmlIds=[],heights=[],pids=[],dblclkUrls=[],defaultUrls=[],url;for(i=0;i<_5.length;i++){data=_5[i];widths[i]=data.maxWidth;htmlIds[i]=data.htmlId;heights[i]=data.maxHeight;pids[i]=data.pid;dblclkUrls[i]="";defaultUrls[i]="";url=data.rtmUrl+"?RtmCmd&a=json"+(this.hasUid(data.userId)?("&l="+(data.userId?data.userId:this.getUid())):"")+"&g="+(data.gUid?data.gUid:this.getGuid())+"&ord="+data.ord+((data.oid)?"&i="+data.oid:"");}
url+="&p="+pids.join(":");_oGlobalNavRTMInfo.sRTMUrl=url;if(_5.length>0){var _6=new vjo.darwin.core.rtm.RTMInit({"url":url,"widths":widths,"htmlIds":htmlIds,"heights":heights,"pids":pids,"dblclkUrls":dblclkUrls,"defaultUrls":defaultUrls});_6.invoke({});}}}).endType();
(function () {
var _r = vjo.Registry;
_r.put('FooterTrackingCompSpecGenerator_0',new vjo.darwin.tracking.enabler.TrackingModuleEnabler("_trksid", "_trkparms", "m40;", ";")); })();
function FooterTrk(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
_d.add('glbfooter','click',function(event) { this.handle(event); },_r._FooterTrackingCompSpecGenerator_0);})();  }};};
vjo.dsf.EventDispatcher.add('body','load', new FooterTrk());
(function () {
var _r = vjo.Registry;
function $o0(p0,p1,p10,p13){return new vjo.darwin.core.dynamicmenu.DynamicMenu(p0,p1,"dynMenuCtr",75,250,900,800,1,1,1,p10,1,0,p13,"items","","hovered","","","");};_r.put('BuyMenu',$o0("Buy","Buy-menu",5,"get_Buy_menu")); _r.put('SellMenu',$o0("Sell","Sell-menu",1,"get_Sell_menu")); _r.put('MyEbayMenu',$o0("MyEbay","MyEbay-menu",1,"get_MyEbay_menu")); _r.put('CommunityMenu',$o0("Community","Community-menu",1,"get_Community_menu")); _r.put('HelpMenu',$o0("Help","Help-menu",1,"get_Help_menu")); })();
function NavMenuBind(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
_r.put('CorePrimaryNavResourceSpec_1', new vjo.darwin.core.dynamicmenu.Hide("BuyMenu")); _r.put('CorePrimaryNavResourceSpec_2', new vjo.darwin.core.dynamicmenu.Stay("BuyMenu")); _r.put('CorePrimaryNavResourceSpec_3', new vjo.darwin.core.dynamicmenu.Show("BuyMenu")); _r.put('CorePrimaryNavResourceSpec_4', new vjo.darwin.core.dynamicmenu.Hide("BuyMenu")); _r.put('CorePrimaryNavResourceSpec_6', new vjo.darwin.core.dynamicmenu.Hide("SellMenu")); _r.put('CorePrimaryNavResourceSpec_7', new vjo.darwin.core.dynamicmenu.Stay("SellMenu")); _r.put('CorePrimaryNavResourceSpec_8', new vjo.darwin.core.dynamicmenu.Show("SellMenu")); _r.put('CorePrimaryNavResourceSpec_9', new vjo.darwin.core.dynamicmenu.Hide("SellMenu")); _r.put('CorePrimaryNavResourceSpec_11', new vjo.darwin.core.dynamicmenu.Hide("MyEbayMenu")); _r.put('CorePrimaryNavResourceSpec_12', new vjo.darwin.core.dynamicmenu.Stay("MyEbayMenu")); _r.put('CorePrimaryNavResourceSpec_13', new vjo.darwin.core.dynamicmenu.Show("MyEbayMenu")); _r.put('CorePrimaryNavResourceSpec_14', new vjo.darwin.core.dynamicmenu.Hide("MyEbayMenu")); _r.put('CorePrimaryNavResourceSpec_16', new vjo.darwin.core.dynamicmenu.Hide("CommunityMenu")); _r.put('CorePrimaryNavResourceSpec_17', new vjo.darwin.core.dynamicmenu.Stay("CommunityMenu")); _r.put('CorePrimaryNavResourceSpec_18', new vjo.darwin.core.dynamicmenu.Show("CommunityMenu")); _r.put('CorePrimaryNavResourceSpec_19', new vjo.darwin.core.dynamicmenu.Hide("CommunityMenu")); _r.put('CorePrimaryNavResourceSpec_21', new vjo.darwin.core.dynamicmenu.Hide("HelpMenu")); _r.put('CorePrimaryNavResourceSpec_22', new vjo.darwin.core.dynamicmenu.Stay("HelpMenu")); _r.put('CorePrimaryNavResourceSpec_23', new vjo.darwin.core.dynamicmenu.Show("HelpMenu")); _r.put('CorePrimaryNavResourceSpec_24', new vjo.darwin.core.dynamicmenu.Hide("HelpMenu")); _d.add('Buy-menu','mouseout',_r.get('CorePrimaryNavResourceSpec_1'));_d.add('Buy-menu','mouseover',_r.get('CorePrimaryNavResourceSpec_2'));_d.add('Buy','mouseover',_r.get('CorePrimaryNavResourceSpec_3'));_d.add('Buy','mouseout',_r.get('CorePrimaryNavResourceSpec_4'));_d.add('Sell-menu','mouseout',_r.get('CorePrimaryNavResourceSpec_6'));_d.add('Sell-menu','mouseover',_r.get('CorePrimaryNavResourceSpec_7'));_d.add('Sell','mouseover',_r.get('CorePrimaryNavResourceSpec_8'));_d.add('Sell','mouseout',_r.get('CorePrimaryNavResourceSpec_9'));_d.add('MyEbay-menu','mouseout',_r.get('CorePrimaryNavResourceSpec_11'));_d.add('MyEbay-menu','mouseover',_r.get('CorePrimaryNavResourceSpec_12'));
_d.add('MyEbay','mouseover',_r.get('CorePrimaryNavResourceSpec_13'));_d.add('MyEbay','mouseout',_r.get('CorePrimaryNavResourceSpec_14'));_d.add('Community-menu','mouseout',_r.get('CorePrimaryNavResourceSpec_16'));_d.add('Community-menu','mouseover',_r.get('CorePrimaryNavResourceSpec_17'));_d.add('Community','mouseover',_r.get('CorePrimaryNavResourceSpec_18'));_d.add('Community','mouseout',_r.get('CorePrimaryNavResourceSpec_19'));_d.add('Help-menu','mouseout',_r.get('CorePrimaryNavResourceSpec_21'));_d.add('Help-menu','mouseover',_r.get('CorePrimaryNavResourceSpec_22'));_d.add('Help','mouseover',_r.get('CorePrimaryNavResourceSpec_23'));_d.add('Help','mouseout',_r.get('CorePrimaryNavResourceSpec_24'));
})();  }};};
vjo.dsf.EventDispatcher.add('body','load', new NavMenuBind());
(function () {
var _r = vjo.Registry;
_r.put('BrowseCategoriesMenu',new vjo.darwin.core.dynamicmenu.DynamicMenu("BrowseCategories", "BrowseCategories-menu", "dynMenuCtr", 75, 250, 900, 800, 3, 3, 3, -10, 7, 0, "getBrowseCatsDAPData", "items", "100%", "hovered", "", "", ".ebay.com")); })();
function SecNavMenuBind(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
_r.put('CoreSecondaryNavResourceSpec_1', new vjo.darwin.core.dynamicmenu.Hide("BrowseCategoriesMenu")); _r.put('CoreSecondaryNavResourceSpec_2', new vjo.darwin.core.dynamicmenu.Stay("BrowseCategoriesMenu")); _r.put('CoreSecondaryNavResourceSpec_3', new vjo.darwin.core.dynamicmenu.Show("BrowseCategoriesMenu")); _r.put('CoreSecondaryNavResourceSpec_4', new vjo.darwin.core.dynamicmenu.Hide("BrowseCategoriesMenu")); _d.add('BrowseCategories-menu','mouseout',_r.get('CoreSecondaryNavResourceSpec_1'));_d.add('BrowseCategories-menu','mouseover',_r.get('CoreSecondaryNavResourceSpec_2'));_d.add('BrowseCategories','mouseover',_r.get('CoreSecondaryNavResourceSpec_3'));_d.add('BrowseCategories','mouseout',_r.get('CoreSecondaryNavResourceSpec_4'));})();  }};};
vjo.dsf.EventDispatcher.add('body','load', new SecNavMenuBind());
(function () {
var _r = vjo.Registry;
function $o0(){return new vjo.darwin.tracking.enabler.TrackingModuleEnabler("_trksid","_trkparms","m38;",";");};_r.put('HeaderTrackingCompSpecGenerator_0',$o0()); _r.put('HeaderTrackingCompSpecGenerator_1',$o0()); })();
function HeaderTrk(){ return {handle:function (event){ (function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
function $0(){return function(event){return this.handle(event);};};_d.add('BrowseCategories-menu','click',$0(),_r._HeaderTrackingCompSpecGenerator_0);_d.add('gnheader','click',$0(),_r._HeaderTrackingCompSpecGenerator_1);_d.add('body','click',function(event){ vjo.darwin.tracking.enabler.TrackingEnabler.copySIDToCookie(event, "_trksid", "_sp", "_trkparms");  });})();  }};};
vjo.dsf.EventDispatcher.add('body','load', new HeaderTrk());
(function () {
var _r = vjo.Registry;
_r.put('category0',new vjo.darwin.core.dynamicdropdown.DynamicDropdown("category0", "getBrowseCategoriesData", "items", 1)); })();
(function(){(function(){
var _d=vjo.dsf.EventDispatcher;
var _r=vjo.Registry;
_d.add('body','load',function(event) { this.fill(); },_r._category0);})();})();

// en_US/e631/GH_YODA3_Ebay_e6319884065_1_en_US
// b=9884065