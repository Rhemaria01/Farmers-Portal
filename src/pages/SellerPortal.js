import React,{useState, useEffect, useContext} from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem,
    Spinner,
    Form,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Label,
    Button
} from "reactstrap"
import { toast } from 'react-toastify';
import {MdLocationOn} from "react-icons/md"

import { UserContext } from "../context/UserContext"

import reducer from "../context/reducer";
import { ProductContext } from "../context/ProductContext"
import { SET_PRODUCT, SET_LOADING } from "../context/action.types";

import { useHistory,Redirect } from "react-router-dom";
import Product from '../component/Product';
import firebase from "firebase/app"


import {MdAdd} from "react-icons/md"
import "../css/sellerportal.css"

const SellerPortal = () => {
    const {state,dispatch} = useContext(ProductContext);
  const { products, isLoading } = state;

  const context = useContext(UserContext)
  var userProduct = {}
  var grandTotal =0

    const getProducts = async () => {
        // TODO: load existing data
        dispatch({
          type: SET_LOADING,
          payload: true
        });
    
        const productsRef = await firebase.database().ref("/products");
        productsRef.on("value", snapshot => {
          dispatch({
            type: SET_PRODUCT,
            payload: snapshot.val()
          });
          dispatch({
            type: SET_LOADING,
            payload: false
          });
        });
      };
    

      useEffect(() => {
        getProducts();
      }, []);

    const history = useHistory();
    const AddProduct = () => {
        history.push("/sellerportal/add");
      };
 
      const handleSubmit = (e) => {
        e.preventDefault();

        toast("SUCCESS",{
            type:"success",
            position: "top-center"
        });
        history.push("/");
    }

    if (!context.user?.email) {
        return <Redirect to="/" />
    } 
    if (isLoading) {
        return (
          <div className="Center py-5">
            <Spinner color="primary" />
            <div className="text-primary">Loading...</div>
          </div>
        );
      } 
      userProduct = Object.entries(products).filter(([key, value]) => (
        value.username === context.user?.email
      ))
      // console.log(userProduct)
      userProduct.map(([key, value]) => (
        value.username === context.user?.email ?(
          grandTotal = parseFloat(grandTotal) + parseFloat(value.total)
        ) : (
          grandTotal = parseFloat(grandTotal)
        )        
        ))
      
    return (
        <Container fluid className="mt-5 ddd">
      {/* TODO: Loop through FIREBASE objects  */}
      
      {userProduct.length === 0 ? (

        <div className="Center text-large text-primary py-5 aaa">
          <h1>NO Products found</h1>
        </div>

      ) : (
        <>  
        
        <ListGroup horizontal>
          {userProduct.map(([key, value]) => (
            <ListGroupItem key={key}>
              <Product product={value} productKey={key} /> 
              
            </ListGroupItem>
          ))}
        </ListGroup>
         <h4 className="text-info text-center">
            {`GRAND TOTAL: ₹${grandTotal}`}
          </h4>
            
        </>
      )}
      <MdAdd className="fab icon " onClick={AddProduct} />       
    </Container>
    
    )
}

export default SellerPortal
