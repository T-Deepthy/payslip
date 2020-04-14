import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Navigation extends Component {
  render() {
    return (
      <div className="container-fluid mainframe-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link className="nav-link" to="/salary-components">Salary Component</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/designations">Designation</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/employees">Employee</Link>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;