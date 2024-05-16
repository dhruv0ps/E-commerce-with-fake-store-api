import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux'
import ProductCompoent from './ProductCompoent';
import { setProducts } from '../Redux/actions/Proudctactions';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Product.css';
const ProductListing = () => {
    const products = useSelector((state) => state);
    const dispatch = useDispatch();

    console.log(products);

    const fetchProducts = async () => {
      const response = await axios
          .get('https://fakestoreapi.com/products')
          .catch((err) => {
            console.log("Errrr",err)
          }
          )
          console.log(response.data);
          dispatch(setProducts(response.data))
    }
    useEffect(() => {
      fetchProducts();
      
},[])
console.log("Products : ",products)
  return (
    <div className='ui grid container'>
      {/* <h1>ProductListing</h1>       */}
      <ProductCompoent/>
    </div>
  )
}

export default ProductListing
