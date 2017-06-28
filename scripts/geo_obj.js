/**
 * Created by chkap on 17-6-24.
 */

define(['program'], function (mod_program) {
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
           prog_manager.selectProgram(mod_program.PosProgram);
           let cur_gl = prog_manager.getWebglContext();
           cur_gl.vertexAttrib3f(prog_manager.a_position, this.x, this.y, this.z);
           cur_gl.drawArrays(gl.POINTS, 0, 1);
       }
   }

   return {
       GeoObject,
       GeoPoint,
   }
});
