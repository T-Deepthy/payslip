import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
       <p>welcome!</p>
    );
  }
}

export default withRouter(Home);
