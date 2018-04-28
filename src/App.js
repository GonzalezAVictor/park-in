import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './app/home/Home';
import AssociateLogin from './app/associateLogin/AssociateLogin';
import UserLogin from './app/userLogin/UserLogin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/associate/login" component={AssociateLogin} />
          <Route exact path="/user/login" component={UserLogin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
