import React, { useContext } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { useHistory } from "react-router-dom";

import { ProductContext } from "../context/ProductContext";

const ViewSingleProduct = () => {
  const history = useHistory();

  const handleBack = () => {
    history.push("/buyerportal/");

  }
  const { state } = useContext(ProductContext);


  const { product } = state;

  return (
    <Container fluid className="aaa">
      <Row >
        <Col >
          <Card className="pt-3 pb-5">
            <CardBody className="text-center ">
              <img
                height="150"
                width="150"
                className="cardImg profile border-danger"
                src={product?.picture}
              />
              <CardTitle className="text-primary mt-3">
                <h1>{product?.name}</h1>
              </CardTitle>
              <CardSubtitle>
                <h3>
                {`Price: ₹${product.price}/Kg`}
                </h3>
              </CardSubtitle>
              <CardSubtitle>  
              <h3>
              {`Available Quantity: ${product.quantity}Kg`}
              </h3>
              </CardSubtitle>
              <CardSubtitle>
          <h5 className="text-secondary">{`Seller: ${product.username}`}</h5>  
              </CardSubtitle>
              <Button
                type="button"
                defaultValue="Back"
                className="btn-danger mt-2"
                onClick={handleBack}
                 >Back</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewSingleProduct;
