import React from 'react';
import './../userLogin/UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class UserRegister extends React.Component {

  render() {
    return (
      <div className="user-login">
        <h1>parkin</h1>
        <LoginForm register />
      </div>
    );
  }
}
