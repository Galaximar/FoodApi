import { DATA_FOOD_CREATED, DIET_FILTER, DIET_TYPES, FILTER_TYPES, FOOD_INFO, GET_ALL_FOOD, LOADING, ORDERaz, ORDER_BY_POINTS } from "../actions/actions";
import { START } from "../actions/actions";
import { END } from "../actions/actions";

const initialState = {
    food: [],
    foodDetail:[],
    dietTypes:[],
    start:0,
    end:0,
    foodCreatedId:undefined,
    filterTypes:{
        orderAlphabetic: "none",
        orderByPoints:"none",
        byDiet: [],
    }
};
let foodOriginal=[]

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FOOD:
            foodOriginal=action.payload;
            return {...state,food:action.payload}
        case LOADING:
            foodOriginal=action.payload
            return {...state,food:action.payload}
        case FOOD_INFO:
            return {...state,foodDetail:action.payload}
        case START:
            return {...state,start:action.payload}
        case END:
            return {...state,end:action.payload}
        case FILTER_TYPES:
            let ant={...state.filterTypes}
            if(Array.isArray(action.payload)) return {...state,...state.filterTypes.byDiet=action.payload}
            else if(action.payload.orderAlphabetic==="asc"||action.payload.orderAlphabetic==="dsc") {
                ant.orderByPoints="none";
                ant.orderAlphabetic=action.payload.orderAlphabetic;
                return {...state,filterTypes:ant}
            }
            else {
                ant.orderAlphabetic="none";
                ant.orderByPoints=action.payload.orderPoints;
                return {...state,filterTypes:ant};
            }
        case ORDERaz:
            let {orderAlphabetic}=action.payload; 
            let foodOrder =[...state.food];
            if(orderAlphabetic!=="none"){
                foodOrder=foodOrder.sort((a,b)=>{
                    if(orderAlphabetic==="asc"){
                        if(a.name>b.name) return 1
                        if(a.name<b.name) return -1
                        return 0;
                    } else {
                        if(a.name>b.name) return -1
                        if(a.name<b.name) return 1
                        return 0;
                    }
                })
                let ant={...state.filterTypes}
                return {...state,food:foodOrder,filterTypes:{...ant,orderByPoints:"none"}}
            }
            foodOriginal=foodOrder
            return {...state,food:foodOrder}
        case ORDER_BY_POINTS:
            let {orderPoints}=action.payload; 
            let foodToOrder =[...state.food]
            if(orderPoints!=="none"){
                foodToOrder=foodToOrder.sort((a,b)=>{
                    if(orderPoints==="ascPoints"){
                        if((a.spoonacularScore||a.points)>(b.spoonacularScore||b.points)) return 1 
                        if((a.spoonacularScore||a.points)<(b.spoonacularScore||b.points)) return -1
                        return 0;
                    } else {
                        if((a.spoonacularScore||a.points)>(b.spoonacularScore||b.points)) return -1
                        if((a.spoonacularScore||a.points)<(b.spoonacularScore||b.points)) return 1
                        return 0;
                    }
                })
                foodOriginal=foodToOrder;
                let ant={...state.filterTypes};
                return {...state,food:foodToOrder,filterTypes:{...ant,orderAlphabetic:"none"}}
            }
            return {...state,food:foodToOrder}
        case DIET_TYPES:
            let dietsData=action.payload;
            return {...state,dietTypes:dietsData}
        case DATA_FOOD_CREATED:
            return {...state,foodCreatedId:action.payload.id}
        case DIET_FILTER:
            let dietsReciveds=action.payload;  
            let foodDiet=foodOriginal
            if(dietsReciveds.length){
                let found=[];  
                foodDiet=foodOriginal?.filter((food)=>{ 
                return food.diets.some((f,i)=>{
                    let options=dietsReciveds.find((options)=>options===f)
                    if(options) {
                        found.push(options)
                    }
                    if(found.length===dietsReciveds.length) {
                        found=[];
                        return true
                    }
                    if(i+1===food.diets.length) {
                        found=[]
                    }
                    return false;
                })
            })
            } 
            return {...state,food:foodDiet}
        default:
            return state;
    };
};

export default reducer;
