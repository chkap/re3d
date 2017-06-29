/**
 * Created by chkap on 17-6-24.
 */

define(['./program'], function (mod_program) {
   class GeoObject{
       constructor(){
           this.model_mat = null;
       }

       render(prog_manager){

       }
   }

   class GeoPoint{
       constructor(x, y, z){
           this.x = x;
           this.y = y;
           this.z = z;
       }

       render(prog_manager){
           let cur_program = prog_manager.selectProgram(mod_program.PosProgram);
           let gl = prog_manager.gl;
           gl.vertexAttrib3f(cur_program.position, this.x, this.y, this.z);
           gl.drawArrays(gl.POINTS, 0, 1);
       }
   }

   return {
       GeoObject,
       GeoPoint,
   }
});
