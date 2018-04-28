import React from 'react';
import './LoginForm.scss';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
  }

  handleUserChange = (e) => {
    this.setState({ user: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="login-form">
        <form  onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="usuario"
            onChange={this.handleUserChange}
          />
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            onChange={this.handlePasswordChange}
          />
          <input className="submit-btn" type="submit" value="Iniciar" />
        </form>
      </div>
    );
  }
}
