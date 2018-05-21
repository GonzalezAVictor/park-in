import React from 'react';

export default class ReservationConfirmModal extends React.Component {

  render() {
    return (
      <div className="reservation-confirm-modal">
        <h3>Estacionamiento</h3>
        <h3>Santa Anita</h3>
        <div className="address">Calle 62 238 Mérida Centro 92345</div>
        <img src="asda" alt="asds"/>
        <div className="qr-string">lksdmvk233</div>
        <div className="date-info">
          <h5>Reservación</h5>
          <div>Jueves 15 Mayo 5:00 pm</div>
        </div>
          <div className="icons-container">
            <i class="fas fa-shield-alt"></i>
            <i class="fas fa-home"></i>
            <i class="far fa-clock disabled"></i>
            <i class="fas fa-car disabled"></i>
          </div>
      </div>
    );
  }
}
