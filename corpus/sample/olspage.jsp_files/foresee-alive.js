var ForeSee = {
    'version': '3.0.0',
    'Date:': '3/12/2009',
    'enabled': true,
    'files': '/fsrscripts/',
    //'files': 'http://scripts.bestbuy.com/foresee/',
    'id': 'gcdwU50NZREhoRxwJI1IEw==',
    'sites': [{
        path: 'bestbuy.com',
        cookie: 'session',
        domain: 'bestbuy.com'
    }]
};/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function fsr$setAlive(){var A=new Date().getTime();document.cookie="foresee.alive="+A+";path=/;domain="+ForeSee.site.domain+";"
}(function(){var C=ForeSee.sites;for(var B=0,A=C.length;B<A;B++){if(document.location.href.match(C[B].path)){ForeSee.siteid=B;
ForeSee.site=ForeSee.sites[ForeSee.siteid];if(ForeSee.site.files){ForeSee.files=ForeSee.site.files
}break}}if(!window["fsr$timer"]){fsr$setAlive();window["fsr$timer"]=setInterval(fsr$setAlive,1000)
}})();