import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
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
      // do something meaningful, Promises, if/else, whatever, and then
      window.location.assign(
        'http://localhost:5001/auth?response_type=code&client_id=noqoo&code_challenge=MI7VPzD7S8WsO__e1weLFQ6A8vv_kSfTq9uWNhoWQ3s&code_challenge_method=S256&redirect_url=http://localhost:5003'
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
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <PrivateRoute path='/admin' component={Admin} />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
