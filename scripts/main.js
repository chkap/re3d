/**
 * Created by chkap on 17-6-22.
 */



require.config({
    baseUrl: 'scripts/',
});


require(['scripts/system'], (system)=>{
    "use strict";
    if(document.readyState === 'complete'){
        system.initGL('canvas');
    }else{
        window.addEventListener('load', ()=>system.initGL('canvas'))
    }
});

