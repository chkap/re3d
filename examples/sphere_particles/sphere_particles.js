/**
 * Created by chkap on 2017/9/27.
 */





function initSystem(){
    class InteractiveSphereParticles extends re3d.geo_obj.GeoPointGroup{
        constructor(system, num, r, point_size=1.0){
            let data = new Float32Array(num*6);
            for(let i=0; i<num; i++){
                data.set(InteractiveSphereParticles.get_unform_3d_particles(r), i*6);
            }
            super(system, data, point_size=point_size);
        }
        static get_unform_3d_particles(r){
            let p = new Float32Array(6);
            let v1, v2, s;
            while(true){
                v1 = Math.random() *2 -1.0;
                v2 = Math.random() *2 -1.0;
                s = v1*v1+v2*v2;
                if (s < 1.0) break;
            }
            let t = Math.sqrt(1-s);
            p[0] = 2*v1*t *r;
            p[1] = 2*v2*t *r;
            p[2] = 1-2*s *r;

            p[3] = Math.random();
            p[4] = Math.random();
            p[5] = Math.random();
            return p;
        }
    }

    let canvas = document.getElementById('canvas');
    if (canvas){
        let system = new re3d.System(canvas);
        if (!system.gl){
            return;
        }
        let particel_num = 1000;
        let radius = 0.5;
        let particles = new InteractiveSphereParticles(system, particel_num, radius, 2);
        system.scene.addObject(particles);
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


