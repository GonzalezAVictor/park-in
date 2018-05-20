import React from 'react';
import FooterNavbar from './FooterNavbar';
import ReservationConfirmModal from './ReservationConfirmModal';
import './ReservationConfirm.scss';

export default class ReservationConfirm extends React.Component {

  render() {
    return (
      <div className="reservation-confirm-view">
        <div className="reservation-confirm-content">
          <span>Listo, <br/>Tu lugar ha sido reservado</span>
          <ReservationConfirmModal />
        </div>
        <FooterNavbar />
      </div>
    );
  }
}
