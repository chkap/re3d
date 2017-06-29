/**
 * Created by chkap on 17-6-24.
 */

import * as mod_program from './program'

class Scene{

    constructor(system){
        this._system = system;
        this._program_manager = new mod_program.ProgramManager(this._system.gl);
        this.clear_color = [1.0,1.0,1.0,1.0];
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
        gl.clearColor(this.clear_color[0], this.clear_color[1], this.clear_color[2], this.clear_color[3]);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        for(let obj of this._obj_set){
            obj.render(this._program_manager);
        }
    }
}

export {Scene};



