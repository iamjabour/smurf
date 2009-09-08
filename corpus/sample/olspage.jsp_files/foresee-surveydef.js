ForeSee.surveydefs = [{
    name: 'bby-browse-espanol',
    invite: {
        when: 'onentry'
    },
    language: {
        locale: 'es'
    },
    pop: {
        when: 'later'
    },
    pin: 1,
    criteria: {
        sp: 30,
        lf: 2
    },
    include: {
        urls: ['espanol']
    }
}, {
    name: 'bby-pos',
    alt: [{
        sp: 10,
		script: 'https://eval.bizrate.com/js/pos_17474.js'
    }, {
        sp: 10,
		script: 'https://www.shopping.com/xMSJ?pt=js&direct=1&mid=312488'
    }],
    invite: {
        when: 'onentry',
        delay: 3
    },
    pop: {
        when: 'now'
    },
    criteria: {
        sp: 40,
        lf: 0
    },
    include: {
        urls: ['pcat17014']
    }
}, {
    name: 'bby-checkout',
    invite: {
        when: 'onentry'
    },
    qualifier: {
        url: {
            pop: 'qualifying_chk.html'
        },
        width: '500',
        height: '450',
        buttons: {
            accept: 'Continue'
        }
    },
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    pin: 1,
    criteria: {
        sp: 30,
        lf: 0
    },
    include: {
        urls: ['pcat17002', 'pcat17022', 'pcat17008', 'pcat17010', 'pcat17009', 'pcat17016', 'pcat17017', 'pcat17011', 'pcat17042', 'pcat17090', 'pcat17019', 'pcat17018', 'pcat17020', 'pcat17013', 'pcat17021', 'pcat17025', 'pcat17044', 'pcat17047', 'pcat17046', 'pcat17083']
    }
}, {
    name: 'bby-browse',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 2,
        lf: 0
    },
    include: {
        urls: ['bestbuy.com']
    }
}];
ForeSee.properties = {
    repeatdays: 90,
    
    language: {
        locale: 'en',
		src: 'location',
		locales: [{
            match: 'espanol',
            locale: 'es'
        }]
    },
    
    exclude: {
        local: ['pcat17008','pcat17010','pcat17009','pcat17016','pcat17017','pcat17011','pcat17042','pcat17090','pcat17019','pcat17018','pcat17020','pcat17013','pcat17021','pcat17025','pcat17044','pcat17047','pcat17046','pcat17083','https://espanol-ssl.bestbuy.com'],
        referer: ['google.com','Confirmit.com','Bestbuycares.com']
    },
    
    invite: {
        //url: 'invite.html',
        content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE><meta http-equiv=\"Content-Type\" content= \"text/html; charset=utf-8\"></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b>Thank you for visting BestBuy.com!</b><br><br>Upon leaving our website, you may be asked to take part in a customer satisfaction survey. This survey is conducted by an independent company, ForeSee Results.<br><br>The feedback obtained from this survey will help us to enhance our website. All results are strictly confidential.<br><br></div></div></BODY></HTML>',
        width: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue',
            decline: 'No thanks'
        },
        hideOnClick: false,
		css: 'foresee-dhtml.css',
		locales: [{
            locale: 'es',
            //url: 'invite_sp.html',
            content: '<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\"><HTML><HEAD><TITLE>Foresee Invite</TITLE><meta http-equiv=\"Content-Type\" content= \"text/html; charset=utf-8\"></HEAD><BODY><div id=\"fsrinvite\"><div id=\"fsrcontainer\"><div class=\"fsri_sitelogo\"><img src=\"{%baseHref%}sitelogo.gif\" alt=\"Site Logo\"></div><div class=\"fsri_fsrlogo\"><img src=\"{%baseHref%}fsrlogo.gif\" alt=\"Site Logo\"></div></div><div class=\"fsri_body\"><b>Gracias por visitar nuestro sitio.</b><br><br>Después de salir de nuestro sitio Web, es posible que resulte seleccionado para participar en una breve encuesta de satisfacción del usuario. Esta encuesta es realizada por una compañía independiente, ForeSee Results.<br><br>Los comentarios obtenidos de esta encuesta nos ayudarán a mejorar nuestro sitio Web. Todos los resultados son estrictamente confidenciales.<br><br></div></div></BODY></HTML>',
            buttons: {
				accept: 'Continuar',
            	decline: 'No gracias'
			}
        }]
    },
    
    tracker: {
        width: '500',
        height: '325',
        timeout: 5,
        url: 'tracker.html',
		locales: [{
            locale: 'es',
            url: 'tracker_sp.html'
        }]
    },
    
    survey: {
        width: 550,
        height: 600,
        loading: true
    },
    
    qualifier: {
        location: 'local',
        width: '500',
        height: '300',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
		css: 'foresee-dhtml.css'
    },
       
    cancel: {
        url: 'cancel.html',
        width: '500',
        height: '300'
    },

    loading: {
        url: 'survey_loading.html',
		locales: [{
            locale: 'es',
            url: 'survey_loading_sp.html'
        }]
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    mode: 'first-party'
};
