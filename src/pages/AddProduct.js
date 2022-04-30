import React,{useState,useContext, useEffect} from 'react'
import firebase from "firebase/app";

import { UserContext } from '../context/UserContext';
import { ProductContext } from '../context/ProductContext';
import { useHistory, Redirect } from "react-router-dom"
import {
    Container,
    Form,
    FormGroup,
    Label,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
    Row,
    Col
  } from "reactstrap";
import { toast } from 'react-toastify';

import { imageConfig } from '../utils/config';

import { readAndCompressImage } from "browser-image-resizer";


import { v4 } from 'uuid'
const AddProduct = () => {
    const  products = useContext(ProductContext)
    const history = useHistory();
    const context = useContext(UserContext)
    console.log(context.user?.email)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [total,setTotal] = useState(0);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const imagePicker = async e => {
    
        try {
          const file = e.target.files[0];
    
          var metadata = {
            contentType: file.type
          };
    
          let resizedImage = await readAndCompressImage(file, imageConfig);
    
          const storageRef = await firebase.storage().ref();
          var uploadTask = storageRef
            .child("images/" + file.name)
            .put(resizedImage, metadata);
    
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {

              var progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
              switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED:

                  console.log("UPloading is paused");
                  break;
                case firebase.storage.TaskState.RUNNING:
                  console.log("UPloading is in progress...");
                  break;
              }
              if (progress == 100) {

                toast("uploaded", { type: "success" });
              }
            },
            error => {
              toast("something is wrong in state change", { type: "error" });
            },
            () => {
              uploadTask.snapshot.ref
                .getDownloadURL()
                .then(downloadURL => {
                  setDownloadUrl(downloadURL);
                })
                .catch(err => console.log(err));
            }
          );
        } catch (error) {
          console.error(error);
          toast("Something went wrong", { type: "error" });
        }
      };


      const addProduct = async () => {

        try {
          
          firebase
            .database()
            .ref("products/" + v4())
            .set({
              name,
              price,
              quantity,
              total: quantity*price,
              picture: downloadUrl,
              username: context.user.email,
            });
        } catch (error) {
          console.log(error);
          return toast(error.message,{type:"error"})
        }
      };

    const handleSubmit = e => {
        e.preventDefault();
        setTotal(quantity*price)
         addProduct();
    
        toast("Success", { type: "success" });
    

        history.push("/sellerportal");
      };
    const handleCancel = e => {
      e.preventDefault();


      toast("Cancelled", { type: "warning" });

      history.push("/sellerportal");
    }

      if (!context.user?.email) {
        return <Redirect to="/" />
    }
    return (
        <Container fluid className="mt-5 aaa">
      <Row>
        <Col md="6" className="p-2">
          <Form onSubmit={handleSubmit}>
            <div className="text-center">
              
                <div>
                  <label htmlFor="imagepicker" className="">
                    <img src={downloadUrl} alt="" className="profile" />
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="imagepicker"
                    accept="image/*"
                    multiple={false}
                    onChange={e => imagePicker(e)}
                    className="hidden"
                    required
                  />
                </div>
              
            </div>

            <FormGroup>
            
              <Input
                type="text"
                name="product name"
                id="product name"
                placeholder="Product Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </FormGroup> 
            <FormGroup>
            <InputGroup>
              <Input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Price"
                required
              />
            <InputGroupAddon addonType="append">
            <InputGroupText>₹/KG</InputGroupText>
            </InputGroupAddon>
            </InputGroup>
            </FormGroup>
            <FormGroup>
            <InputGroup>
              <Input
                type="text"
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                placeholder="Quantity"
                required
              />
            <InputGroupAddon addonType="append">
            <InputGroupText>KG</InputGroupText>
            </InputGroupAddon>
            </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label 
              className="text-primary fw-bolder fs-3" 
              >
              {`TOTAL:₹${quantity*price}`}
              </Label>
            </FormGroup>
           
            <Button
              type="submit"
              color="primary"
              block
              className="text-uppercase mt-2"
            >
              Add Product
            </Button>
            <Button
              type="button"
              block
              className="text-uppercase mt-2 btn-danger float-end"
              onClick = {handleCancel}
            >
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
              }

export default AddProduct
