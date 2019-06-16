import React, { Component } from 'react';

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  login() {
    this.props.auth.login();
  }

  render() {
    return (
        <button onClick={this.login}>
        	Log In
        </button>
    );
  }
}
