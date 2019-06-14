import React, { Component, Fragment } from "react";
import API from "../API/API"

export default class DeleteTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "nuban",
      account_number: "",
      account_name: "",
      recipientId:"",
 
    };

     this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
     this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleDelete(){
    const{recipientId} = this.state;
    API.delete('transferrecipient/'+recipientId).then(
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

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {
    const {

      list,
      recipientId
     
    } = this.props;
    const {
      message,
    } = this.state;
  
    return (
      <div>
            <select
              name="recipientId"
              onChange={this.handleChange}
              placeholder="Select recipient"
              value={recipientId}
            >
              <option value="">Select recipient</option>
              {list.length>=1?
                list.map(recipients => (
                  <option key={recipients.name} value={recipients.id}>{recipients.name}</option>
                )
              ):" " }
            </select>
            <button type ="button" onClick={this.handleDelete}>Delete</button>

                    <p>{message}</p>
      </div>
    );
  }
}
