import React, { Component } from "react";
import axios from "axios";
import DeleteTransferRecipient from "./components/deleteTransferRecipient";
import Balance from "./components/balance";
import ListTransferRecipients from "./components/listTransferRecipients";
import CreateTransferRecipients from "./components/createTransferRecipient";
import TransferPage from "./components/transferPage";
import BulkTransferPage from "./components/bulkTransferPage";
import "./App.css";


const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 15000,
  headers: {
    Authorization: process.env.REACT_APP_AUTH_KEY
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
      currency: "",
      reason: "",
      reference: "",
      message: "",
      error: "",
      transfer_code: "",
      otp: "",
      payConfirm: "",
      balance: "",
      listBank: [],
      listRecipients: [],
      recipientList: false,
      singleTransfer: false,
      multipleTransfer: false,
      deletePage: false,
      reload: false
    };
    this.showRecipientList = this.showRecipientList.bind(this);
    this.showSingleTransfer = this.showSingleTransfer.bind(this);
    this.showMultipleTransfer = this.showMultipleTransfer.bind(this);
    this.showDeletePage = this.showDeletePage.bind(this);
    this.reload = this.reload.bind(this);
    this.onRender = this.onRender.bind(this);
  }

  showMultipleTransfer() {
    this.setState({ multipleTransfer: !this.state.multipleTransfer });
  }

  showDeletePage() {
    this.setState({ deletePage: !this.state.deletePage });
  }

  reload() {
    this.setState({ reload: !this.state.reload });
  }

  showRecipientList() {
    this.setState({ recipientList: !this.state.recipientList });
  }

  showSingleTransfer() {
    this.setState({ singleTransfer: !this.state.singleTransfer });
  }

  getTransferRecipient() {
    return axiosInstance.get("transferrecipient");
  }
  getBankList() {
    return axiosInstance.get("bank");
  }

  getBalance() {
    return axiosInstance.get("balance");
  }

  onRender() {
    axios
      .all([this.getTransferRecipient(), this.getBankList(), this.getBalance()])
      .then(
        axios.spread((recipients, banks, balance) => {
          this.setState({
            listRecipients: recipients.data.data,
            listBank: banks.data.data,
            balance: balance.data.data[0].balance / 100,
            currency: balance.data.data[0].currency
          });
        })
      );
  }
  componentDidMount() {
    console.log(process.env.REACT_APP_AUTH_KEY)
    this.onRender();
  }

  render() {
    const {
      listRecipients,
      listBank,
      balance,
      currency,
      recipientList,
      singleTransfer,
      multipleTransfer,
      deletePage,
      reload
    } = this.state;
    if (reload) {
      for (var i = 0; i <= 1; i++) {
        this.onRender();
      }
      this.setState({ reload: !reload });
    }
    return (
      <div className="App">
        <div className="Navbar">
                
        <div type="button" onClick={this.showList}>
          {" "}
          List{" "}
        </div>
        <div type="button" onClick={this.showSingleTransfer}>
          {" "}
          Transfer{" "}
        </div>
        <div type="button" onClick={this.showMultipleTransfer}>
          {" "}
          Multiple Transfer{" "}
        </div>
        <div type="button" onClick={this.showDeletePage}>
          {" "}
          Delete{" "}
        </div>


        </div>
        <Balance balance={balance} currency={currency} listBank={listBank} />
        <CreateTransferRecipients
          showMultipleTransfer={this.showMultipleTransfer}
          showSingleTransfer={this.showSingleTransfer}
          showList={this.showRecipientList}
          showDeletePage={this.showDeletePage}
          reload={this.reload}
          listBank={listBank}
        />
        <ListTransferRecipients
          list={recipientList}
          listRecipients={listRecipients}
          reload={reload}
        />
        <TransferPage
          singleTransfer={singleTransfer}
          reload={this.reload}
          listRecipients={listRecipients}
        />
        <BulkTransferPage
          multipleTransfer={multipleTransfer}
          listRecipients={listRecipients}
          reload={this.reload}
        />
        <DeleteTransferRecipient
          deletePage={deletePage}
          reload={this.reload}
          listRecipients={listRecipients}
        />
      </div>
    );
  }
}
