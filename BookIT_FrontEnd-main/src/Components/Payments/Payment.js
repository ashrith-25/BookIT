import React, { useState } from "react";
import './Payment.css';
import upi from "../Images/UPI.jpeg"
import mc from "../Images/MasterCard.jpeg"
import vi from "../Images/Visa.jpeg"
import pp from '../Images/PayPal.jpeg'


const Payment = (props) => {
    const [upiid,setUpiid] = useState('');
    const [nameoncard,setNameoncard] = useState('');
    const [cvv,setCvv] = useState('');
    const [cnum,setCnum] = useState('');
    const [exmon,setExmon] = useState('Jan');
    const [exyear,setExyear] = useState('2023');
    const [btn1,setBtn1] = useState(true);
    const [btn2,setBtn2] = useState(true);
    const [submitted, setSubmitted] = useState(false);
  
    let data = [upiid,nameoncard,cvv,cnum,exmon,exyear];
    const handleUpi = (e) => {
        setUpiid(e.target.value);
        setSubmitted(false);
    }
    const handleNameoncard = (e) => {
        setNameoncard(e.target.value);
        setSubmitted(false);
    }
    const handleCvv = (e) => {
        setCvv(e.target.value);
        setSubmitted(false);
    }
    const handleCnum = (e) => {
        setCnum(e.target.value);
        setSubmitted(false);
      }
      const handleExmon = (e) => {
        setExmon(e.target.value);
        setSubmitted(false);
      }
      const handleExyear = (e) => {
        setExyear(e.target.value);
        setSubmitted(false);
      }

     const disfun1 = () => {
        setBtn1(true);
        setBtn2(false);
     }
     const disfun2 = () => {
        setBtn1(false);
        setBtn2(true);
     }
     
     const validateupi = () => {
        var format = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/;
           if (upiid.match(format)) {
            setSubmitted(true);
            props.submitHandler(data);
           } else {
            alert("You have entered an invalid UPI ID");
            }  

     }

     const validatecard = () => {
        var format = /^[0-9]*$/;
        let x=0;
        if (cnum.length === 16 && cnum.match(format)) {
              x++;


        } else {
            alert("You have entered an invalid card number");
    
    
        }
        if (cvv.length === 3 && cvv.match(format)) {
              x++;
    
    
        } else {
            alert("You have entered an invalid cvv number");
    
    
        }
        if(x===2){
            setSubmitted(true);
            props.submitHandler(data);
        }
        
     }
     
      

      return(
        <div className="paymentbody">
           <div className="paymentcontainer">
             <h1 id="confirmpayment">Confirm Your Payment</h1>
                <div className="upi">
                   <input type="radio" id="upi" name="paytype" value="UPI" onClick={disfun1}></input>
                   <label htmlFor="upi">UPI</label>
                  <br></br>
                    <div className="first-row">
                    <div className="owner">
                      <h3>Enter UPI id</h3>
                    <div className="input-field">
                        <input type="text" id="iupi" placeholder="phonenumber@upi" disabled = {btn2} value = {upiid} onChange={handleUpi}></input>
                    </div>
                    <br></br>
                    </div>
                    </div>

                <div className="second-row">
                   <button id="btn1" type="button" className="btn" disabled = {btn2} onClick={validateupi} >Verify and Pay</button>
                   <img src={upi} style={{width: "100px", height: "40px", marginLeft: "300px", marginTop: "-10px"}} alt="upi" />
                </div>
                </div>
                <br></br>
            <div className="cards">

              <input type="radio" id="card" name="paytype" value="CARD" onClick={disfun2}></input>
              <label htmlFor="card">Card</label>
              <br></br>
                <div className="first-row">
                    <div className="owner">
                     <h3>Name on Card</h3>
                        <div className="input-field">
                         <input id="nc" type="text" disabled = {btn1} value={nameoncard} onChange={handleNameoncard}></input>
                        </div>
                    </div>
                <div className="cvv">
                    <h3>CVV</h3>
                    <div className="input-field">
                        <input id="cvv" type="password" disabled={btn1} value={cvv} onChange={handleCvv}></input>
                    </div>
                </div>
                </div>
                <div className="second-row">
                <div className="card-number">
                    <h3>Card Number</h3>
                    <div className="input-field">
                        <input id="cno" type="text" disabled={btn1} value={cnum} onChange={handleCnum}></input>
                    </div>
                </div>
                </div>
                <div className="third-row">
                 <h3>Expiry Date</h3>
                <div className="selection">
                    <div className="date">
                        <select name="months" id="months" disabled={btn1} value={exmon} onChange={handleExmon}>
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                            <option value="Mar">Mar</option>
                            <option value="Apr">Apr</option>
                            <option value="May">May</option>
                            <option value="Jun">Jun</option>
                            <option value="Jul">Jul</option>
                            <option value="Aug">Aug</option>
                            <option value="Sep">Sep</option>
                            <option value="Oct">Oct</option>
                            <option value="Nov">Nov</option>
                            <option value="Dec">Dec</option>
                        </select>
                        <select name="years" id="years" disabled={btn1} value={exyear} onChange={handleExyear}>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                        </select>
                    </div>
                    <div className="card">
                        <img src={mc} alt="" id="mcimg"/>
                        <img src={vi} alt="" id="visaimg"/>
                        <img src={pp} alt="" id="ppimg"/>
                    </div>
                </div>
                </div>
                <button id="btn2" type="button" className="btn" disabled={btn1} onClick={validatecard}>Verify and Pay</button>
            </div>
            </div> 
         </div>
      )
}

export default Payment;