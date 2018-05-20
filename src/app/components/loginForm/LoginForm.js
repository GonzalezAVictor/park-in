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
    const {user,password} = this.state;
    const {register, send} = this.props;

    e.preventDefault();
    
    if( register )
      send(user, e.target.email.value, password);
    else
      send(user, password)

    console.log('handleSubmit');
  }

  handleUserChange = (e) => {
    this.setState({ user: e.target.value });
  }

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    let { register } = this.props;
    return (
      <div className="login-form">
        <form  onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="user"
            placeholder="usuario"
            onChange={this.handleUserChange}
          />
          {
            register ? <input
            type="text"
            name="email"
            placeholder="correo"
            onChange={this.handlePasswordChange}
          /> : null
          }
          <input
            type="password"
            name="password"
            placeholder="contraseña"
            onChange={this.handlePasswordChange}
          />
          <input
            className="submit-btn"
            type="submit"
            value={register ? "Registrar" : "Iniciar"}
          />
        </form>
      </div>
    );
  }
}
