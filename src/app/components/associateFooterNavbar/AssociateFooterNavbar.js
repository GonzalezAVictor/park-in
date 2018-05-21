import React from 'react';
import {Link} from 'react-router-dom';

require('./AssociateFooterNavbar.scss');

export default class AssociateFooterNavbar extends React.Component {

  render() {
    return (
      <div className="reservation-confirm-footer">
        <Link to="/partner/reservations">
          <i className="far fa-ticket-alt"></i>
        </Link>
        
        <Link to="/associate/parklot/register">
          <i className="fas fa-car"></i>
        </Link>
        
        <i className="fas fa-sliders-h"></i>
      </div>
    );
  }
}
