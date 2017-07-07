// import Camera from 'camera'

/**
 * Created by chkap on 17-6-20.
 */
import * as mod_camera from './camera.js'
import * as mod_scene from './scene.js'

class System{
    constructor(canvas) {
        let gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error('fail to init webgl2 context');
            canvas.text = 'Webgl is not supported.';
            return;
        }
        this._gl = gl;
        this._canvas = canvas;
        this._viewport_width = 0;
        this._viewport_height = 0;
        this._scene = new mod_scene.Scene(this);
        this._camera = new mod_camera.Camera();
        this._do_rendering = true;
    }

    get gl(){return this._gl;}
    get scene() {return this._scene;}
    get camera() {return this._camera;}

    _renderScene(){
        if (this._viewport_width !== this._canvas.clientWidth || this._viewport_height !== this._canvas.clientHeight){
            this._viewport_height = this._canvas.clientHeight;
            this._viewport_width = this._canvas.clientWidth;
            this._canvas.width = this._viewport_width;
            this._canvas.height = this._viewport_height;
            this._gl.viewport(0, 0, this._viewport_width, this._viewport_height);
            this._camera.aspect = this._viewport_width / this._viewport_height;
        }
        this._scene.render(this._camera.projection_view_mat);
    }

    renderScene(timestamp){
        this._renderScene();
        if (this._do_rendering){
            window.requestAnimationFrame((timestamp)=>this.renderScene(timestamp));
        }
    }

    startRendering(){
        this._do_rendering = true;
        window.requestAnimationFrame((timestamp)=>this.renderScene(timestamp));
    }

    stopRendering(){
        this._do_rendering = false;
    }

}

export {System };


