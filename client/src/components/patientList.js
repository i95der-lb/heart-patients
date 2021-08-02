import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { Link } from "react-router-dom";

const Patient = (props) => {
  console.log({props})
  return(
  <tr>
    {/* <Link to={"/edit/" + props.patient._id} />
      <a
        href="/"
        onClick={() => {
          props.deletePatient(props.patient._id);
        }}
      >
      </a> */}
    <td>{props.patient.name}</td>
    <td>{props.patient.dateOfBirth}</td>
    <td>{props.patient.studyStartTime}</td>
    <td>{props.patient.studyEndTime}</td>
    <td>{props.patient.deviceSerialNumber}</td>
    <td>{props.patient.totalNumberOfEvents}</td>
  </tr>
)}

export default class PatientList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    // this.deletePatient = this.deletePatient.bind(this);
    this.state = { patients: [] };
  }

  // This method will get the data from the database.
  componentDidMount() {
    axios
      .get("http://localhost:5000/patients/")
      .then((response) => {
        this.setState({ patients: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // // This method will delete a patient based on the method
  // deletePatient(id) {
  //   axios.delete("http://localhost:3000/" + id).then((response) => {
  //     console.log(response.data);
  //   });

  //   this.setState({
  //     patient: this.state.patients.filter((el) => el._id !== id),
  //   });
  // }

  // This method will map out the users on the table
  patientList() {
    return this.state.patients.map((currentpatient) => {
      console.log({currentpatient})
      return (
        <Patient
          patient={currentpatient}
          visualizePatient={this.visualizePatient}
          key={currentpatient._id}
        />
      );
    });
  }

  // This following section will display the table with the patients of individuals.
  render() {
    return (
      <div>
        <h3>Patient List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Study Start Time</th>
              <th>Study End Time</th>
              <th>Device Serial Number</th>
              <th>Total Number of Events</th>
            </tr>
          </thead>
          <tbody>{this.patientList()}</tbody>
        </table>
      </div>
    );
  }
}