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

    const user = "Mobile";
    const reservationsRef = firebase.database().ref(`users/borrowers/${user}/history`);

    reservationsRef.on('child_changed', data => {
      console.log(data);
      this.loadData(user);
    })
  }

  componentWillMount = () => {
    const user = "Mobile";
    const isLogin = true;

    if (isLogin) {
      this.loadData(user)
    } else {
      // REDIRECT TO LOGIN
      
    }
    
  }

  getReservations = () => {
    const {reservations} = this.state;
    const reservationsCard = [];

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
    
    return reservationsCard;
  }

  loadData = (user) => {
    firebase.database().ref(`users/borrowers/${user}/history`).once('value')
      .then( snapshot => {
        const response = snapshot.val();
        const reservations = [];
        console.log(response);
        
        if (response) {
          for (var key in response) {
            if (response.hasOwnProperty(key)) {
                response[key]['finalized'] ? () => {} : reservations.push( response[key] )
            }
          }
          
          this.setState({reservations});
        } else {
          this.setState({reservations: []});
        }
      } )
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