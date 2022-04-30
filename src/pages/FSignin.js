import React,{useContext, useState} from 'react'
import {UserContext} from "../context/UserContext"
import { UserTypeContext } from '../context/UserTypeContext';
import { Input,Container } from 'reactstrap'
import FarmerLogo from "../assests/Farmer_logo.png"
import  { toast } from 'react-toastify'
import "../css/fauthentication.css"

import { Redirect,Link } from 'react-router-dom'

import firebase from "firebase/app"

const FSignin = () => {
  const context = useContext(UserContext)
  const typeContext = useContext(UserTypeContext);

  const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignIn = () =>{
        
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
            context.setUser({email: res.user.email, uid: res.user.uid})
            typeContext.setUserType({type: "farmer"}) 
        }).catch((error) => {
            console.log(error)
            toast(error.message,{
                type: "error"
            })
        });
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      handleSignIn();
  }
  if (context.user?.uid) {
      return <Redirect to="/#home"/>
  }
    return (

  <div className="container01 mt-5"><br />
  {window.scrollTo(0, 0)}
  <div >
		<img class="logo" src={FarmerLogo} />
	</div>
  <Container>
    <div className="col-lg-6 m-auto d-block">
      <form onSubmit={handleSubmit} className="bg-light">
        <h2 className="text-success">Login</h2>
        <div className="form-group">
          <label htmlFor="user" className="font-weight-bold"> Email: </label>
        <Input
        type='email'
        name='email'
        id='email'
        placeholder='Email'
        value={email}
        onChange={e => setEmail(e.target.value)} />
          <span id="username" className="text-danger font-weight-bold"> </span>
        </div>
        <div className="form-group">
          <label className="font-weight-bold"> Password: </label>
          <Input 
            type='password'
            name='password'
            id='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <span id="passwords" className="text-danger font-weight-bold"> </span>
        </div>
        <div><h6>For new Registration. <Link to="/signup" >Click Here!</Link></h6></div>
        <input type="submit" name="submit" defaultValue="Signin" className="btn btn-success mt-2" autoComplete="off" />
      </form><br /><br />
    </div>
  </Container>
  </div>

  )

}

export default FSignin
