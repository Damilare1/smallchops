import React, { Component } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 10000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
  }
});

const initialState = {
  source: "balance",
  amount: "",
  recipient: {
    id: "",
    name: ""
  },
  row: [],
  listRecipients: [],
  elem: false,
  currency: "NGN",
  message: "",
  error: "",
  payConfirm: "",
  index: "",
  recipient_code: "",
  reload: false,
  warning: false
};
export default class BulkTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    this.clearState = this.clearState.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.showWarning = this.showWarning.bind(this);
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
    const { row, currency, source } = this.state;
    const {reload} = this.props;
    axiosInstance
      .post("transfer/bulk", {
        currency: currency,
        source: source,
        transfers: row
      })
      .then(
        res => {
          const message = res.data.message;
          this.setState({
            message: message,
            error: ""
          });
          this.clearState();
          this.showWarning();
          reload();
          
        },
        error => {
          this.setState({
            error: error.response.status,
            message: ""
          });
        }
      );
  }

  handleChangeList(event) {
    const { listRecipients } = this.props;
    const { value } = event.target;
    this.setState({
      recipient: {
        recipient_code: listRecipients[value].recipient_code,
        name: listRecipients[value].name
      },
      index: value
    });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addRow() {
    let { row, amount, recipient } = this.state;
    let recipientObj = {
      amount: amount * 100,
      recipient: recipient.recipient_code,
      name: recipient.name
    };
    row.push(recipientObj);
    this.setState({ row: row, recipient: {}, elem: true });
  }

  removeRow() {
    let { row } = this.state;
    row.pop();
    this.setState({ row: row });
  }

  componentWillReceiveProps(nextProps) {
    this.loadProps(nextProps);
  }

  loadProps(props) {
    this.setState({ listRecipients: props.listRecipients });
  }

  render() {
    const {
      amount,
      row,
      elem,
      index,
      message,
      error,
      reload,
      warning,
      listRecipients
    } = this.state;
    const { multipleTransfer } = this.props;

    if (reload) {
      this.clearState();
    }
    if (!multipleTransfer) {
      return null;
    }
    return (
      <div>
        <h3>Multiple Transfer</h3>
        {warning ? (
          <div>
            <h3>Are sure you want to pay</h3>
            <ul>
              {row
                ? row.map(rows => (
                    <li>
                      {" "}
                      NGN{rows.amount / 100} to {rows.name}
                    </li>
                  ))
                : ""}
            </ul>
            <button type="button" onClick={this.transferFunds}>
              Yes, I am
            </button>{" "}
            <button type="button" onClick={this.clearState}>
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <ul>
              {row
                ? row.map(rows => (
                    <li>
                      {" "}
                      NGN{rows.amount / 100} to {rows.name}
                    </li>
                  ))
                : ""}
            </ul>

            <form>
              <div className="row row-sm">
              <input
                className="col-lg-3 col-sm-3"
                placeholder="amount"
                type="number"
                required
                name="amount"
                value={amount}
                onChange={this.handleChange}
              />
              <select
                className="col-lg-3 col-sm-6"
                placeholder="recipient"
                type="text"
                required
                name="recipient"
                value={index}
                onChange={this.handleChangeList}
              >
                <option value="">Select recipient</option>
                {listRecipients.length >= 1
                  ? listRecipients.map((recipients, index) => (
                      <option value={index}>{recipients.name}</option>
                    ))
                  : " "}
              </select>
              </div>
              <button type="button" onClick={this.addRow}>
                add
              </button>
              <button type="button" onClick={this.showWarning}>
                pay
              </button>
              {elem ? (
                <div>
                  <button type="button" onClick={this.clearState}>
                    clear
                  </button>{" "}
                  <button type="button" onClick={this.removeRow}>
                    remove last
                  </button>
                </div>
              ) : (
                " "
              )}
              <p>{message || error}</p>
            </form>
          </div>
        )}
      </div>
    );
  }
}
