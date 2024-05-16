import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, ModalHeader } from 'reactstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Usercarting = () => {
  // Get product IDs and counts from local storage
  const storedProductsArray = JSON.parse(localStorage.getItem('storedProducts')) || [];
  const storedProducts = storedProductsArray;

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details for each product
    const fetchProducts = async () => {
      const productPromises = storedProducts.map(product =>
        axios.get(`https://fakestoreapi.com/products/${product.productId}`)
      );

      try {
        const productResponses = await Promise.all(productPromises);
        const productList = productResponses.map((response, index) => ({
          ...response.data,
          count: storedProducts[index].count
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [storedProducts]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    products.forEach(product => {
      totalPrice += product.price * product.count.count;
    });
    return totalPrice;
  };

  const handlePayNow = () => {
    const totalPrice = calculateTotalPrice();
    navigate(`/paypage?totalPrice=${totalPrice}`);
  };

  const handleRemoveProduct = (productId) => {
    // Remove the product from the list
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);

    // Update local storage
    const updatedStoredProducts = storedProducts.filter(product => product.productId !== productId);
    localStorage.setItem('storedProducts', JSON.stringify(updatedStoredProducts));
    localStorage.removeItem('storedProducts');
    // localStorage.removeItem("storedProducts")
  };

  return (
    <div>
      <h2>User Carting Page</h2>
      {products.length > 0 ? (
        <div className="container">
          <div className="row">
            {products.map(product => (
              <div className="col-md-6" key={product.id}>
                <img src={product.image} alt={product.title} className="img-fluid mb-3 product-image" />
                <div className="product-details">
                  <h2>{product.title}</h2>
                  <div className="details">
                    <h3 className="ui brown block header">{product.category}</h3>
                    <h2>
                      <a className="ui teal tag label">${product.price * product.count.count}</a> {/* Total price calculation */}
                    </h2>
                    <p>Count: {product.count.count}</p>
                    <button className="btn btn-danger" onClick={() => handleRemoveProduct(product.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <h4>Total Price: ${calculateTotalPrice()}</h4>
            <button className="btn btn-primary" onClick={handlePayNow}>Pay Now</button>
          </div>
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Usercarting;
