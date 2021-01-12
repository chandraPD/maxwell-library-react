import React, { Component } from "react";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $, { error, event } from 'jquery'
import 'bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

 
class DonationManagement extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      isLoading: true,
    };
  }
 
  componentDidMount() {
    this.fetchDataDonate();
    console.log(this.state.data);
  }
 
  async fetchDataDonate() {
    let fetchedData = await axios.get(
      'http://localhost:8080/donate'
    );
    console.log(fetchedData.data.data)
    this.setState.isLoading = false;
    const resultDonate = fetchedData.data.data;
    this.setState({ data: resultDonate});

    $('#example1').DataTable().destroy();
    this.fetchData();
    $("#example1").DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  fetchData() {
    const results = [];
    const result = this.state.data
    var no = 1;

    result.forEach((donate) => {
      this.setState({ isLoading: true });
      var row = [];

      row.push(<td className="text-center">{donate.donateId}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
                <Action type="success" title="Edit" icon="fas fa-check" onClick={() => 
                
                Swal.fire({
 
                    icon: 'warning',
                    title: 'Warning!',
                    showCancelButton: true,
                    text: 'Are you sure want to accept this?',
                    }).then((result) => {
 
                    if (result.isConfirmed) {
                    this.acceptDonate(donate.donateId)
                    Swal.fire(
                        'Success!',
                        'Accept Donation Already Success!',
                        'success'
                    )
                    }
                    })} />
                <Action type="danger" title="Delete" icon="fas fa-ban" onClick={() => Swal.fire({
 
                    icon: 'warning',
                    title: 'Warning!',
                    showCancelButton: true,
                    text: 'Are you sure want to cancel this?',
                    }).then((result) => {
 
                    if (result.isConfirmed) {
                    this.rejecttDonate(donate.donateId)
                    Swal.fire(
                        'Success!',
                        'Cancel Donation Already Success!',
                        'success'
                    )
                    }
                    })} />
          </div>
        </td>
      );
      row.push(<td>{donate.email}</td>);
      row.push(<td>{donate.name}</td>);
      row.push(<td>{donate.donationType}</td>);
      row.push(<td>{donate.phoneNumber}</td>);
      row.push(<td>{donate.totalBook}</td>);
      row.push(<td>{donate.statusDonate}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
  }


  acceptDonate = (id) => {
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    const config = {
    headers: { Authorization: `Bearer ${userToken}` }}
    axios.post(`http://localhost:8080/donate/accept/${id}`,null, config )
      .then((response) => {
        console.log(response)
        window.location.reload()
        
      })

  }

  rejecttDonate = (id) => {
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    const config = {
    headers: { Authorization: `Bearer ${userToken}` }}
    axios.post(`http://localhost:8080/donate/reject/${id}`,null, config )
      .then((response) => {
        console.log(response)
        window.location.reload()
        
      })

  }



  

  donateChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Donate Name
    if (!fields["DonateName"]) {
      formIsValid = false;
      errors["DonateName"] = "Donate Name cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    const { rows } = this.state;
    const headings = [
      "No",
      "Action",
      "Email",
      "Name",
      "DonationType",
      "PhoneNumber",
      "TotalBook",
      "Status",
    ];
 
    return(
      <div className="content-wrapper">
      <section className="content-header">
          <div className="container-fluid">
              <div className="row mb-2">
                  <div className="col-sm-6">
                      <h1>Donation Management</h1>
                  </div>
                  <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                    <li className="breadcrumb-item active">Donation Management</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
          {/* Main content */}
          <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Donation List</h3>
                                        <div className="card-tools">
                                        </div>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body">
                                        <DataTable headings={headings} rows={rows} />
                                        {/* /.card-body */}
                                    </div>
                                </div>
                                {/* /.card */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.container-fluid */}
                </section>
                {/* /.content */}
            </div>
    )
  }
}
 
export default DonationManagement;