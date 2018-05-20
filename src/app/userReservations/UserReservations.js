import React from 'react';
import Modal from 'bootstrap';

//Components
import UserReservationsCard from '../components/userReservationsCard/UserReservationsCard';

//Style
require('./UserReservations.scss');

export default class UserReservations extends React.Component {

  render() {
    let reservationsNumber = 2;

    return (
      <div className="user-reservations">
        <label id="reservations-main-text" class="mt-5">Tus reservaciones <label id="reservations-number">({reservationsNumber})</label></label>
        
        <div id="cards-section">
          <UserReservationsCard place="Estacionamiento Santa Anita" address="Calle 63 #238 Mérida Centro 09300" entranceHour="5:00pm" date="15 Mayo" price="$25/hr" />
          <UserReservationsCard place="Estacionamiento San Ramon" address="Calle 63 #238 Mérida Centro 09300" entranceHour="5:00pm" date="15 Mayo" price="$35/hr" />
        </div>
      </div>
    );
  }
}