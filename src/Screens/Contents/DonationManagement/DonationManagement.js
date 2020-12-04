import React, { Component } from "react";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'
import Swal from 'sweetalert2'
 
class DonationManagement extends Component {
  constructor(props) {
    super(props);
 
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
    };
  }
 
  componentDidMount() {
    this.fetchData();
  }
 
  async fetchData() {
    const results = [];
    const result = [
      {
        no: 1,
        Email: "Chandra@gmail.com",
        Name: "Chandra",
        DonationType: "Organization",
        PhoneNumber: "+6287-0000",
        TotalBook: "10",
        Status: "Waiting",
      },
      {
        no: 2,
        Email: "Tika@gmail.com",
        Name: "Tika",
        DonationType: "Person",
        PhoneNumber: "+6287-0001",
        TotalBook: "4",
        Status: "Waiting",
      },
      {
        no: 3,
        Email: "Kevin@gmail.com",
        Name: "Kevin",
        DonationType: "Organization",
        PhoneNumber: "+6287-0002",
        TotalBook: "10",
        Status: "Waiting",
      },
      {
        no: 4,
        Email: "Jayson@gmail.com",
        Name: "Jayson",
        DonationType: "Person",
        PhoneNumber: "+6287-0003",
        TotalBook: "5",
        Status: "Waiting",
      },
      {
        no: 5,
        Email: "Naufal@gmail.com",
        Name: "Naufal",
        DonationType: "Person",
        PhoneNumber: "+6287-0004",
        TotalBook: "7",
        Status: "Waitingt",
      },
      {
        no: 6,
        Email: "Dayan@gmail.com",
        Name: "Dayan",
        DonationType: "Organization",
        PhoneNumber: "+6287-0005",
        TotalBook: "10",
        Status: "Waiting",
      },
      {
        no: 7,
        Email: "Fadly@gmail.com",
        Name: "Fadly",
        DonationType: "Person",
        PhoneNumber: "+6287-0008",
        TotalBook: "3",
        Status: "Waiting",
      },
      {
        no: 8,
        Email: "Cleo@gmail.com",
        Name: "Cleo",
        DonationType: "Person",
        PhoneNumber: "+6287-0006",
        TotalBook: "9",
        Status: "Waiting",
      },
      {
        no: 9,
        Email: "Era@gmail.com",
        Name: "Era",
        DonationType: "Organization",
        PhoneNumber: "+6287-0007",
        TotalBook: "20",
        Status: "Waiting",
      },
      {
        no: 10,
        Email: "Riski@gmail.com",
        Name: "Riski",
        DonationType: "Organization",
        PhoneNumber: "+6287-0009",
        TotalBook: "15",
        Status: "Waiting",
      },
      {
        no: 11,
        Email: "Todi@gmail.com",
        Name: "Todi",
        DonationType: "Person",
        PhoneNumber: "+6287-00010",
        TotalBook: "3",
        Status: "Waiting",
      },
      {
        no: 12,
        Email: "Yoga@gmail.com",
        Name: "Yoga",
        DonationType: "Organization",
        PhoneNumber: "+6287-00011",
        TotalBook: "17",
        Status: "Waiting",
      },
    ];
 
    result.map((donation) => {
      var row = [];
 
      row.push(<td className="text-center">{donation.no}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
                <Action type="success" title="Edit" icon="fas fa-check" onClick={() => Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                showCancelButton: true,
                text: 'Are you sure want to confirm this?',
                }).then((result) => {
 
                if (result.isConfirmed) {
                    Swal.fire(
                    'Success!',
                    'Confirm Donation Already Success!',
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
      row.push(<td>{donation.Email}</td>);
      row.push(<td>{donation.Name}</td>);
      row.push(<td>{donation.DonationType}</td>);
      row.push(<td>{donation.PhoneNumber}</td>);
      row.push(<td>{donation.TotalBook}</td>);
      row.push(<td>{donation.Status}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
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