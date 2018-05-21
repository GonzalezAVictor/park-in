import React from 'react';
import firebase from 'firebase';
import './AssociateLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class AssociateLogin extends React.Component {

  login = ( userName, password ) => {
    firebase.database().ref(`users/owners/${userName}`).once('value')
      .then( snapshot => {
        const userInfo = snapshot.val()

        if ( userInfo ) {
          localStorage.setItem("isLogin", "true");
          localStorage.setItem("user", userName);
          localStorage.setItem("userType", "partner");

          this.props.history.push('/associate/parklot/register');
        } else {
          alert(`No se encontro al usuario ${userName} con las contraseña ${password}`);
        }

      } );
  }

  render() {
    return (
      <div className="associate-login">
        <h1>parkin <span>socio</span></h1>
        <span className="welcome">Bienvenido,</span>
        <span className="welcome-quote">
          Nosotoros nos encargamos de tu
          estacionamiento.
        </span>
        <LoginForm send={this.login} cityBlack />
      </div>
    );
  }
}
