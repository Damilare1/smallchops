import React, { Component, Fragment } from "react";

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
      listRecipients: []
    };

    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
  }

  transferFunds() {
    const {axiosInstance} = this.props
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
    const {axiosInstance} = this.props
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
  componentDidMount() {
    const {axiosInstance} = this.props
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

  render() {
    const { amount, reason, recipient, error, otp, transfer_code, payConfirm, listRecipients, message } = this.state;
    
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