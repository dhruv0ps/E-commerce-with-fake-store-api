import { ActionTypes } from "../constants/Action-types"
export const setProducts = (products) => {
    return{
        type:ActionTypes.SET_PRODUCTS,
        payload:products,

    }
}

export const selectedProduct = (product) => {
return{
    type : ActionTypes.SELECTED_PRODUCT,
    payload :product,

}
}

export const removeSelectedProduct = () => {
    return{
        type : ActionTypes.REMOVE_SELECTED_PRODUCT,
    
    
    }
    }
export const setLimitProduct = (products) => {
    return{
        type:ActionTypes.SET__LIMITPRODUCT,
        payload:products,
    }
}

export const setProductcategories = (product) => {
    return{
        type:ActionTypes.SET_PRODUCT_CATEGORIES,
        payload:product,
    }
}

export const setselectedCategory = ( selectedCategory) => {
    return{
        type:ActionTypes.SET_SELECTED_CATEGORIES,
        payload: selectedCategory
    }
}

export const addToCart = (product) => {
    return{
        type:ActionTypes.ADD_PRODUCT,
        payload: product
    }
}
export const removeFromCart = (productId) => ({
    type: ActionTypes.REMOVE_PRODUCT,
    payload: productId,
  });

  export const incrementCount = (product) => ({
    type: ActionTypes.INCREMENT_COUNT,
    payload : product
  });
  
  export const decrementCount = (product) => ({
    type: ActionTypes.DECREMENT_COUNT,
    payload : product
  });

  export const addtocarting = (product) => ({
    type :ActionTypes.ADD_TO_CART,
    payload: {
        product
      },
  })