import React, { Component } from "react";
import { getEmployees, deleteEmployee } from "../../actions/employee";
import { getDesignations } from "../../actions/designation";

import { connect } from "react-redux";
import { Spin } from "antd";
import { Button } from "react-bootstrap"
import EmployeeForm from "./EmployeeForm";
const initialState = {
  _id: '',
  empNo: '',
  address: '',
  designation: '',
  CTC: '',
}
class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEmployeeForm: false,
      currentEmployee: initialState
    };
    this.showForm = this.toggleEmployeeForm.bind(this, true);
    this.hideForm = this.toggleEmployeeForm.bind(this, false);
  }
  componentDidMount() {
    this.props.getDesignations();
    this.props.getEmployees();
  }

  toggleEmployeeForm = (show) => {
    this.setState({
      showEmployeeForm: show
    })
  }

  setCurrentEmployee = (currentEmployee) => {
    this.setState({ currentEmployee }, () => {
      this.showForm();
    })
  }

  deleteEmployee = (employee) => {
    this.props.deleteEmployee(employee);
  }

  showValues() {
    return this.props.employees.data.map((item, index) => (
      <tr key={item._id}>
        <td>{item.empNo}</td>
        <td>{item.address}</td>
        <td>{item.designation.name}</td>
        <td>{item.CTC}</td>
        <td>
          <Button
            className="mr-2" 
            onClick={this.setCurrentEmployee.bind(this, item)}
          >Edit</Button>
          <Button
            variant="danger" className="mr-2 pull-right"
            onClick={this.props.deleteEmployee.bind(this, item)}
          >Delete</Button>
          <Button className="float-right" variant="secondary" >Generate PDF</Button>
        </td>
      </tr>
    ));
  }

  render() {
    if (this.props.employees.loading) {
      return (
        <Spin />
      );
    } else {
      return (
        <div>
          <Button variant="success" className="mb-2"
            onClick={this.setCurrentEmployee.bind(this, initialState)}>Add</Button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Employee No</th>
                <th scope="col">Address</th>
                <th scope="col">Designation</th>
                <th scope="col">CTC</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.showValues()}
            </tbody>
            <EmployeeForm show={this.state.showEmployeeForm}
              onHide={this.hideForm} employee={this.state.currentEmployee} />
          </table>
        </div>)
    };
  }
}

const mapStateToProps = (store) => {
  return {
    employees: store.employees,
    designations: store.designations,

  };
};

export default connect(
  mapStateToProps, {
  getDesignations,
  getEmployees,
  deleteEmployee,
}
)(EmployeeList);