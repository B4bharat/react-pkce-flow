import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import crypto from 'crypto-browserify';

import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Callback from './pages/Callback';
import Admin from './pages/Admin';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { AuthContext } from './context/auth';

import './App.css';

function App(props) {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      // Generate code verifier
      function base64URLEncode(str) {
        return str
          .toString('base64')
          .replace(/\+/g, '-')
          .replace(/\//g, '_')
          .replace(/=/g, '');
      }
      let verifier = base64URLEncode(crypto.randomBytes(32));
      localStorage.setItem('verifier', verifier);

      // Generate code challenge
      function sha256(buffer) {
        return crypto.createHash('sha256').update(buffer).digest();
      }
      let challenge = base64URLEncode(sha256(verifier));
      localStorage.setItem('code_challenge', challenge);

      // Generate state
      function generateState(length) {
        let result = '';
        let characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      let state = generateState(6);
      localStorage.setItem('state', state);

      window.location.assign(
        `http://localhost:5001/auth?client_id=noqoo&redirect_url=http://localhost:5003/callback&response_type=code&state=${state}&code_challenge=${challenge}&code_challenge_method=S256&`
      );
    }
  });

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    //Now any component using our AuthContext can get tokens and set the tokens
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <div className='navigation-bar'>
          <ul>
            <li>
              <Link to='/'>Organisations</Link>
            </li>
            <li>
              <Link to='/admin'>Branches</Link>
            </li>
            <li>
              <button onClick={() => setClicked(true)}>Login</button>
            </li>
          </ul>
          <Route exact path='/' component={Home} />
          <Route path='/callback' component={Callback} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path='/admin' component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
