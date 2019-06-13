import React, { Component, Fragment } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

export default class fifthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "balance",
      amount: "",
      recipient: [],
      row:[],
      currency: "NGN",
      reason: "",
      reference: "",
      message: '',
      error:'',
      transfer_code:'',
      otp:'',
      payConfirm: '',
      listRecipients: []
    };

    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.addRow = this.addRow.bind(this);
    //this.verifyOTP = this.verifyOTP.bind(this);
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
          console.log(error.response);
          this.setState({
            error:error.response.data.message,
            message: "",
          })
        }
      );
  }

 
  componentDidMount() {
    axiosInstance.get("transferrecipient").then(
      res => {
        const customers = res.data.data;
        this.setState({
          listRecipients: customers
          //isLoading: false
        });
        console.log(this.state.listRecipients)
      },
      error => {
        console.log(error.response.status);
      }
    );
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  addRow(){
    let {row, amount, recipient, } = this.state
    let recipientObj = {
      amount: amount*100,
      recipient: recipient,
     
    }
    row.push(recipientObj);
    this.setState({row: row})
  }

  render() {
    const { amount, row, recipient, listRecipients, message, error } = this.state;
    
    return (
      <div>
      <ul>
        {row.length>=1 ? row.map(rows => (
          <li> {rows.amount / 100}      {rows.recipient}</li>
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
              value = {recipient}
              onChange = {this.handleChange}
              >
                <option value="">Select recipient</option>
                {listRecipients.length>1?
                listRecipients.map(recipients => (
                  <option value={recipients.recipient_code}>{recipients.name}</option>
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
