import React from 'react';
import firebase from 'firebase';

//Style
require('./ActivePartnerReservationsCard.scss');

export default class ActivePartnerReservationsCard extends React.Component {

  onCheckOut = () => {
    const {itemRef} = this.props;
    const user = "ow";

    let updates = {};
    updates['/active'] = false;
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
      <div className="card mr-3 ml-3 active-card">
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
              <span className="badge badge-primary"><label>Activo</label></span>
            </div>
          </div>

          <div className="col-4 card-column ml-4">
            <button type="button" className="btn btn-primary btn-sm" onClick={this.onCheckOut}>check-out</button>
          </div>
        </div>
      </div>
    );
  }
}