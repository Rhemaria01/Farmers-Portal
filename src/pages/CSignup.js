import React,{useState,useContext} from 'react';
import {UserContext} from "../context/UserContext";
import { UserTypeContext } from '../context/UserTypeContext';


import firebase from "firebase/app";
import { Redirect } from 'react-router-dom';

import ConsumerLogo from "../assests/Consumer_logo.png"
import "../css/cauthentication.css";
import { Container } from 'reactstrap';

import { toast } from 'react-toastify';



const CSignup = () => {
    const context = useContext(UserContext)
    const typeContext = useContext(UserTypeContext);


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    
    const handleSignUp = () => {

            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res => {
                console.log(res)
                context.setUser({email: res.user.email, uid: res.user.uid})
                typeContext.setUserType({type: "consumer"}) 

            })
            .catch(error => {
                console.log(error)
                toast(error.message, {
                    type: "error"
                })
            })
    }

    const handleSubmit = e =>{
        e.preventDefault()
        handleSignUp()
    }

    if (context.user?.uid) {
        return <Redirect to="/"/>
    }
    return (
      
        <div className="container02 mt-5"><br />
        {window.scrollTo(0, 0)}
        <div >
		<img className="logo" src={ConsumerLogo} />
	</div>
    <Container> 
  <div className="col-lg-6 m-auto d-block">
    <form  onSubmit={handleSubmit} className="bg-light">
      <h2 >Registration Form</h2>
      <div className="form-group">
        <label htmlFor="user" className="font-weight-bold"> Full Name: </label>
        <input type="text" name="user" placeholder="Enter your Name" className="form-control" id="user" autoComplete="off" />
        <span id="username" className="text-danger font-weight-bold"> </span>
      </div>
      <div className="form-group">
          <label htmlFor="user" className="font-weight-bold "> Email: </label>
        <input 
        type='email'
        name='email'
        id='email'
        placeholder='Email'
        className="form-control"
        value={email}
        onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="font-weight-bold"> Password: </label>
          <input 
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            className="form-control"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      <div className="form-group">
        <label className="font-weight-bold"> Mobile Number: </label>
        <input type="text" name="mobile" placeholder="Enter your Mobile Number" className="form-control" id="mobileNumber" autoComplete="off" />
        <span id="mobileno" className="text-danger font-weight-bold"> </span>
      </div>
      <input type="submit" name="submit" defaultValue="Register" className="btn button001 mt-2" autoComplete="off" />
    </form><br /><br />
  </div>
  </Container>
</div>


    )
}

export default CSignup
