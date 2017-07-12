/**
 * Created by chkap on 17-7-12.
 */

const vec3 = require('gl-matrix').vec3;

import * as mod_math_tool from './math_tool'

class SphereCameraHandler {
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;

        this._system = null;
        this._last_mouse_x = null;
        this._last_mouse_y = null;
        this._move_speed = 0.1;

        this._on_mouse_move_handler = function (e) {
            this._on_mouse_move(e);
        }
    }

    attach(system){
        if (this._system !== null){
            console.error('cannot attach to a system without detaching.');
            return ;
        }
        this._system = system;

    }

    detach(){

    }

    _on_mouse_move(event){
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
        const x_vec = this._system.camera.right;
        const y_vec = this._system.camera.up;
        move_vec[0] = this._move_speed * delta_x * x_vec[0] + delta_y * y_vec[0];
        move_vec[1] = this._move_speed * delta_x * x_vec[1] + delta_y * y_vec[1];
        move_vec[2] = this._move_speed * delta_x * x_vec[2] + delta_y * y_vec[2];

        const eye = this._system.camera.eye;


        eye[0] += move_vec[0];
        eye[1] += move_vec[1];
        eye[2] += move_vec[2];

        const pos_vec = vec3.create();
        pos_vec[0] = eye[0] - this.
        mod_math_tool.normalize_vec3(eye);

    }
}


