function yad_window(x){if(yad_target=="_top"){top.location=yad_URL[x];}else{window.open(yad_URL[x]);}}
var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"])?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0;
if(plugin){plugin=parseInt(plugin.description.substring(plugin.description.indexOf(".")-2))>=8;}
else if(navigator.userAgent&&navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Windows")>=0){
document.write('<SCR'+'IPT LANGUAGE=VBScr'+'ipt\>\n'
+'on error resume next\n'
+'plugin=(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8")))\n'
+'</SCR'+'IPT\>\n');}
if(yad_target&&yad_URL&&yad_fv&&yad_swf&&yad_altURL&&yad_altimg&&yad_w&&yad_h){
if(plugin){document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
+' width="'+yad_w+'" height="'+yad_h+'">'
+'<param name="movie" value="'+yad_swf+'" /><param name="wmode" value="opaque" /><param name="loop" value="false" /><param name="quality" value="high" /><param name="allowScriptAccess" value="never" />'
+'<param name="flashvars" value="'+yad_fv+'" />'
+'<embed src="'+yad_swf+'" loop="false" wmode="opaque" quality="high"'
+' width="'+yad_w+'" height="'+yad_h+'" flashvars="'+yad_fv+'"'
+' type="application/x-shockwave-flash" allowScriptAccess="never"></embed></object>');
}else{document.write('<a href="'+yad_altURL+'" target="'+yad_target+'"><img src="'+yad_altimg+'" width="'+yad_w+'" height="'+yad_h+'" border="0" /></a>');}}