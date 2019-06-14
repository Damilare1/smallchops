import React, { Component, Fragment } from "react";
import axios from "axios";


export default class Balance extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
  };
    
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }


  render() {
    const {
      balance,
      currency,
    } = this.props;
    return (
      <div>
        <p>{balance} <span>{currency}</span></p>
      </div>
    );
  }
}
