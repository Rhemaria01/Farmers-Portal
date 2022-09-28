import React, { useContext } from "react";
import { Row, Col } from "reactstrap";

// icons
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdDelete,MdOutlineAddShoppingCart } from "react-icons/md";

//TODO: DONE add firebase
import firebase from "firebase/app";

// context stuffs
//TODO: DONE import context and action: update and single_contact
import { ProductContext } from "../context/ProductContext";
import { PRODUCT_TO_UPDATE, SET_SINGLE_PRODUCT } from "../context/action.types";
import { UserContext } from "../context/UserContext"


import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";

const Product = ({ product, productKey, setUserCheck }) => {

  const context = useContext(UserContext)

  //TODO: DONE destructuring dispatch from the context
  const { dispatch } = useContext(ProductContext);


  const history = useHistory();

  const deleteProduct = () => {

    firebase
      .database()
      .ref(`/products/${productKey}`)
      .remove()
      .then(() => {
        toast("Deleted Successfully", { type: "warning" });
      })
      .catch(err => console.log(err));
  };




  return (
    
    
 
        <section className="product" id="Trending">
        <div className="container py-5">
            <div className="row">
        <div className="col-auto text-center">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={product.picture} alt="" className="img-circle profile" />
          <div>    
          <h3 className="text-success">{product.name} </h3>
          <h5 className="text-secondary" >
          {`Price: ₹${product.price}/Kg`}
          <br />
          {`Quantity: ${product.quantity}Kg`}
          </h5>
          
          <h4 className="text-primary">
            {`TOTAL: ₹${product.total}`}
          </h4>  

          <h4 className="text-success fs-6">
            
            {`Selling Type: ${product.partialSeller? "Partial Selling Available":"Only Bulk Selling Available" }`}
          </h4>  
          </div>
          <MdDelete
                onClick={() => deleteProduct()}
                color="danger"
                className="text-danger icon"/></div>
          </div>
        </div>
        </div>
        </div>
      </section>

      
      
  );
};

export default Product;