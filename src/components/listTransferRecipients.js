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

  componentDidMount() {
    const {axiosInstance} = this.props
    axiosInstance.get("transferrecipient").then(
      res => {
        const customers = res.data.data;
        console.log(customers)
        this.setState(
          {listCustomers:customers
          //isLoading: false
        }        );
        console.log(this.state.listCustomers)
      },
      error => {
        console.log(error.response.status);
      }
    );
  }

  render() {
    const {
      listCustomers,
      
    } = this.state;
    return (
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Bank</th>
            <th>Type</th>
          </tr>
          {listCustomers.length >= 1 ? (
            listCustomers.map(customer => (
              <tr>
                <th>{customer.name}</th>
                <th>{/*customer.details.bank_name*/}</th>
                <th>{customer.type}</th>
               
              </tr>
            ))
          ) : (
            <tr>
              <th>{listCustomers.name}</th>
              <th>{/*listCustomers.details.bank_name*/}</th>
              <th>{listCustomers.type}</th>
            </tr>
          ) }
        </table>
      </div>
    );
  }
}
