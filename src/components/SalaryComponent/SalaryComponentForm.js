import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { connect } from "react-redux";
import { createSalaryComponent, editSalaryComponent } from '../../actions/salaryComponent';
class SalaryComponentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      status: false,
      formErrors: { name: "" },
      nameValid: false,
      formValid: false
    };
  }
  handleInputChange = e => {
    const name = e.target.name;
    const checked = e.target.checked;
    const value = e.target.hasOwnProperty("checked") ?
      checked : e.target.value
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateForm() {
    this.setState({
      formValid:
        this.state.nameValid
    });
  }
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    switch (fieldName) {
      case "name":
        if (!value) {
          nameValid = false;
          fieldValidationErrors.name = "Cannot be empty";
        }
        else {
          nameValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
          fieldValidationErrors.name = nameValid
            ? ""
            : " Salary Component Name must be alphabet";
        }
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid
      },
      this.validateForm
    );
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  save = () => {
    const component = this.state;
      if (component._id) {
        this.props.editSalaryComponent(component);
      } else {
        const { _id, ...rest } = component;
        this.props.createSalaryComponent(rest);
      }
      this.props.onHide();
  }
  componentWillReceiveProps(props) {
    this.setState({ ...props.salaryComponent });
  }

  render() {
    const { salaryComponent, show } = this.props;
    const component = this.state;
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {`${salaryComponent._id ? 'Edit ' : 'Create '} Salary Component`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.name
              )}`}
            >
              <Form.Group controlId="name">
                <Form.Label>Component Name</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="name" type="text" value={component.name} placeholder="Enter component name" />
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.name} </p>
            <Form.Group controlId="status">
              <Form.Check onChange={this.handleInputChange} name="status" type="checkbox" checked={component.status} label="Status" />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!this.state.formValid} onClick={this.save}>{salaryComponent._id ? 'Update' : 'Create'}</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => {
  return store;
};

export default connect(
  mapStateToProps, {
  createSalaryComponent,
  editSalaryComponent,
}
)(SalaryComponentForm);
