export function validate(input) {
    let errors = {existError:true};
    let totalErrors=6;
    if (!input.name) {
        errors.name = 'Name is required';
        totalErrors++;
    } else totalErrors--;
    if (!input.image) {
        errors.image = 'Image is required';
        totalErrors++;
    } else totalErrors--;
    if(!input.summary){
        errors.summary = 'Sumarry is required';
        totalErrors++;
    } else totalErrors--;
    if(!input.points){
        errors.points = 'Points is required';
        totalErrors++;
    } else totalErrors--;
    if(!input.healthScore){
        errors.healthScore = 'Health Score is required';
        totalErrors++;
    } else totalErrors--;
    if(!input.instructions){
        errors.instructions = 'Instructions is required';
        totalErrors++;
    } else totalErrors--;
    if(totalErrors===0) errors.existError=false;
    return errors;
}