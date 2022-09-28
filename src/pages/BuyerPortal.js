import React,{useState, useEffect, useContext} from 'react'
import {
    Container,
    ListGroup,
    ListGroupItem,
    Spinner
} from "reactstrap"
import { ImSad2 } from "react-icons/im";
import {FaSadTear} from "react-icons/fa"
import Emoji from 'react-emoji-render';
import { toast } from 'react-toastify';

import { UserContext } from "../context/UserContext"

import { ProductContext } from "../context/ProductContext"
import { SET_PRODUCT, SET_LOADING } from "../context/action.types";

import { useHistory,Redirect } from "react-router-dom";
import BuyProduct from '../component/BuyProduct';
import Payment from '../component/Payment';


import firebase from "firebase/app"


import "../css/sellerportal.css"
import Cart from '../component/Cart';

const BuyerPortal = () => {
    const {state,dispatch} = useContext(ProductContext);
  const { products, isLoading } = state;
  const context = useContext(UserContext)
  const [cartProduct, setCartProduct] =useState([])
  const [cartProductKey, setCartProductKey] =useState([])
  const [flag,setFlag] = useState(true)
  const [grandTotal, setGrandTotal] = useState(0);
  const prices = [];
  const getGrandTotal = () => {
    return grandTotal;
  }
  const grandTotalCalc = (prices) => {
    setGrandTotal(0);
    let grandTotalTemp = 0;
    prices.map(price => grandTotalTemp += parseInt(price));
    setGrandTotal(grandTotalTemp)
    
  }


    const addInCart = (product, productKey) => {

      const isAlreadyAdded = cartProduct.findIndex(function(array){
        return array === product
      })
      
      if(isAlreadyAdded !== -1){
        toast("Already added in cart",{
          type: "error"
        });
        return;
      }
      console.log(product)
      setCartProduct([...cartProduct,product])
      setCartProductKey([...cartProductKey,productKey])
    }
    

    const addToPrices = (quantPrice, index) => {
        
        if(prices.length-1 > index){
            prices.push(parseInt(quantPrice.price))
            
        }
        else{
            
            prices[index] = quantPrice.price;
            // console.log(quantPrice.price)
            
        }
        cartProduct[index].sellQuantity = quantPrice.quantity;
        cartProduct[index].itemKey = cartProductKey[index];
        grandTotalCalc(prices);
    }
    const removeItem = (product, productKey, index) =>  {
      

      prices.splice(index);
      setCartProductKey(cartProductKey.filter(singleKey => singleKey !== productKey))
      setCartProduct(cartProduct.filter(singleItem => singleItem !== product))
      grandTotalCalc(prices);
    }

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
    
      // getting contact  when component did mount
      useEffect(() => {
        getProducts();
      }, []);

    const history = useHistory();

 

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
    return (
      <Container fluid className="mt-5 ddd">
      {flag? (

      
      products.length === 0  ? (
        <div className="Center text-large text-primary py-5 aaa">
        <h1><Emoji text="😥"/>{` Sorry!! No Products for Sale`}</h1>
        </div>
      ) : (
        
        <>  
        <ListGroup horizontal>
          {Object.entries(products).map(([key, value]) => (
            <ListGroupItem key={key}>
              <BuyProduct product={value} productKey={key} addInCart={addInCart}/>
              
            </ListGroupItem>
          ))}
        </ListGroup> 
            
          {<Cart cartProduct={cartProduct} cartProductKey={cartProductKey} removeItem={removeItem} setFlag={setFlag} grandTotal={grandTotal} addToPrices={addToPrices}/>}


        </>
      )
      
      ) : (<Payment cartProduct={cartProduct} cartProductKey={cartProductKey} setFlag={setFlag} grandTotal={grandTotal}/>)} 
    
      </Container>
    )
}

export default BuyerPortal
