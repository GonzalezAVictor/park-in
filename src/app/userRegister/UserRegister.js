import React from 'react';
import firebase from 'firebase';
import './../userLogin/UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class UserRegister extends React.Component {

  registerNewUser = (userName, email, password) => {
  
    firebase.database().ref(`users/borrowers/${userName}`).set( {
      userName,
      email,
      password
    } );
  }

  render() {
    return (
      <div className="user-login">
        <h1>parkin</h1>
        <LoginForm register send={this.registerNewUser} />
      </div>
    );
  }
}
