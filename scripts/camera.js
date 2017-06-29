/**
 * Created by chkap on 17-6-21.
 */

"use strict";
class Camera {
    constructor(){
        this._count = 0;
    }
    inc_count(){
        this._count ++;
    }
    show_count(){
        console.log(this._count);
    }
}




export {Camera};