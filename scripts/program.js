/**
 * Created by chkap on 17-6-24.
 */


define([], function () {

    class BaseProgram{
        static _prog = null;

        constructor(gl){
            this._gl = gl;
            this._vertex_source = `
                attribute vec4 a_position;
                void main(){
                    gl_Position = a_position;
                }
                `;
            this._fragment_source = `
                void main(){
                    gl_FragColor = vec4(1,0,0,1);
                }
                `;

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
                return;
            }

        }

        enable(){
            if (this._gl && this._program){
                this._gl.useProgram(this._program);
            }
        }

        static create(){
            if(!BaseProgram._prog){
                BaseProgram._prog = new BaseProgram()
            }
        }
    }

    return {
        BaseProgram,
    }


})

