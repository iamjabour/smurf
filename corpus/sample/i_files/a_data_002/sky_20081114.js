function sky_window(x){if(sky_target=="_top"){top.location=sky_URL[x];}else{window.open(sky_URL[x]);}}
var plugin=(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"])?navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin:0;
if(plugin){plugin=parseInt(plugin.description.substring(plugin.description.indexOf(".")-2))>=8;}
else if(navigator.userAgent&&navigator.userAgent.indexOf("MSIE")>=0&&navigator.userAgent.indexOf("Windows")>=0){
document.write('<SCR'+'IPT LANGUAGE=VBScr'+'ipt\>\n'
+'on error resume next\n'
+'plugin=(IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8")))\n'
+'</SCR'+'IPT\>\n');}
if(sky_target&&sky_URL&&sky_fv&&sky_swf&&sky_altURL&&sky_altimg&&sky_w&&sky_h){
if(plugin){document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'
+' width="'+sky_w+'" height="'+sky_h+'">'
+'<param name="movie" value="'+sky_swf+'" /><param name="wmode" value="opaque" /><param name="loop" value="false" /><param name="quality" value="high" /><param name="allowScriptAccess" value="never" />'
+'<param name="flashvars" value="'+sky_fv+'" />'
+'<embed src="'+sky_swf+'" loop="false" wmode="opaque" quality="high"'
+' width="'+sky_w+'" height="'+sky_h+'" flashvars="'+sky_fv+'"'
+' type="application/x-shockwave-flash" allowScriptAccess="never"></embed></object>');
}else{document.write('<a href="'+sky_altURL+'" target="'+sky_target+'"><img src="'+sky_altimg+'" width="'+sky_w+'" height="'+sky_h+'" border="0" /></a>');}}