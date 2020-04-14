import React, { Component } from "react";
import { Route, Switch } from "react-router";
import MainFrame from "./containers/MainFrame/MainFrame";
import { withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import Navigation from "./components/Navigation/Navigation";
import SalaryComponentList from "./components/SalaryComponent/SalaryComponentList";
import DesignationList from "./components/Designation/DesignationList";
import EmployeeList from "./components/Employee/EmployeeList";

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Switch>
          <Route path="/" render={() => <MainFrame />} exact/>
          <Route path="/salary-components" render={() => <SalaryComponentList />} exact/>
          <Route path="/designations" render={() => <DesignationList />} exact/>
          <Route path="/employees" render={() => <EmployeeList />} exact/>


        </Switch>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
