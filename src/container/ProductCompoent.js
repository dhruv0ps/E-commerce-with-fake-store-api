import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Product.css';
const ProductCompoent = () => {
    const products = useSelector((state) => state.allProducts.products);
    const {id,title,image,price,category} = products

  return (
    <> 
      <div className="card-group">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className=" mainnn col-sm-3" style={{height:"470px", marginTop:"25px", border:"none" }} >
            <Link to={`/product/${product.id}`}>
              <div className="card main position-relative">
                <img src={product.image} alt={product.title} className="card-img-top img-fluid rounded-top"  style={{height:"270px", width:"200px",objectFit:"cover", margin: "10px auto 0"}} />
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
    {/* <div className="card" style={{ width: '20rem',  height:'25rem'}}>
    <img src={image} className="card-img-top " alt="Card Image"  style={{height:'15rem', width:"18rem"}}/>
    <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div className='meta price'>${price}</div>
        <div className='meta'>{category}</div>
      
    </div>
</div> */}
                </>
             
         
  )
}

export default ProductCompoent
