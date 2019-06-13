import React, { Component, Fragment } from "react";

export default class DeleteTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "nuban",
      account_number: "",
      account_name: "",
      listCustomers:{
        name:"",
        email:"",
        details:{
          bank_name:""
        }
      } ,
 
    };

    //    this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDelete(){
    const {axiosInstance} = this.props
    axiosInstance.delete('transferrecipient/'+this.state.recipientId).then(
      res => {
        console.log(res);
        const message = res.data.message;
        this.setState({ message: message })
      },
      error => {
        console.log(error.response.status);
      }
    );
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
        });
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
            <th>Delete</th>
          </tr>
          {listCustomers.length > 1 ? (
            listCustomers.map(customer => (
              <tr>
                <th>{customer.name}</th>
                <th>{customer.details.bank_name}</th>
                <th>{customer.type}</th>
                <th><select name = "id", onChange={this.handleChange}>
                    <option value={customer.id} > Delete </option>
                    <option value={customer.id}> Update </option>
                  </select></th>
               
              </tr>
            ))
          ) : (
            <tr>
              <th>{listCustomers.name}</th>
              <th>{listCustomers.details.bank_name}</th>
              <th>{listCustomers.type}</th>
            </tr>
          ) }
        </table>
      </div>
    );
  }
}
