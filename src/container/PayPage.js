import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Paypage.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

const Paypage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
//   const history = useHistory();
const[data,setData] = useState([]);
const storedProductsArray = JSON.parse(localStorage.getItem('storedProducts')) || [];
    const storedProducts = storedProductsArray;

    const [products, setProducts] = useState([]);
const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = searchParams.get('totalPrice');
console.log(totalPrice)

useEffect(()=> {
  const fetchProducts = async () => {
    const productPromises = storedProducts.map(product =>
      axios.get(`https://fakestoreapi.com/products/${product.productId}`)
    );
   try{
    const productResponses = await Promise.all(productPromises);
    const productList = productResponses.map((response,index) => ({
      ...response.data,
      count: storedProducts[index].count
    }))
    setProducts(productList);
   }
   catch (error) {
    console.error('Error fetching products:', error);
   }
  }
  fetchProducts();
},[storedProducts])

useEffect(()=>{
 axios.get("https://fakestoreapi.com/users/1")
 .then((res) => {
  // console.log(res.data);
  setData(res.data)
})
.catch((err)=> {
   console.log(err);
})
},[])

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Payment submitted:');
    console.log('Card Number:', cardNumber);
    console.log('Expiry Date:', expiryDate);
    console.log('CVV:', cvv);
    console.log('Cardholder Name:', name);
    
    
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setName('');
  };

  return (
    <div>
      <>
  
  <div className="container">
    <div className="row">
      <div className="col-xl-8">
      {products.map((product, index) => (
        <div className="card border shadow-none" key={index}>
          <div className="card-body">
            <div className="d-flex align-items-start border-bottom pb-3">
              <div className="me-4">
                <img
                  src={product.image} 
                  alt={product.title}
                  className="avatar-lg rounded"
                  style={{width:100}}
                />
              </div>
              <div className="flex-grow-1 align-self-center overflow-hidden">
                <div>
                  <h5 className="text-truncate font-size-18">
                    <Link to={`/product/${product.id}`} className="text-dark">{product.title}</Link>
                  </h5>
                  <p className="text-muted mb-0">
                    {Array.from({ length: product.rating }, (_, i) => (
                      <i key={i} className="bx bxs-star text-warning" />
                    ))}
                  </p>
                  {/* <p className="mb-0 mt-1">
                    Color: <span className="fw-medium">{product.color}</span>
                  </p> */}
                </div>
              </div>
              <div className="flex-shrink-0 ms-2">
                <ul className="list-inline mb-0 font-size-16">
                  <li className="list-inline-item">
                    <button className="text-muted px-1">
                      <i className="mdi mdi-trash-can-outline" />
                    </button>
                  </li>
                  <li className="list-inline-item">
                    <button className="text-muted px-1">
                      <i className="mdi mdi-heart-outline" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mt-3">
                    <p className="text-muted mb-2">Price</p>
                    <h5 className="mb-0 mt-2">
                      <span className="text-muted me-2">
                        <del className="font-size-16 fw-normal">${product.price}</del>
                      </span>
                      ${product.price}
                    </h5>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mt-3">
                    <p className="text-muted mb-2">Quantity</p>
                    <div className="d-inline-flex">
                      <p>{product.count.count}</p>
                        
                    
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mt-3">
                    <p className="text-muted mb-2">Total</p>
                    <h5>${product.price}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
        
        
        <div className="row my-4">
          <div className="col-sm-6">
            <a
              href="ecommerce-products.html"
              className="btn btn-link text-muted"
            >
              <i className="mdi mdi-arrow-left me-1" /> Continue Shopping{" "}
            </a>
          </div>{" "}
          {/* end col */}
          <div className="col-sm-6">
            <div className="text-sm-end mt-2 mt-sm-0">
              <a href="ecommerce-checkout.html" className="btn btn-success">
                <i className="mdi mdi-cart-outline me-1" /> Checkout{" "}
              </a>
            </div>
          </div>{" "}
          
          {/* end col */}
        </div>{" "}
        
        {/* end row*/}
      </div>
      <div className="col-xl-4">
  <div className="mt-5 mt-lg-0">
    <div className="card border shadow-none">
      <div className="card-header bg-transparent border-bottom py-3 px-4">
        <h5 className="font-size-16 mb-0">
          Customer Information
        </h5>
      </div>
      <div className="card-body p-4 pt-2">
        <div className="table-responsive">
          <table className="table mb-0">
          <tbody>
  <tr>
    <td>Customer Name:</td>
    <td className="text-end">
      {data && (
        <>
          <input
            type="text"
            value={`${data.name && data.name.firstname} ${
              data.name && data.name.lastname
            }`}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                name: {
                  ...prevData.name,
                  firstname: e.target.value.split(" ")[0],
                  lastname: e.target.value.split(" ")[1],
                },
              }))
            }
          />
        </>
      )}
    </td>
  </tr>
  <tr>
    <td>Customer Email:</td>
    <td className="text-end">
      <input
        type="text"
        value={data && data.email}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, email: e.target.value }))
        }
      />
    </td>
  </tr>
  <tr>
    <td>Shipping Address:</td>
    <td className="text-end">
      {data && data.address && (
        <>
          <input
            type="text"
            value={`${data.address.number || ""} ${
              data.address.street || ""
            }`}
            onChange={(e) =>
              setData((prevData) => ({
                ...prevData,
                address: {
                  ...prevData.address,
                  number: e.target.value.split(" ")[0],
                  street: e.target.value.split(" ")[1],
                },
              }))
            }
          />
        </>
      )}
    </td>
  </tr>
  <tr>
    <td>City</td>
    <td className='text-end'>
      <input 
        type='text' 
        value={data && data.address && data.address.city}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, address: { ...(prevData.address || {}), city: e.target.value } }))
        }
      />
    </td>
  </tr>
  <tr>
    <td>Zip-code</td>
    <td className='text-end'>
      <input 
        type='text' 
        value={data && data.address && data.address.zipcode}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, address: { ...(prevData.address || {}), zipcode: e.target.value } }))
        }
      />
    </td>
  </tr>
  <tr>
    <td>Billing Address:</td>
    <td className="text-end">
      {/* Add input field for billing address here */}
      <input
        type="text"
        value={'WebMobi Technologies,Vadodara'}
        onChange={(e) =>
          setData((prevData) => ({ ...prevData, billingAddress: e.target.value }))
        }
      />
    </td>
  </tr>
</tbody>


          </table>
        </div>
      
        {/* end table-responsive */}
      </div>
    </div>
  </div>
  <div className="col-xl-12 " style={{marginTop:"20px"}}>
        <div className="mt-5 mt-lg-0">
          <div className="card border shadow-none">
            <div className="card-header bg-transparent border-bottom py-3 px-4">
              <h5 className="font-size-16 mb-0">
                Order Summary <span className="float-end">#MN0124</span>
              </h5>
            </div>
            <div className="card-body p-4 pt-2">
              <div className="table-responsive">
                <table className="table mb-0">
                  <tbody>
                    <tr>
                      <td>Sub Total :</td>
                      <td className="text-end">${totalPrice}</td>
                    </tr>
                   
                    <tr>
                      <td>Shipping Charge :</td>
                      <td className="text-end">$ 25</td>
                    </tr>
                    <tr>
                      <td>Estimated Tax : </td>
                      <td className="text-end">$ 18.20</td>
                    </tr>
                    <tr className="bg-light">
                      <th>Total :</th>
                      <td className="text-end">
                        <span className="fw-bold">${(parseFloat(totalPrice)+25+18.20).toFixed(2)}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* end table-responsive */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

      
</>

    <div className="container">
  <div className="row">
    
    <div className="col-12 mt-4">
      <div className="card p-3">
        <p className="mb-0 fw-bold h4">Payment Methods</p>
      </div>
    </div>
    <div className="col-12">
      <div className="card p-3">
        <div className="card-body border p-0">
          <p>
            <a
              className="btn btn-primary w-100 h-100 d-flex align-items-center justify-content-between"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="true"
              aria-controls="collapseExample"
            >
              <span className="fw-bold">PayPal</span>
              <span className="fab fa-cc-paypal"></span>
            </a>
          </p>
          <div className="collapse p-3 pt-0" id="collapseExample">
            <div className="row">
              <div className="col-8">
                <p className="h4 mb-0">Summary</p>
                <p className="mb-0">
                  <span className="fw-bold">Product:</span>
                  <span className="c-green">: Name of product</span>
                </p>
                <p className="mb-0">
                  <span className="fw-bold">Price:</span>
                  <span className="c-green">:$452.90</span>
                </p>
                <p className="mb-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Atque nihil neque quisquam aut repellendus, dicta vero? Animi
                  dicta cupiditate, facilis provident quibusdam ab quis, iste
                  harum ipsum hic, nemo qui!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body border p-0">
          <p>
            <a
              className="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
              data-bs-toggle="collapse"
              href="#collapseExample"
              role="button"
              aria-expanded="true"
              aria-controls="collapseExample"
            >
              <span className="fw-bold">Credit Card</span>
              <span className="">
                <span className="fab fa-cc-amex" />
                <span className="fab fa-cc-mastercard" />
                <span className="fab fa-cc-discover" />
              </span>
            </a>
          </p>
          <div className="collapse show p-3 pt-0" id="collapseExample">
            <div className="row">
              <div className="col-lg-5 mb-lg-0 mb-3">
                <p className="h4 mb-0">Summary</p>
                <p className="mb-0">
                  {/* <span className="fw-bold">Product:</span> */}
                  {/* <span className="c-green">: Name of product</span> */}
                </p>
                <p className="mb-0">
                  <span className="fw-bold">Price:</span>
                  <span className="c-green">${totalPrice}</span>
                </p>
                <p className="mb-0">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Atque nihil neque quisquam aut repellendus, dicta vero? Animi
                  dicta cupiditate, facilis provident quibusdam ab quis, iste
                  harum ipsum hic, nemo qui!
                </p>
              </div>
              <div className="col-lg-7">
                <form action="" className="form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12">
                      <div className="form__div">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" "
                        />
                        <label htmlFor="" className="form__label">
                          Card Number
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form__div">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" "
                        />
                        <label htmlFor="" className="form__label">
                          MM / yy
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form__div">
                        <input
                          type="password"
                          className="form-control"
                          placeholder=" "
                        />
                        <label htmlFor="" className="form__label">
                          cvv code
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form__div">
                        <input
                          type="text"
                          className="form-control"
                          placeholder=" "
                        />
                        <label htmlFor="" className="form__label">
                          name on the card
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                   <Link to='/invoice'>   <div className="btn btn-primary w-100">Sumbit</div> </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-12">
      <div className="btn btn-primary payment">Make Payment</div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Paypage;

