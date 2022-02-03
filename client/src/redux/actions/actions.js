export const GET_ALL_FOOD = 'GET_ALL_FOOD';
export const START='START';
export const END='END';
export const ORDERaz='ORDERaz';
export const ORDER_BY_POINTS='ORDER_BY_POINTS'
export const DIET_TYPES='DIET_TYPES';
export const DIET_FILTER='DIET_FILTER';
export const SEARCHING='SEARCHING';
export const FILTER_TYPES='FILTER_TYPES';
export const DATA_FOOD_CREATED='DATA_FOOD_CREATED';
export const FOOD_INFO='FOOD_INFO';
export const LOADING='LOADING';

export const getAllFood = (name,searchOption) => dispatch => {
    if(searchOption==="searchDb"){
        return fetch(`http://localhost:3001/api/recipes/?searchDb=true`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        }).catch(e=>console.log(e));
    } else if(searchOption==="searchApi"){
        return fetch(`http://localhost:3001/api/recipes/?searchApi=true`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        }).catch(e=>console.log(e));
    }else {
        if(name){
            return fetch(`http://localhost:3001/api/recipes/?name=${name}`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        }).catch(e=>console.log(e));
        }
        else {
            return fetch(`http://localhost:3001/api/recipes/`)
            .then(response => response.json())
            .then(json => {
            dispatch({ type: GET_ALL_FOOD, payload: json });
        }).catch(e=>console.log(e));
        }
    }
};
export const loading = (value) => dispatch => {
    return dispatch({ type: LOADING, payload: value })
};
export const foodInfo = (id) => dispatch => {
        return fetch(`http://localhost:3001/api/recipes/${id}`)
        .then(response => response.json())
        .then(json => {
        dispatch({ type: FOOD_INFO, payload: json });
    }).catch(e=>console.log(e));
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
export const ascOrDscByPoints = (value) => dispatch => {
    return dispatch({ type: ORDER_BY_POINTS, payload: value })
};
export const dietTypes = () => dispatch => {
    let options={
        method: "POST"
    }
        return fetch(`http://localhost:3001/api/recipes/diet`,options)
        .then(response => response.json())
        .then(json => {
        dispatch({ type: DIET_TYPES, payload: json });
    }).catch(e=>console.log(e));
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
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({name,image,summary,points,healthScore,instructions})
    }
        return fetch(`http://localhost:3001/api/recipes/create`,options)
        .then(response => response.json())
        .then(json => {
        dispatch({type: DATA_FOOD_CREATED, payload: json})
    }).catch(e=>console.log(e));
};
export const enlaceFoodWithDiet = (foodId,dietId) => dispatch => {
    let options={
        method: "POST"
    }
    return fetch(`http://localhost:3001/api/recipes/${foodId}/diet/${dietId}`,options).catch(e=>console.log(e))
};