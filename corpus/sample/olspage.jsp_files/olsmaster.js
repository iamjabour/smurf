function setHrdGdTabImgs(tabnumber, locale )
{
    if (document.tab1 != undefined) {
        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodspecs_off.gif";
    }
    if (document.tab2 != undefined) {
        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_off.gif"; 
    }
    if (document.tab3 != undefined) {
        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviews_off.gif";
    }
    if (document.tab4 != undefined) {
        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_off.gif";
    }
    if (document.tab6 != undefined) {
        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_off.gif";
    }
    if (document.tab7 != undefined) {
        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_off.gif";
    }


    if (tabnumber==1) {
        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodspecs_on.gif";
    } else if (tabnumber==2){
        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_on.gif";
    } else if (tabnumber==3){
        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviews_on.gif";
    } else if (tabnumber==4){
        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_on.gif";
    } else if (tabnumber==6){
        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_on.gif";
    } else if (tabnumber==7){
        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_on.gif";
	}
}

function setmouseoverHrdGds(active, tabnumber, locale) {

if (String(tabnumber)==String(active)){
}
else
{
if (tabnumber==1)
{
document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodspecs_over.gif";
}
if (tabnumber==2)
{
document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_over.gif";
}
if (tabnumber==3)
{
document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviews_over.gif";
}
if (tabnumber==4)
{
document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_over.gif";
}
if (tabnumber==6)
{
document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_over.gif";
}
if (tabnumber==7)
{
document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_over.gif";
}

}
}
function setMovieTabImgs(tabnumber, locale )
{

    if (document.tab1 != undefined) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_off.gif";
    }
    if (document.tab2 != undefined) {

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_off.gif";
    }
    if (document.tab3 != undefined) {

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_off.gif";
    }
    if (document.tab4 != undefined) {

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_castcrew_off.gif";
    }
    if (document.tab5 != undefined) {

        document.tab5.src = imgServer + locale + "/images/global/misc/pdptabs/tab_relatedfilms_off.gif";
    }
    if (document.tab6 != undefined) {

        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_off.gif";
    }
    if (document.tab7 != undefined) {

        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_off.gif";
    }
    if (tabnumber==1) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_on.gif";
    } else if (tabnumber==2){

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_on.gif";
    } else if (tabnumber==3){

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_on.gif";
    } else if (tabnumber==4){

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_castcrew_on.gif";
    } else if (tabnumber==5){

        document.tab5.src = imgServer + locale + "/images/global/misc/pdptabs/tab_relatedfilms_on.gif";
    } else if (tabnumber==6){

        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_on.gif";
    } else if (tabnumber==7){

        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_on.gif";
    }

}


function setmouseoverMovies(active, tabnumber, locale) {


if (String(tabnumber)==String(active)){
}
else
{
if (tabnumber==1)
{
document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_over.gif";
}
if (tabnumber==2)
{
document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_over.gif";
}
if (tabnumber==3)
{
document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_over.gif";
}
if (tabnumber==4)
{
document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_castcrew_over.gif";
}
if (tabnumber==5)
{
document.tab5.src = imgServer + locale + "/images/global/misc/pdptabs/tab_relatedfilms_over.gif";
}
if (tabnumber==6)
{
document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_over.gif";
}
if (tabnumber==7)
{
document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_over.gif";
}

}
}
function setBndlTabImgs(tabnumber, locale) {
    if (document.tab1 != undefined)
    document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodfeatures_off.gif";
    if (document.tab2 != undefined)
    document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_off.gif";
    if (document.tab3 != undefined)
    document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_off.gif";
    if (document.tab6 != undefined)
    document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_off.gif";
    if (document.tab7 != undefined)
    document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_off.gif";
    if (tabnumber==1){
        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodfeatures_on.gif";
    }else if (tabnumber==2){
        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_on.gif";
    }else if (tabnumber==3){
        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_on.gif";
    }else if (tabnumber==6){
            document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_on.gif";
    }else if (tabnumber==7){
            document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_on.gif";
    }
}
function setmouseoverBndl(active, tabnumber, locale) {
    if (String(tabnumber)==String(active)){
    }else{
        if (tabnumber==1){document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodfeatures_over.gif";
        }
        else if (tabnumber==2){document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_accessories_over.gif";
        }
        else if (tabnumber==3){document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_prodresearch_over.gif";
        }
        else if (tabnumber==6){document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_over.gif";
        }
        else if (tabnumber==7){document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_over.gif";
        }

    }
}
function setVideoTabImgs(tabnumber, locale)
{
    var imgDir = imgServer + locale + "/images/global/misc/pdptabs";

    if (document.tab1 != undefined)
        document.tab1.src = imgDir + "/tab_synopsis_off.gif";

    if (document.tab2 != undefined)
        document.tab2.src = imgDir + "/tab_reviewrate_off.gif";

    if (document.tab3 != undefined)
        document.tab3.src = imgDir + "/tab_relatedgames_off.gif";

    if (document.tab4 != undefined)
        document.tab4.src = imgDir + "/tab_prodfeatures_off.gif";

    if (document.tab6 != undefined)
        document.tab6.src = imgDir + "/tab_rebates_off.gif";

    if (document.tab7 != undefined)
    document.tab7.src = imgDir + "/tab_customerreview_off.gif";
    
        
    if (tabnumber == 1) {
        document.tab1.src = imgDir + "/tab_synopsis_on.gif";
    } else if (tabnumber == 2) {
        document.tab2.src = imgDir + "/tab_reviewrate_on.gif";
    } else if (tabnumber == 3) {
        document.tab3.src = imgDir + "/tab_relatedgames_on.gif";
    } else if (tabnumber == 4) {
        document.tab4.src = imgDir + "/tab_prodfeatures_on.gif";
    } else if (tabnumber == 6) {
        document.tab6.src = imgDir + "/tab_rebates_on.gif";
    } else if (tabnumber == 7) {
        document.tab7.src = imgDir + "/tab_customerreview_on.gif";
	}
}
function setmouseoverVideo(active, tabnumber, locale) {
    var imgDir = imgServer + locale + "/images/global/misc/pdptabs";

    if (String(tabnumber)==String(active)){
    }
    else{
        if (tabnumber==1) {
            document.tab1.src = imgDir + "/tab_synopsis_over.gif";
        }
        if (tabnumber==2) {
            document.tab2.src = imgDir + "/tab_reviewrate_over.gif";
        }
        if (tabnumber==3) {
            document.tab3.src = imgDir + "/tab_relatedgames_over.gif";
        }
        if (tabnumber==4) {
            document.tab4.src = imgDir + "/tab_prodfeatures_over.gif";
        }
        if (tabnumber==6) {
            document.tab6.src = imgDir + "/tab_rebates_over.gif";
        }
        if (tabnumber==7) {
            document.tab7.src = imgDir + "/tab_customerreview_over.gif";
        }

    }
}
function setAlbumTabImgs(tabnumber, locale )
{
    if (document.tab1 != undefined) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_tracklisting_off.gif";
    }
    if (document.tab2 != undefined) {

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_releasenotes_off.gif"; 
    }
    if (document.tab3 != undefined) {

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_off.gif";
    }
    if (document.tab4 != undefined) {

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_off.gif";
    }
    if (document.tab6 != undefined) {

        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_off.gif";
    }
    if (document.tab7 != undefined) {

        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_off.gif";
    }


    if (tabnumber==1) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_tracklisting_on.gif";
    } else if (tabnumber==2){

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_releasenotes_on.gif";
    } else if (tabnumber==3){

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_on.gif";
    } else if (tabnumber==4){

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_on.gif";
    } else if (tabnumber==6){
		
        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_on.gif";
    } else if (tabnumber==7){
		
        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_on.gif";
    }
}


function setmouseoverAlbm(active, tabnumber, locale) 
{

	if (String(tabnumber)==String(active)){
	}
	else
	{
		if (tabnumber==1)
		{
			document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_tracklisting_over.gif";
		}
		if (tabnumber==2)
		{
			document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_releasenotes_over.gif";
		}
		if (tabnumber==3)
		{
			document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_over.gif";
		}
		if (tabnumber==4)
		{
			document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_versiondetails_over.gif";
		}
		if (tabnumber==6)
		{
			document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_over.gif";
		}
		if (tabnumber==7)
		{
			document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_over.gif";
		}

	}
}

function setSoftGdTabImgs(tabnumber, locale )
{
    if (document.tab1 != undefined) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_off.gif";
    }
    if (document.tab2 != undefined) {

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_off.gif"; 
    }
    if (document.tab3 != undefined) {

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_related_off.gif";
    }
    if (document.tab4 != undefined) {

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_systemrequire_off.gif";
    }
    if (document.tab6 != undefined) {

        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_off.gif";
    }
    if (document.tab7 != undefined) {

        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_off.gif";
    }


    if (tabnumber==1) {

        document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_on.gif";
    } else if (tabnumber==2){

        document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_on.gif";
    } else if (tabnumber==3){

        document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_related_on.gif";
    } else if (tabnumber==4){

        document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_systemrequire_on.gif";
    } else if (tabnumber==6){
		
        document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_on.gif";
    } else if (tabnumber==7){
		
        document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_on.gif";
    }
}


function setmouseoverSoft(active, tabnumber, locale) 
{

	if (String(tabnumber)==String(active)){
	}
	else
	{
		if (tabnumber==1)
		{
			document.tab1.src = imgServer + locale + "/images/global/misc/pdptabs/tab_synopsis_over.gif";
		}
		if (tabnumber==2)
		{
			document.tab2.src = imgServer + locale + "/images/global/misc/pdptabs/tab_reviewrate_over.gif";
		}
		if (tabnumber==3)
		{
			document.tab3.src = imgServer + locale + "/images/global/misc/pdptabs/tab_related_over.gif";
		}
		if (tabnumber==4)
		{
			document.tab4.src = imgServer + locale + "/images/global/misc/pdptabs/tab_systemrequire_over.gif";
		}
		if (tabnumber==6)
		{
			document.tab6.src = imgServer + locale + "/images/global/misc/pdptabs/tab_rebates_over.gif";
		}
		if (tabnumber==7)
		{
			document.tab7.src = imgServer + locale + "/images/global/misc/pdptabs/tab_customerreview_over.gif";
		}

	}
}

function fnAddToCartAccFeature(productid, skuid)
{
    document.frmAddCart.productId.value=productid;
    document.frmAddCart.tempCatalogRefId.value=skuid;
    document.frmAddCart.addFromCart.value='true';
    document.frmAddCart.submit();
}
function frmMoveItemToWishList(productid, skuid)
{
    document.frmMoveItemToWishList.productId.value=productid;
    document.frmMoveItemToWishList.tempCatalogRefId.value=skuid;
    document.frmMoveItemToWishList.id.value=productid;
    document.frmMoveItemToWishList.redirectURL.value = document.frmMoveItemToWishList.redirectURL.value + '&privateListProductId=' + productid + '&privateListSkuId=' + skuid;
    document.frmMoveItemToWishList.submit();
}
function openWindow(url)
{
  javascript:popUp(url,'Compare','6','0')
}
function handleAddToCart(productid, skuid)
{
    document.frmCompare.productId.value=productid;
    document.frmCompare.tempCatalogRefId.value=skuid;
    document.frmCompare.addFromCart.value='true';
    document.frmCompare.submit();
}
function fnAddToCartProdList(productid, skuid)
{
    handleAddToCart(productid, skuid);
}
function fnAddToCart(productid, skuid)
{
    handleAddToCart(productid, skuid);
}
function fnAddToCartSoft(productid, skuid)
{
   handleAddToCart(productid, skuid);
}
function frmCompareSubmit()
{
    var selectedProducts = "";
    for(var count = 0; count < document.frmCompare.elements.length; count++)
    {
        if(document.frmCompare.elements[count].type == "checkbox")
        {
            if(document.frmCompare.elements[count].checked == "1")
            {
                selectedProducts = selectedProducts + document.frmCompare.elements[count].value + "*" ;
            }
        }
    }
    selectedProducts = selectedProducts.substring(0, selectedProducts.length-1);
    document.frmCompareNew.useProductString.value = true;
    document.frmCompareNew.productString.value = selectedProducts;
    document.frmCompareNew.unProductString.value = frmCompareUnCheckString();
    document.frmCompareNew.submit();
}
function fnPageNav(currentPage)
{
    document.frmCmpProducts.selectedProducts.value=frmCompareString();
    document.frmCmpProducts.unSelectedProducts.value=frmCompareUnCheckString();
    document.frmCmpProducts.currentPage.value=currentPage;
    document.frmCmpProducts.submit();
}
function frmCompareString()
{
    var selectedProducts = "";
    for(var count = 0; count < document.frmCompare.elements.length; count++)
    {
        if(document.frmCompare.elements[count].type == "checkbox")
        {
            if(document.frmCompare.elements[count].checked == "1")
            {
                selectedProducts = selectedProducts + document.frmCompare.elements[count].value + "*" ;
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
function frmCompareUnCheckString()
{
    var selectedProducts = "";
    for(var count = 0; count < document.frmCompare.elements.length; count++)
    {
        if(document.frmCompare.elements[count].type == "checkbox")
        {
            if(document.frmCompare.elements[count].checked == "0")
            {
                selectedProducts = selectedProducts + document.frmCompare.elements[count].value + "*" ;
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
function checkBrand(frmBrand)
{
    if(frmBrand.id.selectedIndex==0)
    {
        alert('Please select a brand');
        return false;
    }
}
function fnPopInstorePickFromMyAccount(openUrl,pSkuId,catId)
{
    popUp(openUrl+'?id='+catId+'&type=page&skuId='+pSkuId,'CheckDeliveryInCart','2','0');
}
function fnPopShippingDetailsFromMyAccount(openUrl,pSkuId,catId)
{
    popUp(openUrl+'?id='+catId+'&type=page&skuId='+pSkuId,'ShippingDetails','4','0');
}
function fnPopCheckDeliveryFromMyAccount(openUrl,pSkuId,catId)
{
    popUp(openUrl+'?id='+catId+'&type=page&skuId='+pSkuId,'CheckDelivery','3','0');
}
function setRzAction(frm)
{
    frm.action.value='remove';
    frm.submit();
}
function fnAddToCartBuy(productid, skuid)
{
   document.frmAddCartBuy.productId.value=productid;
   document.frmAddCartBuy.tempCatalogRefId.value=skuid;
   document.frmAddCartBuy.addFromCart.value='true';
   document.frmAddCartBuy.submit();
}
function setSortParamAndSubmit(formName,pageToDisplay)
{
    formName.sortValue.value=formName.Sort[formName.Sort.selectedIndex].value;
    formName.pageToDisplay.value=pageToDisplay;
    formName.submit();
}
function rz(){document.frmChnDel.submit();}
