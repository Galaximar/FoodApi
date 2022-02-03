export function removeUltimateLines (str="Cargando") {
    let finalPoint=str.length-1;
    for (let i=0;i<str.length;i++){
        if(str[i]===".") {
            finalPoint=i
        }
        if(str[i]+str[i+1]==="<a") return str.slice(0,finalPoint+1);
    }
    return str.slice(0,finalPoint+1);
}