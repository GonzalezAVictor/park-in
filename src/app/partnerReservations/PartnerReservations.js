import React from 'react';
import firebase from 'firebase'

//Components
import ActivePartnerReservationsCard from '../components/activePartnerReservationsCard/ActivePartnerReservationsCard';
import PartnerReservationsCard from '../components/partnerReservationsCard/PartnerReservationsCard';

//Style
require('./PartnerReservations.scss');

export default class PartnerReservations extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reservationsActive: [],
      reservations: []
    }

    const user = "ow"
    const historyRef = firebase.database().ref(`users/owners/${user}/history`)

    historyRef.on('child_changed', data => {
      console.log(data);
      this.loadData(user)
    })
  }

  componentWillMount = () => {
    const user = "ow";
    const isLogin = true;
    const userType = "partner"

    if (isLogin && userType === "partner") {
      this.loadData(user)
    } else {
      // REDIRECT TO LOGIN
    }
  }

  getActiveReservations = () => {
    const {reservationsActive} = this.state;
    const reservationsCard = [];

    reservationsActive.map( reservation =>
      reservationsCard.push((
        <ActivePartnerReservationsCard 
          key={reservation.code}
          name={reservation.user}
          code={reservation.code}
          itemRef={reservation.ref}
        />
      )));

    return reservationsCard;
  }

  getReservations = () => {
    const {reservations} = this.state
    const reservationsCard = [];

    reservations.map( reservation =>
      reservationsCard.push((
        <PartnerReservationsCard 
          key={reservation.code}
          name={reservation.user}
          code={reservation.code}
          entranceHour={reservation.entranceHour}
          date={reservation.date}
          itemRef={reservation.ref}
        />
      )));

    return reservationsCard;
  }

  loadData = (user) => {
    firebase.database().ref(`users/owners/${user}/history`).once('value')
    .then( snapshot => {
      const response = snapshot.val();
      const reservationsActive = [];
      const reservations = [];

      if (response) {
        response.map((item, index) => {
          item['ref'] = index;

          if (!item.finalized && item.active) {
            reservationsActive.push(item)
          } else if(!item.finalized) {
            reservations.push(item)
          }

          this.setState({reservationsActive, reservations})
        })
      }
      
    } )
  }

  render() {
    const activeReservations = this.getActiveReservations();
    const reservations = this.getReservations();
    let reservationsNumber = activeReservations.length + reservations.length;

    return (
      <div className="partner-reservations">
        <label id="reservations-main-text" className="mt-5">Tus reservaciones <label id="reservations-number">({reservationsNumber})</label></label>

        <div id="active-cards-section">
          {activeReservations}
        </div>
        
        <div id="non-active-cards-section">
          {reservations}
        </div>
      </div>
    );
  }
}