export const GET_ALL_FOOD = 'GET_ALL_FOOD';
export const START='START';
export const END='END';
export const ORDERaz='ORDERaz';
export const DIET_TYPES='DIET_TYPES'
export const DIET_FILTER='DIET_FILTER'
export const SEARCHING='SEARCHING'
export const FILTER_TYPES='FILTER_TYPES'

export const getAllFood = (name) => dispatch => {
        if(name){
            return fetch(`http://localhost:3001/api/recipes/?name=${name}`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        });
        }
        else {
            return fetch(`http://localhost:3001/api/recipes/`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        });
        }
};
export const startPagination = (start) => dispatch => {
    return dispatch({ type: START, payload: start })
};
export const endPagination = (end) => dispatch => {
    return dispatch({ type: END, payload: end })
};
export const ascOrDsc = (value) => dispatch => {
    return dispatch({ type: ORDERaz, payload: value })
};
export const dietTypes = () => dispatch => {
    let options={
        method: "POST"
    }
        return fetch(`http://localhost:3001/api/recipes/diet`,options)
        .then(response => response.json())
        .then(json => {
        dispatch({ type: DIET_TYPES, payload: json });
    });
};
export const dietFilter = (value) => dispatch => {
    return dispatch({ type: DIET_FILTER, payload: value })
};
export const changeFilterTypes = (value) => dispatch => {
    return dispatch({ type: FILTER_TYPES, payload: value })
};
export const createRecipe = ({name,image,summary,points,healthScore,instructions}) => dispatch => {
    let options={
        method: "POST",
        body: JSON.stringify({name,image,summary,points,healthScore,instructions})
    }
        return fetch(`http://localhost:3001/api/recipes/create`,options)
        .then(response => response.json())
        .then(json => {
        dispatch({ type: DIET_TYPES, payload: json });
    });
};