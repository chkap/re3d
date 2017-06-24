/**
 * Created by chkap on 17-6-24.
 */


define([], function () {

    class Scene{

        constructor(system){
            this._system = system;
            this.clear_color = [0.0,0.0,0.0,1.0];
            this._obj_set = new Set();
        }

        addObject(obj){
            this._obj_set.add(obj);
        }

        removeObject(obj){
            this._obj_set.delete(obj);
        }

        render(){
            let gl = this._system.gl;
            gl.clearColor(this.clear_color);
            gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

            for(let obj of this._obj_set){
                obj.render();
            }
        }
    }

    return {Scene};
});



