var popupLinkConfig = new Array;
var existPopupFile  = true;

// popupLinkConfig["classname"] = new Array ( "targetname", "width=550,height=350,scrollbars=yes,resizable=yes,status=yes,toolbar=yes,location=yes,menubar=yes");
popupLinkConfig["cidadania"]    = new Array ( "", "width=420,height=500,toolbar=no,location=no,status=yes,menubar=no,resizable=no,scrollbars=yes");


function initPopupLinks()
{
  if (!document.getElementsByTagName) return true;
  var pageLinks = document.getElementsByTagName("a");
  for (var i = 0; i < pageLinks.length; i++) 
  {
    if (((pageLinks[i].className != null) && 
         (pageLinks[i].className != "")) ||
        ((pageLinks[i].parentNode.className != null) && 
         (pageLinks[i].parentNode.className != "")))
    {
      var linkClass = " " + pageLinks[i].className + " ";
      if ((linkClass == "  ") && (pageLinks[i].parentNode.className != ""))
      {
        linkClass = " " + pageLinks[i].parentNode.className + " ";
      }
      for (var theKey in popupLinkConfig) 
      {
        if (linkClass.indexOf(" " + theKey + " ") > -1)
        {
          if ((pageLinks[i].target == "") || (pageLinks[i].target == null))
          {
            pageLinks[i].target = (popupLinkConfig[theKey][0] != "") ? popupLinkConfig[theKey][0] : theKey;
          }
          pageLinks[i].settings = popupLinkConfig[theKey][1];
          pageLinks[i].onclick = popUp;
        }
      }
    }
  }
  return true;
}

function popUp()
{
  newWin = window.open(this.href, this.target, this.settings);
  newWin.focus();
  return false;
}

function hidePopup()
{
 document.getElementById('dhtml').style.display="none"
 for(var i=0; i<document.images.length; i++){
		var img = document.images[i];
		var imgName = img.src.toUpperCase();
		if (imgName.substring(imgName.length-3, imgName.length) == "GIF"){
			img.src = img.src;
		}
	}	
}


