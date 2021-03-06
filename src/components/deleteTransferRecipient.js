import React, { Component } from "react";
import API from "../API/API";

export default class DeleteTransfer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "nuban",
      account_number: "",
      account_name: "",
      recipientId: "",
      listRecipients: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listRecipients: nextProps.listRecipients });
  }

  handleDelete() {
    const { recipientId } = this.state;
    const { reload } = this.props;
    API.delete("transferrecipient/" + recipientId).then(
      res => {
        const message = res.data.message;
        this.setState({ message: message });
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
    const { deletePage } = this.props;
    const { message, listRecipients, recipientId } = this.state;

    if (!deletePage) {
      return null;
    }

    return (
      <div>
        <h3>Delete transfer recipient</h3>
        <div className="row">
          <select
            name="recipientId"
            onChange={this.handleChange}
            placeholder="Select recipient"
            value={recipientId}
          >
            <option value="">Select recipient</option>
            {listRecipients.length >= 1
              ? listRecipients.map(recipients => (
                  <option key={recipients.name} value={recipients.id}>
                    {recipients.name}
                  </option>
                ))
              : " "}
          </select>
        </div>
        <button type="button" onClick={this.handleDelete}>
          Delete
        </button>

        <p>{message}</p>
      </div>
    );
  }
}
