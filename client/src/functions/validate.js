export function validate(input) {
    let errors = {existError:true,points:[],healthScore:[]};
    let totalErrors=9;
    if (!input.name) {
        errors.name = 'Name is required';
        totalErrors++;
    } else if(!(input.name.replace(/[0-9]/g,"").length===input.name.length)){
        errors.name="Name invalid"
        totalErrors++;
    }else totalErrors--;
    if (!input.image) {
        errors.image = 'Image is required';
        totalErrors++;
    } else totalErrors--;
    if(!input.summary){
        errors.summary = 'Summary is required';
        totalErrors++;
    } else totalErrors--;

    if(!input.points){
        errors.points = [...errors.points,'Points is required'];
        totalErrors++;
    } else totalErrors--;
    if((parseFloat(input.points)<0||parseFloat(input.points)>100)&&input.points*1){
        errors.points=[...errors.points,"Num not valid"];
        totalErrors++;
    }   else if(!parseFloat(input.points)||!(input.points*1)){
        errors.points=[...errors.points,"Num not valid"];
        totalErrors++
    }   else totalErrors--;

    if(!input.healthScore){
        errors.healthScore = [...errors.healthScore,'Health Score is required'];
        totalErrors++;
    } else totalErrors--;

    if((parseFloat(input.healthScore)<0||parseFloat(input.healthScore)>100)&&input.healthScore*1){
        errors.healthScore=[...errors.healthScore,"Num not valid"];
        totalErrors++;
    }   else if(!parseFloat(input.healthScore)||!(input.healthScore*1)) {
        errors.healthScore=[...errors.healthScore,"Num not valid"];
        totalErrors++;
    }   else totalErrors--;
    if(input.dietTypes?.length===0){
        errors.dietTypes = 'Diet Type is required (at least 1)';
        totalErrors++;
    } else totalErrors--;

    if(input.instructionsObject?.length===0){
        errors.instructions = 'Instructions is required (at least 1)';
        totalErrors++;
    } else totalErrors--;
    if(totalErrors===0) errors.existError=false;
    return errors;
}