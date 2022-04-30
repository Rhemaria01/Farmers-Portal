import React,{useContext, useEffect} from 'react';

import {UserContext} from "../context/UserContext";
import {UserTypeContext} from "../context/UserTypeContext";
import { ProductContext } from '../context/ProductContext';

import { SET_PRODUCT, SET_LOADING } from "../context/action.types";

import {useHistory,Redirect} from "react-router-dom";

import {  Table } from 'reactstrap';
import { toast } from 'react-toastify';

import firebase from "firebase/app"
import StatusUpdate from '../component/StatusUpdate';

const Order = () => {
    const context = useContext(UserContext);
    const typeContext = useContext(UserTypeContext);
    const {state,dispatch} = useContext(ProductContext);

    const { products, isLoading } = state;

    const history = useHistory();
    

    var sellerOrder = {}
    var buyerOrder = {}

    const getOrders = async () => {
        // TODO: load existing data
        dispatch({
          type: SET_LOADING,
          payload: true
        });
    
        const productsRef = await firebase.database().ref("/order");
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
        getOrders();
      }, []);
      const removeOrder = (orderKey) => {
        firebase
            .database()
            .ref(`/order/${orderKey}`) 
            .remove()
            .then(() => {
              toast("Order Removed", { type: "warning" });
            })
            .catch(err => console.log(err));
      }

      const handleBack = () => {
   
          history.push("/")
        
      }
    
    if (!context.user?.email) {
        return <Redirect to="/" />
    }


    const handleUpdate = ({status, orderKey, product}) => {
        console.log(status)
        try {
            firebase
              .database()
              .ref("order/" + orderKey)
              .set({
                consumerUsername: product.consumerUsername,
                name: product.name,
                picture: product.picture,
                price: product.price,
                quantity: product.quantity,
                sellerUsername: product.sellerUsername,
                status: status,
                total: product.total
              });
              toast("Status Updated",{type: "success"})
          } catch (error) {
            console.log(error);
            toast(error.message, { type: "error" });
          }
    }

    typeContext.userType?.type === "consumer" ?  (
        buyerOrder = Object.entries(products).filter(([key, value]) => (
            value.consumerUsername === context.user?.email
          ))
    ):(
        sellerOrder = Object.entries(products).filter(([key, value]) => (
            value.sellerUsername === context.user?.email
          ))
        )
    
    
    

    return (
        
        <div className="py-5">
               <Table dark className="mt-5">
      <thead className="text-center">
        <tr>      
          <th>Order Id.</th>
          {typeContext.userType?.type === "consumer" ?  (<th>Product Image</th>):(<th>Buyer</th>)}
          <th>Product Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Status</th>
          {typeContext.userType?.type === "consumer" ?  (""):(<th>Update Status</th>)}
          {typeContext.userType?.type === "consumer" ?  (""):(<th>Remove Order</th>)}
        </tr>
      </thead>
      
      {typeContext.userType?.type === "consumer" ?  (
        <tbody className="text-center">
        {buyerOrder.length === 0 ? (<h1>No Orders Found</h1>) : (
          buyerOrder.map(([key, value]) => (
            <tr key={key}>
                <td>{`${key}`}</td>
                <td><img 
                src={value.picture} 
                alt="" 
                style={{
                    height:"100px",
                    width:"100px"
                }}/></td>
                <td>{value.name}</td>
                <td>{value.price}</td>
                <td>{value.quantity}</td>
                <td>{value.total}</td>
                <td>{value.status}</td>
            </tr>
          ))
        )}
      
      </tbody>
      ):(  
      <tbody className="text-center">
      {sellerOrder.length === 0 ? (<h1>No Orders Found</h1>) : (
        sellerOrder.map(([key, value]) => (
            <tr key={key}>
                <td>{`${key}`}</td>
                <td>{value.consumerUsername}</td>
                <td>{value.name}</td>
                <td>{value.price}</td>
                <td>{value.quantity}</td>
                <td>{value.total}</td>
                 <StatusUpdate product={value} handleUpdate={handleUpdate} orderKey={key}/> 
                <td><button type="button" className="btn btn-danger" onClick={() => removeOrder(key)}>Remove</button></td>


            </tr>
          ))
        )}
      </tbody>
      )}
    </Table>
    <div className="text-center">
    <button className="btn btn-danger"  onClick={handleBack}>Back</button>
    </div>
        </div>
    )
      
}

export default Order