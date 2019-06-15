import React, { Component } from "react";


export default class ListTransferRecipient extends Component {
  //delete recipients to work on the list
  constructor(props) {
    super(props);

    this.state = {
 
      listRecipients:[] ,
      
    };

    //    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

 componentWillReceiveProps(nextProps){
    this.loadProps(nextProps);
 }

 loadProps(props){
    this.setState({listRecipients: props.listRecipients});
 }
  render() {
    const { list,reload} = this.props;
    const {listRecipients} = this.state;

    if(!list){
      return null
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
