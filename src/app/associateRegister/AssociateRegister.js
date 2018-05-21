import React from 'react';
import firebase from 'firebase';
import './../userLogin/UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class AssociateRegister extends React.Component {

  registerNewAssociate = ( userName, email, password ) => {

    firebase.database().ref(`users/owners/${userName}`).set( {
      userName,
      email,
      password
    } );

    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", userName);
    localStorage.setItem("userType", "partner");

    this.props.history.push('/associate/parklot/register');
  }

  render() {
    return (
      <div className="associate-login">
        <h1>parkin <span>socio</span></h1>
        <LoginForm register send={this.registerNewAssociate} cityBlack />
      </div>
    );
  }
}
