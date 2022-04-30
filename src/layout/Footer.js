import React from 'react'
import Logo from "../assests/Logo.png"
import {FaTractor} from "react-icons/fa"


const Footer = () => {
    return (
        <div
        fluid
        tag="footer"
        className="bg-success sticky-bottom text-white text-uppercase p-3"
        >
            <p className="float-start my-auto ms-2"><FaTractor /> Farm Fresh</p>
            <p className="text-center float-none my-auto">Copyright ©2021 All rights reserved | This Template is made bt Group-3</p>
        </div>
    )
}

export default Footer