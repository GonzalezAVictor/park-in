import React from 'react';

//Components
import ActivePartnerReservationsCard from '../components/activePartnerReservationsCard/ActivePartnerReservationsCard';
import PartnerReservationsCard from '../components/partnerReservationsCard/PartnerReservationsCard';

//Style
require('./PartnerReservations.scss');

export default class PartnerReservations extends React.Component {

  render() {
    let reservationsNumber = 3;

    return (
      <div className="partner-reservations">
        <label id="reservations-main-text" class="mt-5">Tus reservaciones <label id="reservations-number">({reservationsNumber})</label></label>

        <div id="active-cards-section">
          <ActivePartnerReservationsCard name="Alicia" code="G4DFONDY484" />
        </div>
        
        <div id="non-active-cards-section">
          <PartnerReservationsCard name="Pepe" code="USDG6SAI7D" entranceHour="5:00pm" date="15 Mayo" />
          <PartnerReservationsCard name="Juanito" code="DSIBFAI7D" entranceHour="5:00pm" date="15 Mayo" />
        </div>
      </div>
    );
  }
}