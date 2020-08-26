import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Security, LoginCallback, SecureRoute} from '@okta/okta-react';
import './App.css';
import Home from './pages/Home';
import {CLIENT_CODE, CALLBACK_PATH, OKTA_DOMAIN, HOST_DOMAIN} from './config';
import Profile from './pages/Profile';

const config = {
  clientId: CLIENT_CODE,
  issuer: `https://${OKTA_DOMAIN}/oauth2/default`,
  redirectUri: HOST_DOMAIN + CALLBACK_PATH,
  scopes: ['openid', 'profile', 'email'],
  pkce: true,
};

function App() {
  return (
    <div className="App">
      <Router>
        <Security {...config}>
          <Switch>
            <SecureRoute path="/profile" component={Profile} />
            <Route path={CALLBACK_PATH} component={LoginCallback} />
            <Route path="/" component={Home} />
          </Switch>
        </Security>
      </Router>
    </div>
  );
}

export default App;
