import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { FaAlignLeft, FaCode, FaUser } from "react-icons/fa";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    marginBottom: 10
  },
  label: {
    fontWeight: "bold"
  },
  value: {
    marginBottom: 10
  }
});

// Create PDF component
const ProjectPdf = ({ projectDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Project Details</Text>
        <View style={styles.content}>
          <Text style={styles.label}><FaAlignLeft /> Name:</Text>
          <Text style={styles.value}>{projectDetails.nom}</Text>
          <Text style={styles.label}><FaCode /> Description:</Text>
          <Text style={styles.value}>{projectDetails.desc}</Text>
          <Text style={styles.label}><FaUser /> Responsable:</Text>
          <Text style={styles.value}>{projectDetails.responsable}</Text>
          <Text style={styles.label}><FaCode /> Domaine:</Text>
          <Text style={styles.value}>{projectDetails.domaine}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProjectPdf;
