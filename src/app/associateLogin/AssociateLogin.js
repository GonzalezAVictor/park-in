import React from 'react';
import './AssociateLogin.scss';
import LoginForm from './../components/loginForm/LoginForm';

export default class AssociateLogin extends React.Component {

  render() {
    return (
      <div className="associate-login">
        <h1>parkin</h1>
        <span className="welcome">Bienvenido,</span>
        <span className="welcome-quote">
          Nosotoros nos encargamos de tu
          estacionamiento.
        </span>
        <LoginForm />
      </div>
    );
  }
}
