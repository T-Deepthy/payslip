import React from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';
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
      formErrors: { name: "", salaryComponents: "", percentageCTC: '' },
      nameValid: false,
      salaryComponentsValid: false,
      percentageCTCValid: false,
      formValid: false
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
        this.state.nameValid &&
        this.state.salaryComponentsValid &&
        this.state.percentageCTCValid 
    });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    switch (fieldName) {
      case "name":
        if (!value) {
          fieldValidationErrors.name = "Cannot be empty";
        }

        else {
          nameValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
          fieldValidationErrors.name = nameValid
            ? ""
            : "Designation must be alphabet";
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

  validSalaryComponents = (components) => {
    let fieldValidationErrors = this.state.formErrors;
    let percentageCTCValid = this.state.percentageCTCValid;
    let salaryComponentsValid = this.state.salaryComponentsValid;

    let totalPercentage = components.reduce(
      (accumulator, currentValue) => accumulator + parseInt(currentValue.percentageCTC), 0)
    if (totalPercentage !== 100) {
      fieldValidationErrors.percentageCTC = "Total Value of Percentage should be equal to 100"
      console.log(fieldValidationErrors.percentageCTC )
      return false;
    }
    if (this.duplicateComponents(components)) {
      fieldValidationErrors.salaryComponents = "There are duplicate salary components"
      return false;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        percentageCTCValid: percentageCTCValid,
        salaryComponentsValid: salaryComponentsValid,
      },
      this.validateForm
    );
    
  }
  save = () => {
    const designation = this.state;
    if(!designation.name) {
      // alert("blank");
      return;
    }

    if (this.validSalaryComponents(designation.components)) {
      if (designation._id) {
        this.props.editDesignation(designation);
      } else {
        const { _id, ...rest } = designation;
        this.props.createDesignation(rest);
      }
      this.props.onHide();
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
    console.log("state")
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
              </Form.Group>
              </div>
            <p style={{ color: "red" }}> {this.state.formErrors.name} </p>
           
              {des.components.map((component, index) => {
                return (
                  <Form.Row key={`${component._id}-${index}`}>
                    <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                      <Form.Label>Salary Component</Form.Label>
                      <Form.Control onChange={this.handleComponentChange.bind(this, index)} name="_id" as="select" value={component._id}>
                        <option key={-1} value={''}>Choose Component</option>
                        {salaryComponents.data.map((c, i) => {
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.save}>{designation._id ? 'Update' : 'Create'}</Button>
          <Button onClick={this.props.onHide}>Close</Button>
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