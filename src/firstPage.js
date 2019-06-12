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

export default class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listBank: [],
      listCustomers: [],
      account_number: "",
      account_name: "",
      bank_code: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  verify(event) {
    const { account_number, bank_code } = this.state;

    axiosInstance.get("bank/resolve", { account_number, bank_code }).then(
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
      listCustomers,
      account_name
    } = this.state;
    return (
      <form onSubmit={this.verify}>
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
          />
        </div>

        <div>
          <select
            className="form-control"
            required
            name="type"
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
        <button className="btn btn-primary bd-0" type="submit">
          submit
          </button>
      </form>
    );
  }
}
