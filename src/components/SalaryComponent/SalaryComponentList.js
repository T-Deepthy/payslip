import React, { Component } from "react";
import { getSalaryComponents, deleteSalaryComponent } from "../../actions/salaryComponent";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Button } from "react-bootstrap"
import SalaryComponentForm from "./SalaryComponentForm"

const initialState = {
  _id: '',
  name: '',
  status: false,
}
class SalaryComponentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSalaryComponentForm: false,
      currentSalaryComponent: initialState
    };
    this.showForm = this.toggleSalaryComponentForm.bind(this, true);
    this.hideForm = this.toggleSalaryComponentForm.bind(this, false);
  }
  componentDidMount() {
    this.props.getSalaryComponents();
  }

  setCurrentSalaryComponent = (currentSalaryComponent) => {
    this.setState({ currentSalaryComponent }, () => {
      this.showForm();
    })
  }

  deleteSalaryComponent = (component) => {
    this.props.deleteSalaryComponent(component);
  }

  showValues() {
    return this.props.salaryComponents.data.map((item, index) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>
          <input type="checkbox" disabled defaultChecked={item.status} />
        </td>
        <td>
          <Button className="mr-2" onClick={this.setCurrentSalaryComponent.bind(this, item)}>Edit</Button>
          <Button
            variant="danger"
            onClick={this.props.deleteSalaryComponent.bind(this, item)}>Delete</Button>
        </td>
      </tr>
    ));
  }

  toggleSalaryComponentForm = (show) => {
    this.setState({
      showSalaryComponentForm: show
    })
  }

  render() {
    if (this.props.salaryComponents.loading) {
      return (
        <Spin />
      );
    } else {
      return (
        <div>
          <Button className="mb-2" variant="success"
            onClick={this.setCurrentSalaryComponent.bind(this, initialState)}>Add</Button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.showValues()}
            </tbody>
            <SalaryComponentForm show={this.state.showSalaryComponentForm}
              onHide={this.hideForm} salaryComponent={this.state.currentSalaryComponent} />
          </table>
        </div>)
    };
  }
}

const mapStateToProps = (store) => {
  return {
    salaryComponents: store.salaryComponents,
  };
};

export default connect(
  mapStateToProps, {
  getSalaryComponents,
  deleteSalaryComponent,
}
)(SalaryComponentList);