import { useContext } from "react";
import {
    SET_PRODUCT,
    SET_LOADING,
    PRODUCT_TO_UPDATE,
    SET_SINGLE_PRODUCT
  } from "./action.types";
import { UserContext } from "./UserContext";  
  //TODO: DONE use switch case
  export default (state, action) => {
    const context = useContext(UserContext)
    switch (action.type) {
        case SET_PRODUCT:
    return action.payload == null
      ? { ...state, products: [] }
      : { ...state, products: action.payload };
      case SET_LOADING:
        return { ...state, isLoading: action.payload }; 
      case PRODUCT_TO_UPDATE:
        return {
          ...state,
          productToUpdate: action.payload,
          productToUpdateKey: action.key
        };
      case SET_SINGLE_PRODUCT:
        return {
          ...state,
          product: action.payload
        };
  
      default:
        return state;
    }
  };



  