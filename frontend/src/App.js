import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setToken={setToken} />
        </Route>
        <Route path="/register" component={Register} />
        <Route path="/dashboard">
          {token ? <Dashboard token={token} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
