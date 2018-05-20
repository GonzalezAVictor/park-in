import React from 'react';

//Style
require('./UserReservationsCard.scss');

export default class UserReservationsCard extends React.Component {
  render() {
    return (
      <div className="card mr-3 ml-3 non-active-card">
        <div className="card-body">
          <div id="coupon-column" className="col-2 card-column">
            <img id="coupon-icon" src={require('../../assets/coupon.png')} alt=""/>
          </div>

          <div className="col-10 card-column">
            <div className="row">
              <label id="reservation-place">{this.props.place}</label>
            </div>
            <div className="row">
              <label id="reservation-address">{this.props.address}</label>
            </div>
            <div className="row">
              <span id="badge-entrance-hour" className="badge badge-primary"><label>{this.props.entranceHour}</label></span>
              <span id="badge-date" className="badge badge-primary"><label>{this.props.date}</label></span>

              <span id="badge-price" className="badge badge-primary ml-5"><label>{this.props.price}</label></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}