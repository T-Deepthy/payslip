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
    backgroundColor: "#ffffff"
  },
  text: { 
    fontFamily: "serif"
  }
});

export function PdfDocument(props) {
  console.log("pdf props", props.data);
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {props.data ?
          <View style={{ background: 'red' }}>
            <Text>Employee Name: {props.data.empName}</Text>
            <Text>Employee Number: {props.data.empNo}</Text>
            <Text>Mothly CTC: {props.data.CTC}</Text>
            <Text>Yearly CTC: {props.data.CTC * 12}</Text>
            <Text>Salary Components</Text>
            {props.data.salaryComponents.map((components, i) => {
            return <Text>{components.name}: {components.value}</Text>
            })}
          </View>
          : null}
      </Page>
    </Document>
  );
}