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
class RentManagement extends Component {

    constructor() {
        super();
        this.state = {
            data: [], // Raw data
            rows: [],
            results: [],
        };
    }
    componentDidMount() {
        this.fetchData();
    }

    acceptRent(id) {
        Axios.put('borrow/acc-act/' + id)
            .then((data) => {
                Swal.fire('Saved!', 'Rent has been Accepted!', 'success')
                this.fetchData();
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
                        Swal.fire('Saved!', 'Rent has been Canceled!', 'success')
                        window.location.reload()
                    });
            }
        });
    }

    async fetchData() {
        $('#example1').DataTable().destroy();
        const results = [];
        var no = 1;
        await Axios.get('borrow/get-all')
            .then((getData) => {
                const result = getData.data.data;
                this.setState({ data: result });
                console.log(result);
                result.map((rent) => {
                    var row = [];
                    var actVal, statusVal = "";
                    if (rent.statusBook === "Waiting Given By Librarian") {
                        actVal = <div className="btn-group btn-group-sm">
                            <Action type="primary" onClick={() => this.acceptRent(rent.borrowedBookId)} title="Accept" icon="check-square" />
                            <Action type="danger" onClick={() => this.cancelRent(rent.borrowedBookId)} title="Cancel" icon="window-close" /></div>
                        statusVal = <Status type="primary" val="Waiting Given By Librarian" />
                    } else if (rent.statusBook === "Waiting For Return") {
                        actVal = <div className="btn-group btn-group-sm"><Action type="info" link="ReturnBook" title="Return" icon="exchange-alt" /></div>
                        statusVal = <Status type="info" val="Waiting For Return" />
                    } else if (rent.statusBook === "Need Immediate Returns") {
                        actVal = <div className="btn-group btn-group-sm"><Action type="info" link="ReturnBook" title="Return" icon="exchange-alt" /></div>
                        statusVal = <Status type="orange" val="Need Immediate Returns" />
                    } else if (rent.statusBook === "Waiting Taken By Librarian") {
                        actVal = <div className="btn-group btn-group-sm"><Action type="primary" onClick={() => this.acceptRent(rent.borrowedBookId)} title="Accept" icon="check-square" /></div>
                        statusVal = <Status type="primary" val="Waiting Taken By Librarian" />
                    } else if (rent.statusBook === "Waiting for Payment of Fines") {
                        actVal = <div className="btn-group btn-group-sm"><Action type="secondary" link={`/PaymentDetail/${rent.rent_id}`} title="Payment" icon="file-invoice" /></div>
                        statusVal = <Status type="warning" val="Waiting for Payment of Fines" idUser={rent.rent_id} />
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

                    row.push(<td className="text-center" >{no++}</td>);
                    row.push(<td className="text-center" >{actVal}</td>);
                    row.push(<td className="text-center" >{rent.borrowedBookCode}</td>);
                    row.push(<td className="text-center" >{rent.borrower}</td>);
                    row.push(<td>{rent.id_book}</td>);
                    row.push(<td>{rent.title}</td>);
                    row.push(<td>{rent.givenBy}</td>);
                    row.push(<td>{rent.borrowedDate}</td>);
                    row.push(<td className="text-center" >{rent.threshold}</td>);
                    row.push(<td>{rent.returnedDate}</td>);
                    row.push(<td className="text-center" >{rent.takenBy}</td>);
                    row.push(<td>{rent.grandTotal}</td>);
                    row.push(<td className="text-center" >{statusVal}</td>);
                    results.push(row);
                });
                this.setState({ rows: results });

                $("#example1").DataTable({
                    responsive: true,
                    autoWidth: false,
                });
            });

    }


    render() {
        const { rows } = this.state;
        const headings = [
            'No',
            'Action',
            'Rent ID',
            'Borrower',
            'ID Book',
            'Title',
            'Given By',
            'Date Borrowed',
            'Due On',
            'Date of Return',
            'Given By',
            'Fine',
            'Status'
        ];

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
                                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
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
                                            <Link to="ReturnBook" className="btn-xs btn-block bg-gradient-primary">Return</Link>
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