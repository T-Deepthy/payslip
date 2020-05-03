import React, { Component } from "react";
import { getDesignations, deleteDesignation } from "../../actions/designation";
import { getSalaryComponents } from "../../actions/salaryComponent";

import { connect } from "react-redux";
import { Spin } from "antd";
import { Button, Modal } from "react-bootstrap"
import DesignationForm from "./DesignationForm";
const initialState = {
  _id: '',
  name: '',
  components: [
    {
      _id: '',
      percentageCTC: ''
    }
  ],
}
class DesignationList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      showDesignationForm: false,
      isDeleteModalOpen: false,
      currentDesignation: initialState
    };
    this.showForm = this.toggleDesignationForm.bind(this, true);
    this.hideForm = this.toggleDesignationForm.bind(this, false);
  }
  componentDidMount() {
    this.props.getSalaryComponents();
    this.props.getDesignations();
  }

  setCurrentDesignation = (currentDesignation) => {
    this.setState({ currentDesignation }, () => {
      this.showForm();
    })
  }

  deleteDesignation = () => {
    const {currentDesignation} = this.state;
    this.props.deleteDesignation(currentDesignation);
    this.closeDeleteDialog();
  }

  openDeleteDialog = (currentDesignation) => {
    this.setState({
      currentDesignation,
      isDeleteModalOpen: true
    })
  }

  closeDeleteDialog = () => {
    this.setState({isDeleteModalOpen: false});
  }

  showValues() {

    return this.props.designations.data.map((item, index) => (
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.components.map(comp => (
          <div key={comp._id}>
            <b>{comp.name}: </b><small>{comp.percentageCTC}%</small>
          </div>
        ))}
        </td>
        <td>
          <Button
            className="mr-2"
            onClick={this.setCurrentDesignation.bind(this, item)}
          >Edit</Button>
          <Button
            variant="danger"
            onClick={() => this.openDeleteDialog(item)}
          >Delete</Button>
        </td>
      </tr>
    ));
  }

  toggleDesignationForm = (show) => {
    this.setState({
      showDesignationForm: show
    })
  }

  render() {
    if (this.props.designations.loading) {
      return (
        <Spin />
      );
    } else {
      const {isDeleteModalOpen} = this.state;
      return (
        <div>
          <Button className="mb-2" variant="success"
            onClick={this.setCurrentDesignation.bind(this, initialState)}>Add</Button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Salary Components</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.showValues()}
            </tbody>
            <DesignationForm show={this.state.showDesignationForm}
              onHide={this.hideForm} designation={this.state.currentDesignation} />
          </table>
          <Modal show={isDeleteModalOpen} size="md">
            <Modal.Header>
              <Modal.Title>
                Delete Designation
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.deleteDesignation()}>Delete</Button>
              <Button onClick={() => this.closeDeleteDialog()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>)
    };
  }
}

const mapStateToProps = (store) => {
  return {
    designations: store.designations,
    salaryComponents: store.salaryComponents
  };
};

export default connect(
  mapStateToProps, {
  getSalaryComponents,
  getDesignations,
  deleteDesignation,
}
)(DesignationList);
