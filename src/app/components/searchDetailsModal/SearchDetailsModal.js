import React from 'react';

//Style
require('./SearchDetailsModal.scss');

export default class SearchDetailsModal extends React.Component {
  render() {
    let shieldOption = false;
    let houseOption = false;
    let clockOption = false;
    let carOption = false;

    return (
        <div class="modal fade" id="myModal">
          <div class="modal-dialog">
            <div class="modal-content">

              <div class="modal-header">
                <div class="col-3 first-row-details align-self-center">
                  <label id="search-details-price">${this.props.price}</label>
                </div>
                <div class="col first-row-details">
                  <div class="row">
                    <label id="search-details-place">{this.props.place}</label>
                  </div>
                  <div class="row">
                    <label id="search-details-address">{this.props.address}</label>
                  </div>
                </div>
              </div>

              <div class="modal-body">
                <div id="col-schedule" class="col-5 second-row-details">
                  <div class="row">
                    <label class="second-row-title">Horario</label>
                  </div>
                  <div class="row">
                    <label class="second-row-info">{this.props.startHour} - {this.props.finishHour}</label>
                  </div>
                </div>
                <div id="col-available" class="col-4 second-row-details">
                  <div class="row">
                    <label class="second-row-title">Disponibles</label>
                  </div>
                  <div class="row">
                    <label class="second-row-info">{this.props.spotsNumber} lugares</label>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <div class="row justify-content-center third-row-benefits">
                  <a href="#"><img class="icon-enable" id="shield-icon" src={require('../../assets/shield.png')} /></a>
                  <a href="#"><img class="icon-disable" id="shield-icon" src={require('../../assets/shield.png')} /></a>
                  <a href="#"><img class="icon-enable" id="house-icon" src={require('../../assets/house.png')} /></a>
                  <a href="#"><img class="icon-disable" id="house-icon" src={require('../../assets/house.png')} /></a>
                  <a href="#"><img class="icon-enable" id="clock-icon" src={require('../../assets/clock.png')} /></a>
                  <a href="#"><img class="icon-disable" id="clock-icon" src={require('../../assets/clock.png')} /></a>
                  <a href="#"><img class="icon-enable" id="car-icon" src={require('../../assets/car.png')} /></a>
                  <a href="#"><img class="icon-disable" id="car-icon" src={require('../../assets/car.png')} /></a>
                </div>
                <div class="row justify-content-center">
                  <button type="button" class="btn btn-primary btn-block">Reservar</button>
                </div>
              </div>

            </div>
          </div>
        </div>
    );
  }
}