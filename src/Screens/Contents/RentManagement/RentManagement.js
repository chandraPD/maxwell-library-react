import React, { Component } from 'react';

class RentManagement extends Component {
    render() {
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
                        <table id="example1" className="table table-bordered table-striped">
                            <thead>
                            <tr className="text-center">
                                <th>No</th>
                                <th>Action</th>
                                <th>Rent ID</th>
                                <th>Borrower</th>
                                <th>ID Book</th>
                                <th>Title</th>
                                <th>Given by</th>
                                <th>Date Borrowed</th>
                                <th>Due On</th>
                                <th>Date of Return</th>
                                <th>Given by</th>
                                <th>Fine</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="text-center">1</td>
                                <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                    <a href="#" className="btn btn-primary" onclick="acceptRent()" title="Accept"><i className="fas fa-check-square" /></a>
                                    <a href="#" className="btn btn-danger" onclick="cancelRent()" title="Cancel"><i className="fas fa-window-close" /></a>
                                </div>
                                </td>
                                <td>001</td>
                                <td>Chandra</td>
                                <td>001</td>
                                <td>Dilan 1991</td>
                                <td>-</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="text-center"><span className="badge bg-primary">Waiting Given By
                                    Librarian</span></td>
                            </tr>
                            <tr>
                                <td className="text-center">2</td>
                                <td className="text-center py-0 align-middle">
                                -
                                </td>
                                <td>002</td>
                                <td>Chandra</td>
                                <td>001</td>
                                <td>Dilan 1991</td>
                                <td>-</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="text-center"><span className="badge bg-danger">Canceled</span>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">3</td>
                                <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                    <a href="return_book.html" className="btn btn-info" title="Return"><i className="fas fa-exchange-alt" /></a>
                                </div>
                                </td>
                                <td>003</td>
                                <td>Chandra</td>
                                <td>002</td>
                                <td>Dilan 1991</td>
                                <td>Librarian</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="text-center"><span className="badge bg-info">Waiting For
                                    Return</span></td>
                            </tr>
                            <tr>
                                <td className="text-center">4</td>
                                <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                    <a href="return_book.html" className="btn btn-info" title="Return"><i className="fas fa-exchange-alt" /></a>
                                </div>
                                </td>
                                <td>004</td>
                                <td>Chandra</td>
                                <td>003</td>
                                <td>Dilan 1991</td>
                                <td>Librarian</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="text-center"><span className="badge bg-orange">Need Immediate
                                    Returns</span></td>
                            </tr>
                            <tr>
                                <td className="text-center">5</td>
                                <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                    <a href="#" className="btn btn-primary" onclick="acceptRent()" title="Accept"><i className="fas fa-check-square" /></a>
                                    <a href="#" className="btn btn-danger" onclick="cancelRent()" title="Cancel"><i className="fas fa-window-close" /></a>
                                </div>
                                </td>
                                <td>005</td>
                                <td>Chandra</td>
                                <td>003</td>
                                <td>Dilan 1991</td>
                                <td>Librarian</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td className="text-center"><span className="badge bg-primary">Waiting Taken By
                                    Librarian</span></td>
                            </tr>
                            <tr>
                                <td className="text-center">6</td>
                                <td className="text-center py-0 align-middle">
                                <div className="btn-group btn-group-sm">
                                    <a href="payment.html" className="btn btn-secondary" title="Payment"><i className="fas fa-file-invoice" /></a>
                                </div>
                                </td>
                                <td>006</td>
                                <td>Chandra</td>
                                <td>004</td>
                                <td>Dilan 1991</td>
                                <td>Librarian</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>24 Nov 2020</td>
                                <td>Librarian</td>
                                <td>Rp 4.000,-</td>
                                <td className="text-center"><span className="badge bg-warning">Waiting for
                                    Payment of Fines</span></td>
                            </tr>
                            <tr>
                                <td className="text-center">7</td>
                                <td className="text-center py-0 align-middle">
                                -
                                </td>
                                <td>007</td>
                                <td>Chandra</td>
                                <td>005</td>
                                <td>Dilan 1991</td>
                                <td>Librarian</td>
                                <td>17 Nov 2020</td>
                                <td>20 Nov 2020</td>
                                <td>24 Nov 2020</td>
                                <td>Librarian</td>
                                <td>Rp 4.000,-</td>
                                <td className="text-center"><span className="badge bg-success">Returned</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        {/* /.card-body */}
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