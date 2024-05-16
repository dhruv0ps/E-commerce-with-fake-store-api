import React from 'react'
import './Section.css'
import shop from'./shopp.png'
const Section = () => {
  return (
    <div>
          <section className="sc-iCfMLu Igqbk">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="hero text-center">
              <h1 className="sc-bkkeKt euwHTd hero__title">
                <span>Everything</span> <br /> you need to be good looking
              </h1>
              <button className="sc-kfPuZi bZIoGX header__link btn btn-primary">
                <a href="#/products" className="text-white">Shop Now</a>
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="hero__img">
              <img src={shop} alt="hero - img" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>

    </div>
  )
}

export default Section
