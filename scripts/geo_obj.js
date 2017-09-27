/**
 * Created by chkap on 17-6-24.
 */

import * as mod_program from './program'


class GeoObject{
   constructor(){
       this.model_mat = null;
   }

   prepare(){

   }

   render(prog_manager, projection_view_mat){

   }
}

class GeoPoint extends GeoObject{
   constructor(x, y, z, r=0, g=0, b=0){
       super();
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
       gl.uniform3f(cur_program.color, this.r, this.g, this.b);
       // gl.vertexAttrib3f(cur_program.color, this.r, this.g, this.b);
       gl.uniformMatrix4fv(cur_program.projection_view, false, projection_view_mat);
       gl.drawArrays(gl.POINTS, 0, 1);
   }
}

class GeoTriangle extends GeoObject{
    constructor(points_data, color){
        super();
        if(! points_data instanceof Float32Array) console.error('need Float32Array to construct GeoTriangle.');
        this.data = points_data;
        this.color = color;
        this._buffer = null;
        this._vao = null;
    }

    render(prog_manager, projection_view_mat){
        let cur_program = prog_manager.selectProgram(mod_program.PosProgram);
        let gl = prog_manager.gl;
        if(this._buffer === null){
            this._buffer = gl.createBuffer();
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

        if(this._vao === null){
            this._vao = gl.createVertexArray();
        }
        gl.bindVertexArray(this._vao);
        gl.vertexAttribPointer(cur_program.position, 3, gl.FLOAT, false, 3*4, 0);
        gl.enableVertexAttribArray(cur_program.position);

        gl.uniform3fv(cur_program.color, this.color);
        gl.uniformMatrix4fv(cur_program.projection_view, false, projection_view_mat);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        gl.enableVertexAttribArray(null);
    }
}

export {GeoObject, GeoPoint, GeoTriangle};
