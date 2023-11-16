import React from "react";
import Payment from "./Payment";
import { useState } from "react";

export default function PaymentData(){
    const [data, setData] = useState('')
    const submitHandler = async (registrationData) => {
        setData(registrationData)
        
    }
  return(
        <div>   
            <div>{data ? <div><h1>{data[1] === '' ? <div><h1>upi_id:{data[0]}</h1></div> : <div><h1>Name On Card:{data[1]}</h1><h1>Cvv:{data[2]}</h1><h1>Card Number:{data[3]}</h1><h1>Expiry Month:{data[4]}</h1><h1>Expiry year:{data[5]}</h1></div> }</h1></div> : <Payment submitHandler={submitHandler}></Payment>}</div>
        </div>
  )
}