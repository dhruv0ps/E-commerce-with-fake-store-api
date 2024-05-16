import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { addtocarting } from '../Redux/actions/Proudctactions';
import NewWindow from 'react-new-window'
const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const inputRef = useRef(null); 
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector(state => state.cartcount.cartCount);
 console.log(cartCount)

useEffect(()=> {
  inputRef.current.focus()
},[])
  const handleAddToCart = (product) => {
    dispatch(addtocarting(product)); // Dispatch the addToCart action
  };
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        const filteredProducts = response.data.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg  bg-custom-color">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/link">
                Link
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" aria-disabled="true">
                Disabled
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search products by title or category..."
                value={searchTerm}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                ref={inputRef} 
              />
              {loading && <p>Loading...</p>}
              {searchResults.length > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '100%',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    zIndex: 100,
                  }}
                >
                  {searchResults.map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`}>
                      <div
                        style={{
                          padding: '10px',
                          borderBottom: '1px solid #ccc',
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#800080',
                          color: '#FFFFFF',
                        }}
                      >
                        <div>
                          <h5>{product.title}</h5>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              {!loading && searchTerm && searchResults.length === 0 && (
                <p>No results found.</p>
              )}
            </div>
          </form>
          
          <Link to="/usercarting" className="btn btn-outline-light ms-3 position-relative">
  <FontAwesomeIcon icon={faShoppingCart} />
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    {/* Add badge count here */}
    {cartCount}
    <span className="visually-hidden">items in cart</span>
  </span>
</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

{/* <a className="nav-link" href="#" style={{ marginLeft: "90px" }}>
Cart <FontAwesomeIcon icon={faShoppingCart} />
</a> */}