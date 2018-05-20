import React from 'react';
import firebase from 'firebase';

//Components
import UserReservationsCard from '../components/userReservationsCard/UserReservationsCard';

//Style
require('./UserReservations.scss');

export default class UserReservations extends React.Component {

  constructor( props ) {
    super( props );

    this.state = {
      reservations: []
    }
  }

  componentWillMount = () => {
    const user = "Mobile";
    const isLogin = true;

    if (isLogin) {
      firebase.database().ref(`users/borrowers/${user}/history`).once('value')
        .then( snapshot => {
          const response = snapshot.val();
          const reservations = [];
          
          if (response) {
            response.map(item => item !==null ? reservations.push(item) : ()=>{}  )
            this.setState({reservations});
          } else {
            this.setState({reservations: []});
          }
        } )
    } else {
      // REDIRECT TO LOGIN
      
    }
    
  }

  getReservations = () => {
    const {reservations} = this.state
    const reservationsCard = []

    reservations.map( reservation => 
      reservationsCard.push((
        <UserReservationsCard 
          key={reservation.id}
          place={reservation.place}
          address={reservation.address}
          entranceHour={`${reservation.entranceHour}pm`}
          date={reservation.date}
          price={`$${reservation.price}/hr`}
        />
      )));
    
    return reservationsCard
  }

  render() {
    const {reservations} = this.state;
    let reservationsNumber = reservations.length;
    const reservationsCards = this.getReservations()

    return (
      <div className="user-reservations">
        <label id="reservations-main-text" className="mt-5">Tus reservaciones <label id="reservations-number">({reservationsNumber})</label></label>
        
        <div id="cards-section">
          {reservationsCards}
        </div>
      </div>
    );
  }
}