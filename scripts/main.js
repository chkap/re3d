/**
 * Created by chkap on 17-6-22.
 */
"use strict";


require.config({
    baseUrl: 'scripts/',
});


require(['system'], (mod_system)=>{
    "use strict";

    function startSystem(){
        let canvas = document.getElementById('canvas');
        if (canvas){

            let system = new mod_system.System(canvas);
            if (!system.gl){
                return;
            }
            system.startRendering();
        }
    }
    if(document.readyState === 'complete'){
        startSystem();
    }else{
        window.addEventListener('load', startSystem)
    }
});

