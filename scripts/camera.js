/**
 * Created by chkap on 17-6-21.
 */

"use strict";

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
        vec3.copy(this._view_eye, eye);
        vec3.copy(this._view_center, center);
        vec3.copy(this._view_up, up);
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

    set aspect(_aspect){
        this._projection_aspect = _aspect;
        this._notify_projection_changed();
    }

    set near(_near){
        this._projection_near = _near;
        this._notify_projection_changed();
    }

    set far(_far){
        this._projection_far = _far;
        this._notify_projection_changed();
    }

    set eye(_eye){
        vec3.copy(this._view_eye, _eye);
        this._notify_view_changed();
    }

    set center(_center){
        vec3.copy(this._view_center,_center);
        this._notify_view_changed();
    }

    set up(_up){
        vec3.copy(this._view_up, _up);
        this._notify_view_changed();
    }

}




export {Camera};