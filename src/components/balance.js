import React, { Component, Fragment } from "react";
import axios from "axios";


export default class Balance extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      balance:'',
      currency:''
  };
    
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps){
    this.loadProps(nextProps);
 }

 loadProps(props){
    this.setState({balance: props.balance, currency:props.currency});
 }

  render() {
    const {
      balance,
      currency,
    } = this.state;
    return (
      <div>
        <p>{balance} <span>{currency}</span></p>
      </div>
    );
  }
}
