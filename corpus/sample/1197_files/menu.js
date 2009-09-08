var existMenuFile = true;

function initMenu()
{
  
    var showTimer;
    var hideTimer;
    if (document.getElementById) 
    {
        navRoot = $("showAll");
        navRoot.onmouseover=function() {
            if(hideTimer != undefined) {
                clearTimeout(hideTimer);
            }
            showTimer = setTimeout("try{ if(!Element.visible('allCategories')){new Effect.Appear('allCategories', {duration: 0.2, queue: {position:'end', scope: 'menu', limit:10} });} } catch(e) { $('allCategories').display = '' }", 200);
        }
        navRoot.onmouseout=function() {
            if(showTimer != undefined) {
                clearTimeout(showTimer);
            }
            hideTimer = setTimeout("try { new Effect.Fade('allCategories', {duration: 0.5, queue: {position:'end', scope: 'menu', limit:10} }); } catch(e) { $('allCategories').display = 'none' }", 400);
        }
    } 
 
}



