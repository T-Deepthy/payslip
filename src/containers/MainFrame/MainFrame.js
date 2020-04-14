import React, { Component } from 'react';
import Home from '../../components/Home/Home';
import './Mainframe.css';
class MainFrame extends Component {
  render() {
    return ( 
        <div className="container-fluid mainframe-wrapper">
            <Home />
        </div>
    );
  }
}

export default MainFrame;