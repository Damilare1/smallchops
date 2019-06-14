import React, { Component } from "react";


export default class ListTransferRecipient extends Component {
  //delete recipients to work on the list
  constructor(props) {
    super(props);

    this.state = {
 
      listCustomers:[] ,
      
    };

    //    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  render() {
    const {listRecipients, list} = this.props

    if(!list){
      return null;
    }

    return (
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Type</th>
          </tr>
          {listRecipients.length >= 1 ? (
            listRecipients.map(customer => (
              <tr>
                <th>{customer.name}</th>
                <th>{customer.details.bank_name}</th>
                <th>{customer.type}</th>
               
              </tr>
            ))
          ) : (
            <tr>
              <th>{listRecipients.name}</th>
              <th>{/*listCustomers.details.bank_name*/}</th>
              <th>{listRecipients.type}</th>
            </tr>
          ) }
        </table>
      </div>
    );
  }
}
