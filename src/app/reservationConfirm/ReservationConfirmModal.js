import React from 'react';
import QRCode from 'qrcode.react';

export default class ReservationConfirmModal extends React.Component {

  render() {
    const {address, date, entranceHour, place} = this.props.reservation;

    return (
      <div className="reservation-confirm-modal">
        <h3>{place}</h3>
        <div className="address">{address}</div>
        <QRCode style={{display: 'block', margin: 'auto', marginTop: '10px', marginBottom: '10px'}} value={address} />
        <div className="date-info">
          <h5>Reservación</h5>
          <div>{`${date} ${entranceHour}`}</div>
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
