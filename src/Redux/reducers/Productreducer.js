import { ActionTypes } from "../constants/Action-types"

const intialState = {
    products : [{
        id: 1,
        title : "Dhruv",
        category : "programmer"
    }],
    selectedCategory:null
}

export const productReducer = (state = intialState,{type,payload}) => {
    switch(type) {
        case ActionTypes.SET_PRODUCTS:
            return {...state,products : payload};
        case ActionTypes.SET_SELECTED_CATEGORIES:
                return{...state, selectedCategory:payload
                }
        default :
        return state;
    }
}

export const selectedProductReducer = (state={},{type,payload}) => {
    switch(type){
        case ActionTypes.SELECTED_PRODUCT:
              return{...state,...payload};
        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return{}
        case ActionTypes.SET__LIMITPRODUCT:
            return{...state,products : payload}
        case ActionTypes.SET_PRODUCT_CATEGORIES:
            return{...state,product :payload}
        case ActionTypes.ADD_PRODUCT:
            return{...state,product : payload}
        case ActionTypes.REMOVE_PRODUCT :
            return{...state,product : payload}
       default :
              return state;
    }
}
// reducer.js
const initialState11 = {
    count: 1
  };
  
 export const countReducer = (state = initialState11, {type}) => {
    switch (type) {
      case ActionTypes.INCREMENT_COUNT:
        return {
          ...state,
          count: state.count + 1
        };
      case ActionTypes.DECREMENT_COUNT:
        return {
          ...state,
          count: state.count > 0 ? state.count - 1 : 0
        };
      default:
        return state;
    }
  };
  
  const initialState12 = {
    cartCount :0
    
  }

  export const cartingReducer = (state = initialState12,{type}) => {
    switch(type){
      case ActionTypes.ADD_TO_CART:
        return{
          ...state,
          cartCount: state.cartCount + 1,
        }
        default:
          return state;
    }
  }