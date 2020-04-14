import React from 'react';
import { Button, Form, Modal, Col } from 'react-bootstrap';
import { connect } from "react-redux";
import { createEmployee, editEmployee } from '../../actions/employee';

class EmployeeForm extends React.Component {
  constructor(props) {
    console.log(props);
    
    super(props);
    this.state = {
      _id: '',
      empNo: '',
      address: '',
      designation: '',
      CTC: '',
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  save = () => {
    const employee = this.state;
    if (employee._id) {
      this.props.editEmployee(employee);
    } else {
      const { _id, ...rest } = employee;
      this.props.createEmployee(rest);
    }
    this.props.onHide();
  }

  componentWillReceiveProps(props) {
    this.setState({ ...props.employee });
    console.log("porpssssssssssss..", this.props)
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
            <Form.Group controlId="name">
              <Form.Label>Employee number</Form.Label>
              <Form.Control onChange={this.handleInputChange} name="empNo" type="text" value={emp.empNo} placeholder="Enter employee number" />
              <Form.Label>Address</Form.Label>
              <Form.Control onChange={this.handleInputChange} name="address" type="text" value={emp.address} placeholder="Enter employee address" />
                  <Form.Row key={this.props.employee.designation._id}>
                    <Form.Group as={Col} controlId="exampleForm.SelectCustom">
                      <Form.Label>Designation</Form.Label>
                      <Form.Control onChange={this.handleInputChange} name="designation" as="select" value={this.props.employee.designation._id}>
                        <option key={-1} value={''}>Choose Designation</option>
                        {this.props.designations.data.map((c, i) => {
                          return (<option key={c._id} value={c._id}>{c.name}</option>)
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form.Row>
              <Form.Label>CTC</Form.Label>
              <Form.Control onChange={this.handleInputChange} name="CTC" type="text" value={emp.CTC} placeholder="Enter employee CTC" />
            </Form.Group>
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