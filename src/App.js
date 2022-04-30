import React,{useState,useReducer} from "react"
import { BrowserRouter as Router, Switch ,Route} from "react-router-dom"
import { Row, Col } from "reactstrap"
import {ToastContainer, toast} from "react-toastify"

import "bootstrap/dist/css/bootstrap.min.css"
import "react-toastify/dist/ReactToastify.min.css"

import { UserContext } from "./context/UserContext";
import { UserTypeContext } from "./context/UserTypeContext";

import Footer from "./layout/Footer"
import Header from "./layout/Header"
import Home from "./pages/Home"
import CSignin from "./pages/CSignin"
import CSignup from "./pages/CSignup"
import FSignin from "./pages/FSignin"
import FSignup from "./pages/FSignup"
import PageNotFound from "./pages/PageNotFound"
import SellerPortal from "./pages/SellerPortal"
import BuyerPortal from "./pages/BuyerPortal"
import AddProduct from "./pages/AddProduct"
import ViewSingleProduct from "./pages/ViewSingleProduct"
import Payment from "./component/Payment"
import Order from "./pages/Order"

import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/storage';
import "firebase/database";
import {FirebaseConfig} from "./utils/config";

import { Container } from "reactstrap"
import "./App.css"

import reducer from "./context/reducer"
import { ProductContext } from "./context/ProductContext"
import { SET_Product, SET_LOADING } from "./context/action.types";
//init firebase
firebase.initializeApp(FirebaseConfig);
const initialState = {
  products: [],
  product: {},
  productToUpdate: null, 
  productToUpdateKey: null,
  isLoading: false
};


const App = () => {
  const [user,setUser] = useState(null);
  const [userType,setUserType] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  
  return (
    
    <Router>
    <ToastContainer />
    <UserContext.Provider value={{user, setUser}}>
    <UserTypeContext.Provider value={{userType, setUserType}}>
    <ProductContext.Provider value={{state, dispatch}}>
    <Header />

      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/csignin" component={CSignin} />
      <Route exact path="/csignup" component={CSignup} />
      <Route exact path="/fsignin" component={FSignin} />
      <Route exact path="/fsignup" component={FSignup} />
      <Route exact path="/sellerportal" component={SellerPortal} />
      <Route exact path="/sellerportal/add" component={AddProduct} />
      <Route exact path="/buyerportal" component={BuyerPortal} />
      <Route exact path="/buyerportal/view" component={ViewSingleProduct} />
      <Route exact path="/buyerportal/payment" component={Payment} />
      <Route exact path="/order" component={Order} />
      <Route exact path="*" component={PageNotFound} />
      </Switch>

      <Footer />
    </ProductContext.Provider>  
    </UserTypeContext.Provider>  
    </UserContext.Provider>
    </Router>  
  );
}

export default App;
