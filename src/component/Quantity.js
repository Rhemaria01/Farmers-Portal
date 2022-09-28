import React,{useState} from 'react'

const Quantity = ({product,addToPrices,index}) => {
    // console.log(product)
    let item = product
    const [quantPrice, setQuantPrice] = useState({"quantity":1,"price":item.price})
    
    if (product.partialSeller) {
        addToPrices(quantPrice, index)   
    }
    else{

        addToPrices({"quantity":product.quantity,"price":product.total}, index)
    }
    const increase = (e)=>{
        if(quantPrice.quantity+1 <= item.quantity){
            setQuantPrice(
            {
                "quantity" : quantPrice.quantity+1, 
                "price" : (quantPrice.quantity+1)*item.price
            }
            )
            
        }

    }
    const decrease = (e)=>{
        if(quantPrice.quantity-1 > 0){
        setQuantPrice(
            {
                "quantity" : quantPrice.quantity-1, 
                "price" : (quantPrice.quantity-1)*item.price
            }
        )
        } 

    }
  return (
    product.partialSeller ? <>
    <td>

    <div class="input-group mb-3">
        <button class="btn btn-outline-secondary" onClick={decrease} type="button" id="button-addon1">-</button>
        <label type="text" class="form-control" placeholder="" aria-label="Example text with button addon">{quantPrice.quantity}</label>
        <button class="btn btn-outline-secondary" onClick={increase} type="button" id="button-addon2">+</button>
    </div>
    </td>
    <td><h4 name="productPrice">{"₹"+quantPrice.price}</h4></td>
    </>:<>
    <td><h4 name="productQuantity">{product.quantity + " Kg"}</h4></td>
    <td><h4 name="productPrice">{"₹"+product.total}</h4></td>
    </>
  )
}

export default Quantity