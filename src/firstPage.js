import React, { Component, Fragment } from 'react';
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: 'Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d',
  //  'Content-Type': 'application/json'
  }
});

export default class FirstPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listBank:[],
      listCustomers: [],
      account_number: '',
      account_name: '',
    }

    this.handleChange = this.handleChange.bind(this);
  //  this.handleSubmit = this.handleSubmit.bind(this);
  }
  

 
  componentDidMount() {
    
    axiosInstance.get( "bank")
      .then(res => {
        const listBanks = res.data.data;
        this.setState( {listBank: listBanks} );
      },
      (error) => {
        console.log(error.response.status)
      })
  }

  verify(event){
    axiosInstance.get( "bank/resolve")
    .then(res => {
      console.log(res)
      const listBanks = res.data.data;
      this.setState( {listBank: listBanks} );
    },
    (error) => {
      console.log(error.response.status)
    })
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
      account_name,
    } = this.state;
    return (
      <form>
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
              <option value="">
                Select Bank
              </option>

              {listBank.map(bank => (
                <option key={bank.name} value={bank.code}>
                  {bank.name}
                </option>
              ))}

              <option value="">
                Others
              </option>
            </select>
      </div>
      </form>
    );
  }
}
