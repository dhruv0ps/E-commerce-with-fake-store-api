import {combineReducers} from 'redux'
import  { productReducer, selectedProductReducer,productLimitReducer,countReducer,cartingReducer } from './Productreducer';


const reducers = combineReducers({
    allProducts : productReducer,
    product :selectedProductReducer,
    count : countReducer,
    cartcount : cartingReducer
})
export default reducers;