import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table'

class RentManagement extends Component {
    render() {
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

        const rows = [
            [
                1,
                <div className="btn-group btn-group-sm">
                    <a href="#" className="btn btn-primary" onclick="acceptRent()" title="Accept"><i className="fas fa-check-square" /></a>
                    <a href="#" className="btn btn-danger" onclick="cancelRent()" title="Cancel"><i className="fas fa-window-close" /></a>
                </div>,
                '001',
                'Chandra',
                '001',
                'Dilan 1991',
                '-',
                '17 Nov 2020',
                '20 Nov 2020',
                '-',
                '-',
                '-',
                <span className="badge bg-primary">Waiting Given By Librarian</span>
            ],
            [
                2,
                '-',
                '002',
                'Chandra',
                '001',
                'Dilan 1991',
                '-',
                '17 Nov 2020',
                '20 Nov 2020',
                '-',
                '-',
                '-',
                <span className="badge bg-danger">Canceled</span>
            ],
            [
                3,
                <div className="btn-group btn-group-sm">
                    <a href="return_book.html" className="btn btn-info" title="Return"><i className="fas fa-exchange-alt" /></a>
                </div>,
                '003',
                'Chandra',
                '001',
                'Dilan 1991',
                'Librarian',
                '17 Nov 2020',
                '20 Nov 2020',
                '-',
                '-',
                '-',
                <span className="badge bg-info">Waiting For Return</span>
            ],
            [
                4,
                <div className="btn-group btn-group-sm">
                    <a href="return_book.html" className="btn btn-info" title="Return"><i className="fas fa-exchange-alt" /></a>
                </div>,
                '004',
                'Chandra',
                '001',
                'Dilan 1991',
                'Librarian',
                '17 Nov 2020',
                '20 Nov 2020',
                '-',
                '-',
                '-',
                <span className="badge bg-orange">Need Immediate Returns</span>
            ],
            [
                5,
                <div className="btn-group btn-group-sm">
                    <a href="#" className="btn btn-primary" onclick="acceptRent()" title="Accept"><i className="fas fa-check-square" /></a>
                    <a href="#" className="btn btn-danger" onclick="cancelRent()" title="Cancel"><i className="fas fa-window-close" /></a>
                </div>,
                '005',
                'Chandra',
                '005',
                'Dilan 1991',
                '-',
                '17 Nov 2020',
                '20 Nov 2020',
                '-',
                '-',
                '-',
                <span className="badge bg-primary">Waiting Taken By Librarian</span>
            ],
            [
                6,
                <div className="btn-group btn-group-sm">
                    <a href="payment.html" className="btn btn-secondary" title="Payment"><i className="fas fa-file-invoice" /></a>
                </div>,
                '006',
                'Chandra',
                '006',
                'Dilan 1991',
                'Librarian',
                '17 Nov 2020',
                '20 Nov 2020',
                '24 Nov 2020',
                'Librarian',
                'Rp 4.000,-',
                <span className="badge bg-warning">Waiting for Payment of Fines</span>
            ],
            [
                7,
                '-',
                '007',
                'Chandra',
                '007',
                'Dilan 1991',
                'Librarian',
                '17 Nov 2020',
                '20 Nov 2020',
                '24 Nov 2020',
                'Librarian',
                'Rp 4.000,-',
                <span className="badge bg-success">Returned</span>
            ],
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
                                            <a href="return_book.html" className="btn-xs btn-block bg-gradient-primary">Return</a>
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