
function MD(menuId, prop, cElements)
{
    this.menuId = menuId;
    this.prop = prop;
    this.cElements = cElements;
}
function renderMenu(menuDataArray)
{
    for (i=0; i < menuDataArray.length; i++)
    {
        currMenuData = menuDataArray[i];
        writeMenuStart(currMenuData.menuId,
                        currMenuData.prop[0],
                        currMenuData.prop[1],
                        currMenuData.prop[2],
                        currMenuData.prop[3],
                        currMenuData.prop[4],
                        currMenuData.prop[5],
                        currMenuData.prop[6],
                        currMenuData.prop[7],
                        currMenuData.prop[8],
                        currMenuData.prop[9],
                        currMenuData.prop[10],
                        currMenuData.prop[11],
                        currMenuData.prop[12],
                        currMenuData.prop[13]);
        for (j=0; j<currMenuData.cElements.length; j++)
        {
            writeMenu(currMenuData.cElements[j][0],
                        currMenuData.cElements[j][1],
                        currMenuData.prop[6],
                        currMenuData.prop[7],
                        currMenuData.prop[8],
                        currMenuData.prop[9],
                        currMenuData.prop[12]);
        }
        writeMenuEnd();
    }
}
function writeMenuStart(pMenuId,pTabPos,pTabHt,pBgColor,pTabName,pOnImgParam,pOffImgParam,pTrBgColor,pStyleOnBg,pStyleOffBg,startUrl,catid,categoryRep,classname,menuText)
{
    pAnchorTag = addJsessionIdIfRequired('<a href = "'+startUrl+'site/olspage.jsp?id='+catid+'&type=page&categoryRep='+categoryRep+'" class="'+classname+'">'+menuText+'</a>');
    if (document.layers)
    {
        document.write('<layer id='+pMenuId+' pagex='+pTabPos+' pagey='+pTabHt+' visibility=hide z-index=3 onmouseout="Hide(\''+pMenuId+'\');" onmouseover="Show(\''+pMenuId+'\');"> ');
    }
    else
    {
        document.write('<div id='+pMenuId+' Style="Position:Absolute;Left:'+pTabPos+';Top:'+pTabHt+';Visibility:hidden;z-index:3" onmouseout="Hide(\''+pMenuId+'\');" onmouseover="Show(\''+pMenuId+'\');"> ');
    }
    document.write('<table border=0 cellpadding=0 cellspacing=0 bgcolor="'+pBgColor+'"> ');
    if (pOffImgParam != null)
    {
        document.write('<tr><td><table border=0 cellpadding=2 cellspacing=1 onMouseOver="javascript:'+pTabName+'.src=\''+pOnImgParam+'\';" onmouseout="javascript:'+pTabName+'.src=\''+pOffImgParam+'\';"> ');
    }
    else
    {
        document.write('<tr><td><table border=0 cellpadding=2 cellspacing=1 onMouseOver="javascript:'+pTabName+'.src=\''+pOnImgParam+'\';"> ');
    }
    document.write('<tr bgcolor="'+pTrBgColor+'" onmouseover="javascript:style.backgroundColor=\''+pStyleOnBg+'\';" onmouseout="javascript:style.backgroundColor=\''+pStyleOffBg+'\';"><td>'+pAnchorTag+'</td></tr> ');
}
function writeMenu(catid,link,pTrBgColor,pStyleOnBg,pStyleOffBg,startUrl,classname)
{
    pAnchorTag = addJsessionIdIfRequired('<a href="'+startUrl+'site/olspage.jsp?id='+catid+'&type=category" class="'+classname+'">'+link+'</a>');
    document.write('<tr bgcolor="'+pTrBgColor+'" onmouseover="javascript:style.backgroundColor=\''+pStyleOnBg+'\';" onmouseout="javascript:style.backgroundColor=\''+pStyleOffBg+'\';"><td>'+pAnchorTag+'</td></tr> ');
}
function writeMenuEnd()
{
    document.write('</table></td></tr></table>');
    if (document.layers)
    {
        document.write('</layer>');
    }
    else
    {
        document.write('</div>');
    }
}
function logout()
{
    document.logoutForm.submit();
}
function openContextSensitiveLinkForBottomNav(contentId, url)
{
    var URL=url+"&contentId="+contentId+"&entryURLID="+entryURLID+"&entryURLType="+entryURLType;
    javascript:popUp(URL,'Content_Sensitive_Help_Topic','3','0');
}
function popup(link,windowSize)
{
    prevUrl=link.href;
    parameters=prevUrl.slice(prevUrl.indexOf("?"));
    prevPathname=link.pathname;
    actualUrl=contextRoot+"/"+prevPathname+parameters;
    if(windowSize == '')
    {
        windowSize = '3';
    }
    popUp(actualUrl,'DeepLink',windowSize,'0');
}
function openDiscographyPopupArtistType(discographId,pageCatId,artistType)
{
    popUp('olspage.jsp?id='+pageCatId+'&ArtistId='+discographId+'&type=page&productType='+artistType,'Discography','4','0');
}
function openOfferDetails(contentId,catId)
{
    var URL = 'olspage.jsp?id='+catId+'&type=page&contentId='+contentId;
    javascript:popUp(URL,'Offer_Details_Popup','3','0');
}
