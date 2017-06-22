// import Camera from 'camera'

/**
 * Created by chkap on 17-6-20.
 */

define(['camera'], (camera)=>{
    "use strict";
    let gl;

    window.addEventListener('load', () => initGL('canvas'),
        false);


    function initGL(canvas_id) {
        try {
            let canvas = document.getElementById(canvas_id);
            gl = canvas.getContext("experimental-webgl");
            gl.viewport(0, 0, canvas.width, canvas.height);
        } catch(e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
        }
    }



    let cam = new camera.Camera();
    cam.show_count();
    cam.inc_count();
    cam.show_count();
    return {}
});


