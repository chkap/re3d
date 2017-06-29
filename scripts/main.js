/**
 * Created by chkap on 17-6-22.
 */

import * as mod_system from './system.js'
import * as mod_geo_obj from './geo_obj.js'

function startSystem(){
    let canvas = document.getElementById('canvas');
    if (canvas){

        let system = new mod_system.System(canvas);
        if (!system.gl){
            return;
        }

        for (let i = 0; i< 100; i++){
            let pot = new mod_geo_obj.GeoPoint(Math.random()*10, Math.random()*10, Math.random()*10);
            system.scene.addObject(pot);
        }
        system.startRendering();
    }
}
if(document.readyState === 'complete'){
    startSystem();
}else{
    window.addEventListener('load', startSystem)
}

