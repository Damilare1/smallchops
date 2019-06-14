import React, { Component, Fragment } from "react";
import axios from "axios";

const axiosInstance =  axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 10000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

 const initialState = {
  source: "balance",
  amount: "",
  recipient: {
    id:"",
    name:""
  },
  row:[],
  currency: "NGN",
  reason: "",
  reference: "",
  message: '',
  error:'',
  transfer_code:'',
  otp:'',
  payConfirm: '',
  index:'',
  recipient_code:'',
};
export default class BulkTransfer extends Component {
  constructor(props) {
    super(props);
 
    this.state=initialState;
 

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.addRow = this.addRow.bind(this);
    //this.verifyOTP = this.verifyOTP.bind(this);
  }

  clearState(e){
    this.setState(initialState);
 }


  transferFunds() {
    const {
      row,
      currency,
      source,
    } = this.state;
    console.log(row)
    axiosInstance
      .post("transfer/bulk", {
        currency:currency,
        source: source,
        transfers:row
      })
      .then(
        res => {
          console.log(res);
          const message = res.data.message;
          this.setState({ 
            message: message,
            error: "" });
        },
        error => {
          console.log(error);
          this.setState({
            error:error.response,
            message: "",
          })
        }
      );
  }

 
  handleChangeList(event) {
    const {listRecipients} = this.props;
    const { value } = event.target;
    this.setState({ recipient: {
      recipient_code: listRecipients[value].recipient_code,
      name: listRecipients[value].name, 
    }, index: value});
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addRow(){
    let {row, amount, recipient, } = this.state
    let recipientObj = {
      amount: amount*100,
      recipient: recipient.recipient_code,
      name: recipient.name
     
    }
    row.push(recipientObj);
    this.setState({row: row, recipient:{}})
  }

  render() {
    const { amount, row, recipient, index, message, error } = this.state;
    const {listRecipients, multipleTransfer} = this.props
    
    if(!multipleTransfer){
      return null;
    }
    return (
      <div>
      <ul>
        {row.length>=1 ? row.map(rows => (
          <li> {rows.amount / 100}      {rows.name}</li>
        )):""}
      </ul>    
      <form>
              <input 
              placeholder = "amount"
              type = "number"
              required
              name = "amount"
              value = {amount}
              onChange = {this.handleChange}
              /> 
              <select
              placeholder = "recipient"
              type = "text"
              required
              name = "recipient"
              value = {index}
              onChange = {this.handleChangeList}
              >
                <option value="">Select recipient</option>
                {listRecipients.length>1?
                listRecipients.map((recipients, index) => (
                  <option value={index}>{recipients.name}</option>
                )
              ):" " }
              </select>
            
        
        <button type="button" onClick={this.addRow}>add</button>
        <button type="button" onClick={this.transferFunds}>pay</button>
        <p>{message || error}</p>
      </form>
      </div>
    );
  }
}
