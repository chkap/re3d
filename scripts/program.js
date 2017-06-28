/**
 * Created by chkap on 17-6-24.
 */


define(function () {

    class ProgramManager{

        constructor(gl){
            this._gl = gl;
            this._program_map = new Map();
            this._current_program = '';
        }

        get gl() {return this._gl;}

        _createProgram(prog_class){
            if(this._program_map.has(prog_class.programName))
                return;
            let program_instance = new prog_class(this._gl);
            this._program_map.set(prog_class.programName, program_instance)
        }

        selectProgram(prog_class){
            if (Object.getPrototypeOf(prog_class) !== _BaseProgram){
                alert('cannot create a program not defined.');
                return;
            }
            if (!this._program_map.has(prog_class.programName)){
                this._createProgram(prog_class);
                this._program_map.get(prog_class.programName).enable();
                this._current_program = prog_class.programName;
            }
            let cur_program = this._program_map.get(prog_class.programName);
            if (prog_class.programName !== this._current_program){
                cur_program.enable();
                this._current_program = prog_class.programName;
                return cur_program;
            }else{
                return cur_program;
            }

        }
    }

    class _BaseProgram{
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
                return ;
            }
        }

        enable(){
            alert('You cannot enable the _BaseProgram. Enable a subclass program of it.');
        }

        static get programName(){ return '_BaseProgram';}

    }

    class PosProgram extends _BaseProgram{

        constructor(gl){
            let vertex_source =
                `#version 300 es
                in vec4 position;
                void main(){
                    gl_Position = position;
                    gl_PointSize = 10.0;
                }`;
            let fragment_source =
                `#version 300 es
                precision mediump float;
                out vec4 frag_color;
                void main(){
                    frag_color = vec4(0.5,0.5,0.0,1.0);
                }`;
            super(gl, vertex_source, fragment_source);
            this.position = gl.getAttribLocation(this._program, 'position');

        }

        enable(){
            if (this._gl && this._program){
                this._gl.useProgram(this._program);
            }else{
                alert('The program is not valid.')
            }
        }

        static get programName(){ return 'PosProgram'}
    }

    return {
        ProgramManager,
        PosProgram,
    }


});

