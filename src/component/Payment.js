import React,{useContext} from 'react'

import { useHistory,Redirect } from 'react-router-dom'

import { UserContext } from '../context/UserContext'

import firebase from "firebase/app"

import { v4 } from 'uuid'

import MC from "../assests/mc.png"
import VI from "../assests/pp.png"
import PP from "../assests/vi.png"

import { toast } from 'react-toastify';
import "../css/payment.css"
const Payment = ({cartProduct, cartProductKey, setFlag, grandTotal}) => {
    const history = useHistory()
    const context = useContext(UserContext)
    const handleSubmit = async () => {
      
        cartProduct.forEach(product => {
          try {
          
            firebase
              .database()
              .ref("order/" + v4())
              .set({
                name: product.name,
                price: product.price,
                quantity: product.quantity,
                total: product.quantity*product.price,
                picture: product.picture,
                consumerUsername: context.user.email,
                sellerUsername: product.username,
                status: "Received"
              });
          } catch (error) {
            console.log(error);
            return toast(error.message,{type:"error"})
          }
        })
    
        cartProductKey.forEach(productKey => {
          
            firebase
            .database()
            .ref(`/products/${productKey}`) 
            .remove()
            .then(() => {
              toast("Order Placed Successfully", { type: "success" });
            })
            .catch(err => console.log(err));
        });


       

        history.push("/")
    }
    if (!context.user?.email) {
      return <Redirect to="/" />
  }
    return (
        <div className="ccc">
            <div>
            
  <form className="container05" onSubmit={handleSubmit}>
  <h3 className="float-start text-success">{`Amount: ₹${grandTotal}`}</h3>
    <h1>Confirm Your Payment</h1>
    <div className="first-row">
      <div className="owner">
        <h3>Owner</h3>
        <div className="input-field">
          <input type="text" id="owner" required/>
        </div>
      </div>
      <div className="cvv">
        <h3>CVV</h3>
        <div className="input-field">
          <input type="password" id="cvv" required/>
        </div>
      </div>
    </div>
    <div className="second-row">
      <div className="card-number">
        <h3>Card Number</h3>
        <div className="input-field">
          <input type="text" id="cardNumber" required/>
        </div>
      </div>
    </div>
    <div className="third-row">
      <h3>Valid Upto</h3>
      <div className="selection">
        <div className="date">
          <select name="months" id="months" required>
            <option value="Jan">Jan</option>
            <option value="Feb">Feb</option>
            <option value="Mar">Mar</option>
            <option value="Apr">Apr</option>
            <option value="May">May</option>
            <option value="Jun">Jun</option>
            <option value="Jul">Jul</option>
            <option value="Aug">Aug</option>
            <option value="Sep">Sep</option>
            <option value="Oct" selected="selected">Oct</option>
            <option value="Nov">Nov</option>
            <option value="Dec">Dec</option>
          </select>
          <select name="years" id="years" required>
            <option value={2021} selected="selected">2021</option>
            <option value={2022}>2022</option>
            <option value={2023}>2023</option>
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
        <div className="cards">
          <img src={MC} alt />
          <img src={VI} alt />
          <img src={PP} alt />
        </div>
      </div>    
    </div>
    <div className="container-fluid mt-2">
    <button type="submit" className="btn btn-warning float-start" href>Confirm</button>
    <button type="button" className="btn btn-danger float-end" onClick={() => setFlag(true)}>Cancel</button>
    </div>
  </form>
</div>

        </div>
    )
}

export default Payment
