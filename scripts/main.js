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

        let pot = new mod_geo_obj.GeoPoint(0,0,0);
        system.scene.addObject(pot);
        // for (let i = 0; i< 100; i++){
        //     let pot = new mod_geo_obj.GeoPoint(Math.random(), Math.random(), Math.random());
        //     system.scene.addObject(pot);
        // }
        system.startRendering();
    }
}
if(document.readyState === 'complete'){
    startSystem();
}else{
    window.addEventListener('load', startSystem)
}

