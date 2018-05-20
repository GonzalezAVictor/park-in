import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './app/home/Home';
import AssociateLogin from './app/associateLogin/AssociateLogin';
import AssociateRegister from './app/associateRegister/AssociateRegister';
import UserLogin from './app/userLogin/UserLogin';
import UserRegister from './app/userRegister/UserRegister';
import ReservationConfirm from './app/reservationConfirm/ReservationConfirm';
import AssociateParkLotRegister from './app/associateRegisterParkLot/RegisterParkLot';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/associate/login" component={AssociateLogin} />
          <Route exact path="/associate/register" component={AssociateRegister} />
          <Route exact path="/associate/parklot/register" component={AssociateParkLotRegister} />
          <Route exact path="/user/login" component={UserLogin} />
          <Route exact path="/user/register" component={UserRegister} />
          <Route exact path="/reservation-confirm" component={ReservationConfirm} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
