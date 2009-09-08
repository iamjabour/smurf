var gDomain="wtb.americanas.com.br";
var gDcsId="dcs20cr2u0pkytlvcatlar3yv_5v5h";

// Code section for Use the new first-party cookie generated with this tag.
var gFpc="WT_FPC";
var gConvert=true;


if ((typeof(gConvert)!="undefined")&&gConvert&&(document.cookie.indexOf(gFpc+"=")==-1)&&(document.cookie.indexOf("WTLOPTOUT=")==-1)){
	document.write("<SCR"+"IPT TYPE='text/javascript' SRC='"+"http"+(window.location.protocol.indexOf('https:')==0?'s':'')+"://"+gDomain+"/"+gDcsId+"/wtid.js"+"'><\/SCR"+"IPT>");
}