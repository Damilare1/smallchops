import React, { Component, Fragment } from "react";
import axios from "axios";


export default class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      listBank: [],
      listCustomers: [],
      account_number: "",
      account_name: "",
      bank_code: "",
      balance: "",
      currency: "",
      

    };
    
    this.handleChange = this.handleChange.bind(this);
    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {axiosInstance} = this.props
    axiosInstance.get("bank").then(
      res => {
        const listBanks = res.data.data;
        this.setState({ listBank: listBanks });
      },
      error => {
        console.log(error.response.status);
      }
    );

    axiosInstance.get("balance").then(
      res => {
        const paystackBalance = res.data.data[0];
        this.setState({ 
          balance: paystackBalance.balance/100,
          currency: paystackBalance.currency });
      },
      error => {
        console.log(error.response.status);
      }
    );

    
  }

  verify() {
    const {axiosInstance} = this.props
    const { account_number, bank_code } = this.state;

    axiosInstance.get("bank/resolve", { 
      params:{
        account_number: account_number, 
        bank_code: bank_code }
      }).then(
      res => {
        console.log(res);
        const accountDetails = res.data.data;
        this.setState({ account_name: accountDetails.account_name });
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
    const {
      account_number,
      listBank,
      balance,
      currency,
      listCustomers,
      account_name
    } = this.state;
    return (
      <div>
      <form >
        <div>
          <label className="">
            Account Number
            <span className="">*</span>
          </label>
          <input
            type="text"
            name="account_number"
            required
            placeholder="Enter Account Number"
            onChange = {this.handleChange}
          />
        </div>

        <div>
          <select
            className="form-control"
            required
            name="bank_code"
            onChange={this.handleChange}
          >
            <option value="">Select Bank</option>

            {listBank.map(bank => (
              <option key={bank.name} value={bank.code}>
                {bank.name}
              </option>
            ))}

            <option value="">Others</option>
          </select>
        </div>
        <span>{account_name}</span>
        <button className="btn btn-primary bd-0" type="button" onClick={this.verify}>
          submit
          </button>
      </form>
      
      <div>
        <p>{balance} <span>{currency}</span></p>
      </div>
      </div>
    );
  }
}
