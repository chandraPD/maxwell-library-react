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

        const Action = props => <a href="#" className={"btn btn-"+props.type} onclick={props.doAct+"()"} title={props.title}><i className={"fas fa-"+props.icon} /></a>
        const Status = props => <span className={"badge bg-"+props.type} >{props.val}</span>
        const rows = [
            [
                1,
                <div className="btn-group btn-group-sm">
                    <Action type="primary" doClick="acceptRent" title="Accept" icon="check-square" />
                    <Action type="danger" doClick="cancelRent" title="Cancel" icon="window-close" />
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
                <Status type="primary" val="Waiting Given By Librarian"/>
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
                <Status type="danger" val="Canceled"/>
            ],
            [
                3,
                <div className="btn-group btn-group-sm">
                    <Action type="info" doClick="acceptRent" title="Return" icon="exchange-alt" />
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
                <Status type="info" val="Waiting For Return"/>
            ],
            [
                4,
                <div className="btn-group btn-group-sm">
                    <Action type="info" doClick="acceptRent" title="Return" icon="exchange-alt" />
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
                <Status type="orange" val="Need Immediate Returns"/>
            ],
            [
                5,
                <div className="btn-group btn-group-sm">
                    <Action type="primary" doClick="acceptRent" title="Accept" icon="check-square" />
                    <Action type="danger" doClick="cancelRent" title="Cancel" icon="window-close" />
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
                <Status type="primary" val="Waiting Taken By Librarian"/>
            ],
            [
                6,
                <div className="btn-group btn-group-sm">
                    <Action type="secondary" title="Payment" icon="file-invoice" />
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
                <Status type="warning" val="Waiting for Payment of Fines"/>
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
                <Status type="success" val="Returned"/>
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