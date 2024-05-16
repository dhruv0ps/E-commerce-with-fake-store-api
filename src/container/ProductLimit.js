import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLimitProduct } from '../Redux/actions/Proudctactions';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Section from './Section';
import { useNavigate } from 'react-router-dom';
const ProductLimit = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
  const[categories,setCategories] = useState([])
  const navigate = useNavigate();
  useEffect(()=> {
      axios
          .get("https://fakestoreapi.com/products/categories")
          .then((response) => {
              // console.log(response)
              setCategories(response.data)
          })
          .catch((err)=> {
              console.log(err);
          })

  })
  const handleCategoryClick = (category) => {
      setSelectedCategory(category); // Update selected category when clicked
      navigate(`/productcategories/${category}`)
      // axios
      //    .get(`https://fakestoreapi.com/products/category/${category}`)
      //    .then((response)=> {
      //        console.log(response);
      //    })
      //    .catch((err)=> {
      //     console.log(err)
      //    })
    };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products?limit=6");
        dispatch(setLimitProduct(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  if (loading) {
    return (
      <Slider>
        {[1, 2, 3, 4].map((key) => (
          <div key={key}>
            <div className='col-sm-3'>
              <Skeleton height={350} />
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <Section />
      
      <div style={{ marginLeft: '400px' }}>
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => handleCategoryClick(category)}
      style={{
        backgroundColor: '#4CAF50', /* Green */
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        margin: '4px 2px',
        cursor: 'pointer',
        borderRadius: '12px',
      }}
    >
      {category}
    </button>
  ))}
</div>


      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id}>
            <div className="mainnn col-sm-10" style={{ height: "470px", marginTop: "30px",marginLeft:"30px", border: "none" }}>
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
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductLimit;

