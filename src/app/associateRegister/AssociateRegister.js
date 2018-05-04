import React from 'react';
import firebase from 'firebase';
import './../userLogin/UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class AssociateRegister extends React.Component {

  registerNewAssociate = ( userName, email, password ) => {
    const userRef = email.split('@')[0]

    firebase.database().ref(`users/borrowers/${userRef}`).set( {
      userName,
      email,
      password
    } );
  }

  render() {
    return (
      <div className="associate-login">
        <h1>parkin <span>socio</span></h1>
        <LoginForm register send={this.registerNewAssociate} />
      </div>
    );
  }
}
