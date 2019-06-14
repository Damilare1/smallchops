import React, { Component, Fragment } from "react";
import axios from 'axios';

const axiosInstance =  axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

export default class TransferPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "balance",
      amount: "",
      recipient: "",
      currency: "NGN",
      reason: "",
      reference: "",
      message: '',
      error:'',
      transfer_code:'',
      otp:'',
      payConfirm: '',
    };

    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }

  transferFunds() {
    const {
      amount, 
      reason, 
      recipient,
      currency,
      source,
    } = this.state;
    console.log(amount+" "+reason+" "+recipient+" "+currency+" ")
    axiosInstance
      .post("transfer", {
        amount: amount*100,
        reason: reason,
        recipient: recipient,
        source: source,
        currency: currency
      })
      .then(
        res => {
          console.log(res);
          const message = res.data.message;
          this.setState({ message: message });
        },
        error => {
          console.log(error.response);
          this.setState({error:error.response.data.message})
        }
      );
  }

  verifyOTP(){
    const {
      transfer_code,
      otp
    } = this.state;
    axiosInstance.post("transfer/finalize_transfer",{
      transfer_code: transfer_code,
      otp: otp

}).then(
  res => {
    console.log(res);
    const message = res.data.message;
    this.setState({ message: message });
  },
  error => {
    console.log(error.response.status);
    this.setState({payConfirm: error.response.data.message})
  }
);
  }
 
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const { amount, reason, error, otp, recipient, transfer_code, payConfirm, message } = this.state;
    const {listRecipients, singleTransfer} = this.props

    if(!singleTransfer){
      return null;
    }

    
    return (
      <div>
        <form>
          <div>
            <input
              name="amount"
              type="number"
              onChange={this.handleChange}
              placeholder="Enter Amount"
              value={amount}
            />
          </div>
          <div>
            <input
              name="reason"
              type="text"
              onChange={this.handleChange}
              placeholder="Enter Reason for Transfer"
              value={reason}
            />
          </div>
          <div>
            <select
              name="recipient"
              onChange={this.handleChange}
              placeholder="Select recipient"
              value={recipient}
            >
              <option value="">Select recipient</option>
              {listRecipients.length>1?
                listRecipients.map(recipients => (
                  <option value={recipients.recipient_code}>{recipients.name}</option>
                )
              ):" " }
            </select>
          </div>
          <div>
            <p>{message || error}</p>
          </div>
          <button type = "button" onClick = {this.transferFunds}>Pay</button>
        </form>
        <div>
        <input
              name="otp"
              type="text"
              onChange={this.handleChange}
              placeholder="OTP Code"
              value={otp}
            />
        <input
              name="transfer_code"
              type="text"
              onChange={this.handleChange}
              placeholder="Transfer Code"
              value={transfer_code}
            />   
        <p>{payConfirm}</p>    
        <button type ="button" onClick={this.verifyOTP}>Confirm OTP</button>
        </div>
      </div>
    );
  }
}
