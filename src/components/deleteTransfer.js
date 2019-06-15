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
      listRecipients:[],
 
    };

     this.handleChange = this.handleChange.bind(this);
    //    this.verify = this.verify.bind(this);
     this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.loadProps(nextProps);
 }

 loadProps(props){
    this.setState({listRecipients: props.listRecipients});
 }
  
  handleDelete(){
    const{recipientId} = this.state;
    const{reload} = this.props;
    API.delete('transferrecipient/'+recipientId).then(
      res => {
        console.log(res);
        const message = res.data.message;
        this.setState({ message: message })
        reload();
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
      deletePage,
     
    } = this.props;
    const {
      message,
      listRecipients,
      recipientId,
    } = this.state;

    if(!deletePage){
      return null;
    }
  
    return (
      <div>
            <select
              name="recipientId"
              onChange={this.handleChange}
              placeholder="Select recipient"
              value={recipientId}
            >
              <option value="">Select recipient</option>
              {listRecipients.length>=1?
                listRecipients.map(recipients => (
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
