import React from 'react';
import {Link} from 'react-router-dom';

export default class FooterNavbar extends React.Component {

  render() {
    return (
      <div className="reservation-confirm-footer">
        <Link to="/user/reservations">
          <i className="far fa-ticket-alt"></i>
        </Link>
        
        <Link to="/user/search">
          <i className="fas fa-car"></i>
        </Link>
        
        <i className="fas fa-sliders-h"></i>
      </div>
    );
  }
}
