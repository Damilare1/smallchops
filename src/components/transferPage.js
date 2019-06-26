import React, { Component } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY
  }
});

export default class TransferPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "balance",
      amount: "",
      recipient: "",
      name: "",
      currency: "NGN",
      reason: "",
      reference: "",
      message: "",
      error: "",
      transfer_code: "",
      otp: "",
      payConfirm: "",
      warning: false,
      index: "",
      status: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.verifyOTP = this.verifyOTP.bind(this);
    this.showWarning = this.showWarning.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  clearState(e) {
    this.setState({
      row: [],
      amount: "",
      index: "",
      reload: !this.state.reload,
      warning: !this.state.warning
    });
  }

  showWarning() {
    this.setState({ warning: !this.state.warning });
  }

  transferFunds() {
    const { amount, reason, recipient, currency, source } = this.state;
    axiosInstance.post("transfer/enable_otp");
    axiosInstance
      .post("transfer", {
        amount: amount * 100,
        reason: reason,
        recipient: recipient,
        source: source,
        currency: currency
      })
      .then(
        res => {
          const data = res.data;
          this.setState({
            message: data.message,
            transfer_code: data.data.transfer_code,
            status: data.data.status
          });
          this.clearState();
        },
        error => {
          console.log(error.response);
          this.setState({ error: error.response.data.message });
        }
      );
  }

  verifyOTP() {
    const { transfer_code, otp } = this.state;
    const { reload } = this.props;
    axiosInstance
      .post("transfer/finalize_transfer", {
        transfer_code: transfer_code,
        otp: otp
      })
      .then(
        res => {
          const message = res.data.message;
          this.setState({ 
            message: message,
            status:"" });
            reload();
        },
        error => {
          console.log(error.response.status);
          this.setState({ payConfirm: error.response.data.message });
        }
      );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleChangeList(event) {
    const { listRecipients } = this.props;
    const { value } = event.target;
    this.setState({
      recipient: listRecipients[value].recipient_code,
      name: listRecipients[value].name,
      index: value
    });
  }

  render() {
    const {
      amount,
      reason,
      error,
      otp,
      status,
      payConfirm,
      message,
      warning,
      index,
      name
    } = this.state;
    const { listRecipients, singleTransfer } = this.props;

    if (!singleTransfer) {
      return null;
    }

    return (
      <div>
        <h3>Single Transfer</h3>
        {warning ? (
          <div>
            {" "}
            <h3>Are sure you want to send</h3>
            <p>
              {" "}
              {amount} to {name}{" "}
            </p>{" "}
            <button type="button" onClick={this.transferFunds}>
              Yes, I am
            </button>{" "}
            <button type="button" onClick={this.showWarning}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <form>
              <div className="row row-sm">
                <input
                  name="amount"
                  type="number"
                  className="col-lg-3 col-sm-3"
                  onChange={this.handleChange}
                  placeholder="Enter Amount"
                  value={amount}
                />

                <input
                  name="reason"
                  type="text"
                  className="col-lg-3 col-sm-3"
                  onChange={this.handleChange}
                  placeholder="Enter Reason for Transfer"
                  value={reason}
                />

                <select
                  name="recipient"
                  onChange={this.handleChangeList}
                  className="col-lg-3 col-sm-3"
                  placeholder="Select recipient"
                  value={index}
                >
                  <option value="">Select recipient</option>
                  {listRecipients.length >= 1
                    ? listRecipients.map((recipients, index) => (
                        <option value={index}>{recipients.name}</option>
                      ))
                    : " "}
                </select>
              </div>
              <div>
                <p>{message || error}</p>
              </div>
              <button type="button" onClick={this.showWarning}>
                Pay
              </button>
            </form>
            {status === "otp" ? (
              <div>
                <input
                  name="otp"
                  type="text"
                  onChange={this.handleChange}
                  placeholder="OTP Code"
                  value={otp}
                />
                <p>{payConfirm}</p>
                <button type="button" onClick={this.verifyOTP}>
                  Confirm OTP
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        )}
      </div>
    );
  }
}
