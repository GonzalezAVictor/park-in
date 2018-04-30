import React from 'react';

//Style
require('./ActivePartnerReservationsCard.scss');

export default class ActivePartnerReservationsCard extends React.Component {
  render() {
    return (
      <div class="card mr-3 ml-3 active-card">
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
              <span class="badge badge-primary"><label>Activo</label></span>
            </div>
          </div>

          <div class="col-4 card-column ml-4">
            <button type="button" class="btn btn-primary btn-sm">check-out</button>
          </div>
        </div>
      </div>
    );
  }
}