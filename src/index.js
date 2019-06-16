import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom';
import './index.css';
import IndexPage from './Application';
import Callback from './components/callback';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv';
import Auth from './Auth/Auth';
import history from './history';

dotenv.config();

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


ReactDOM.render(
<Router history={history}>
<Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props}/>
          }}/>
<Route path="/" render={ (props) => <IndexPage auth={auth} {...props} />} />
</Router>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
