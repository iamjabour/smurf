//liveManager v2.0, Copyright 2009 Tealium.com Inc. All Rights Reserved.
var Lm={q:{},l:[],f:{},p:0,o:0,A:function(a,b,c,d){if(a.c)this.l.push(a);b=document;if(b.createElement){c="Lm_"+a.a;if(!b.getElementById(c)){try{eval(a.e)}catch(e){};
d=b.createElement('script');d.language='javascript';d.type='text/javascript';d.src=a.b;d.id=c;b.getElementsByTagName("head")[0].appendChild(d)}}},LOAD:function(a,b,c,d){
this.f[a]=0;c=this.l.length;for(b=this.p;b<c;b++){d=this.l[b];if(this.f[d.a]==0){this.f[d.a]=++this.p;try{eval(d.d);}catch(e){}}else return;}if(this.p==c&&this.o==0)this.o=1},
EV:function(a,b,c,d){if(a.addEventListener){a.addEventListener(b,c,false)}else if(a.attachEvent){a.attachEvent(((d==1)?"":"on")+b,c)}}}

Lm.config={
    domain:".bestbuy.com",
    dop_sensor:"",
    sc_acct:"bbymainprod",
    sc_kiosk:"bbykioskprod",
    sc_acctdev:"bbymaindev",
    sc_kioskdev:"bbykioskdev",
    sc_dev:0,
    send:{dop:0,s_code:1}
}

Lm.lc="20090823.9b";
Lm.pre="//images.qa.bestbuy.com/BestBuy_US/js/tracking/";
if(Lm.config.sc_dev==0){Lm.pre=(location.protocol=="http:")?"//images.bestbuy.com/BestBuy_US/js/tracking/":"//images-ssl.bestbuy.com/BestBuy_US/js/tracking/";}

Lm.A({a:"s_code",b:Lm.pre+"s_code-min.js?v="+Lm.lc,c:1});
//Lm.A({a:"dop",b:Lm.pre+"dop.js?v="+Lm.lc,c:1,d:"Lm.dop.INIT()"});
Lm.A({a:"trackEvent",b:Lm.pre+"trackEvent-min.js?v="+Lm.lc,c:1,d:"trackEvent.INIT();trackEvent.event('event.view',track)",e:"trackEvent={event:function(a,b){Lm.q['trackEvent']={a:a,b:b}}}"});

Lm.esp = (location.hostname.indexOf('espanol.')>-1)?"/enes":"";

Lm.A({a:"foreseeTrigger",b:Lm.esp+"/fsrscripts/foresee-trigger.js?v="+Lm.lc,c:1});
Lm.A({a:"foreseeCPPs",b:Lm.esp+"/fsrscripts/foresee-cpps.js?v="+Lm.lc,c:1});

Lm.ONLOAD=function(p){if(Lm.o==0&&Lm.l.length>0){setTimeout("Lm.ONLOAD()",500);return}p={}}
Lm.ONERROR=function(a,b,c){if(Lm.erf!=1){Lm.error=(typeof a=="string")?(a+"-"+c):"Unknown";Lm.erf=1}}
Lm.EV(window,"load",Lm.ONLOAD);
Lm.EV(window,"error",Lm.ONERROR);