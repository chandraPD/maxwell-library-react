import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'
import Action from '../../../Components/Datatable/Action'
import Status from '../../../Components/Datatable/Status'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

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
        this.fetchData();
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
    async fetchData() {
        const results = [];
        const result = [{
            "no": 1,
            "borrower": "Rocky",
            "no_invoice": 'Invoice 1',
            "fine_ammount": "Rp 4.000,-",
            "librarian": "Nélie",
            "payment_date": "-",
            "status": "Waiting For Payment"
        },
        {
            "no": 2,
            "borrower": "Chandra",
            "no_invoice": 'Invoice 2',
            "fine_ammount": "Rp 4.000,-",
            "librarian": "Nélie",
            "payment_date": "17/21/2020",
            "status": "Paid"
        }]

        result.map((rent) => {
            var row = [];
            var actVal, statusVal = '';
            if (rent.status == 'Waiting For Payment') {
                actVal = <div className="btn-group btn-group-sm">
                    <Action link="Payment" type="primary" title="Accept" icon="check-square" />
                    <Action link="DetailInvoice" type="info" title="Detail" icon="eye" /></div>
                statusVal = <Status type="primary" val="Waiting For Payment" />
            } else if (rent.status == 'Paid') {
                actVal = <div className="btn-group btn-group-sm"><Action link="DetailInvoice" type="info" title="Detail" icon="eye" /></div>
                statusVal = <Status type="info" val="Paid" />
            } else {
                actVal = '-';
                statusVal = '';
            }

            row.push(<td className="text-center" >{rent.no}</td>);
            row.push(<td className="text-center" >{actVal}</td>);
            row.push(<td className="text-center" >{rent.borrower}</td>);
            row.push(<td>{rent.no_invoice}</td>);
            row.push(<td>{rent.fine_ammount}</td>);
            row.push(<td>{rent.librarian}</td>);
            row.push(<td>{rent.payment_date}</td>);
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