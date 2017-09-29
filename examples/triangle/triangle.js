/**
 * Created by chkap on 17-9-29.
 */

/**
 * Created by chkap on 2017/9/27.
 */



function initSystem(){
    let canvas = document.getElementById('canvas');
    if (canvas){
        let system = new re3d.System(canvas);
        if (!system.gl){
            return;
        }

        let tria_data = new Float32Array([0,0.5,0,0.5,0,0,0,0,0.5]);
        let color = new Float32Array([0, 0, 1]);
        let tria = new re3d.geo_obj.GeoTriangle(system,tria_data, color);
        system.scene.addObject(tria);
        for (let i = 0; i< 100; i++){
            let pot = new re3d.geo_obj.GeoPoint(system, Math.random() - 0.5, Math.random()-0.5, Math.random()-0.5,
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



