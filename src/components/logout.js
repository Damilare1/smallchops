import React, { Component } from "react";

export default class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    return <button onClick={this.logout}>Log Out</button>;
  }
}
