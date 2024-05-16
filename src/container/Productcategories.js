import axios from 'axios'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setselectedCategory } from '../Redux/actions/Proudctactions';
const Productcategories = () => {
    
    
    const {category} = useParams()
    const  products = useSelector((state) => state.allProducts.selectedCategory);
    const dispatch = useDispatch();
    console.log(products)
    useEffect(() => { 
      if (category) {
        // Fetch products based on selected category
        axios.get(`https://fakestoreapi.com/products/category/${category}`)
          .then(response => {
            console.log(response.data);
             dispatch(setselectedCategory(response.data))
          })
          .catch(error => {
            console.error('Error fetching category products:', error);
          });
      }
    }, [category, dispatch]);
      
  return (
    <>
  Welcome to the page 
  {products && products.length > 0 ? (
  <div className="card-group">
    <div className="row">
      {products.map((product) => (
        <div key={product.id} className=" mainnn col-sm-3" style={{ height: "470px", marginTop: "25px", border: "none" }} >
          <Link to={`/product/${product.id}`}>
            <div className="card main position-relative">
              <img src={product.image} alt={product.title} className="card-img-top img-fluid rounded-top" style={{ height: "270px", width: "200px", objectFit: "cover", margin: "10px auto 0" }} />
              <div className="overlay"></div>
              <div className="card-body">
                <div>
                  <div className="text-black" style={{ marginBottom: '5px', fontWeight: 'bold' }}>{product.title}</div>
                  <div className='meta price' style={{ marginTop: '5px' }}>${product.price}</div>
                </div>
                <div className='meta'>{product.category}</div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
) : (
  <div>No products found</div>
)}

    </>
  )
}

export default Productcategories
