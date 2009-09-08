//20070116
var rrFac = new Array();
rrFac[0] = "olspage.jsp?id=pcat17080&amp;type=page&amp;nrp=15&amp;cp=1&amp;sc=Global&amp;usc=cat00000&amp;sp=";


var rrRcFac = new Array();
var strRcFacNav ="";
var strRcLFacNav ="";
var delm = "";
function fFac(txt) {
	for (j=0;j<rrFac.length;j++){
		if (txt.toLowerCase().indexOf(rrFac[j].toLowerCase()) != -1){
			return true;}
	}
	return false;
}
function rrFacFind (obj,del,so) {
	var k = 0;
	var rrNav;
	if (so==0){
		rrNav=document.getElementById(obj).innerHTML;
	}else{
		rrNav=obj;
	}
	var rrNavSp = rrNav.split(del);
	for (i=0;i<rrNavSp.length;i++){
		var strLook = fFac(rrNavSp[i]);
		if (!(strLook)) {
			rrRcFac[k] = rrNavSp[i];k++;
		}
	}
}

try
{
	if (document.getElementById('searchstate')){
		rrFacFind('searchstate','&gt;',0);
		for (i=0;i<rrRcFac.length;i++){
			if (i < (rrRcFac.length-1)){
				delm="&gt;";
			}else{
				delm="";
			}
			strRcLFacNav += (rrRcFac[i]+delm);
		}
		document.getElementById('searchstate').innerHTML=strRcLFacNav;
	}
}
catch(e){}


