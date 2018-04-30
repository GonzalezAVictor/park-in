import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './app/home/Home';
import PartnerReservations from './app/partnerReservations/PartnerReservations';
import UserReservations from './app/userReservations/UserReservations';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/partner/reservations" component={PartnerReservations} />
          <Route exact path="/user/reservations" component={UserReservations} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
