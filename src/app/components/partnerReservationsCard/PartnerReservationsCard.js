import React from 'react';
import firebase from 'firebase';

//Style
require('./PartnerReservationsCard.scss');

export default class PartnerReservationsCard extends React.Component {

  onCheckIn = () => {
    const {itemRef} = this.props;
    const user = "ow";

    let updates = {};
    updates['/active'] = true;

    const reservationRef = firebase.database().ref(`users/owners/${user}/history/${itemRef}`);
    reservationRef.update(updates);

    reservationRef.on('value', snapshot => {
      const {code, email} = snapshot.val()
      const userRef = email.split('@')[0]

      firebase.database().ref(`users/borrowers/${userRef}/history/${code}`).update({'/active': true})
    })
  }

  onCancel = () => {
    const {itemRef} = this.props;
    const user = "ow";

    let updates = {};
    updates['/finalized'] = true;

    const reservationRef = firebase.database().ref(`users/owners/${user}/history/${itemRef}`);
    reservationRef.update(updates);

    reservationRef.on('value', snapshot => {
      const {code, email} = snapshot.val()
      const userRef = email.split('@')[0]

      firebase.database().ref(`users/borrowers/${userRef}/history/${code}`).update({'/finalized': true, '/active': false})
    })
  }

  render() {
    return (
      <div className="card mr-3 ml-3 non-active-card">
        <div className="card-body">
          <div id="coupon-column" className="col-2 card-column">
            <img id="coupon-icon" src={require('../../assets/coupon.png')} alt=""/>
          </div>

          <div className="col-5 card-column">
            <div className="row">
              <label id="reservation-name">{this.props.name}</label>
            </div>
            <div className="row">
              <label id="reservation-code">{this.props.code}</label>
            </div>
            <div className="row">
              <span id="badge-entrance-hour" className="badge badge-primary"><label>{this.props.entranceHour}</label></span>
              <span id="badge-date" className="badge badge-primary"><label>{this.props.date}</label></span>
            </div>
          </div>

          <div className="col-4 card-column ml-4">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={this.onCheckIn}>check-in</button>
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={this.onCancel}>cancelar</button>
          </div>
        </div>
      </div>
    );
  }
}