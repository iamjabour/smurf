var agt=navigator.userAgent.toLowerCase();
var is_major = parseInt(navigator.appVersion);
var is_minor = parseFloat(navigator.appVersion);
var is_nav  = ((agt.indexOf('mozilla')!=-1) && (agt.indexOf('spoofer')==-1)
			&& (agt.indexOf('compatible') == -1) && (agt.indexOf('opera')==-1)
			&& (agt.indexOf('webtv')==-1) && (agt.indexOf('hotjava')==-1));
var is_nav2 = (is_nav && (is_major == 2));
var is_nav3 = (is_nav && (is_major == 3));
var is_nav4 = (is_nav && (is_major == 4));
var is_nav4up = (is_nav && (is_major >= 4));
var is_navonly      = (is_nav && ((agt.indexOf(";nav") != -1) ||
					  (agt.indexOf("; nav") != -1)) );
var is_nav6 = (is_nav && (is_major == 5));
var is_nav6up = (is_nav && (is_major >= 5));
var is_gecko = (agt.indexOf('gecko') != -1);
var is_ie     = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1));
var is_ie3    = (is_ie && (is_major < 4));
var is_ie4    = (is_ie && (is_major == 4) && (agt.indexOf("msie 4")!=-1) );
var is_ie4up  = (is_ie && (is_major >= 4));
var is_ie5    = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.0")!=-1) );
var is_ie5_5  = (is_ie && (is_major == 4) && (agt.indexOf("msie 5.5") !=-1));
var is_ie5up  = (is_ie && !is_ie3 && !is_ie4);
var is_ie5_5up =(is_ie && !is_ie3 && !is_ie4 && !is_ie5);
var is_ie6    = (is_ie && (is_major == 4) && (agt.indexOf("msie 6.")!=-1) );
var is_ie6up  = (is_ie && !is_ie3 && !is_ie4 && !is_ie5 && !is_ie5_5);
var is_aol   = (agt.indexOf("aol") != -1);
var is_aol3  = (is_aol && is_ie3);
var is_aol4  = (is_aol && is_ie4);
var is_aol5  = (agt.indexOf("aol 5") != -1);
var is_aol6  = (agt.indexOf("aol 6") != -1);
var is_opera = (agt.indexOf("opera") != -1);
var is_opera2 = (agt.indexOf("opera 2") != -1 || agt.indexOf("opera/2") != -1);
var is_opera3 = (agt.indexOf("opera 3") != -1 || agt.indexOf("opera/3") != -1);
var is_opera4 = (agt.indexOf("opera 4") != -1 || agt.indexOf("opera/4") != -1);
var is_opera5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1);
var is_opera5up = (is_opera && !is_opera2 && !is_opera3 && !is_opera4);
var is_webtv = (agt.indexOf("webtv") != -1);
var is_TVNavigator = ((agt.indexOf("navio") != -1) || (agt.indexOf("navio_aoltv") != -1));
var is_AOLTV = is_TVNavigator;
var is_hotjava = (agt.indexOf("hotjava") != -1);
var is_hotjava3 = (is_hotjava && (is_major == 3));
var is_hotjava3up = (is_hotjava && (is_major >= 3));
var is_js;
if (is_nav2 || is_ie3) is_js = 1.0;
else if (is_nav3) is_js = 1.1;
else if (is_opera5up) is_js = 1.3;
else if (is_opera) is_js = 1.1;
else if ((is_nav4 && (is_minor <= 4.05)) || is_ie4) is_js = 1.2;
else if ((is_nav4 && (is_minor > 4.05)) || is_ie5) is_js = 1.3;
else if (is_hotjava3up) is_js = 1.4;
else if (is_nav6 || is_gecko) is_js = 1.5;
else if (is_nav6up) is_js = 1.5;
else if (is_ie5up) is_js = 1.3;
else is_js = 0.0;
var is_win   = ( (agt.indexOf("win")!=-1) || (agt.indexOf("16bit")!=-1) );
var is_win95 = ((agt.indexOf("win95")!=-1) || (agt.indexOf("windows 95")!=-1));
var is_win16 = ((agt.indexOf("win16")!=-1) ||
		   (agt.indexOf("16bit")!=-1) || (agt.indexOf("windows 3.1")!=-1) ||
		   (agt.indexOf("windows 16-bit")!=-1) );
var is_win31 = ((agt.indexOf("windows 3.1")!=-1) || (agt.indexOf("win16")!=-1) ||
				(agt.indexOf("windows 16-bit")!=-1));
var is_winme = ((agt.indexOf("win 9x 4.90")!=-1));
var is_win2k = ((agt.indexOf("windows nt 5.0")!=-1));
var is_win98 = ((agt.indexOf("win98")!=-1) || (agt.indexOf("windows 98")!=-1));
var is_winnt = ((agt.indexOf("winnt")!=-1) || (agt.indexOf("windows nt")!=-1));
var is_win32 = (is_win95 || is_winnt || is_win98 ||
				((is_major >= 4) && (navigator.platform == "Win32")) ||
				(agt.indexOf("win32")!=-1) || (agt.indexOf("32bit")!=-1));
var is_os2   = ((agt.indexOf("os/2")!=-1) ||
				(navigator.appVersion.indexOf("OS/2")!=-1) ||
				(agt.indexOf("ibm-webexplorer")!=-1));
var is_mac    = (agt.indexOf("mac")!=-1);
if (is_mac && is_ie5up) is_js = 1.4;
var is_mac68k = (is_mac && ((agt.indexOf("68k")!=-1) ||
						   (agt.indexOf("68000")!=-1)));
var is_macppc = (is_mac && ((agt.indexOf("ppc")!=-1) ||
							(agt.indexOf("powerpc")!=-1)));
var is_sun   = (agt.indexOf("sunos")!=-1);
var is_sun4  = (agt.indexOf("sunos 4")!=-1);
var is_sun5  = (agt.indexOf("sunos 5")!=-1);
var is_suni86= (is_sun && (agt.indexOf("i86")!=-1));
var is_irix  = (agt.indexOf("irix") !=-1);
var is_irix5 = (agt.indexOf("irix 5") !=-1);
var is_irix6 = ((agt.indexOf("irix 6") !=-1) || (agt.indexOf("irix6") !=-1));
var is_hpux  = (agt.indexOf("hp-ux")!=-1);
var is_hpux9 = (is_hpux && (agt.indexOf("09.")!=-1));
var is_hpux10= (is_hpux && (agt.indexOf("10.")!=-1));
var is_aix   = (agt.indexOf("aix") !=-1);
var is_aix1  = (agt.indexOf("aix 1") !=-1);
var is_aix2  = (agt.indexOf("aix 2") !=-1);
var is_aix3  = (agt.indexOf("aix 3") !=-1);
var is_aix4  = (agt.indexOf("aix 4") !=-1);
var is_linux = (agt.indexOf("inux")!=-1);
var is_sco   = (agt.indexOf("sco")!=-1) || (agt.indexOf("unix_sv")!=-1);
var is_unixware = (agt.indexOf("unix_system_v")!=-1);
var is_mpras    = (agt.indexOf("ncr")!=-1);
var is_reliant  = (agt.indexOf("reliantunix")!=-1);
var is_dec   = ((agt.indexOf("dec")!=-1) || (agt.indexOf("osf1")!=-1) ||
	   (agt.indexOf("dec_alpha")!=-1) || (agt.indexOf("alphaserver")!=-1) ||
	   (agt.indexOf("ultrix")!=-1) || (agt.indexOf("alphastation")!=-1));
var is_sinix = (agt.indexOf("sinix")!=-1);
var is_freebsd = (agt.indexOf("freebsd")!=-1);
var is_bsd = (agt.indexOf("bsd")!=-1);
var is_unix  = ((agt.indexOf("x11")!=-1) || is_sun || is_irix || is_hpux ||
			 is_sco ||is_unixware || is_mpras || is_reliant ||
			 is_dec || is_sinix || is_aix || is_linux || is_bsd || is_freebsd);
var is_vms   = ((agt.indexOf("vax")!=-1) || (agt.indexOf("openvms")!=-1));
function openContextSensitiveLink(contentId)
{
	URL = "olspage.jsp?id="+pageContextId+"&type="+pageType+"&contentId="+contentId+"&entryURLID="+entryURLID+"&entryURLType="+entryURLType;
	javascript:popUp(URL,'Content_Sensitive_Help_Topic','3','0');
}
function openContextSensitiveLinkCheckout(contentId)
{
	URL = "olspage.jsp?id="+chkoutContextId+"&type="+pageType+"&contentId="+contentId+"&entryURLID="+entryURLID+"&entryURLType="+entryURLType;
	javascript:popUp(URL,'Context_Sensitive_Help_Topic_Checkout','3','0');
}
function ratingPopup(ratingCatID,contentId)
{
	var url = 'olspage.jsp?id='+ratingCatID+'&contentId='+contentId+'&type=page';
	popUp(url,'ratingWindow','3','0');
}
function handleEnterKeyPress(formName)
{
	var userEnteredValue = formName.txtkeywords.value;
	userEnteredValue = trim(userEnteredValue);
	if(navigator.appName == "Microsoft Internet Explorer")
	{
		if(window.event.keyCode == 13)
		{
			if(searchButtonClicked)
			{
				return false;
			}
			else
			{
				searchButtonClicked=true;
			}

			if(userEnteredValue == "")
			{
				alert("Please specify a string to search");
				formName.txtkeywords.value = "";
				formName.txtkeywords.focus();
				searchButtonClicked=false;
				return false;
			}
			else
			{
				formName.submit();
			}
		}
	}
	if(navigator.appName == "Netscape")
	{
		canSearch=true;
		if(arguments.callee.caller.arguments[0].which == 13)
		{
			if(searchButtonClicked)
			{
				return false;
			}
			else
			{
				searchButtonClicked=true;
			}

			if (userEnteredValue == "")
			{
				alert("Please specify a string to search");
				formName.txtkeywords.value = "";
				formName.txtkeywords.focus();
				searchButtonClicked=false;
				canSearch = false;
				return false;
			}
			else
			{
				formName.submit();
			}
		}
	}
}
var canSearch=true;
function checkForEmptyField(formName)
{
	if(searchButtonClicked)
	{
		return false;
	}
	else
	{
		searchButtonClicked=true;
	}

	var userEnteredValue = formName.txtkeywords.value;
	userEnteredValue = trim(userEnteredValue);
	if(userEnteredValue == "")
	{
		alert("Please specify a search string");
		formName.txtkeywords.value = "";
		formName.txtkeywords.focus();
		searchButtonClicked=false;
		return false;
	}
}
function trim(strTxt)
{
   while(''+strTxt.charAt(0)==' ')
   strTxt=strTxt.substring(1,strTxt.length);

	while(''+strTxt.charAt(strTxt.length-1)==' ')
		strTxt=strTxt.substring(0,strTxt.length-1);
	return strTxt;
}
function showRebateWindow(pageId, contentId, productId)
{
   popUp('olspage.jsp?id='+pageId+'&productId='+productId+'&type=page&contentId='+contentId,'Rebate','3','0');
}
function openSite(url,colSize)
{
	popUpRawURL(url,'thirdPartyWindow',colSize,'0');
}
function buildcontext(link)
{
	prevUrl=link.href;
	parameters=prevUrl.slice(prevUrl.indexOf("?"));
	prevPathname=link.pathname;
	actualUrl=addJsessionIdIfRequired(contextRoot+"/"+prevPathname+parameters);
	link.href=actualUrl;
}
function addSiteMapJsessionId(link)
{
	prevUrl=link.href;
	parameters=prevUrl.slice(prevUrl.indexOf("?"));
	prevPathname=link.pathname;
	if(prevPathname.charAt(0) != '/')
	{	//fix for IE. In IE, link.pathname returns without slash for the first half of the url. But firefox returns with slash
		prevPathname = '/' + prevPathname;
	}
	actualUrl=addJsessionIdIfRequired(prevPathname+parameters);
	link.href=actualUrl;
}
function displayImg(imagename, height, width, alttag, align){
	var outString = '<img src="' + imgServer;

	if (imagename){
		if (imagename){
			outString = outString + imagename + '"';
		}
		if (height){
			outString = outString + ' height=' + height;
		}
		if (width){
			outString = outString + ' width=' + width;
		}
		outString = outString + ' border=0';
		if (alttag){
			outString = outString + ' alt="' + alttag + '"';
		}
		if (align){
			outString = outString + ' align="' + align + '"';
		}
		outString = outString + '>';
		document.write(outString);
	}
	else{
	}
}
var newWindow;
var intspacerstrheight;
var strwidth;
var strheight;
var stringurl;
var intadjust;
var intspacerheight;
//we need to default the popup to a min strheight
agt=navigator.userAgent.toLowerCase();
if (agt.indexOf("win")!=-1) {
	intadjust= "0"
} else {
	intadjust= "16"
	}

// Internal Pop-ups
function popUp(strurl,strname,strcolumn,strresize) 
{
	if(strurl.indexOf("olspage") == 0)
	{
		strurl = contextRoot+"/"+strurl ;
	}
	popUpCommon(strurl,strname,strcolumn,strresize,true);
}

// External Pop-ups
// (New method added For Macintosh - IE browser issue.)
// adapated for cookieless user
function popUpRawURL(strurl,strname,strcolumn,strresize) 
{
	if ( strurl.indexOf("://") == -1 )
	{
		strurl =  "http://" + strurl ;
	}

	popUpCommon(strurl,strname,strcolumn,strresize,true,true);
}

function popUpCommon(strurl,strname,strcolumn,strresize,addspacerheight,thirdParty)
{
	strcolumn = strcolumn + '';
	if (newWindow) 
	{
		if (newWindow.closed == false) 
		{
			newWindow.close();
		}
	}
	switch (strcolumn)
	{
		case '6':
			strwidth = "800";
			strheight = "550";
			intspacerheight = (parseInt(intadjust) + 488);
			break;
		case '5':
			strwidth = "680";
			strheight = "450";
			intspacerheight = (parseInt(intadjust) + 387);
			break;
		case '4':
			strwidth = "550";
			strheight = "450";
			intspacerheight = (parseInt(intadjust) + 387);
			break;    	
		case '3':
			strwidth = "420";
			strheight = "350";
			intspacerheight = (parseInt(intadjust) + 287);
			break;    	
		case '2':
			strwidth = "290";
			strheight = "300";
			intspacerheight = (parseInt(intadjust) + 237);
			break;	        
	}
	if (addspacerheight)
	{
		var appendChar = '?';
		if(strurl.indexOf('?') != -1)
		{
		appendChar = '&';
		}
		strurl = strurl+appendChar+"h="+intspacerheight;
	}
	if(!thirdParty)
	{
		strurl=addJsessionIdIfRequired(strurl);
	}
	newWindow = window.open(strurl,strname,'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable='+strresize+',width='+strwidth+',height='+strheight+',left=50,top=200');
}

function openDiscographyPopup(discographId,pageCatId)
{
	popUp('olspage.jsp?id='+pageCatId+'&ArtistId='+discographId+'&type=page','Discography','4','0');
}
function handleEnterKey(formName)
{
    if(navigator.appName == "Microsoft Internet Explorer")
    {
       if(window.event.keyCode == 13)
       {
            formName.submit();
       }
    }
}
function openDetailPage(url)
{
    url = addJsessionIdIfRequired(url);
    if(window.opener != null)
    {
        if((window.opener) && (!(window.opener.closed)) )
        {
             window.opener.location.href = url;
             window.opener.focus();
        }
        else
        {
             newWindow = window.open(url, 'pdpWindow','toolbar=1,location=1,directories=1,status=1,menubar=1,scrollbars=1,resizable=1');
             newWindow.focus();
        }
        window.close();

     }
     else
     {
         window.location.href = url;
     }
}

function addJsessionIdIfRequired(url)
{
    var jsessionid = getJSessionId(); //check if jsessionid is part of the parent URI
    
    if((jsessionid != null) && (url.indexOf("jsessionid")) == -1) //found sessionid in the parent url and doesn’t exist in the current url
    {
	//replace ? with ;jsessionid=xxxxxxxxxxxxxxx?. This is to resolve both olspage.jsp and olslinks.jsp
    	url = url.replace("?",";"+jsessionid+"?");
    }
    return url;
}

function getJSessionId()
{
    var parentURL=document.location.href; //retrieve the current URL of user browser
    var jsessionid = parentURL.match(/jsessionid=[a-z0-9]+/i); //extract the jsessionid
    return jsessionid;
}

