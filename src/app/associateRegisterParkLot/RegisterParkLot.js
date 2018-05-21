import React from 'react';
import firebase from 'firebase';
import './RegisterParkLot.scss';

export default class RegisterParkLot extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      place: '',
      address: '',
      spotsNumber: '',
      startHour: '',
      finishHour: ''
    }
  }

  componentWillMount = () => {
    this.loadData();
  }

  addSpot = () => {
    let {spotsNumber, place} = this.state;
    spotsNumber++;

    this.setState({spotsNumber}, () => {
      let updates = {}
      updates['/spotsNumber'] = spotsNumber;

      firebase.database().ref(`parking_lots/${place}`).update(updates);
    })
  }

  removeSpot = () => {
    let {spotsNumber, place} = this.state;
    spotsNumber--;

    this.setState({spotsNumber}, ()=>{
      let updates = {}
      updates['/spotsNumber'] = spotsNumber;

      firebase.database().ref(`parking_lots/${place}`).update(updates);
    })
  }

  loadData = () => {
    const user = localStorage.getItem("user");

    firebase.database().ref(`users/owners/${user}/lots`).once( 'value', snapshot => {
      const parkinLot = snapshot.val()[0]

      firebase.database().ref(`parking_lots/${parkinLot}`).once('value', snap => {
        console.log(snap.val());

        const {place, address, spotsNumber, startHour, finishHour} = snap.val();
        this.setState({place, address, spotsNumber, startHour, finishHour});
      })
    } )
  }

  render() {
    const {place, address, spotsNumber, startHour, finishHour} = this.state

    return (
      <div className="register-park-lot">
        <div className="lugares-registrados">Tus lugares registrados</div>
        <div className="park-lot-info-container">
          <h3>{place}<br/>
          <span className="address">{address}</span></h3>
          
          <div className="pl-registered">
            <i class="fas fa-minus" onClick={this.removeSpot}></i>
            <span>{spotsNumber}</span>
            <i class="fas fa-plus" onClick={this.addSpot}></i>
          </div>
          <div className="schedule">
            <h5>Horario</h5>
            {`${startHour} - ${finishHour}`}
          </div>
          <div className="amenidades">
            Amenidades de tu <br/>
            establecimiento
            <div className="icons-container">
              <i class="fas fa-shield-alt"></i>
              <i class="fas fa-home"></i>
              <i class="far fa-clock disabled"></i>
              <i class="fas fa-car disabled"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
