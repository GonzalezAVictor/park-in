import React from 'react';

//Style
require('./PartnerReservationsCard.scss');

export default class PartnerReservationsCard extends React.Component {
  render() {
    return (
      <div class="card mr-3 ml-3 non-active-card">
        <div class="card-body">
          <div id="coupon-column" class="col-2 card-column">
            <img id="coupon-icon" src={require('../../assets/coupon.png')} />
          </div>

          <div class="col-5 card-column">
            <div class="row">
              <label id="reservation-name">{this.props.name}</label>
            </div>
            <div class="row">
              <label id="reservation-code">{this.props.code}</label>
            </div>
            <div class="row">
              <span id="badge-entrance-hour" class="badge badge-primary"><label>{this.props.entranceHour}</label></span>
              <span id="badge-date" class="badge badge-primary"><label>{this.props.date}</label></span>
            </div>
          </div>

          <div class="col-4 card-column ml-4">
            <button type="button" class="btn btn-outline-primary btn-sm">check-in</button>
            <button type="button" class="btn btn-outline-danger btn-sm">cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}