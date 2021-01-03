import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'
import Action from '../../../Components/Datatable/Action'
import Status from '../../../Components/Datatable/Status'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from 'axios';
import $ from 'jquery'
import "datatables.net-responsive/js/dataTables.responsive"
import "datatables.net-dt/css/jquery.dataTables.min.css"
class FineManagement extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            rows: [],
            results: [],
        };
    }
    componentDidMount() {
        this.fetchDataBook();
    }

    acceptRent() {
        swal(
            'Saved!',
            'Rent has been Accepted!',
            'success'
        );
    }

    cancelRent() {
        swal(
            'Saved!',
            'Rent has been Accepted!',
            'success'
        );
    }
    async fetchDataBook() {
        const token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjA5MzAzODE1LCJleHAiOjE2MDk5MDg2MTV9.NX3s9uot5rwxJa_cBldLesOsR5nms6JieIqwYMZ9Y4O1ZnFSd9sqpn5ljawyXP7bcxPRFzJfRdiJ0r9F3bUnvQ"
        const config = {
          headers: { Authorization: `Bearer ${token}` }
      }
        const getData = await Axios.get('http://localhost:8080/invoice/admin/get-all', config);
        const resultBook = getData.data.data;

        this.setState({ data: resultBook });
        $('#example1').DataTable().destroy();
        this.fetchData();
        $("#example1").DataTable({
            responsive: true,
            autoWidth: false,
        });
    }

    fetchData = () => {
        let results = [];
        let result = this.state.data;
        var no = 1;
        result.forEach(rent => {
            var row = [];
            var actVal, statusVal = '';
            if (rent.statusInvoice === 'Waiting For Payment') {
                actVal = <div className="btn-group btn-group-sm">
                    <Action link="Payment" type="primary" title="Accept" icon="check-square" />
                    <Action link={`DetailInvoice/${rent.invoiceId}`} type="info" title="Detail" icon="eye" id={rent.invoiceId} /></div>
                statusVal = <Status type="primary" val="Waiting For Payment" />
            } else if (rent.statusInvoice === 'Paid') {
                actVal = <div className="btn-group btn-group-sm"><Action link="DetailInvoice" type="info" title="Detail" icon="eye" /></div>
                statusVal = <Status type="info" val="Paid" />
            } else {
                actVal = '-';
                statusVal = '';
            }

            row.push(<td className="text-center" >{no++}</td>);
            row.push(<td className="text-center" >{actVal}</td>);
            row.push(<td className="text-center" >{rent.borrower}</td>);
            row.push(<td>{rent.noInvoice}</td>);
            row.push(<td>{rent.grandTotal}</td>);
            row.push(<td>{rent.email}</td>);
            if (rent.paymentDate === null) {
                row.push(<td>-</td>);
            } else {
                row.push(<td>{rent.paymentDate}</td>);
            }
            row.push(<td className="text-center" >{statusVal}</td>);
            results.push(row);
        });
        this.setState({ rows: results });
    }

    render() {
        const { rows } = this.state;
        const headings = [
            'No',
            'Action',
            'Borrower',
            'No Invoice',
            'Fine Ammount',
            'Librarian',
            'Payment Date',
            'Status',
        ];

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Fine Management</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                                    <li className="breadcrumb-item active">Fine Management</li>
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
                                        <h3 className="card-title">Fine List</h3>
                                        <div className="card-tools">
                                            <Link to="Payment" className="btn-xs btn-block bg-gradient-primary">Pay</Link>
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

export default FineManagement