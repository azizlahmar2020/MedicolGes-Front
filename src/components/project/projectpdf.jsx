import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import { FaAlignLeft, FaCode, FaUser } from "react-icons/fa";
import logo from "../../assets/img/logom.png";
import descriptionImg from "../../assets/img/description.png";
import responsableImg from "../../assets/img/respo.png";
import nomImg from "../../assets/img/nom.png";
import domainImg from "../../assets/img/domaine.png";


// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 20
  },
  logoContainer: {
    flexDirection: "row",
    marginBottom: 10, // Adjust margin as needed
    marginRight: 40
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
    marginTop: 10,
    position: "center",
    marginLeft: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: 40,
    marginTop: 60,
    marginLeft: 60,
    color: "#333333"
  },
  label: {
    fontWeight: "bold",
    color: "black",
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    fontSize: 16,
    marginLeft: 40

  },
  value: {
    marginBottom: 16,
    color: "#333333",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 14,
    marginLeft: 60

  },
  icon: {
    marginRight: 5,
    marginTop: 10

  },
  img: {
    width: 15,
    height: 15,
    marginRight: 5,
    marginTop: 10
  }
});

// Create PDF component
const ProjectPdf = ({ projectDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.logoContainer}>
          <Image src={logo} style={styles.logo} />
        </View>
        <Text style={styles.header}>Project {projectDetails.nom} Details</Text>
        <View style={styles.content}>
          <View style={styles.tableRow}>
            <Text style={[styles.label, styles.icon]}><Image src={nomImg} style={styles.img} /> Name : </Text>
            <Text style={styles.value}>{projectDetails.nom}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.label, styles.icon]}><Image src={descriptionImg} style={styles.img} /> Description : </Text>
            <Text style={styles.value}>{projectDetails.desc}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.label, styles.icon]}><Image src={responsableImg} style={styles.img} /> Responsable : </Text>
            <Text style={styles.value}>{projectDetails.responsable}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.label, styles.icon]}><Image src={domainImg} style={styles.img} /> Domain : </Text>
            <Text style={styles.value}>{projectDetails.domaine}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

export default ProjectPdf;
