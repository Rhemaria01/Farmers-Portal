import React,{useContext} from 'react'
import {
    Container,
    Row,
    Col
} from "reactstrap"
import {GiFarmer, GiShoppingCart} from "react-icons/gi"
import {UserContext} from "../context/UserContext";
import { UserTypeContext } from '../context/UserTypeContext';
import { Link } from "react-router-dom"
import "../css/option.css"


const Option = () => {
    const context = useContext(UserContext);
    const typeContext = useContext(UserTypeContext);
    return (
        <Container> 
            {context.user?.uid ? (
            <Row>
            {
                typeContext.userType?.type === "farmer" ? (
                    <Col className="img01" md>
                    {<Link to="/sellerportal" className="text-decoration-none text-center fw-bolder"><GiFarmer className="icons"/><h1>FARMERS</h1></Link>}
                    </Col>
                ) : (
                    <Col className="img02" md>
                    { <Link to="/buyerportal" className="text-decoration-none text-center fw-bolder"><GiShoppingCart className="icons" /><h1>BUYERS</h1></Link>}
                    </Col>
                )
            }
            </Row>
            ): 
            (<Row >
                <Col className="img01" md>
                    {<Link to="/fsignin" className="text-decoration-none text-center fw-bolder"><GiFarmer className="icons"/><h1>FARMERS</h1></Link>}
                </Col>
                <Col className="img02" md>
                    { <Link to="/csignin" className="text-decoration-none text-center fw-bolder"><GiShoppingCart className="icons" /><h1>BUYERS</h1></Link>}
                </Col>
            </Row>)}
        </Container>
    )
}

export default Option
