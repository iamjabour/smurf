//20080129c
function switchLanguage() {
urls=new Array();
oh=new Array();tsd=new Array();
tsh='espanol.bestbuy.com';
oh[0]='reviews.bestbuy.com';tsd[0]='/enes/sdreviews/';
oh[1]='communications.bestbuy.com';tsd[1]='/enes/sdcommunications/';
oh[2]='careers.bestbuy.com';tsd[2]='/enes/sdcareers/';
oh[3]='a248.e.akamai.net';tsd[3]='/enes/dakamai/';
oh[4]='postpublisher.net';tsd[4]='/enes/dpostpublisher/';
oh[5]='www.bestbuy.com';tsd[5]='/enes/';
oh[6]='kiosk.bestbuy.com';tsd[6]='/enes/';
oh[7]='preview.bestbuy.com:20415';tsd[7]='/enes/';
urls[0]=new URLData(tsh, oh, tsd);
oh=new Array();tsd=new Array();
tsh='espanol-ssl.bestbuy.com';
oh[0]='www-ssl.bestbuy.com';tsd[0]='/enes/ssl/'; 
urls[1]=new URLData(tsh, oh, tsd);
found=false;
for (i=0;i<urls.length;i++){ 
	idx=location.href.indexOf(urls[i].tsh);
	if(idx==-1){
		for (j=0;j<urls[i].oh.length;j++){ 
			idx=location.href.indexOf(urls[i].oh[j]);
			if(idx>-1){
				idx=idx+urls[i].oh[j].length;hname=urls[i].tsh+urls[i].tsd[j];
				found=true;
				break;
			}
		}
	}else{
		if (inKiosk()) {
			location.href='http://kiosk.bestbuy.com';
			return false;
		}
		for (j=0;j<urls[i].tsd.length;j++){ 
			idx=location.href.indexOf(urls[i].tsd[j]);
			if(idx>-1){
				idx=idx+urls[i].tsd[j].length;hname=urls[i].oh[j];
				found=true;
				break;
			}
		}
	}
	if (found) break;
}
path=location.href.substring(idx);
hend=hname.charAt(hname.length-1);pstart=path.charAt(0);
if(hend=='/' && pstart=='/')path=path.substring(path.indexOf('/')+1);
if(hend!='/' && pstart!='/')path='/'+path;
if (path.substring((path.length-4),path.length)=='.jsp'){var sep='?'}else{var sep='&'}
if (path == '/'){path+='site/olspage.jsp?type=category&id=cat00000'};

if ((isKiosk) && (is_ie)){
	path+= sep+'context=k&storenum='+getSnum()+'&machinenum='+getMnum();
}
window.location= location.protocol+'//'+hname+path;
return false;
}
function URLData(tsh, oh, tsd) {
this.tsh = tsh;
this.oh = oh;
this.tsd = tsd;
}
function inKiosk() {
return location.href.indexOf('context=k') > 0 || document.cookie.indexOf('bbykioskmp=true') > 0;
}
var isSpanish=false;var isEnglish=false;
if ( location.host.indexOf("www")!= -1 || location.host.indexOf("preview")!=-1 || location.host.indexOf("kiosk")!=-1){isEnglish = true;}else if(location.host.indexOf("espanol")!=-1){isSpanish=true;}
