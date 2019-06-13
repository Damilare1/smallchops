import React, { Component} from "react";
import axios from "axios";
import logo from "./logo.svg";
// DeleteTransfer from './components/deleteTransfer';
import VerifyAccount from "./components/verifyAccount";
import ListTransferRecipients from "./components/listTransferRecipients";
import CreateTransferRecipients from "./components/createTransferRecipient";
import TransferPage from "./components/transferPage";
import BulkTransferPage from "./components/bulkTransferPage";
import "./App.css";

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 5000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      source: "balance",
      amount: "",
      recipient: [],
      row: [],
      currency: "NGN",
      reason: "",
      reference: "",
      message: "",
      error: "",
      transfer_code: "",
      otp: "",
      payConfirm: "",
      listRecipients: []
    };

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

  render() {
    const {listRecipients} =this.state;
    return (
      <div className="App">
        {/*<DeleteTransfer axiosInstance = {axiosInstance}/>*/}
        <VerifyAccount axiosInstance={axiosInstance} />
        <CreateTransferRecipients axiosInstance={axiosInstance} />
        <ListTransferRecipients listRecipients={listRecipients} axiosInstance={axiosInstance} />
        <TransferPage listRecipients={listRecipients} axiosInstance={axiosInstance} />
        <BulkTransferPage listRecipients={listRecipients} axiosInstance={axiosInstance} />
      </div>
    );
  }
}
