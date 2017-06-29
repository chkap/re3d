// import Camera from 'camera'

/**
 * Created by chkap on 17-6-20.
 */

define(['./camera', './scene'], (mod_camera, mod_scene)=>{

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
            this._scene = new mod_scene.Scene(this);
            this._camera = null;
            this._do_rendering = true;
        }

        get gl(){return this._gl;}
        get scene() {return this._scene;}

        _renderScene(){
            this._scene.render();
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



    return {
        System,
    }
});


