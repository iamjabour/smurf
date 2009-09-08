function artistPopup(biographyCatID,biographyId)
{
    var url = 'olspage.jsp?id='+biographyCatID+'&type=page&biographyId='+biographyId;
    popUp(url,'ArtistBioGraph','4','0');
}

function ratingPopup(ratingCatID,contentId)
{
    var url = 'olspage.jsp?id='+ratingCatID+'&glossaryId='+contentId+'&type=page';
    popUp(url,'Rating','3','0');
}

function openPopup(url,title)
{
    popUp(url,title,4,0);
}

function trim(strTxt)
{

   while(''+strTxt.charAt(0)==' ')
   strTxt=strTxt.substring(1,strTxt.length);


    while(''+strTxt.charAt(strTxt.length-1)==' ')
        strTxt=strTxt.substring(0,strTxt.length-1);

    return strTxt;

}

var canSearch=true;
var searchButtonClicked=false;


//This is a generic javascript function. It will take in two parameters, hiddenFields and hiddenFieldValues. The hiddenFields will be a comma separated string listing down the names of hidden fields that need to be overwritten and the hiddenFieldValues will be the list of values that the hiddenFields should be overwritten with.
//For example: <a href="Javascript:performNewSearch('list,sc,qs','y,cat0000,abc');" > See All </a>
//This call will set the hidden form variable ‘sf’ with ‘abc’ and ‘uv’ with ‘*’.

function performNewSearch(hiddenFields, hiddenFieldValues)
{
	/*****
	This fix is for the Firefox Back button. When the user hits the Back button in IE the page gets reloaded
	initialising the value of "sc" to "global". But the same scenario is Firefox is dfferent.
	The page does not get reloaded and Firefox remembers the latest value of "sc" field of the form.

	For this javascript function preformNewSearch if "sc" is one of the parameters
	then the passed value of "sc" is assigned to the form hidden object "sc" else
	the value from the query string is assigned.

	******/

	if(navigator.appName == "Netscape")
	{
		resetFormWithQueryString();
	}

    var fieldNames=hiddenFields.split(",,");
    var fieldValues=hiddenFieldValues.split(",,");

    for(var i=0;i< fieldNames.length;i++)
    {
        var field=document.getElementById(fieldNames[i]);
        eval("document.frmSearchResults."+field.name).value=fieldValues[i];

        if(!field)
        {
            alert("Not a valid hidden field");
            continue;
        }
    }
    document.frmSearchResults.cp.value="1";
    resetSearchPageCatId(document.forms["frmSearchResults"]);
    document.frmSearchResults.submit();
}

// The function that does the work.
function resetFormWithQueryString() 
{
	//
	// To customize your form, specify form's name 
	//   between the quotes on the next line.
	var FormName = "frmSearchResults";

	// Find the location of the ? in the URL.
	var questionlocation = location.href.indexOf('?');

	// If no ?, return out of the function.
	if(questionlocation < 0) { return; }

	// Assign the text following the ? to variable q
	// The text might look something like (just an example):
	//   name=will%20%22B%22&email=will%40example.com&fun=yes
	var q = location.href.substr(questionlocation + 1);

	// Split q on & characters and assign to array variable list.
	// (In other words, chop the string at each & character 
	//    and store the pieces in an array variable named list.)
	// The array elements, using the above example, are:
	//      name=will%20%22B%22
	//      email=will%40example.com
	//      money=enough
	var list = q.split('&');

	// For each element of array list, execute the {} block.
	for(var i = 0; i < list.length; i++) 
	{

	   // Split the list array element on = character and 
	   //   assign the pieces to array variable kv.
	   // kv[0] will then contain the field name and kv[1] 
	   //   will contain the field value.
	   var kv = list[i].split('=');
	   
	   if(kv[0] == "sc" || kv[0] == "qp" || kv[0] == "list"
	            || kv[0] == "nrp" || kv[0] == "sp")
	   {
		   // If the form does not have a field name kv[0], 
		   //   go to the top of the {} loop and continue there.
		   if(! eval('document.'+FormName+'.'+kv[0])) 
		   {
		      continue; 
		   }


		   // Convert %##'s to the actual characters.
		   //    will%20%22B%22 becomes: will "B"
		   //    will%40example.com becomes: will@example.com
           
		   kv[1] = unescape(kv[1]);

		   // If value kv[1] contains a " character, execute the 
		   //   {} loop.
		   // (The " character needs to be escaped because the 
		   //   value in the eval() function below uses " for field 
		   //   value delimiters.)
		   if(kv[1].indexOf('"') > -1) {

		      // Assign a regular expression to variable re. The 
		      //   expression looks for all " characters.
		      var re = /"/g;

		      // In kv[1], replace each " character with: \"
		      // (The \ itself needs to be escaped here.)
		      kv[1] = kv[1].replace(re,'\\"');
		      }

           if(kv[1].indexOf('+') > -1) {

               kv[1] = kv[1].replace(/\+/g," ");
              }

		   // Create an evaluation expression for the eval() 
		   //   function that assigns the value kv[1] to the 
		   //   form field kv[0].
		   eval('document.'+FormName+'.'+kv[0]+'.value="'+kv[1]+'"');
	    }
	}

	// end of function
}

function resetSearchPageCatId(formName)
{
    var objId = formName.searchCatId;
    objId.name = "id";
    return true;
}

function ValidateSearchStr(formName,defaultVar)
{
	if(searchButtonClicked)
	{
	  return false;
	}
	else
	{
	  searchButtonClicked=true;
	}

	var DefaultSearchTxt=defaultVar;
	var userEnteredValue = formName.st.value;
	userEnteredValue = trim(userEnteredValue);

	if((userEnteredValue == "")||(userEnteredValue==DefaultSearchTxt))
	{
		alert("Please enter keyword(s) or item number and try again");
		formName.st.value="";
		formName.st.focus();
		searchButtonClicked=false;
		return false;
	}
	else
	{
		resetSearchPageCatId(formName);
		formName.submit();
	}
	return false;
}

function handleOnClick(formName, defaultVar)
{
    if (formName.st.value == defaultVar)
    {
        formName.st.value = "";
    }
}

function handleEnterKeyPress(evnt,formName,defaultVar)
{
    var DefaultSearchTxt=defaultVar;
    var userEnteredValue = formName.st.value;
    userEnteredValue = trim(userEnteredValue);

    var characterCode;
    if(evnt && evnt.which)
    {
        evnt = evnt;
        characterCode = evnt.which;
    }
    else
    {
        evnt = event;
        characterCode = evnt.keyCode;
    }      

    if(navigator.appName == "Microsoft Internet Explorer")
    {
        if(characterCode == 13)
        {
            if(searchButtonClicked)
            {
               return false;
            }
            else
            {
               searchButtonClicked=true;
            }
            if((userEnteredValue == "")||(userEnteredValue==DefaultSearchTxt))
            {
                alert("Please enter keyword(s) or item number and try again");
                if(formName.name=="frmNewSearch")
                {
                	document.frmNewSearch.st.value="";
                    document.frmNewSearch.st.focus();
                }
                else
                {
                	document.frmSearch.st.value="";
                    document.frmSearch.st.focus();
                }
                searchButtonClicked=false;
                return false;
            }
            else
            {
                resetSearchPageCatId(formName);
                formName.submit();
                return false;
            }
        }
    }
    else if(navigator.appName == "Netscape")
    {
        var browser;
        browser=((navigator.userAgent.indexOf("Safari") > -1)?"Safari":browser);
        if(characterCode == 13)
        {
            if(searchButtonClicked)
            {
                return false;
            }
            else
            {
                searchButtonClicked=true;
            }
            if((userEnteredValue == "")||(userEnteredValue==DefaultSearchTxt))
            {
                // Safari browser does not detect the return value.This is an existing bug with Safari.
                // So in this case do not display the alert message and the form gets submitted
                // without a search term and goes to no results page.
                if(browser == "Safari")
                {
                    var objId = formName.searchCatId;
                    objId.name = "id";
                    return false;
                }
                else
                {
                    alert("Please enter keyword(s) or item number and try again");
                    if(formName.name=="frmNewSearch")
                    {
                        document.frmNewSearch.st.value="";
                        document.frmNewSearch.st.focus();
                    }
                    else
                    {
                        document.frmSearch.st.value="";
                        document.frmSearch.st.focus();
                    }

                    searchButtonClicked=false;
                    return false;
                }
            }
            else
            {
                resetSearchPageCatId(formName);
                formName.submit();
                 return false;
            }
        }
    }
}

function fnAddToCartFromSearch(productid, skuid, listPage)
{
    document.frmSearchCompare.lp.value = listPage;
    document.frmSearchCompare.productId.value=productid;
    document.frmSearchCompare.tempCatalogRefId.value=skuid;
    document.frmSearchCompare.addFromCart.value='true';
    document.frmSearchCompare.submit();

}

function fnSearchPageNav(cp)
{
    document.frmSearchCmpProducts.selectedProducts.value=frmSearchCompareString();
    document.frmSearchCmpProducts.unSelectedProducts.value=frmSearchCompareUnCheckString();
    document.frmSearchCmpProducts.currentPage.value=cp;
    document.frmSearchCmpProducts.submit();
}

function frmSearchCompare(pageCatId)
{
    var selectedProducts = "";
    var cmpURL = "";
    for(var count = 0; count < document.frmSearchCompare.elements.length; count++)
    {
        if(document.frmSearchCompare.elements[count].type == "checkbox")
        {
            if(document.frmSearchCompare.elements[count].checked == "1")
            {
                selectedProducts = selectedProducts + document.frmSearchCompare.elements[count].value + "*" ;
            }
        }
    }

    selectedProducts = selectedProducts.substring(0, selectedProducts.length-1);
    for (var count = 0; count < document.forms.length; count++)
    {
        if (document.forms[count].name == "frmAddCartBuy")
        {
            if (document.frmAddCartBuy.chkcomparebox.checked == "1")
            {
                selectedProducts = selectedProducts + "*" + document.frmAddCartBuy.chkcomparebox.value;
            }
        }
    }
    cmpURL = 'olspage.jsp?id='+pageCatId+'&type=page&pageIdentity=searchDriven&useProductString='+true+'&productString='+selectedProducts+'&unProductString='+frmSearchCompareUnCheckString();
    popUp(cmpURL,'Compare','6','0');
}

function frmSearchCompareString()
{
    var selectedProducts = "";
    for(var count = 0; count < document.frmSearchCompare.elements.length; count++)
    {
        if(document.frmSearchCompare.elements[count].type == "checkbox")
        {
            if(document.frmSearchCompare.elements[count].checked == "1")
            {
                selectedProducts = selectedProducts + document.frmSearchCompare.elements[count].value + "*" ;
            }
        }
    }
    selectedProducts = selectedProducts.substring(0, selectedProducts.length-1);
    for (var count = 0; count < document.forms.length; count++)
    {
        if (document.forms[count].name == "frmAddCartBuy")
        {
          for(var cnt = 0; cnt < document.frmAddCartBuy.elements.length; cnt++)
          {
            if(document.frmAddCartBuy.elements[cnt].name == "chkcomparebox")
            {
               if (document.frmAddCartBuy.chkcomparebox.checked == "1")
               {
                 selectedProducts = selectedProducts + "*" + document.frmAddCartBuy.chkcomparebox.value;
               }
            }
          }
        }
    }
    return selectedProducts;
}

function frmSearchCompareUnCheckString()
{
    var selectedProducts = "";
    for(var count = 0; count < document.frmSearchCompare.elements.length; count++)
    {
        if(document.frmSearchCompare.elements[count].type == "checkbox")
        {
            if(document.frmSearchCompare.elements[count].checked == "0")
            {
                selectedProducts = selectedProducts + document.frmSearchCompare.elements[count].value + "*" ;
            }
        }
    }
    selectedProducts = selectedProducts.substring(0, selectedProducts.length-1);
    for (var count = 0; count < document.forms.length; count++)
    {
        if (document.forms[count].name == "frmAddCartBuy")
        {
            for(var cnt = 0; cnt < document.frmAddCartBuy.elements.length; cnt++)
            {
                if(document.frmAddCartBuy.elements[cnt].name == "chkcomparebox")
                {
                    if (document.frmAddCartBuy.chkcomparebox.checked == "0")
                    {
                        selectedProducts = selectedProducts + "*" + document.frmAddCartBuy.chkcomparebox.value;
                    }
                }
            }
        }
    }
    return selectedProducts;
}

var newWindow;
var intspacerstrheight;
var strwidth;
var strheight;
var stringurl;
var intadjust;
var intspacerheight;
function popUp(strurl,strname,strcolumn,strresize) 
{
    var appendChar = '?';
    if(strurl.indexOf('?') != -1)
    {
        appendChar = '&';
    }

    if (newWindow) {
        if (newWindow.closed == false) {
            newWindow.close();
        }
    }
    if (strcolumn == "6") {
        strwidth = "800";
        strheight = "550";
        intspacerheight = (parseInt(intadjust) + 488);
    }
    if (strcolumn == "5") {
        strwidth = "680";
        strheight = "450";
        intspacerheight = (parseInt(intadjust) + 387);
    }
    if (strcolumn == "4") {
        strwidth = "550";
        strheight = "450";
        intspacerheight = (parseInt(intadjust) + 387);
    }
    if (strcolumn == "3") {
        strwidth = "420";
        strheight = "350";
        intspacerheight = (parseInt(intadjust) + 287);
    }
    if (strcolumn == "2") {
        strwidth = "290";
        strheight = "300";
        intspacerheight = (parseInt(intadjust) + 237);
    }
    stringurl = strurl+appendChar+"h="+intspacerheight;

    if ((stringurl.substring(0,2)).toLowerCase()=="ww" )
    {
        stringurl =  "http://" + stringurl ;

    }
       stringurl = addJsessionIdIfRequired(stringurl);
       newWindow = window.open(stringurl,strname,'toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=1,resizable='+strresize+',width='+strwidth+',height='+strheight+',left=50,top=200');
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

function checkForEmptyHelpSearch(e)
{
    if(searchButtonClicked)
    {
        return false;
    }
    else
    {
        searchButtonClicked=true;
    }

    var userEnteredValue;
    if((navigator.appName == ("Microsoft Internet Explorer") || (navigator.appName =="Opera")))
    {
        if(window.event.srcElement.name == "searchButtonhelpSearch")
        {
            userEnteredValue = document.helpSearch.st.value;
            userEnteredValue = trim(userEnteredValue);
            if(userEnteredValue == "")
            {
                alert("Please enter a word(s) to search for");
                document.helpSearch.st.value="";
                document.helpSearch.st.focus();
                searchButtonClicked=false;
                return false;
            }
            else
            {
                resetSearchPageCatId(document.forms["helpSearch"]);
                document.helpSearch.submit();
            }
        }
        else
        if(window.event.srcElement.name == "searchButtonhelpNewSearch")
        {
            userEnteredValue = document.helpNewSearch.st.value;

            userEnteredValue = trim(userEnteredValue);
            if(userEnteredValue == "")
            {
                alert("Please enter a word(s) to search for");
                document.helpNewSearch.st.value="";
                document.helpNewSearch.st.focus();
                searchButtonClicked=false;
                return false;
            }
            else
            {
                resetSearchPageCatId(document.forms["helpNewSearch"]);
                document.helpNewSearch.submit();
            }
        }
    }
    if(navigator.appName == "Netscape")
    {
        var targetName;
        if(e && e.target.name)
        {
            e = e;
            targetName = e.target.name;
        }   
       if(targetName == "searchButtonhelpSearch")
        {
            userEnteredValue = document.helpSearch.st.value;
            userEnteredValue = trim(userEnteredValue);
            if(userEnteredValue == "")
            {
                alert("Please enter a word(s) to search for");
                document.helpSearch.st.value="";
                document.helpSearch.st.focus();
                searchButtonClicked=false;
                return false;
            }
            else
            {
                resetSearchPageCatId(document.forms["helpSearch"]);
                document.helpSearch.submit();
            }
        }
        else
        if(targetName == "searchButtonhelpNewSearch")
        {
            userEnteredValue = document.helpNewSearch.st.value;

            userEnteredValue = trim(userEnteredValue);
            if(userEnteredValue == "")
            {
                alert("Please enter a word(s) to search for");
                document.helpNewSearch.st.value="";
                document.helpNewSearch.st.focus();
                searchButtonClicked=false;
                return false;
            }
            else
            {
                resetSearchPageCatId(document.forms["helpNewSearch"]);
                document.helpNewSearch.submit();
            }
        }        
    }
}


function handleEnterKeyHelpSearch(evnt,formName, field)
{

    var characterCode;
    if(evnt && evnt.which)
    {
        evnt = evnt;
        characterCode = evnt.which;
    }
    else
    {
        evnt = event;
        characterCode = evnt.keyCode;
    }      
    var userEnteredValue = field.value;
    userEnteredValue = trim(userEnteredValue);
    if((navigator.appName == ("Microsoft Internet Explorer") || (navigator.appName =="Opera")))
    {
        if(characterCode == 13)
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
                alert("Please enter a word(s) to search for");
                field.value = "";
                field.focus();
                searchButtonClicked=false;
                return false;
            }
            else
            {
                
                //document.helpSearch.st.value=userEnteredValue;
                resetSearchPageCatId(formName);
                formName.submit();
            }
        }
    }
    if(navigator.appName == "Netscape")
    {
        canSearch=true;
        var browser;
        browser=((navigator.userAgent.indexOf("Safari") > -1)?"Safari":browser);        
        if(characterCode == 13)

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
                // Safari browser does not detect the return value.This is an existing bug with Safari.
                // So in this case do not display the alert message and the form gets submitted
                // without a search term and goes to no results page.
                if(browser == "Safari")
                {
                    var objId = formName.searchCatId;
                    objId.name = "id";
                    return false;
                }
                else
                {                
                    alert("Please enter a word(s) to search for");
                    field.value = "";
                    field.focus();
                    searchButtonClicked=false;
                    canSearch = false;
                    return false;
                }
            }
            else
            {
                //document.helpSearch.st.value=userEnteredValue;
                resetSearchPageCatId(formName);
                formName.submit();
            }
        }
    }
}

function fnBrowsePageNav(cp)
{
	fnSearchPageNav(cp);
}

function frmBrowseCompare(pageCatId)
{
	frmSearchCompare(pageCatId); 
}
function fnAddToCartFromBrowse(productid, skuid)
{
    document.frmSearchCompare.productId.value=productid;
    document.frmSearchCompare.tempCatalogRefId.value=skuid;
    document.frmSearchCompare.addFromCart.value='true';
    document.frmSearchCompare.submit();
}