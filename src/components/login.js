import React, { Component } from "react";
import './style.css';

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
      <div>
        <nav>
          <ul>
            <li>SmallChops.</li>
          </ul>
        </nav>
        <div id="first">
          <h1>
            <b>Welcome, Click here to Login</b>
          </h1>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}
