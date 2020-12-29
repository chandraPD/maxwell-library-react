import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { Link, withRouter } from 'react-router-dom'
import MaxIcon from "../../Auth/Assets/Images/bookshelf.png";
import Axios from 'axios';

class DetailInvoice extends Component {
    constructor() {
        super();
        this.state = {
            invoiceId: '',
            dataInvoice: [],
            dataDetailInvoice: []
        };
    }
    componentDidMount() {
        const invoiceId = this.props.match.params.invoiceId;
        this.getDetailInvoice(invoiceId);
    }

    async getDetailInvoice(invoiceId) {

        const getInvoice = await Axios.get(`http://localhost:8080/invoice/get-by-id/${invoiceId}`)
        const getInvoiceDetail = await Axios.get(`http://localhost:8080/invoice-detail/get-by-invoice-id/${invoiceId}`)
        console.log(getInvoiceDetail);
        this.setState({ dataInvoice: getInvoice.data.data, dataDetailInvoice: getInvoiceDetail.data.data })
    }

    formatRupiah = (nilai)=> {
       return <NumberFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
    }

    render() {
        const { dataInvoice, dataDetailInvoice } = this.state;
        console.log(dataDetailInvoice);
        return (
            < div className="content-wrapper" >
                {/* Content Header (Page header) */}
                < section className="content-header" >
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Detail Invoice</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="FineManagement">Fine Management</Link></li>
                                    <li className="breadcrumb-item active">Detail Invoice</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section >
                {/* Main content */}
                < section className="content" >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Detail Invoice</h3>
                                    </div>
                                    {/* /.card-header */}
                                    <div className="card-body" id="DetailInvoice">
                                        <div className="invoice-1 detail">
                                            <div className="invoice p-3 mb-3">
                                                {/* title row */}
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h4>
                                                            <img src={MaxIcon} style={{ height: '2rem' }} /> Maxwell Library <small className="float-right">Date: {dataInvoice.invoiceDate}</small>
                                                        </h4>
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* info row */}
                                                <div className="row invoice-info">
                                                    <div className="col-sm-4 invoice-col">
                                                        From
                      <address>
                                                            <strong>Maxwell Library</strong><br />
                        795 Folsom Ave, Suite 600<br />
                        San Francisco, CA 94107<br />
                        Phone: (804) 123-5432<br />
                        Email: maxwell@library.com
                      </address>
                                                    </div>
                                                    {/* /.col */}
                                                    <div className="col-sm-4 invoice-col">
                                                        To
                      <address>
                                                            <strong>{dataInvoice.borrower}</strong><br />
                        {dataInvoice.address}<br />
                        Phone: {dataInvoice.phone}<br />
                        Email: {dataInvoice.email}
                      </address>
                                                    </div>
                                                    {/* /.col */}
                                                    <div className="col-sm-4 invoice-col">
                                                        <b>Invoice {dataInvoice.noInvoice}</b><br />
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* /.row */}
                                                {/* Table row */}
                                                <div className="row">
                                                    <div className="col-12 table-responsive">
                                                        <table className="table table-striped">
                                                            <thead>
                                                                <tr>
                                                                    <th>No.</th>
                                                                    <th>Book Title</th>
                                                                    <th>Borrowed On</th>
                                                                    <th>Due On</th>
                                                                    <th>Late By</th>
                                                                    <th>Fine Amount</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    dataDetailInvoice.map((val, index) =>{
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index+1}</td>
                                                                                <td>{val.title}</td>
                                                                                <td>{val.borrowedDate}</td>
                                                                                <td>{val.treshold}</td>
                                                                                <td>{val.late} Days</td>
                                                                                <td>{val.grandTotal}</td>                                                                                
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* /.row */}
                                                <div className="row">
                                                    {/* accepted payments column */}
                                                    <div className="col-6">
                                                    </div>
                                                    {/* /.col */}
                                                    <div className="col-6">
                                                        <p className="lead" style={{ float: 'right' }}>Amount Due {dataInvoice.treshold}</p>
                                                        <div className="table-responsive">
                                                            <table className="table">
                                                                <tbody><tr>
                                                                    <th style={{ width: '59%' }}>Total:</th>
                                                                    <td>{this.formatRupiah(`${dataInvoice.grandTotal}`)}</td>
                                                                </tr>
                                                                </tbody></table>
                                                        </div>
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* /.row */}
                                                {/* this row will not appear when printing */}
                                                <div className="row no-print">
                                                    <div className="col-12">
                                                        <Link to="PaymentPrintPaid" target="_blank" className="btn btn-default"><i className="fas fa-print" /> Print</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
                </section >
                {/* /.content */}
            </div >

        )
    }
}

export default withRouter(DetailInvoice)