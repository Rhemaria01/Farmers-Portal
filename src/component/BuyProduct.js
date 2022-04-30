import React, { useContext,useState } from "react";
import { Row, Col } from "reactstrap";

// icons
import { MdOutlineAddShoppingCart } from "react-icons/md";
import  Cart  from "../component/Cart"


//TODO: DONE add firebase
import firebase from "firebase/app";

// context stuffs
//TODO: DONE import context and action: update and single_contact
import { ProductContext } from "../context/ProductContext";
import { PRODUCT_TO_UPDATE, SET_SINGLE_PRODUCT } from "../context/action.types";
import { UserTypeContext } from "../context/UserTypeContext"


import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const Product = ({ product, productKey, addInCart}) => {

  const type = useContext(UserTypeContext)


  const { dispatch } = useContext(ProductContext);

  const history = useHistory();

  const viewSingleProduct = product => {

    dispatch({
      type: SET_SINGLE_PRODUCT,
      payload: product
    });

    // sending... 
    history.push("/buyerportal/view");
  };

  return (
    <>      
      <section className="product" id="Trending">
        <div className="container py-5">
            <div className="row">
        <div className="col-auto text-center" >
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={product.picture} alt="" className="img-circle profile" onClick={() => viewSingleProduct(product)}/>
          <div onClick={() => viewSingleProduct(product)}>    
          <h3 className="text-success">{product.name} </h3>
          <h5 className="text-secondary" >
          {`Price: ₹${product.price}/Kg`}
          <br />
          {`Quantity: ${product.quantity}Kg`}
          </h5>
  
          <h4 className="text-primary">
            {`Price: ${product.total}`}
          </h4>
          </div>
          
          <MdOutlineAddShoppingCart
                onClick={() => addInCart(product, productKey)}
                color="danger"
                className="text-danger icon"/></div>
          </div>
          
        </div>
        </div>
        </div>
      </section>
      
    </>
  );
};

export default Product;