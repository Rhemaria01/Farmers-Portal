import React,{useState} from 'react'
import {   Input } from 'reactstrap';


const StatusUpdate = ({product, handleUpdate, orderKey}) => {
    {console.log(orderKey)}

    const [status, setStatus] = useState(product.status)
     const allStatus = ["Received", "Confirm", "Out for Delivery", "Delivered"];
     const [remainingStatus, setRemainingStatus] = useState(allStatus.filter(selectedStatus => selectedStatus !== status))

    const updateStatus = (evalue) => {
        setStatus(evalue)
        setRemainingStatus(allStatus.filter(selectedStatus => selectedStatus !== status))
    }
    return (
        <>
        <td>
        <Input type="select" name="select" id="exampleSelect" onChange={e=>updateStatus(e.target.value)}>
          <option value={status}>{status}</option>
        {remainingStatus.map((singleStatus) => (<option>{singleStatus}</option>))}
        </Input>
      </td>
            <td className="text-center">
                <button type="button" className="btn btn-warning" onClick={() => handleUpdate({status,orderKey,product})}>Update</button>
            </td>
        </>    
    )
}

export default StatusUpdate
