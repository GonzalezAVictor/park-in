import React from 'react';

//Style
require('./UserReservationsCard.scss');

export default class UserReservationsCard extends React.Component {
  render() {
    return (
      <div class="card mr-3 ml-3 non-active-card">
        <div class="card-body">
          <div id="coupon-column" class="col-2 card-column">
            <img id="coupon-icon" src={require('../../assets/coupon.png')} />
          </div>

          <div class="col-10 card-column">
            <div class="row">
              <label id="reservation-place">{this.props.place}</label>
            </div>
            <div class="row">
              <label id="reservation-address">{this.props.address}</label>
            </div>
            <div class="row">
              <span id="badge-entrance-hour" class="badge badge-primary"><label>{this.props.entranceHour}</label></span>
              <span id="badge-date" class="badge badge-primary"><label>{this.props.date}</label></span>

              <span id="badge-price" class="badge badge-primary ml-5"><label>{this.props.price}</label></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}