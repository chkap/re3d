/**
 * Created by chkap on 17-6-24.
 */

import * as mod_program from './program'


class GeoObject{
   constructor(){
       this.model_mat = null;
   }

   render(prog_manager, projection_view_mat){

   }
}

class GeoPoint{
   constructor(x, y, z, r=0, g=0, b=0){
       this.x = x;
       this.y = y;
       this.z = z;
       this.r = r;
       this.g = g;
       this.b = b;
   }

   render(prog_manager, projection_view_mat){
       let cur_program = prog_manager.selectProgram(mod_program.PosProgram);
       let gl = prog_manager.gl;
       gl.vertexAttrib3f(cur_program.position, this.x, this.y, this.z);
       gl.vertexAttrib3f(cur_program.color, this.r, this.g, this.b);
       gl.uniformMatrix4fv(cur_program.projection_view, false, projection_view_mat);
       gl.drawArrays(gl.POINTS, 0, 1);
   }
}

export {GeoObject, GeoPoint};
