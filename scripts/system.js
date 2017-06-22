// import Camera from 'camera'

/**
 * Created by chkap on 17-6-20.
 */

define(['camera'], (camera)=>{

    function initGL(canvas_id) {
        try {
            let canvas = document.getElementById(canvas_id);
            gl = canvas.getContext("experimental-webgl");
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clearColor(0,0,0,1);
            gl.clear(gl.COLOR_BUFFER_BIT);
        } catch(e) {
        }
        if (!gl) {
            alert("Could not initialise WebGL, sorry :-(");
            return;
        }
        console.log('init finished.');
        let cam = new camera.Camera();
        cam.show_count();
        cam.inc_count();
        cam.show_count();
    }
    return {initGL}
});


