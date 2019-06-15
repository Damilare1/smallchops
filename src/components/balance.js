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
      <div className= "row">
        <p className="mg-b-0">Balance:</p>
        <p >
          {balance} <span>{currency}</span>
        </p>
      </div>
    );
  }
}
