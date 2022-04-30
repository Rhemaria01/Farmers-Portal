import React from 'react'
import Banana from "../assests/banana.jpg"
import Grapes from "../assests/grapes.jpg"
import Mango from "../assests/mango.jpg"
import Wheat from "../assests/wheat.png"
import Rice from "../assests/rice.png"
import Barley from "../assests/barley.png"
import Corn from "../assests/corn.png"
import Option from "./option"
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa"
import {IoLogoWhatsapp} from "react-icons/io"
import "../css/home.css"
const Home = () => {
    return (
<>
{window.scrollTo(0, 0)}
<div>
  <section className="main py-5" id="Home">
    <div className="container py-5">
      <div className="row py-5">
        <div className="col-lg-7 m-auto text-center ">
          <h1 className="pt-5">We Believe In Our Farmers.</h1>
        </div>
      </div>
    </div>
  </section>
  <section className="new">
    <div className="container py-5">
      <div className="row pt-5">
        <div className="col-lg-7 m-auto">
          <div className="row text-center">
            <div className="col-lg-4">
              <img src={Banana} className="img-fluid" alt />
              <h6>NATURAL</h6>
            </div>
            <div className="col-lg-4">
              <img src={Grapes} className="img-fluid" alt />
              <h6>ORGANIC</h6>
            </div>
            <div className="col-lg-4">
              <img src={Mango} className="img-fluid" alt />
              <h6>FRESH</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
 
    <Option />

  <section className="product" id="Trending">
    <div className="container py-5">
      <div className="row py-5">
        <div className="col-lg-5 m-auto text-center">
          <h1>What's Trending</h1>
          <h6 style={{color: '#4c9a2a'}}>Be Healthy, Shop Fresh</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 text-center">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={Wheat} className="img-fluid" alt />
            </div>
          </div>
          <h6>Wheat</h6>
        </div>
        <div className="col-lg-3 text-center">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={Rice} className="img-fluid" alt />
            </div>
          </div>
          <h6>Rice</h6>
        </div>
        <div className="col-lg-3 text-center">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={Barley} className="img-fluid" alt />
            </div>
          </div>
          <h6>Barley</h6>
        </div>
        <div className="col-lg-3 text-center">
          <div className="card border-0 bg-light">
            <div className="card-body">
              <img src={Corn} className="img-fluid" alt />
            </div>
          </div>
          <h6>Corn</h6>
        </div>
      </div>
    </div>
  </section>
</div>
{/* Contact Us */}
<hr style={{height: 30}} />

<section className="contact py-5" id="Contact">
  <div className="container py-5">
    <div className="row">
      <div className="col-lg-5 m-auto text-center">
        <h1>Contact Us</h1>
        <h6 style={{color: '#4c9a2a'}}>Always Be In Touch With Us</h6>
      </div>
    </div>
    <div className="row py-5">
      <div className="col-lg-9 m-auto">
        <div className="row">
          <div className="col-lg-4">
            <h6>LOCATION</h6>
            <p>Mumbai 40911 First Street DC</p>
            <h6>PHONE</h6>
            <p>034444-243595555</p>
            <h6>EMAIL</h6>
            <p>farmers.portal123@gmail.com</p>
          </div>
          <div className="col-lg-7">
            <div className="row">
              <div className="col-lg-6">
                <input type="text" className="form-control" placeholder="First Name" />
              </div>
              <div className="col-lg-6">
                <input type="text" className="form-control" placeholder="Last Name" />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 py-3">
                <textarea name className="form-control bg-light" placeholder="Enter Your Query" id cols={10} rows={5} defaultValue={""} />
              </div>
            </div>
            <button className="btn1">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div></section>
  <section className="news py-5">
  <div className="container py-5">
    <div className="row">
        <h1 className="text-center">Join Our Community</h1>
      <div className="col-lg-9 m-auto text-center d-flex justify-content-center align-items-center">
        <input type="text" className="px-3" placeholder="Enter Your Email" />
        <button className="btn1 mt-3 ms-2">Submit</button>
      </div>
    </div>
    <div className="row">
      <div className="col-lg-11">
        <div className="row">
          <div className="col-lg-3 py-4">
            <h5 className="pb-3">CUSTOMER CARE</h5>
            <p>Regular</p>
            <p>On Time</p>
            <p>Always Care</p>
          </div>
          <div className="col-lg-3 py-4">
            <h5 className="pb-3">FAQ's</h5>
            <p>No E-Charges</p>
            <p>Shopping &amp; Delivery</p>
            <p>Always Care</p>
          </div>
          <div className="col-lg-3 py-4">
            <h5 className="pb-3">OUR COMPANY</h5>
            <p>About</p>
            <p>New Food</p>
            <p>Product</p>
          </div>
          <div className="col-lg-3 py-4">
            <h5 className="pb-3">CUSTOMER CARE</h5>
            <FaFacebook className="newicon" style={{color: '#4267B2'}}/>
            <FaInstagram className="newicon" style={{color: '#bc2a8d'}}/>
            <FaTwitter className="newicon" style={{color: '#1DA1F2'}} />
            <IoLogoWhatsapp className="newicon" style={{color: '#25D366'}} />

          </div>
        </div>
      </div>
    </div>
    <hr />
    <p className="text-center">Copyright ©2021 All rights reserved | This Template is made bt Group-3</p>
  </div>
</section>


</>  
    )
}

export default Home

