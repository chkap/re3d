/**
 * Created by chkap on 17-7-12.
 */


export function normalize_vec3(v, r=1.0){
    const len2 = (v[0]*v[0] + v[1]*v[1] + v[2]* v[2]);
    if(len2){
        const scale = r/Math.sqrt(len2);
        v[0] *= scale;
        v[1] *= scale;
        v[2] *= scale;
    }
    return v;
}

