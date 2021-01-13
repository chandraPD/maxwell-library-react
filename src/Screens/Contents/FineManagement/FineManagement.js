import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'
import Action from '../../../Components/Datatable/Action'
import Status from '../../../Components/Datatable/Status'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from '../../../Instances/axios-instances';
import $ from 'jquery'
import "datatables.net-responsive/js/dataTables.responsive"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import moment from "moment";
import NumberFormat from 'react-number-format';
class FineManagement extends Component {

    constructor() {

        let user = JSON.parse(localStorage.getItem('user'))
        let activeRole
        if (user) {
            activeRole = JSON.parse(localStorage.getItem('user')).userInfo.activeRole
        } else {
            activeRole = false;
        }
        super();
        this.state = {
            data: [],
            rows: [],
            results: [],
            headings: [],
            role: activeRole
        };
    }
    componentDidMount() {
        this.fetchData();
        this.getRole();
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
        let linkAxios = "";
        if (this.state.role === "ROLE_ADMIN") {
            linkAxios = "invoice/admin/get-all";
        } else {
            linkAxios = "invoice/user/get-all";
        }
        await Axios.get(linkAxios)
            .then((getData) => {
                const res = getData.data;
                console.log(res);
                if (getData.status === 200) {
                    $('#example1').DataTable().destroy();
                    let results = [];
                    let result = res.data;;
                    var no = 1;

                    result.forEach(rent => {
                        var row = [];
                        var actVal, statusVal = '';
                        if (rent.statusInvoice === 'Waiting For Payment') {
                            if (this.state.role === "ROLE_USER") {
                                actVal = <div className="btn-group btn-group-sm">
                                    <Action link={`Payment/${rent.invoiceId}`} type="primary" title="Pay" icon="check-square" />
                                    <Action link={`DetailInvoice/${rent.invoiceId}`} type="info" title="Detail" icon="eye" id={rent.invoiceId} /></div>
                            } else {
                                actVal = <div className="btn-group btn-group-sm">
                                    <Action link={`DetailInvoice/${rent.invoiceId}`} type="info" title="Detail" icon="eye" id={rent.invoiceId} /></div>
                            }
                            statusVal = <Status type="primary" val="Waiting For Payment" />
                        } else if (rent.statusInvoice === 'Paid') {
                            actVal = <div className="btn-group btn-group-sm"><Action link={`DetailInvoice/${rent.invoiceId}`} type="info" title="Detail" icon="eye" /></div>
                            statusVal = <Status type="info" val="Paid" />
                        } else if (rent.statusInvoice === "Canceled") {
                            actVal = <div className="btn-group btn-group-sm"><Action link={`DetailInvoice/${rent.invoiceId}`} type="info" title="Detail" icon="eye" /></div>
                            statusVal = <Status type="Danger" val="Canceled" />
                        } else if (rent.statusInvoice === "Waiting Check By Librarian") {
                            actVal = '-';
                            statusVal = <Status type="warning" val="Waiting Check By Librarian" />
                        } else {
                            actVal = '-';
                            statusVal = '';
                        }

                        row.push(<td className="text-center" >{no++}</td>);
                        row.push(<td className="text-center" >{actVal}</td>);
                        if (this.state.role === "ROLE_ADMIN") {
                            row.push(<td className="text-center" >{rent.borrower}</td>);
                        }
                        row.push(<td>{rent.noInvoice}</td>);
                        row.push(<td>{this.formatRupiah(rent.grandTotal)}</td>);
                        row.push(<td className="text-center text-nowrap" >{this.convertToDate(rent.invoiceDate)}</td>);
                        if (rent.paymentDate === null) {
                            row.push(<td>-</td>);
                        } else {
                            row.push(<td className="text-center text-nowrap" >{this.convertToDate(rent.paymentDate)}</td>);
                        }
                        row.push(<td className="text-center" >{statusVal}</td>);
                        results.push(row);
                    });
                    this.setState({ rows: results });
                }

                $("#example1").DataTable({
                    responsive: true,
                    autoWidth: false,
                });

            });
    }

    async getRole() {
        if (this.state.role === "ROLE_ADMIN") {
            this.setState({ headings: ['No', 'Action', 'Borrower', 'No Invoice', 'Fine Ammount', 'Invoice Date', 'Payment Date', 'Status'] })
        } else {
            this.setState({ headings: ['No', 'Action', 'No Invoice', 'Fine Ammount', 'Invoice Date', 'Payment Date', 'Status'] })
        }
    }

    showButtonPay = () => {
        if (this.state.role === "ROLE_USER") {
            return <Link to="Payment" className="btn-xs btn-block bg-gradient-primary">Pay</Link>
        } else {
            // nothing
        }
    }

    convertToDate = (date) => {
        if (date === null) {
            return "-"
        } else {
            return moment.utc(date).format('DD-MM-YYYY hh:mm')
        }
    }

    formatRupiah = (nilai) => {
        return <NumberFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
    }
    render() {
        const { rows, headings } = this.state;
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
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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
                                            {this.showButtonPay()}
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