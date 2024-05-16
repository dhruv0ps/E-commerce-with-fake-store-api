import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectedProduct,removeSelectedProduct } from '../Redux/actions/Proudctactions'
import { useSelector } from 'react-redux'
import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom'

const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const {productId} = useParams();
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  console.log(productId)
  const fetchProductDetail = async () => {
    const response = await axios
        .get(`https://fakestoreapi.com/products/${productId}`)
        .catch((err) => {
          console.log("Errrr",err)
        }
        )
        console.log(response.data);
        dispatch(selectedProduct(response.data))
  }
  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
    
},[])
  return (
    <div className="container">
    <div className="row">
        <div className="col-md-6">
            <img src={product.image} alt={product.title} className="img-fluid mb-3 product-image" />
        </div>
        <div className="col-md-6 product-details">
            <h2>{product.title}</h2>
            <p className="description">{product.description}</p>
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


            <div className="action-buttons">
               <Link to={`/carting/${productId}`}> <button className="btn btn-primary add-to-cart">Add to Cart</button></Link>
                <button className="btn btn-secondary">Buy Now</button>
            </div>
        </div>
    </div>
</div>

  )
}

export default ProductDetails
