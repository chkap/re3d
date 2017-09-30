/**
 * Created by chkap on 2017/9/27.
 */

let cfg ={
    initial_speed_range: [0.001, 0.005],
    spring_k: 1,
    gravitation_G: 0.001,
    gravitation_min_r: 0.01,
    wind_drag_lambda: 0.01,
};



function initSystem(){
    class InteractiveSphereParticles extends re3d.geo_obj.GeoPointGroup{
        constructor(system, num, r, point_size=1.0){
            let data = new Float32Array(num*6);
            for(let i=0; i<num; i++){
                data.set(InteractiveSphereParticles.get_unform_sphere_point(r), i*6);
                let color = new Float32Array([Math.random(),Math.random(),Math.random()]);
                data.set(color, i*6+3);
            }
            super(system, data, point_size=point_size);

            let state = new Float32Array(data);
            for(let i=0; i<num; i++){
                let abs_speed = Math.random()*(cfg.initial_speed_range[1]-cfg.initial_speed_range[0])+cfg.initial_speed_range[0];
                state.set(InteractiveSphereParticles.get_unform_sphere_point(abs_speed), i*6+3);
            }
            this._num = num;
            this._state = state;
            this._g_source_pos = null;
        }

        update_particles(){
            for(let i=0; i<this._num; i++){
                const vec3 = re3d.glmatrix.vec3;
                let pos = this.data.subarray(i*6, i*6+3);
                let v = this._state.subarray(i*6+3, i*6+6);
                let org_pos = this._state.subarray(i*6, i*6+3);
                let f = InteractiveSphereParticles.cal_force(pos, org_pos);

                vec3.add(v,v,f);
                vec3.add(pos, v);
                this.data.set(pos, i*6);
                this._state.set(v, i*6+3);
            }
        }

        static cal_force(pos, org_pos){
            const vec3 = re3d.glmatrix.vec3;
            let f = vec3.create();
            vec3.sub(f, org_pos, pos);
            vec3.normalize(f, f);
            let distance = vec3.dist(pos, org_pos);
            let f_abs = cfg.spring_k*Math.pow(distance, 0.5);
            vec3.scale(f, f, f_abs);
            return f;
        }

        static get_unform_sphere_point(r){
            let p = new Float32Array(3);
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
            p[2] = (1-2*s) *r;
            return p;
        }
    }

    let canvas = document.getElementById('canvas');
    if (canvas){
        let system = new re3d.System(canvas);
        if (!system.gl){
            return;
        }
        let particel_num = 10000;
        let radius = 0.5;
        let particles = new InteractiveSphereParticles(system, particel_num, radius, 1.5);
        system.scene.addObject(particles);

        system.addTodoBeforeRender(()=>{particles.update_particles();});

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


