import React, { Component } from "react";

export default class Balance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: "",
      currency: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    this.loadProps(nextProps);
  }

  loadProps(props) {
    this.setState({ balance: props.balance, currency: props.currency });
  }

  render() {
    const { balance, currency } = this.state;
    return (
      <div>
        <p>Balance</p>
        <span>
          {balance} <span>{currency}</span>
        </span>
      </div>
    );
  }
}
