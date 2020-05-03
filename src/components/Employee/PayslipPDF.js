import React from "react";
import {
  Page,
  View,
  Document,
  StyleSheet,
  Text,
} from "@react-pdf/renderer";



const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    marginLeft: 4
  },
  text: {
    fontSize: 14,
    padding: 2,
    textAlign: "justify"
  },
  head: {
    fontSize: 20,
    textDecoration: "underline",
    textAlign: "center",
    padding: 4
  },
  salaryComponents: {
    fontSize: 17,
    textDecoration: "underline",
    marginTop: 10,
  },
  employeeDetails: {
    fontSize: 17,
    textDecoration: "underline",
    marginTop: 10,
  },
  ctc: {
    fontSize: 17,
    textDecoration: "underline",
    marginTop: 10,
  },
  date: {
    padding: 16,
    fontSize: 14
  },
header: {
  backgroundColor: "#f6f6f5",
  display: "flex",
  flexDirection: "row",
  padding: 5
},

  respTable: {
    width: "100%",
    display: "table"
  },
  respTableCaption: {
    display: "table-caption",
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
  },
  respTableHeader: {
    display: "table-header-group",
    backgroundColor: "gray",
    fontWeight: "bold",
    fontSize: "25px",
  },
  tableHeaderCell: {
    display: "table-cell",
    padding: "10px",
    textAlign: "justify",
    borderBottom: "1px solid black",
  },
  respTableBody: {
    display: "table-row-group",
  },
  respTableRow: {
    display: "table-row"
  },
  tableBodyCell: {
    display: "table-cell"
  },
  respTableFooter: {
    display: "table-footer-group",
    backgroundColor: "gray",
    fontWeight: "bold",
    fontSize: "25px",
    color: "rgba(255, 255, 255, 0.45)",
  },
  tableFooterCell: {
    display: "table-cell",
    padding: "10px",
    textAlign: "justify",
    borderBottom: "1px solid black",
  },

});

export function PayslipPDF(props) {
  console.log("pdf props", props.data);

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();


  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {props.data ?
          <View style={{ background: 'red' }}>
            <Text style={styles.head}>Company Name</Text>
            <Text style={styles.head}>Address</Text>
            <Text style={styles.head}>Phone</Text>
            <Text style={styles.head}>Fax</Text>
            <Text style={styles.head}>Email</Text>

            <Text style={styles.head}>Payslip</Text>
            <Text style={styles.employeeDetails}>Employee Details</Text>
            <Text style={styles.text}>Employee Name: {props.data.empName}</Text>
            <Text style={styles.text}>Employee Number: {props.data.empNo}</Text>
            <Text style={styles.salaryComponents}>Salary Components</Text>
            {props.data.salaryComponents.map((components, i) => {
              return <Text style={styles.text}>{components.name}: {components.value}/-</Text>
            })}
            <Text style={styles.ctc}>CTC</Text>
            <Text style={styles.text}>Mothly CTC: {props.data.CTC}/-</Text>
            <Text style={styles.text}>Yearly CTC: {props.data.CTC * 12}/-</Text>
            <Text style={styles.date}>Date: {`${year}${'-'}${month < 10 ? `0${month}` : `${month}`}${'-'}${date}`}</Text>
            <Text>Signature</Text>
          </View>
          : null}
      </Page>
    </Document>
  );
}