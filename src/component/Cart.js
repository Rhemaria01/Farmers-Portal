import React,{useState} from 'react'


const Cart = ({cartProduct, cartProductKey, removeItem, setFlag, grandTotal}) => {
    
        
    
    return (
        
            <>
            <div
            className="text-center text-success fs-1"
            >Cart</div>
            {cartProduct.length>= 1 ? (
                        
                <div className="bbb" >
                <div className="text-center">
                
                {
                    <table class="uk-table uk-table-hover uk-table-middle uk-table-divider" >
            <thead>
                <tr>
    
    
                    <th class="uk-table-small sty"><h3>ITEM</h3></th>
                    <th class="uk-table-small"></th>
                    <th class="uk-width-small sty"><h3>PRICE</h3></th>
                    <th class="uk-table-shrink uk-text-small sty"><h3>QUANTITY</h3></th>
                    <th class="uk-table-shrink uk-text-small sty"><h3>TOTAL</h3></th>
                    <th class="uk-table-shrink uk-text-small sty"><h3></h3></th>
    
    
                </tr>
            </thead>
            
            
                
                {cartProduct.map(product =>{

    
                    return(<tbody><tr>
            <td><img className="uk-preserve-width uk-border-circle" src={product.picture} width={40} alt /></td>
            <td><h3 className="item-name" name="itemName">{product.name}</h3></td>
            <td><h4>{product.price}</h4></td>
            <td><h4>{`${product.quantity}Kg`}</h4></td>
            <td><h4>{`₹${product.total}`}</h4></td>
            <td><button class="uk-button uk-button-danger" type="button" onClick={() => removeItem(product, cartProductKey)}>Remove</button></td>
    
                </tr>
                </tbody>)})}
                
            <tr>
              <td><img class="uk-preserve-width uk-border-circle"  width="40" alt="" /></td> 
              <td class="uk-table-link">
                  <h3 class = "item-name"><strong>Grand-Total</strong></h3>
              </td>
              <td class="uk-text-truncate"><h3></h3></td>
              <td class="uk-text-truncate"><h3></h3></td>
              <td class="uk-text-truncate grand-total"><h3><strong>{`₹${grandTotal}`}</strong></h3></td>
              
          </tr>
                </table>  
                
                }
            <button type="button" className="btn btn-success mb-5" onClick={() => setFlag(false)}  > Checkout </button>    
            </div>
            </div>
            ) : (
                <p className="text-warning fs-1 fw-bolder text-center">Your Cart is Empty</p>
            )}
            </>
        

        
       
    )
}

export default Cart
