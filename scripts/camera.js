/**
 * Created by chkap on 17-6-21.
 */

"use strict";


const {vec3, mat4} = require('gl-matrix');

import * as mod_math_tool from './math_tool'

class Camera {
    constructor(){
        this._view_mat = mat4.create();
        this._projection_mat = mat4.create();

        this._view_projection_mat = mat4.create();
        this._view_projection_changed = true;

        this._view_eye = vec3.fromValues(0,0,1);
        this._view_center = vec3.fromValues(0,0,0);
        this._view_up = vec3.fromValues(0,1,0);
        this._view_changed = true;

        this._projection_fovy = Math.PI / 2.0;
        this._projection_aspect = 1.0;
        this._projection_near = 0.1;
        this._projection_far = 100.0;
        this._projection_changed = true;
    }

    _notify_projection_changed(){ this._projection_changed = true; this._view_projection_changed = true;}
    _notify_view_changed(){ this._view_changed = true; this._view_projection_changed = true; }

    perspective(fovy, aspect, near, far){
        this._projection_fovy = fovy;
        this._projection_aspect = aspect;
        this._projection_near = near;
        this._projection_far = far;
        this._notify_projection_changed();
    }

    look_at(eye, center, up){
        this.eye = eye;
        this.center = center;
        this.up = up;
        this._notify_view_changed()
    }

    get projection_view_mat(){
        if (this._view_projection_changed){
            mat4.multiply(this._view_projection_mat, this.projection_mat, this.view_mat);
            this._view_projection_changed = false;
        }

        return mat4.clone(this._view_projection_mat);
    }

    get view_mat(){
        if (this._view_changed){

            mat4.lookAt(this._view_mat, this._view_eye, this._view_center, this._view_up);
            this._view_changed = false;
        }
        return mat4.clone(this._view_mat);
    }

    get projection_mat(){
        if (this._projection_changed){
            mat4.perspective(this._projection_mat, this._projection_fovy, this._projection_aspect,
                             this._projection_near, this._projection_far);
            this._projection_changed = false;
        }
        return mat4.clone(this._projection_mat);
    }

    set fovy(_fovy){
        this._projection_fovy = _fovy;
        this._notify_projection_changed();
    }

    get fovy(){ return this._projection_fovy;}

    set aspect(_aspect){
        this._projection_aspect = _aspect;
        this._notify_projection_changed();
    }

    get aspect(){ return this._projection_aspect;}

    set near(_near){
        this._projection_near = _near;
        this._notify_projection_changed();
    }

    get near() { return this._projection_near;}

    set far(_far){
        this._projection_far = _far;
        this._notify_projection_changed();
    }

    get far(){ return this._projection_far;}

    set eye(_eye){
        vec3.copy(this._view_eye, _eye);
        this.up = this._view_up; // ensure the orthogonality of up vector.
        this._notify_view_changed();
    }

    get eye(){ return this._view_eye;}

    set center(_center){
        vec3.copy(this._view_center,_center);
        this.up = this._view_up; // ensure the orthogonality of up vector.
        this._notify_view_changed();
    }

    get center(){ return this._view_center;}

    set up(_up){
        const right_vec = vec3.create();
        const front_vec = this.front;
        vec3.cross(right_vec, front_vec, _up);
        vec3.cross(this._view_up, right_vec, front_vec);
        mod_math_tool.normalize_vec3(this._view_up);
        this._notify_view_changed();
    }

    get up(){
        return vec3.clone(this._view_up);
    }

    get front(){
        const front_vec = vec3.create();
        front_vec[0] = this._view_center[0] - this._view_eye[0];
        front_vec[1] = this._view_center[1] - this._view_eye[1];
        front_vec[2] = this._view_center[2] - this._view_eye[2];
        mod_math_tool.normalize_vec3(front_vec);
        return front_vec;
    }

    get right(){
        const right_vec = vec3.create();
        vec3.cross(right_vec, this.front, this._view_up);
        mod_math_tool.normalize_vec3(right_vec);
        return right_vec;
    }

    get x_direction(){
        return this.right;
    }
    get y_direction(){
        return this.up;
    }
    get z_direction(){
        const front = this.front;
        front[0] *= -1;
        front[1] *= -1;
        front[2] *= -1;
        return front;
    }
}




export {Camera};