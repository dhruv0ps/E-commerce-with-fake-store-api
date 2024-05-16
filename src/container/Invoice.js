import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';
import  axios  from 'axios';

function Invoice(props) {
  const ref = useRef();
  const [openAirPopup, setOpenAirPopup] = useState(false); 
  const [Item, setItem] = useState(''); 
  const [Amount, setAmount] = useState(''); 
  const [List, setList] = useState([]); 
 const[data,setData] = useState();
 const storedProductsArray = JSON.parse(localStorage.getItem('storedProducts')) || [];
    const storedProducts = storedProductsArray;

    const [products, setProducts] = useState([]);
  const addData = () => {
    const newItem = { product: Item, amount: Amount };
    setList([...List, newItem]);
    setItem('');
    setAmount('');
    setOpenAirPopup(false);
  };
useEffect(()=> {
  axios.get('https://fakestoreapi.com/users/1')
  .then((res) => {
    // console.log(res.data);
    setData(res.data)
  })
  .catch((err)=> {
     console.log(err);
  })
})
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
    console.log(totalPrice);
  });
  return totalPrice;
};
function TodayDate() {
  // Get the current date
  const currentDate = new Date();

  // Format the date as desired (e.g., "12 Oct, 2020")
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return <p>{formattedDate}</p>;
}
  return (
    <>
      <div className="container" >
        {/* Your invoice template JSX goes here */}
        {data && (
        <div className="container" ref={ref}>
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <div className="invoice-title">
            <h4 className="float-end font-size-15">
              Invoice #DS0204{" "}
              <span className="badge bg-success font-size-12 ms-2">Paid</span>
            </h4>
            <div className="mb-4">
              <h2 className="mb-1 text-muted">localhost:3000</h2>
            </div>
            <div className="text-muted">
              <p className="mb-1">Make agricare pvt ltd</p>
              <p className="mb-1">
                <i className="uil uil-envelope-alt me-1" /> xyz@987.com
              </p>
              <p>
                <i className="uil uil-phone me-1" /> 012-345-6789
              </p>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row">
            <div className="col-sm-6">
              <div className="text-muted">
                <h5 className="font-size-16 mb-3">Billed To:</h5>
                <h5 className="font-size-15 mb-2">{data && data.name && data.name.firstname} {data && data.name && data.name.lastname}</h5>

                <p className="mb-1">{data.address.number} {data.address.street}, {data.address.city}</p>
                <p className="mb-1">{data.email}</p>
                <p>{data.phone}</p>
              </div>
            </div>
            {/* end col */}
            <div className="col-sm-6">
              <div className="text-muted text-sm-end">
                <div>
                  <h5 className="font-size-15 mb-1">Invoice No:</h5>
                  <p>#DZ0112</p>
                </div>
                <div className="mt-4">
                  <h5 className="font-size-15 mb-1">Invoice Date:</h5>
                  <TodayDate />
                </div>
                <div className="mt-4">
                  <h5 className="font-size-15 mb-1">Order No:</h5>
                  <p>#1123456</p>
                </div>
              </div>
            </div>
            {/* end col */}
          </div>
          {/* end row */}
          <div className="py-2">
            <h5 className="font-size-15">Order Summary</h5>
            <div className="table-responsive">
              <table className="table align-middle table-nowrap table-centered mb-0">
                <thead>
                  <tr>
                    <th style={{ width: 70 }}>No.</th>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-end" style={{ width: 120 }}>
                      Total
                    </th>
                  </tr>
                </thead>
                {/* end thead */}
                <tbody>
                {products.map((product, index) => (
  <tr key={index}>
    <th scope="row">{index + 1}</th>
    <td>{product.title}</td>
    <td>${product.price.toFixed(2)}</td>
    <td>{product.count.count}</td>
    <td>${(product.price * product.count.count).toFixed(2)}</td>
  </tr>
))}
<tr>
  <th scope="row" colSpan={4} className="text-end">Sub Total</th>
  <td className="text-end">${calculateTotalPrice().toFixed(2)}</td>
</tr>

  {/* Discount */}
  {/* <tr>
    <th scope="row" colSpan={4} className="border-0 text-end">Discount :</th>
    <td className="border-0 text-end">- $25.50</td>
  </tr> */}
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Shipping Charge :
                    </th>
                    <td className="border-0 text-end">$10.00</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Tax
                    </th>
                    <td className="border-0 text-end">$5.00</td>
                  </tr>
                  {/* end tr */}
                  <tr>
                    <th scope="row" colSpan={4} className="border-0 text-end">
                      Total
                    </th>
                    <td className="border-0 text-end">
                      <h4 className="m-0 fw-semibold">${(calculateTotalPrice()+15).toFixed(2)} </h4>
                    </td>
                  </tr>
                  {/* end tr */}
                </tbody>
                {/* end tbody */}
              </table>
              {/* end table */}
            </div>
            {/* end table responsive */}
            <div className="d-print-none mt-4">
              <div className="float-end">
                <a
                  href="javascript:window.print()"
                  className="btn btn-success me-1"
                >
                  <i className="fa fa-print" />
                </a>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* end col */}
  </div>
</div>
)}
      </div>

      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => ref.current}
        documentTitle={`INVOICE ${props.InvoiceNumber}`}
      />

      {/* Add product popup */}
      <Dialog open={openAirPopup}>
        <DialogTitle>
          <div className="title">
            <div className="hed">New product</div>
            <div className="icon-cross" onClick={() => setOpenAirPopup(false)}>
              <Close />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="container">
            <div className="forms">
              <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder="PR Name" />
              <input type="text" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ₹" />
            </div>
            <div className="buttons">
              <button onClick={addData}>Add</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Invoice;

