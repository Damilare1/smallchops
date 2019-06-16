import React, { Component } from 'react';
import Login from './components/login';
import App from './App';

class Home extends Component {
  
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <App logout={this.props.auth.logout}/>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                
               <Login auth={this.props.auth}/>
                
              </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
