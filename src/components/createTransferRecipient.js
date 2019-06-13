import React, { Component, Fragment } from "react";
import axios from "axios";

export default class CreateTransferRecipients extends Component {
  //add verification to ensure account added is correct
  
  constructor(props) {
    super(props);

    this.state = {
      type: "nuban",
      account_number: "",
      name: "",
      account_name: "",
      bank_code: "",
      listBank:[],
      balance: "",
      currency: "NGN",
      description: "",
      authorizationCode:"",
      message:"",
      

    };

    this.handleChange = this.handleChange.bind(this);
    this.addTransferRecipient = this.addTransferRecipient.bind(this)
    //this.verify = this.verify.bind(this);
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
  }


  addTransferRecipient() {
    const {axiosInstance} = this.props
    const { account_number, bank_code, type,  currency, name  } = this.state;
    axiosInstance.post("transferrecipient",{
          type:type,
          name:name,
          account_number:account_number,
          bank_code:bank_code,
          currency:currency,
    
    }).then(
      res => {
        console.log(res);
        const message = res.data.message;
        this.setState({ message: message });
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
      account_name,
      message,
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
          <label className="">
            Name
          <span className="">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Enter Name"
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
        <span>{message}</span>
        <button className="btn btn-primary bd-0" type="button" onClick={this.addTransferRecipient}>
          submit
          </button>
      </form>
    
      </div>
    );
  }
}
