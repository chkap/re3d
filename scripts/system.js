// import Camera from 'camera'

/**
 * Created by chkap on 17-6-20.
 */

define(['camera'], (camera)=>{

    class System{
        constructor(canvas){
            gl = canvas.getContext('webgl2');
            if(!gl){
                console.error('fail to init webgl2 context')
                return;
            }
            this._gl = gl;
            this._canvas = canvas;
            this._scene = null;
            this._camera = null;
        }

        get gl(){return this._gl;}

    }


    return {System}
});


