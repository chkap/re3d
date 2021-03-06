/**
 * Created by chkap on 2017/9/27.
 */

let cfg ={
    initial_speed_range: [1, 5],
    spring_k: 1,
    wind_drag_lambda: 1,
    wind_drag_v_th: 0.05,
};



function initSystem(){

    class InteractiveSphereParticles extends re3d.geo_obj.GeoPointGroup{
        constructor(system, num, r, point_size=1.0){
            let data = new Float32Array(num*6);
            for(let i=0; i<num; i++){
                data.set(InteractiveSphereParticles.get_uniform_sphere_point(r), i*6);
                let color = new Float32Array([Math.random(),Math.random(),Math.random()]);
                data.set(color, i*6+3);
            }
            super(system, data, point_size=point_size);

            let state = new Float32Array(data);
            for(let i=0; i<num; i++){
                let abs_speed = Math.random()*(cfg.initial_speed_range[1]-cfg.initial_speed_range[0])+cfg.initial_speed_range[0];
                state.set(InteractiveSphereParticles.get_uniform_sphere_point(abs_speed), i*6+3);
            }
            this._num = num;
            this._state = state;
            this._last_update_time = null;
        }

        update_particles(){
            if(this._last_update_time === null){
                this._last_update_time = window.performance.now();
                return ;
            }

            let cur_t = window.performance.now();
            let dt = (cur_t - this._last_update_time)*1e-3;
            this._last_update_time = cur_t;
            if(dt > 0.2){
                return ;
            }
            for(let i=0; i<this._num; i++){
                const vec3 = re3d.glmatrix.vec3;
                let pos = this.data.subarray(i*6, i*6+3);
                let v = this._state.subarray(i*6+3, i*6+6);
                let org_pos = this._state.subarray(i*6, i*6+3);
                let f = InteractiveSphereParticles.cal_force(pos, org_pos, v);

                let ds = vec3.create();
                vec3.scale(ds, v, dt);
                vec3.add(pos, pos, ds);

                let dv = vec3.create();
                vec3.scale(dv, f, dt);
                vec3.add(v,v,dv);
                this.data.set(pos, i*6);
                this._state.set(v, i*6+3);
            }
            this.invalidate_vao();
        }

        static cal_force(pos, org_pos, v){
            const vec3 = re3d.glmatrix.vec3;
            let f = vec3.create();
            vec3.sub(f, org_pos, pos);
            vec3.normalize(f, f);
            let distance = vec3.dist(pos, org_pos);
            let f_abs = cfg.spring_k*Math.pow(distance, 0.5);
            vec3.scale(f, f, f_abs);

            let abs_v = Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
            let wind_drag_f = vec3.create();
            if(abs_v >= cfg.wind_drag_v_th){
                let d_v = vec3.create();
                vec3.normalize(d_v, v);
                vec3.scale(wind_drag_f, d_v, -(abs_v-cfg.wind_drag_v_th)*cfg.wind_drag_lambda);
            }

            vec3.add(f, f, wind_drag_f);
            return f;
        }

        static get_uniform_sphere_point(r){
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


