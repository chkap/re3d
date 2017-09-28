/**
 * Created by chkap on 17-6-24.
 */


class ProgramManager{

    constructor(gl){
        this._gl = gl;
        this._program_map = new Map();
    }

    get gl() {return this._gl;}

    _createProgram(prog_class){
        let program_instance = new prog_class(this._gl);
        this._program_map.set(prog_class, program_instance)
    }

    selectProgram(prog_class){
        if (Object.getPrototypeOf(prog_class) !== BaseProgram){
            alert('cannot create a program not inherited from BseProgram.');
            return;
        }
        if (!this._program_map.has(prog_class)){
            this._createProgram(prog_class);
            this._program_map.get(prog_class).enable();
        }
        let cur_program = this._program_map.get(prog_class);
        cur_program.enable();
        return cur_program;
    }
}

class BaseProgram{
    constructor(gl, vertex_source, fragment_source){
        this._gl = gl;
        if (!this._gl){
            console.error('webgl context missing. fail to construct _BaseProgram');
            return;
        }
        this._vertex_source = vertex_source;
        this._fragment_source = fragment_source;
        this._compileProgram();
    }

    _compileProgram(){
        this._vertex_shader = this._gl.createShader(this._gl.VERTEX_SHADER);
        this._gl.shaderSource(this._vertex_shader, this._vertex_source);
        this._gl.compileShader(this._vertex_shader);
        if (!this._gl.getShaderParameter(this._vertex_shader, this._gl.COMPILE_STATUS)) {
            alert(this._gl.getShaderInfoLog(this._vertex_shader));
            return ;
        }

        this._fragment_shader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        this._gl.shaderSource(this._fragment_shader, this._fragment_source);
        this._gl.compileShader(this._fragment_shader, this._fragment_source);
        if (!this._gl.getShaderParameter(this._fragment_shader, this._gl.COMPILE_STATUS)) {
            alert(this._gl.getShaderInfoLog(this._fragment_shader));
            return ;
        }

        this._program = this._gl.createProgram();
        this._gl.attachShader(this._program, this._vertex_shader);
        this._gl.attachShader(this._program, this._fragment_shader);
        this._gl.linkProgram(this._program);
        if (!this._gl.getProgramParameter(this._program, this._gl.LINK_STATUS)){
            alert("Could not initialise shaders");
        }
    }

    enable(){
        if (this._gl && this._program){
            this._gl.useProgram(this._program);
        }else{
            alert('The program is not valid.')
        }
    }

}



class PosProgram extends BaseProgram{

    constructor(gl){
        let vertex_source =
            `#version 300 es
            precision mediump float;
            precision mediump int;
            in vec3 position;
            uniform mat4 projection_view;
            void main(){
                vec4 pos = vec4(position, 1.0);
                gl_Position = projection_view * pos;
            }`;
        let fragment_source =
            `#version 300 es
            precision mediump float;
            //uniform vec3 color;
            uniform vec3 color;
            out vec4 output_color;
            void main(){
                output_color = vec4(color,1.0);
            }`;
        super(gl, vertex_source, fragment_source);
        this.position = gl.getAttribLocation(this._program, 'position');
        this.projection_view = gl.getUniformLocation(this._program, 'projection_view');
        this.color = gl.getUniformLocation(this._program, 'color');
        // this.color = gl.getAttribLocation(this._program, 'color');
    }
}

class PointProgram extends BaseProgram{

    constructor(gl){
        let vertex_source =
            `#version 300 es
            precision mediump float;
            precision mediump int;
            in vec3 position;
            uniform mat4 projection_view;
            uniform float point_size;
            void main(){
                vec4 pos = vec4(position, 1.0);
                gl_Position = projection_view * pos;
                gl_PointSize = point_size;
            }`;
        let fragment_source =
            `#version 300 es
            precision mediump float;
            //uniform vec3 color;
            uniform vec3 color;
            out vec4 output_color;
            void main(){
                output_color = vec4(color,1.0);
            }`;
        super(gl, vertex_source, fragment_source);
        this.position = gl.getAttribLocation(this._program, 'position');
        this.projection_view = gl.getUniformLocation(this._program, 'projection_view');
        this.color = gl.getUniformLocation(this._program, 'color');
        this.point_size = gl.getUniformLocation(this._program, 'point_size');
        // this.color = gl.getAttribLocation(this._program, 'color');
    }
}

export {ProgramManager, BaseProgram, PosProgram, PointProgram}
