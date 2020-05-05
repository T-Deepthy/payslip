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
    textAlign: "justify",
    color: "red"
  },
  data: {
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
  company: {
    fontSize: 20,
    textAlign: "left",
    padding: 4,
    color: "red"
  },
  salaryComponents: {
    fontSize: 17,
    marginTop: 10,
  },
  payslip: {
    fontSize: 20,
    textAlign: "right",
    marginRight: 5,
    padding: 3
  },
  ctc: {
    fontSize: 17,
    textDecoration: "underline",
    marginTop: 10,
  },
  date: {
    padding: 2,
    fontSize: 14
  },
  hr: {
    backgroundColor: "gray",
    width: "120%",
    height: "2px",
    borderTop: "1px solid gray",
    display: "flex"
  },
  headerContainer: {
    textAlign: "right",
    display: "inline"
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
            <View style={styles.headerContainer}>
              <Text style={styles.payslip}>PAYSLIP</Text>

              <Text style={styles.company}>COMPANY NAME</Text>
              <Text style={styles.text}>Address : </Text>
              <Text style={styles.text}>Phone :</Text>
              <Text style={styles.text}>Fax :</Text>
              <Text style={styles.text}>Email :</Text>

            </View>
            <Text style={styles.hr} />
            <View style={styles.employee}>
              <Text style={styles.date}>Date: {`${year}${'-'}${month < 10 ? `0${month}` : `${month}`}${'-'}${date}`}</Text>
              <Text style={styles.text}>Employee Name: </Text>
              <Text style={styles.data}>{props.data.empName}</Text>
              <Text style={styles.text}>Employee Number: </Text>
              <Text style={styles.data}>{props.data.empNo}</Text>
            </View>
            <Text style={styles.salaryComponents}>Salary Components</Text>
            {props.data.salaryComponents.map((components, i) => {
              return <Text key ={i} style={styles.text}>{components.name}: {components.value}/-</Text>
            })}
            <Text style={styles.ctc}>CTC</Text>
            <Text style={styles.text}>Mothly CTC: </Text>
            <Text style={styles.data}>{props.data.CTC}/-</Text>
            <Text style={styles.text}>Yearly CTC: </Text>
            <Text style={styles.data}>{props.data.CTC * 12}/-</Text>
            <Text style={styles.date}>Date: </Text>
            <Text style={styles.date}>Signature: </Text>
          </View>
          : null}
      </Page>
    </Document >
  );
}