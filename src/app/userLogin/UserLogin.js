import React from 'react';
import firebase from 'firebase';
import './UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class UserLogin extends React.Component {

  login = ( userName, password ) => {
    firebase.database().ref(`users/borrowers/${userName}`).once('value')
      .then( snapshot => {
        const userInfo = snapshot.val()

        if ( userInfo ) {
          console.log('Se ha iniciado sesión :)');
        } else {
          console.log(`No se encontro al usuario ${userName} con las contraseña ${password}`);
        }

      } );
  }

  render() {
    return (
      <div className="user-login">
        <h1>parkin</h1>
        <span className="welcome">Bienvenido,</span>
        <span className="welcome-quote">
          Nosotoros nos encargamos de tu
          estacionamiento.
        </span>
        <LoginForm send={this.login} />
      </div>
    );
  }
}
