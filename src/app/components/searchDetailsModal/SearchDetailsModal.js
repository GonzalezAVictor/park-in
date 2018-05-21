import React from 'react';
import firebase from 'firebase';

//Style
require('./SearchDetailsModal.scss');

export default class SearchDetailsModal extends React.Component {

  onReserve = () => {
    const user = "Mobile";
    const {email, ownerRef, place, address, price, owner} = this.props;
    console.log(this.props);
    
    ownerRef.once('value')
      .then( snapshot => {
        let reservations = snapshot.val();
        const code = `C0D3${Math.floor((Math.random() * 1000) + 1)}`;
        reservations[code] = {
          'active': false,
          'address': address,
          'place': place,
          'id': code,
          'date': '15-May',
          'entranceHour': '14:00',
          'price': price,
          'finalized': false
        };
        
        ownerRef.set(reservations);

        const borrowerRef = firebase.database().ref(`users/owners/${owner}/history`)
        borrowerRef.once('value')
        .then( snapshot => {
          console.log(snapshot.val());
          
          let reservations = snapshot.val();
          reservations.push( {
            'active': false,
            'code': code,
            'date': '15-May',
            'email': email,
            'entranceHour': '14:00',
            'finalized': false,
            'user': user
          } )

          borrowerRef.set(reservations)
        } )

      } );
    


  }

  render() {
    const {visible} = this.props;
    const display = visible ? {} : {display: 'none'};

    return (
        <div className="testeroni" style={display}>
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
              <a href="#"><img class="icon-enable" id="house-icon" src={require('../../assets/house.png')} /></a>
              <a href="#"><img class="icon-disable" id="clock-icon" src={require('../../assets/clock.png')} /></a>
              <a href="#"><img class="icon-enable" id="car-icon" src={require('../../assets/car.png')} /></a>
            </div>
            <div class="row justify-content-center">
              <button type="button" class="btn btn-primary btn-block" onClick={this.onReserve}>Reservar</button>
            </div>
          </div>
        </div>
    );
  }
}