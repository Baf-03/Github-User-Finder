import React from 'react'
import "./Card.css"
import { Link } from 'react-router-dom'
const Card = (props) => {
    let {apiimg,name,bio}=props
  return (
    <Link to={"/person"}>
    <div className="product">
    <figure>
      <img src={apiimg} alt="Product Image" className="product-image"/>
        </figure>

      <div className="product-description">

        <div className="info">
          <h1>{name}</h1>
          <p>
            {bio}
          </p>
        </div>

       
      </div>

      <div className="product-sidebar items-center ">
      

        <button className="info">
          <span>MORE INFO</span>
        </button>

       

       
      </div>
      </div>
      </Link>
  )
}

export default Card