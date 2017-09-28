/**
 * Created by chkap on 17-6-22.
 */


function initSystem(){
    let canvas = document.getElementById('canvas');
    if (canvas){
        // let v3 = vec3();
        // v3[0] = 1;
        let system = new re3d.System(canvas);
        if (!system.gl){
            return;
        }

        let pot = new re3d.geo_obj.GeoPoint(system,0,0,0);
        system.scene.addObject(pot);
        for (let i = 0; i< 100; i++){
            let pot = new re3d.geo_obj.GeoPoint(system,Math.random() - 0.5, Math.random()-0.5, Math.random()-0.5,
                                                Math.random(), Math.random(), Math.random(), Math.random()*10);
            system.scene.addObject(pot);
        }
        let uihandler = new re3d.ui_handler.SphereCameraHandler();
        system.addUiHandler(uihandler);
        system.startRendering();
    }
}

if(document.readyState === 'complete'){
    initSystem();
}else{
    window.addEventListener('load', initSystem)
}