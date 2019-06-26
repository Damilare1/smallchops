import React, { Component } from "react";

export default class ListTransferRecipient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listRecipients: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ listRecipients: nextProps.listRecipients });
  }

  render() {
    const { list } = this.props;
    const { listRecipients } = this.state;

    if (!list) {
      return null;
    }

    return (
      <div>
        <h3>List of Transfer recipients</h3>
        <div className="table-responsive">
          <table className="table table-striped mg-b-0">
            <tr>
              <th>Name</th>
              <th>Bank</th>
              <th>Account Number</th>
            </tr>
            {listRecipients.map(customer => (
              <tr>
                <th>{customer.name}</th>
                <th>{customer.details.bank_name}</th>
                <th>{customer.details.account_number}</th>
              </tr>
            ))}
          </table>
        </div>
      </div>
    );
  }
}
