import React, { Component, Fragment } from "react";
import axios from "axios";

const axiosInstance =  axios.create({
  baseURL: "https://api.paystack.co/",
  timeout: 10000,
  headers: {
    Authorization: "Bearer sk_test_cf0616be6156226583bf8ad620f490ae5fa27e5d"
    //  'Content-Type': 'application/json'
  }
});

 const initialState = {
  source: "balance",
  amount: "",
  recipient: {
    id:"",
    name:""
  },
  row:[],
  listRecipients:[],
  elem:false,
  currency: "NGN",
  message: '',
  error:'',
  payConfirm: '',
  index:'',
  recipient_code:'',
  reload:false,
  warning: false,
};
export default class BulkTransfer extends Component {
  constructor(props) {
    super(props);
 
    this.state=initialState;
 

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    this.clearState = this.clearState.bind(this);
    this.transferFunds = this.transferFunds.bind(this);
    this.addRow = this.addRow.bind(this);
    this.removeRow = this.removeRow.bind(this);
    this.showWarning = this.showWarning.bind(this);
  }

  clearState(e){
    this.setState({
      row:[],
      amount:'',
      index:'',
      reload:!this.state.reload,
      warning:!this.state.warning,
    });
    
 }

 showWarning(){
   this.setState({warning:!this.state.warning});
 }


  transferFunds() {
    const {
      row,
      currency,
      source,
    } = this.state;
    console.log(row)
    axiosInstance
      .post("transfer/bulk", {
        currency:currency,
        source: source,
        transfers:row
      })
      .then(
        res => {
          console.log(res);
          const message = res.data.message;
          this.setState({ 
            message: message,
            error: "" });
          this.clearState();
          this.showWarning();
        },
        error => {
          console.log(error);
          this.setState({
            error:error.response.status,
            message: "",
          })
        }
      );
  }

 
  handleChangeList(event) {
    const {listRecipients} = this.props;
    const { value } = event.target;
    this.setState({ recipient: {
      recipient_code: listRecipients[value].recipient_code,
      name: listRecipients[value].name, 
    }, index: value});
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addRow(){
    let {row, amount, recipient, } = this.state
    let recipientObj = {
      amount: amount*100,
      recipient: recipient.recipient_code,
      name: recipient.name
     
    }
    row.push(recipientObj);
    this.setState({row: row, recipient:{}, elem: true,})
  }

  removeRow(){
    let {row,} = this.state
    row.pop();
    this.setState({row:row})
  }

componentWillReceiveProps(nextProps){
    this.loadProps(nextProps);
 }

 loadProps(props){
    this.setState({listRecipients: props.listRecipients});
 }

  render() {
    const { amount, row, elem, index, message, error, reload, warning,listRecipients, } = this.state;
    const { multipleTransfer} = this.props
    
    if(reload){
      this.clearState();
      console.log(row)
    }
    if(!multipleTransfer){
      return null;
    }
    return (
      <div>
     { warning?
     <div>
        <h3>Are sure you want to pay</h3>
        <ul>
        {row ? row.map(rows => (
          <li> {rows.amount / 100}      {rows.name}</li>
        )):""}
      </ul> 
      <button type="button" onClick={this.transferFunds}>Yes, I am</button>        <button type="button" onClick={this.clearState}>Cancel</button>

    </div>  
         :
        <div>
      <ul>
        {row ? row.map(rows => (
          <li> {rows.amount / 100}      {rows.name}</li>
        )):""}
      </ul>    

     <form>
              <input 
              placeholder = "amount"
              type = "number"
              required
              name = "amount"
              value = {amount}
              onChange = {this.handleChange}
              /> 
              <select
              placeholder = "recipient"
              type = "text"
              required
              name = "recipient"
              value = {index}
              onChange = {this.handleChangeList}
              >
                <option value="">Select recipient</option>
                {listRecipients.length>1?
                listRecipients.map((recipients, index) => (
                  <option value={index}>{recipients.name}</option>
                )
              ):" " }
              </select>
            
        
        <button type="button" onClick={this.addRow}>add</button>
        <button type="button" onClick={this.showWarning}>pay</button>
        {elem? 
        <div>
          <button type="button" onClick={this.clearState}>clear</button>        <button type="button" onClick={this.removeRow}>remove last</button>
        </div>:" "}
        <p>{message || error}</p>
      </form>
      </div>
      }
      </div>
    );
  }
}