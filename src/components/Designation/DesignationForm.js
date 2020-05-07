import React from 'react';
import { Button, Form, Modal, Col, Alert } from 'react-bootstrap';
import { connect } from "react-redux";
import { getSalaryComponents } from "../../actions/salaryComponent";
import { createDesignation, editDesignation } from '../../actions/designation';
class DesignationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: '',
      name: '',
      components: [
        {
          _id: '',
          percentageCTC: null,
        }
      ],
      formErrors: { name: "" },
      nameValid: false,
      formValid: false,
      errorMessage: new Set()
    };
  }
  componentDidMount() {
    this.props.getSalaryComponents();
  }
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
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
          nameValid = false
          fieldValidationErrors.name = "Cannot be empty";
        }
        else {
          nameValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
          fieldValidationErrors.name = nameValid
            ? ""
            : " Designation Name must be alphabet";
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
  duplicateComponents = (components) => new Set(components.map(c => c._id)).size !== components.length;
  emptyFieldCheck = () => (this.state.components.some(c => !c._id || c.percentageCTC === '' || c.percentageCTC === '0'));
  validSalaryComponents = () => {
    const { errorMessage, components } = this.state;
    const totalPercentage = components.reduce(
      (accumulator, currentValue) => accumulator + +(currentValue?.percentageCTC), 0)
    const percentageError = "Total Value of Percentage should be equal to 100";
    const duplicateError = "There are duplicate salary components";
    const isHundredPercent = +totalPercentage === 100;
    const isDuplicateSalaryComponent = this.duplicateComponents(components)
    const emptyFields = this.emptyFieldCheck() ;
    const emptyFieldError = "There are empty fields";
    if (!isHundredPercent || isDuplicateSalaryComponent || emptyFields) {
      if (isHundredPercent) errorMessage?.has(percentageError) && errorMessage.delete(percentageError)
      else errorMessage && errorMessage.add(percentageError);
      if (isDuplicateSalaryComponent) errorMessage && errorMessage.add(duplicateError)
      else errorMessage?.has(duplicateError) && errorMessage.delete(duplicateError)
      if (emptyFields) errorMessage && errorMessage.add(emptyFieldError)
      else errorMessage?.has(emptyFieldError) && errorMessage.delete(emptyFieldError);
      this.setState({ errorMessage })
      return false;
    }
    this.clearErrorMessage();
    return true;
  }
  errorComponent = () => {
    const { errorMessage } = this.state;
    return errorMessage?.size ? (
      <div className="mt-2 mx-1 mx-md-5 text-center text-md-left">
        {Array.from(errorMessage).map(message => (
          <Alert variant="danger" key={message}>{message}</Alert>
        ))}
      </div>
    ) : '';
  }
  save = () => {
    const designation = this.state;
    if (this.validSalaryComponents()) {
      if (designation._id) {
        this.props.editDesignation(designation);
      } else {
        const { _id, ...rest } = designation;
        this.props.createDesignation(rest);
      }
      this.props.onHide();
      this.clearErrorMessage();
    }
  }
  removeComponent = (i) => {
    const components = this.state.components;
    components.splice(i, 1)
    this.setState({ components });
  }
  addComponent = () => {
    const components = this.state.components;
    components.push({ _id: '', percentageCTC: '' })
    this.setState({ components });
  }
  handleComponentChange = (index, e) => {
    const components = this.state.components.map((c, i) => {
      if (i === index) {
        return {
          ...c,
          [e.target.name]: e.target.value
        }
      } else return c
    })
    this.setState({ components })
  };
  componentWillReceiveProps(props) {
    this.setState({ ...props.designation });
  }
  clearErrorMessage = () => {
    const { errorMessage } = this.state;
    if (errorMessage?.size) {
      errorMessage.clear();
      this.setState({ errorMessage })
    }
  }
  closeDialog = () => {
    const { components } = this.state;
    this.setState({ components: components.filter(c => c._id && c.percentageCTC) }, () => {
      this.clearErrorMessage();
      this.props.onHide();
    })
  }
  render() {
    const { designation, show, salaryComponents } = this.props;
    const des = this.state;
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header  >
          <Modal.Title id="contained-modal-title-vcenter">
            {`${designation._id ? 'Edit ' : 'Create '}  designation`}
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
                <Form.Label>Designation</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="name" type="text" value={des.name} placeholder="Enter designation " />
              <p style={{color: "orange"}}>*accepts space between words</p>
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.name} </p>
            {des.components.map((component, index) => {
              return (
                <Form.Row key={`${component._id}-${index}`}>
                  <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                    <Form.Label>Salary Component</Form.Label>
                    <Form.Control
                      onChange={this.handleComponentChange.bind(this, index)}
                      name="_id"
                      as="select"
                      value={component._id}
                    >
                      <option key={-1} value={''}>Choose Component</option>
                      {salaryComponents.data.map((c) => {
                        return (<option key={c._id} value={c._id}>{c.name}</option>)
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Percentage</Form.Label>
                    <Form.Control onChange={this.handleComponentChange.bind(this, index)} name="percentageCTC" type="number" value={component.percentageCTC} placeholder="Enter percentage" />
                  </Form.Group>
                  {' '}
                  <Button onClick={this.removeComponent.bind(this, index)} style={{
                    "height": "30px",
                    "marginTop": "12px",
                    "alignSelf": "center"
                  }} size="sm" variant="danger">Remove</Button>{' '}
                </Form.Row>
              )
            })}
            <Button size="sm" variant="success" onClick={this.addComponent}>Add Salary Component</Button>
          </Form>
          {
            this.errorComponent()
          }
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!this.state.formValid} onClick={this.save}>{designation._id ? 'Update' : 'Create'}</Button>
          <Button onClick={() => this.closeDialog()}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
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
  createDesignation,
  editDesignation,
  getSalaryComponents,
}
)(DesignationForm);