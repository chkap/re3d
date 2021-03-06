/**
 * Created by chkap on 17-7-12.
 */

const vec3 = require('gl-matrix').vec3;

import * as mod_math_tool from './math_tool'


export class SphereCameraHandler {
    constructor(center, radius) {
        this._last_mouse_x = null;
        this._last_mouse_y = null;
        this.move_speed = 0.01;

        this.fovy_step = 0.1;
        this.fovy_min = 10/180*Math.PI;
        this.fovy_max = 150/180*Math.PI;

        this.enable = true;
        // this.buttons = buttons;
    }

    // set radius(r){
    //     const eye = this._system.camera.eye;
    //     const center = this._system.camera.center;
    //     const pos_vec = vec3.create();
    //     vec3.div(pos_vec, eye, center);
    //     mod_math_tool.normalize_vec3(pos_vec, r);
    //     this._radius = r;
    // }

    handle_mousemove(event, system){
        if (!this.enable) return;

        if (!(event.buttons & 1)) {
            this._last_mouse_x = null;
            this._last_mouse_y = null;
            return;
        }

        if(this._last_mouse_x === null){
            this._last_mouse_x = event.clientX;
            this._last_mouse_y = event.clientY;
            return ;
        }

        const delta_x = event.clientX - this._last_mouse_x;
        const delta_y = -(event.clientY - this._last_mouse_y);

        this._last_mouse_x = event.clientX;
        this._last_mouse_y = event.clientY;

        const move_vec = vec3.create();
        const x_vec = system.camera.right;
        const y_vec = system.camera.up;
        move_vec[0] = -this.move_speed * (delta_x * x_vec[0] + delta_y * y_vec[0]);
        move_vec[1] = -this.move_speed * (delta_x * x_vec[1] + delta_y * y_vec[1]);
        move_vec[2] = -this.move_speed * (delta_x * x_vec[2] + delta_y * y_vec[2]);

        const eye = system.camera.eye;
        const center = system.camera.center;
        const pos_vec = vec3.create();
        vec3.subtract(pos_vec, eye, center);
        const radius = vec3.length(pos_vec);

        const new_pos_vec = vec3.create();
        vec3.add(new_pos_vec, pos_vec, move_vec);
        mod_math_tool.normalize_vec3(new_pos_vec, radius);
        vec3.add(new_pos_vec, new_pos_vec, center);

        system.camera.eye = new_pos_vec;
        event.stopPropagation();
    }

    handle_wheel(event, system){
        if (!this.enable) return;

        const fovy_change = this.fovy_step * event.deltaY / 180 * Math.PI;
        let fovy = system.camera.fovy;

        fovy += fovy_change;
        fovy = (fovy>this.fovy_max) ? this.fovy_max:fovy;
        fovy = (fovy<this.fovy_min) ? this.fovy_min:fovy;
        system.camera.fovy = fovy;
        event.stopPropagation();
    }
}


