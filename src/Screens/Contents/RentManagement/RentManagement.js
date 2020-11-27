import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'
import Action from '../../../Components/Datatable/Action'
import Status from '../../../Components/Datatable/Status'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

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

    acceptRent() {
        Swal.fire('Saved!', 'Rent has been Accepted!', 'success')
    }

    cancelRent() {
        Swal.fire({
            title: 'Do you want to Cancel this Rent?',
            showCancelButton: true,
            confirmButtonText: `Yes`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', 'Rent has been Canceled!', 'success')
            }
        });
    }


    async fetchData() {
        const results = [];
        const result = [{
            "no": 1,
            "rent_id": 1,
            "borrower": "Rocky",
            "id_book": 1,
            "title": "Can't Buy Me Love",
            "librarian": "Nélie",
            "date_borrowed": "11/21/2020",
            "due_on": 1,
            "date_of_return": "12/23/2019",
            "given_by": "Séréna",
            "fine": "2759.00",
            "status": "Waiting Given By Librarian"
        },
        {
            "no": 2,
            "rent_id": 2,
            "borrower": "Mychal",
            "id_book": 2,
            "title": "Green Dragon",
            "librarian": "Loïc",
            "date_borrowed": "5/22/2020",
            "due_on": 2,
            "date_of_return": "12/27/2019",
            "given_by": "Salomé",
            "fine": "3868.72",
            "status": "Canceled"
        },
        {
            "no": 3,
            "rent_id": 3,
            "borrower": "Avril",
            "id_book": 3,
            "title": "Man, The",
            "librarian": "Renée",
            "date_borrowed": "9/5/2020",
            "due_on": 3,
            "date_of_return": "2/2/2020",
            "given_by": "Styrbjörn",
            "fine": "4074.40",
            "status": "Waiting For Return"
        },
        {
            "no": 4,
            "rent_id": 4,
            "borrower": "Mel",
            "id_book": 4,
            "title": "Frankie and Johnny",
            "librarian": "Clémence",
            "date_borrowed": "8/25/2020",
            "due_on": 4,
            "date_of_return": "3/3/2020",
            "given_by": "Maïlys",
            "fine": "1345.62",
            "status": "Need Immediate Returns"
        },
        {
            "no": 5,
            "rent_id": 5,
            "borrower": "Leelah",
            "id_book": 5,
            "title": "Holes in My Shoes",
            "librarian": "Lèi",
            "date_borrowed": "4/21/2020",
            "due_on": 5,
            "date_of_return": "10/23/2020",
            "given_by": "Miléna",
            "fine": "2564.47",
            "status": "Waiting Taken By Librarian"
        },
        {
            "no": 6,
            "rent_id": 6,
            "borrower": "Moselle",
            "id_book": 6,
            "title": "Orchestra Wives",
            "librarian": "Mélys",
            "date_borrowed": "9/11/2020",
            "due_on": 6,
            "date_of_return": "4/16/2020",
            "given_by": "Salomé",
            "fine": "3183.07",
            "status": "Waiting for Payment of Fines"
        },
        {
            "no": 7,
            "rent_id": 7,
            "borrower": "Poppy",
            "id_book": 7,
            "title": "Valentine Road",
            "librarian": "Cloé",
            "date_borrowed": "5/12/2020",
            "due_on": 7,
            "date_of_return": "3/15/2020",
            "given_by": "Maëlla",
            "fine": "2861.25",
            "status": "Returned"
        },
        {
            "no": 8,
            "rent_id": 8,
            "borrower": "Herve",
            "id_book": 8,
            "title": "Antonio das Mortes (O Dragão da Maldade contra o Santo Guerreiro)",
            "librarian": "Liè",
            "date_borrowed": "7/23/2020",
            "due_on": 8,
            "date_of_return": "2/23/2020",
            "given_by": "Salomé",
            "fine": "2592.99",
            "status": "Returned"
        },
        {
            "no": 9,
            "rent_id": 9,
            "borrower": "Dwayne",
            "id_book": 9,
            "title": "Amigo",
            "librarian": "Méryl",
            "date_borrowed": "9/22/2020",
            "due_on": 9,
            "date_of_return": "8/25/2020",
            "given_by": "Marlène",
            "fine": "3807.31",
            "status": "Returned"
        },
        {
            "no": 10,
            "rent_id": 10,
            "borrower": "Yul",
            "id_book": 10,
            "title": "Km. 0 - Kilometer Zero (Kilómetro cero)",
            "librarian": "Adélaïde",
            "date_borrowed": "1/28/2020",
            "due_on": 10,
            "date_of_return": "3/30/2020",
            "given_by": "Håkan",
            "fine": "4514.91",
            "status": "Returned"
        }]

        result.map((rent) => {
            var row = [];
            var actVal, statusVal = '';
            if (rent.status == 'Waiting Given By Librarian') {
                actVal = <div className="btn-group btn-group-sm">
                    <Action type="primary" onClick={this.acceptRent} title="Accept" icon="check-square" />
                    <Action type="danger" onClick={this.cancelRent}  title="Cancel" icon="window-close" /></div>
                statusVal = <Status type="primary" val="Waiting Given By Librarian" />
            } else if (rent.status == 'Waiting For Return') {
                actVal = <div className="btn-group btn-group-sm"><Action type="info" link="ReturnBook" title="Return" icon="exchange-alt" /></div>
                statusVal = <Status type="info" val="Waiting For Return" />
            } else if (rent.status == 'Need Immediate Returns') {
                actVal = <div className="btn-group btn-group-sm"><Action type="info" link="ReturnBook" title="Return" icon="exchange-alt" /></div>
                statusVal = <Status type="orange" val="Need Immediate Returns" />
            } else if (rent.status == 'Waiting Taken By Librarian') {
                actVal = <div className="btn-group btn-group-sm"><Action type="primary" onClick={this.acceptRent}  title="Accept" icon="check-square" /><Action type="danger" onClick={this.cancelRent}  title="Cancel" icon="window-close" /></div>
                statusVal = <Status type="primary" val="Waiting Taken By Librarian" />
            } else if (rent.status == 'Waiting for Payment of Fines') {
                actVal = <div className="btn-group btn-group-sm"><Action type="secondary" link="Payment" title="Payment" icon="file-invoice" /></div>
                statusVal = <Status type="warning" val="Waiting for Payment of Fines" />
            } else if (rent.status == 'Returned' || rent.status == 'Canceled') {
                actVal = '-';
                if (rent.status == 'Returned') {
                    statusVal = <Status type="success" val="Returned" />
                } else {
                    statusVal = <Status type="danger" val="Canceled" />
                }
            } else {
                actVal = '-';
            }

            row.push(<td className="text-center" >{rent.no}</td>);
            row.push(<td className="text-center" >{actVal}</td>);
            row.push(<td className="text-center" >{rent.rent_id}</td>);
            row.push(<td className="text-center" >{rent.borrower}</td>);
            row.push(<td>{rent.id_book}</td>);
            row.push(<td>{rent.title}</td>);
            row.push(<td>{rent.librarian}</td>);
            row.push(<td>{rent.date_borrowed}</td>);
            row.push(<td className="text-center" >{rent.due_on}</td>);
            row.push(<td>{rent.date_of_return}</td>);
            row.push(<td className="text-center" >{rent.given_by}</td>);
            row.push(<td>{rent.fine}</td>);
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