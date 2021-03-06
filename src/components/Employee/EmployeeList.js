import React, { Component } from "react";
import { getEmployees, deleteEmployee } from "../../actions/employee";
import { getDesignations } from "../../actions/designation";
import Axios from "axios";
import { PayslipPDF } from "./PayslipPDF";
import { API } from "../../actions/config"
import { PDFDownloadLink } from "@react-pdf/renderer";
import { connect } from "react-redux";
import { Spin } from "antd";
import { Button, Modal } from "react-bootstrap"
import EmployeeForm from "./EmployeeForm";
const initialState = {
  _id: '',
  empNo: '',
  empName: '',
  address: '',
  designation: '',
  CTC: '',
}
class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEmployeeForm: false,
      isDeleteModalOpen: false,
      showPopup: false,
      currentEmployee: initialState,
      payslip: []
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
  deleteEmployee = () => {
    const { currentEmployee } = this.state;
    this.props.deleteEmployee(currentEmployee);
    this.closeDeleteDialog();
  }

  openDeleteDialog = (currentEmployee) => {
    this.setState({
      currentEmployee,
      isDeleteModalOpen: true
    })
  }

  closeDeleteDialog = () => {
    this.setState({ isDeleteModalOpen: false });
  }
  handleShow = () => {
    this.setState({ showPopup: true });
  }
  handleClose = () => {
    this.setState({ showPopup: false });
  }
  generatePDF = async (employee, index) => {
    const employeePayslip = await Axios.get(`${API}employees/${employee._id}/payslip`)
    const { payslip } = this.state;
    payslip[index] = employeePayslip.data;
    this.setState({
      payslip
    })
    console.log("payslip", this.state.payslip)
  }

  showValues() {
    const { showPopup } = this.state;
    return this.props.employees.data.map((item, index) => (
      <tr key={item._id}>
        <td>{item.empNo}</td>
        <td>{item.empName}</td>
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
            onClick={() => this.openDeleteDialog(item)}
          >Delete</Button>
          <Button variant="info" onClick={() => this.handleShow()}>
            View Payslip
        </Button>

          <Modal show={showPopup} onHide={() => this.handleClose()} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Payslip Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button
                variant="secondary" className="mb-2"
                onClick={this.generatePDF.bind(this, item, index)}
              >Generate Payslip</Button>
              {this.state.payslip.map(p => {
                return (
                  <div>
                    <p>Employee Name: {p.empName}</p>
                    <p>Employee Number: {p.empNo}</p>
                    <p>Designation: {p.designation}</p>
                    <p>Salary components</p>
                    {p.salaryComponents.map((components, i) => {
                      return <p key={i} >{components.name}: {components.value}/-</p>
                    })}
                    <p>Monthly CTC: {p.CTC}</p>
                    <p>Yearly CTC: {p.CTC*12}</p>

                  </div>
                )
              })}

            </Modal.Body>
            <Modal.Footer>

              {this.state.payslip[index] ?
                <PDFDownloadLink
                  document={<PayslipPDF data={this.state.payslip[index]} />}
                  fileName="payslip.pdf"
                  style={{
                    textDecoration: "none",
                    padding: "10px",
                    color: "#4a4a4a",
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #4a4a4a"
                  }}
                >
                  Download Payslip
          </PDFDownloadLink>
                : ""}
            </Modal.Footer>
          </Modal>


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
      const { isDeleteModalOpen } = this.state;
      return (
        <div>
          <Button variant="success" className="mb-2"
            onClick={this.setCurrentEmployee.bind(this, initialState)}>Add</Button>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Employee No</th>
                <th scope="col">Employee Name</th>
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
          <Modal show={isDeleteModalOpen} size="md">
            <Modal.Header>
              <Modal.Title>
                Delete employee
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => this.deleteEmployee()}>Delete</Button>
              <Button onClick={() => this.closeDeleteDialog()}>Close</Button>
            </Modal.Footer>
          </Modal>
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