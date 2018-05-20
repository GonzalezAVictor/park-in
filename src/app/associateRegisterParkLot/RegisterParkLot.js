import React from 'react';
import './RegisterParkLot.scss';

export default class RegisterParkLot extends React.Component {

  render() {
    return (
      <div className="register-park-lot">
        <div className="lugares-registrados">Tus lugares registrados</div>
        <div className="park-lot-info-container">
          <h3>Estacionamiento <br/> Santa Anita <br/>
          <span className="address">Calle 62 #238 Mérida Centro</span></h3>
          
          <div className="pl-registered">
            - 8 +
          </div>
          <div className="schedule">
            <h5>Horario</h5>
            9am - 12pm
          </div>
          <div className="amenidades">
            Amenidades de tu <br/>
            establecimiento
            <div className="icons-container">
              <i class="fas fa-shield-alt"></i>
              <i class="fas fa-home"></i>
              <i class="far fa-clock disabled"></i>
              <i class="fas fa-car disabled"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
