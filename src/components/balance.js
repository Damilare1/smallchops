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
    this.setState({ balance: nextProps.balance, currency: nextProps.currency });
  }

    render() {
    const { balance, currency } = this.state;
    return (
      <div className= "row">
        <p className="mg-b-0">Balance:</p>
        <p className="balance">
          {balance} <span>{currency}</span>
        </p>
      </div>
    );
  }
}
