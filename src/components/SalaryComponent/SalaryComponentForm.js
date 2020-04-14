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
    };
  }
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.hasOwnProperty("checked") ?
        e.target.checked.toString() : e.target.value
    });
  };
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
            <Form.Group controlId="name">
              <Form.Label>Component Name</Form.Label>
              <Form.Control onChange={this.handleInputChange} name="name" type="text" value={component.name} placeholder="Enter component name" />
            </Form.Group>
            <Form.Group controlId="status">
              <Form.Check onChange={this.handleInputChange} name="status" type="checkbox" checked={component.status} label="Status" />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.save}>{salaryComponent._id ? 'Update' : 'Create'}</Button>
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