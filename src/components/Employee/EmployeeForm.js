import React from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { createEmployee, editEmployee } from '../../actions/employee';

class EmployeeForm extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      _id: '',
      empName: '',
      empNo: '',
      address: '',
      designation: '',
      CTC: '',
      formErrors: { empName: "", empNo: "", address: "", designation: "", CTC: "" },
      empNameValid: false,
      empNoValid: false,
      addressValid: false,
      designationValid: false,
      CTCValid: false,
      formValid: false
    };
  }

  handleInputChange = e => {
    console.log(this.state)
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let empNameValid = this.state.empNameValid;
    let empNoValid = this.state.empNoValid;
    let addressValid = this.state.addressValid;
    let designationValid = this.state.designationValid;
    let CTCValid = this.state.CTCValid;


    switch (fieldName) {
      case "empName":
        if (!value) {
          fieldValidationErrors.empName = "Cannot be empty";
        }

        else {
          empNameValid = value.match(/^([a-zA-Z]+\s)*[a-zA-Z]+$/);
          fieldValidationErrors.empName = empNameValid
            ? ""
            : " Employee Name must be alphabet";
        }
        break;
      case "empNo":
        empNoValid = value.match(/^[a-zA-Z0-9]+$/);
        if (!value) {
          fieldValidationErrors.empNo = "Cannot be empty";
        }

        else {
          empNoValid = value.match(/^[a-zA-Z0-9]+$/);
          fieldValidationErrors.empNo = empNoValid
            ? ""
            : " Employee Number should not contain special characters";
        }
        break;
      case "address":
        addressValid = value.length > 0;
        fieldValidationErrors.address = addressValid ? "" : " Cannot be empty";
        break;
      case "designation":
        designationValid = value.length > 0;
        fieldValidationErrors.designation = designationValid ? "" : "Please select designation";
        break;
      case "CTC":
        CTCValid = value.length > 0;
        fieldValidationErrors.CTC = CTCValid ? "" : " Cannot be empty";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        empNameValid: empNameValid,
        empNoValid: empNoValid,
        addressValid: addressValid,
        designationValid: designationValid,
        CTCValid: CTCValid

      },
      this.validateForm
    );
  }
  validateForm() {
    this.setState({
      formValid:
        this.state.empNameValid &&
        this.state.empNoValid &&
        this.state.addressValid &&
        this.state.designationValid &&
        this.state.CTCValid
    });
  }
  save = () => {
    const employee = this.state;
    if (this.state.formValid) {
      if (employee._id) {
        this.props.editEmployee(employee);
      } else {
        const { _id, ...rest } = employee;
        this.props.createEmployee(rest);
      }
      this.props.onHide();
    }
  }
  componentWillReceiveProps(props) {
    console.log(this.state)
    this.setState({ ...props.employee, designation: props.employee.designation._id });
  }
  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }
  render() {
    const { employee, show } = this.props;
    const emp = this.state;
    return (
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header  >
          <Modal.Title id="contained-modal-title-vcenter">
            {`${employee._id ? 'Edit ' : 'Create '} Salary Component`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.empNo
              )}`}
            >
              <Form.Group controlId="empNo">
                <Form.Label>Employee number</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="empNo" type="text" value={emp.empNo} placeholder="Enter employee number" />
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.empNo} </p>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.empNo
              )}`}
            >
              <Form.Group controlId="empName">
                <Form.Label>Employee name</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="empName" type="text" value={emp.empName} placeholder="Enter employee name" />
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.empName} </p>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.address
              )}`}
            >
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="address" type="text" value={emp.address} placeholder="Enter employee address" />
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.address} </p>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.designation
              )}`}
            >
              <Form.Row key={this.props.employee.designation._id}>

                <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control onChange={this.handleInputChange} name="designation" as="select" value={this.state.designation}>
                    <option key={-1} value={''}>Choose Designation</option>
                    {this.props.designations.data.map((c, i) => {
                      return (<option key={c._id} value={c._id}>{c.name}</option>)
                    })}
                  </Form.Control>
                </Form.Group>

              </Form.Row>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.designation} </p>
            <div
              className={`form-group ${this.errorClass(
                this.state.formErrors.CTC
              )}`}
            >
              <Form.Group controlId="CTC">
                <Form.Label>CTC</Form.Label>
                <Form.Control onChange={this.handleInputChange} name="CTC" type="number" value={emp.CTC} placeholder="Enter employee CTC" />
              </Form.Group>
            </div>
            <p style={{ color: "red" }}> {this.state.formErrors.CTC} </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.save}>{employee._id ? 'Update' : 'Create'}</Button>
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
  createEmployee,
  editEmployee,
}
)(EmployeeForm);