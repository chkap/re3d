/**
 * Created by chkap on 17-6-24.
 */

import * as mod_program from './program'

class GeoObject{
   constructor(system, prog_class){
       this.model_mat = null;
       this._vbo = null;
       this._vao = null;
       this._ready = false;
       this._system = system;
       this._prog_class = prog_class;
   }

   get prog(){ return this._system.prog_manager.selectProgram(this._prog_class);}
   get gl(){ return this._system.gl;}

   prepare_vao(){

       this._ready = true;
   }

   get ready(){
       return this._ready;
   }

   _render(projection_view_mat){
       if(!this.ready)  this.prepare_vao();

       if(this._vao === null) {
           console.error('vao not inited!');
       }else {
           this._system.gl.bindVertexArray(this._vao);
           this.draw(projection_view_mat);
           this._system.gl.bindVertexArray(null);
       }
   }

   draw(projection_view_mat){

   }

}

class GeoPoint extends GeoObject{
   constructor(system, x, y, z, r=0, g=0, b=0, point_size=1.0, prog_class=mod_program.PointProgram){
       super(system, prog_class);
       this.x = x;
       this.y = y;
       this.z = z;
       this.r = r;
       this.g = g;
       this.b = b;
       this.sz = point_size;
   }

   prepare_vao(){
       let gl = this.gl;
       if(this._vbo === null){
           this._vbo = gl.createBuffer();
       }
       if(this._vao === null){
           this._vao = gl.createVertexArray();
       }

       gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
       let buf = new Float32Array([this.x, this.y, this.z]);
       gl.bufferData(gl.ARRAY_BUFFER, buf, gl.STATIC_DRAW);

       gl.bindVertexArray(this._vao);
       gl.vertexAttribPointer(this.prog.position, 3, gl.FLOAT, false, 3*4, 0);
       gl.enableVertexAttribArray(this.prog.position);
       gl.bindVertexArray(null);

       return true;
   }

   draw(projection_view_mat){
       let program = this.prog;
       let gl = this.gl;
       gl.uniform3f(program.color, this.r, this.g, this.b);
       // gl.vertexAttrib3f(cur_program.color, this.r, this.g, this.b);
       gl.uniform1f(program.point_size, this.sz);
       gl.uniformMatrix4fv(program.projection_view, false, projection_view_mat);
       gl.drawArrays(gl.POINTS, 0, 1);
   }

}

class GeoTriangle extends GeoObject{
    constructor(system, points_data, color, point_size=1.0, prog_class=mod_program.PosProgram){
        super(system, prog_class);
        if(! points_data instanceof Float32Array) console.error('need Float32Array to construct GeoTriangle.');
        this.data = points_data;
        this.color = color;
        this.point_size=  point_size;
    }

    prepare_vao() {
        let gl = this.gl;
        if (this._vbo === null) {
            this._vbo = gl.createBuffer();
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this._vbo);
        gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);

        if (this._vao === null) {
            this._vao = gl.createVertexArray();
        }
        gl.bindVertexArray(this._vao);
        gl.vertexAttribPointer(this.prog.position, 3, gl.FLOAT, false, 3 * 4, 0);
        gl.enableVertexAttribArray(this.prog.position);
        gl.bindVertexArray(null);
    }

    draw(projection_view_mat){
        let gl = this.gl;
        gl.uniform3fv(this.prog.color, this.color);
        gl.uniform1f(this.prog.point_size, this.point_size);
        gl.uniformMatrix4fv(this.prog.projection_view, false, projection_view_mat);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // render(prog_manager, projection_view_mat){
    //     let cur_program = prog_manager.selectProgram(mod_program.PosProgram);
    //     let gl = prog_manager.gl;
    //     if(this._buffer === null){
    //         this._buffer = gl.createBuffer();
    //     }
    //     gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);
    //     gl.bufferData(gl.ARRAY_BUFFER, this.data, gl.STATIC_DRAW);
    //
    //     if(this._vao === null){
    //         this._vao = gl.createVertexArray();
    //     }
    //     gl.bindVertexArray(this._vao);
    //     gl.vertexAttribPointer(cur_program.position, 3, gl.FLOAT, false, 3*4, 0);
    //     gl.enableVertexAttribArray(cur_program.position);
    //
    //     gl.uniform3fv(cur_program.color, this.color);
    //     gl.uniformMatrix4fv(cur_program.projection_view, false, projection_view_mat);
    //     gl.drawArrays(gl.TRIANGLES, 0, 3);
    //
    //     gl.bindVertexArray(null);
    // }
}

export {GeoObject, GeoPoint, GeoTriangle};
