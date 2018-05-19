import React from 'react';
import './../userLogin/UserLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class AssociateRegister extends React.Component {

  render() {
    return (
      <div className="associate-login">
        <h1>parkin <span>socio</span></h1>
        <LoginForm register />
      </div>
    );
  }
}
