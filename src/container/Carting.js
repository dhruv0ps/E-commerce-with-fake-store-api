import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Carting.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCount, decrementCount, addtocarting } from '../Redux/actions/Proudctactions';

const Carting = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);
  const[counttt,setCount] = useState();

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
        const price = parseFloat(response.data.price);
        console.log(response.data.price)
        setSubtotal(price);
      } catch (error) {
        console.log("Error fetching product:", error);
      }
    };

    if (productId && productId !== "") {
      fetchProductDetail(productId);
    }
  }, [productId, count]);

  // const incrementCount = () => {
  //   setCount(count + 1);
  // };

  // const decrementCount = () => {
  //   if (count > 0) {
  //     setCount(count - 1);
  //   }
  // };
  
  const handleevent = () => {
    ;// Get the existing stored product IDs array from localStorage
const storedProducts = JSON.parse(localStorage.getItem("storedProducts")) || [];
// addtocarting(); 
dispatch(addtocarting(productId,count.count));

const newProduct = {
    productId: productId,
    count: count
};


const updatedProductIdsArray = [...storedProducts, newProduct];


localStorage.setItem("storedProducts", JSON.stringify(updatedProductIdsArray));

  }
    
    // localStorage.setItem('count',counttt);
    const token = localStorage.getItem('token');

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src={product.image} alt={product.title} className="img-fluid mb-3 product-image" />
          </div>
          <div className="col-md-6 product-details">
            <h2>{product.title}</h2>
            <div className="details">
              <h3 className="ui brown block header">{product.category}</h3>
              <h2>
                <a className="ui teal tag label">${product.price}</a>
              </h2>
            </div>
            <div className="ratings">
              <i className="fa fa-star rating-color" />
              <i className="fa fa-star rating-color" />
              <i className="fa fa-star rating-color" />
              <i className="fa fa-star rating-color" />
              <i className="fa fa-star" />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-6">
            <div className="counter">
              <div className="button-container">
                <button className="increment-button" onClick={() => dispatch(incrementCount())}>+</button>
                <div value={counttt} className="count-display">{count.count}</div>
                <button className="decrement-button" onClick={() => dispatch(decrementCount())}>-</button>
              </div>
            </div>
            <div className="subtotal">
            <h4>Cart subtotal: ${subtotal * count.count}</h4>

            </div>
            
            {token ? (
              <button onClick={handleevent} >
                <Link to={`/usercarting`} className="btn btn-primary mt-3">
                  Add to list 
                </Link>
              </button>
            ) : (
              <Link to={`/login/${productId}`} className="btn btn-primary mt-3">
                Login to Add to List
              </Link>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Carting;
