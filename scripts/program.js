/**
 * Created by chkap on 17-6-24.
 */


define([], function () {



    class ProgramManager{

        constructor(gl){
            this._gl = gl;
            this._program_map = new Map();
        }

        _createProgram(prog_class){
            if (Object.getPrototypeOf(prog_class) !== _BaseProgram){
                alert('cannot create a program not defined.');
                return;
            }
            if(this._program_map.has(prog_class.programName))
                return;
            let program_instance = new prog_class();
            this._program_map.set(prog_class.programName, program_instance)
        }

        selectProgram(prog_class){
            if (Object.getPrototypeOf(prog_class) !== _BaseProgram){
                alert('cannot create a program not defined.');
                return;
            }
            if (!this._program_map.has(prog_class.programName)){
                this._createProgram(prog_class)
            }
            this._program_map.get(prog_class.programName).enable();
        }
    }

    class _BaseProgram{
        constructor(gl, vertex_source, fragment_source){
            this._gl = gl;
            this._vertex_source = vertex_source;
            this._fragment_source = fragment_source;
            this._compileProgram();
        }

        _compileProgram(){
            this._vertex_shader = gl.createShader(gl.VERTEX_SHADER);
            gl.compileShader(this._vertex_shader, this._vertex_source);
            if (!gl.getShaderParameter(this._vertex_shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(this._vertex_shader));
                return ;
            }

            this._fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
            gl.compileShader(this._fragment_shader, this._fragment_source);
            if (!gl.getShaderParameter(this._fragment_shader, gl.COMPILE_STATUS)) {
                alert(gl.getShaderInfoLog(this._fragment_shader));
                return ;
            }

            this._program = gl.createProgram();
            gl.attachShader(this._program, this._vertex_shader);
            gl.attachShader(this._program, this._fragment_shader);
            gl.linkProgram(this._program);
            if (!gl.getProgramParameter(this._program, gl.LINK_STATUS)){
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
            vertex_source = `
                attribute vec4 a_position;
                void main(){
                    gl_Position = a_position;
                }
                `;
            fragment_source = `
                void main(){
                    gl_FragColor = vec4(1,0,0,1);
                }
                `;
            super(gl, vertex_source, fragment_source);
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
        BaseProgram,
    }


});

