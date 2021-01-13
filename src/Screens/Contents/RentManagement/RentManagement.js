import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'
import Action from '../../../Components/Datatable/Action'
import Status from '../../../Components/Datatable/Status'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import Axios from '../../../Instances/axios-instances';
import $ from 'jquery'
import "datatables.net-responsive/js/dataTables.responsive"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import moment from 'moment'
class RentManagement extends Component {

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
            data: [], // Raw data
            rows: [],
            headings: [],
            results: [],
            role: activeRole
        };
    }
    componentDidMount() {
        this.fetchData();
        this.getRole();
    }

    acceptRent(id) {
        Axios.put('borrow/acc-act/' + id)
            .then((data) => {
                const result = data.data;
                if (result.status === 200) {
                    Swal.fire('Saved!', result.message, 'success')
                    this.fetchData();

                } else {
                    Swal.fire('Ups..', result.message, 'warning')
                    this.fetchData();
                }

            });
    }

    cancelRent(id) {
        Swal.fire({
            title: 'Do you want to Cancel this Rent?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Axios.put('borrow/dec-act/' + id)
                    .then((data) => {
                        const results = data.data;
                        if (results.status === 200) {
                            Swal.fire('Saved!', results.message, 'success')
                            this.fetchData();
                        } else {
                            Swal.fire('Ups..', results.message, 'warning')
                        }
                    });
            }
        });
    }

    convertToDate = (date) => {
        if (date === null) {
            return "-"
        } else {
            return moment.utc(date).format('DD-MM-YYYY hh:mm')
        }
    }

    async fetchData() {
        const results = [];
        var no = 1;
        await Axios.get('borrow/get-all')
            .then((getData) => {
                $('#example1').DataTable().destroy();
                const result = getData.data.data;
                this.setState({ data: result });
                result.map((rent) => {
                    var row = [];
                    var actVal, statusVal = "";
                    if (rent.statusBook === "Waiting Given By Librarian") {

                        if (this.state.role === "ROLE_ADMIN") {
                            actVal = <div className="btn-group btn-group-sm">
                                <Action type="primary" onClick={() => this.acceptRent(rent.borrowedBookId)} title="Accept" icon="check-square" />
                                <Action type="danger" onClick={() => this.cancelRent(rent.borrowedBookId)} title="Cancel" icon="window-close" /></div>
                        } else {
                            // empty
                        }

                        statusVal = <Status type="primary" val="Waiting Given By Librarian" />

                    } else if (rent.statusBook === "Waiting For Return") {
                        actVal = "-";
                        statusVal = <Status type="info" val="Waiting For Return" />
                    } else if (rent.statusBook === "Need Immediate Returns") {
                        actVal = "-";
                        statusVal = <Status type="orange" val="Need Immediate Returns" />
                    } else if (rent.statusBook === "Waiting Taken By Librarian") {
                            actVal = "-";
                        statusVal = <Status type="primary" val="Waiting Taken By Librarian" />
                    } else if (rent.statusBook === "Waiting for Payment of Fines") {
                        if (this.state.role === "ROLE_USER") {
                            actVal = <div className="btn-group btn-group-sm"><Action type="secondary" link={`/Payment/${rent.invoiceId}`} title="Payment" icon="file-invoice" /></div>
                        } else {
                            actVal = "-";
                        }
                        statusVal = <Status type="warning" val="Waiting for Payment of Fines" />
                    } else if (rent.statusBook === "Returned" || rent.statusBook == "Canceled") {
                        actVal = "-";
                        if (rent.statusBook === "Returned") {
                            statusVal = <Status type="success" val="Returned" />
                        } else {
                            statusVal = <Status type="danger" val="Canceled" />
                        }
                    } else {
                        actVal = "-";
                    }

                    row.push(<td className="text-center text-nowrap" >{no++}</td>);
                    row.push(<td className="text-center text-nowrap" >{actVal}</td>);
                    row.push(<td className="text-center text-nowrap" >{rent.borrowedBookCode}</td>);
                    if (this.state.role === "ROLE_ADMIN") {
                        row.push(<td className="text-center text-nowrap" >{rent.borrower}</td>);
                    } else {
                        // nothing
                    }
                    row.push(<td>{rent.bookDetailCode}</td>);
                    row.push(<td>{rent.title}</td>);
                    row.push(<td>{rent.givenBy}</td>);
                    row.push(<td className="text-center text-nowrap">{this.convertToDate(rent.borrowedDate)}</td>);
                    row.push(<td className="text-center text-nowrap">{this.convertToDate(rent.threshold)}</td>);
                    row.push(<td className="text-center text-nowrap">{this.convertToDate(rent.returnedDate)}</td>);
                    row.push(<td className="text-center" >{rent.takenBy}</td>);
                    row.push(<td>{rent.grandTotal}</td>);
                    row.push(<td className="text-center" >{statusVal}</td>);
                    results.push(row);
                });
                console.log(results);
                console.log(this.state.headings);
                this.setState({ rows: results });

                $("#example1").DataTable({
                    responsive: true,
                    autoWidth: false,
                });
            });

    }

    async getRole() {
        if (this.state.role === "ROLE_ADMIN") {
            this.setState({ headings: ['No', 'Action', 'Rent ID', 'Borrower', 'Book Code', 'Title', 'Given By', 'Date Borrowed', 'Due On', 'Date of Return', 'Taken By', 'Fine', 'Status'] });
        } else {
            this.setState({ headings: ['No', 'Action', 'Rent ID', 'Book Code', 'Title', 'Given By', 'Date Borrowed', 'Due On', 'Date of Return', 'Taken By', 'Fine', 'Status'] })
        }
    }

    showButtonReturn = () => {
        if (this.state.role === "ROLE_USER") {
            return <Link to="ReturnBook" className="btn-xs btn-block bg-gradient-primary">Return</Link>
        } else if (this.state.role === "ROLE_ADMIN") {
            return <Link to="CheckReturnBook" className="btn-xs btn-block bg-gradient-primary">Check Return Book</Link>
        }
    }

    render() {
        const { rows, headings } = this.state;

        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Rent Management</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active">Rent Management</li>
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
                                        <h3 className="card-title">Rent List</h3>
                                        <div className="card-tools">
                                            {this.showButtonReturn()}
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

export default RentManagement