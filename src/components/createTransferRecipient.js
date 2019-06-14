import React, { Component, Fragment } from "react";
import axios from "axios";

const axiosInstance =  axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

const initialState = {
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
  confirmed: false,
  
};

export default class CreateTransferRecipients extends Component {
  //add verification to ensure account added is correct
  
  constructor(props) {
    super(props);

    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.addTransferRecipient = this.addTransferRecipient.bind(this)
    this.clearState = this.clearState.bind(this);
    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  
  }

  verify() {
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

  clearState(e){
     this.setState(initialState);
  }

  addTransferRecipient() {
    const { account_number, bank_code, type,  currency, account_name  } = this.state;
    axiosInstance.post("transferrecipient",{
          type:type,
          name:account_name,
          account_number:account_number,
          bank_code:bank_code,
          currency:currency,
    
    }).then(
      res => {
        console.log(res);
        const message = res.data.message;
        this.setState({ 
          message: message,
          account_name:'',
         });
      },
      error => {
        console.log(error.response);
      }
    );
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    const {
      account_name,
      message,
      account_number,
      bank_code,
    } = this.state;

    const {
      listBank,
      showList,
      showSingleTransfer,
      showMultipleTransfer
    } = this.props;
    return (
      <div>
        <button type = "button" onClick={showList}> List </button>
        <button type = "button" onClick={showSingleTransfer}> Transfer </button>
        <button type = "button" onClick={showMultipleTransfer}> Multiple Transfer </button>

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
            value = {account_number}
            onChange = {this.handleChange}
          />
        </div>
        <div>
          <select
            className="form-control"
            required
            name="bank_code"
            value={bank_code}
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
        <span>{account_name||message}</span>
        <button className="btn btn-primary bd-0" type="button" onClick={this.verify}>
          Confirm
          </button>
          {account_name?  
          <div>
            <button className="btn btn-primary bd-0" type="button" onClick={this.addTransferRecipient}> Add </button> 
            <button className="btn btn-primary bd-0" type="button" onClick={this.clearState}>Cancel</button>
          </div> : " "}
      </form>
    
      </div>
    );
  }
}
