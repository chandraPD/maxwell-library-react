import React, { Component } from 'react'
import NumberFormat from 'react-number-format';
import { Link, withRouter } from 'react-router-dom'
import MaxIcon from "../../Auth/Assets/Images/bookshelf.png";
import Axios from 'axios';
import moment from 'moment';

class DetailInvoice extends Component {
    constructor() {
        super();
        let user = JSON.parse(localStorage.getItem('user'))
        const userToken = user.token;
        this.state = {
            invoiceId: '',
            dataInvoice: [],
            dataDetailInvoice: [],
            userToken: userToken
        };
    }
    componentDidMount() {
        const invoiceId = this.props.match.params.invoiceId;
        this.getDetailInvoice(invoiceId);
    }

    async getDetailInvoice(invoiceId) {

        const token = this.state.userToken;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const getInvoice = await Axios.get(`http://localhost:8080/invoice/get-by-id/${invoiceId}`, config)
        const getInvoiceDetail = await Axios.get(`http://localhost:8080/invoice-detail/get-by-invoice-id/${invoiceId}`, config)
        console.log(getInvoiceDetail);
        this.setState({ dataInvoice: getInvoice.data.data, dataDetailInvoice: getInvoiceDetail.data.data })
    }

    formatRupiah = (nilai) => {
        return <NumberFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
    }
    convertToDate = (date) => {
        if (date === null) {
            return "-"
        } else {
            return moment.utc(date).format('DD-MM-YYYY hh:mm')
        }
    }
    printStatusPaid = () => {
        if (this.state.dataInvoice.statusInvoice === "Paid") {
            return <h2><font color="green">PAID</font></h2>
        }else if (this.state.dataInvoice.statusInvoice === "Waiting For Payment"){
            return <h2><font color="blue">Waiting For Payment</font></h2>
        }else if (this.state.dataInvoice.statusInvoice === "Canceled"){
            return <h2><font color="red">Canceled</font></h2>
        }
    }

    render() {
        const { dataInvoice, dataDetailInvoice } = this.state;
        let cardBody, action;

        if (dataInvoice != "") {

            cardBody = <div className="card-body">
                <div>
                    <div className="invoice p-3 mb-3">
                        {/* <!-- title row --> */}
                        <div className="row">
                            <div className="col-12">
                                <h4>
                                    <img src={MaxIcon} style={{ height: '2rem' }} /> Maxwell Library <small className="float-right">Date: {this.convertToDate(dataInvoice.invoiceDate)}</small>
                                </h4>
                            </div>
                            {/* <!-- /.col --> */}
                        </div>
                        {/* <!-- info row --> */}
                        <div className="row invoice-info">
                            <div className="col-sm-4 invoice-col">
                                From
            <address>
                                    <strong>Maxwell Library</strong>
                                    <br />
              795 Folsom Ave, Suite 600
              <br />
              San Francisco, CA 94107
              <br />
              Phone: (804) 123-5432
              <br />
              Email: maxwell@library.com
            </address>
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-4 invoice-col">
                                To
                        <address>
                                    <strong>{dataInvoice.borrower}</strong><br />
                                    {dataInvoice.address}<br />
            Phone: {dataInvoice.phone}<br />
            Email: {dataInvoice.email}
                                </address>
                            </div>
                            {/* <!-- /.col --> */}
                            <div className="col-sm-4 invoice-col">
                                <b>Invoice {dataInvoice.noInvoice} <font color="orange" >({dataInvoice.typeInvoice})</font></b><br />
                                <br />
                                {this.printStatusPaid()}
                            </div>
                            {/* <!-- /.col --> */}

                        </div>
                        {/* <!-- /.row --> */}

                        {/* <!-- Table row --> */}
                        <div className="row">
                            <div className="col-12 table-responsive">
                                <table className="table table-striped">
                                    <thead>
                                        <tr className="text-nowrap text-center">
                                            <th>No.</th>
                                            <th>Rent ID</th>
                                            <th>Book Code</th>
                                            <th>Book Title</th>
                                            <th>Borrowed On</th>
                                            <th>Returned Date</th>
                                            <th>Due On</th>
                                            <th>Type</th>
                                            <th>Fine Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataDetailInvoice.map((val, index) => {
                                                console.log(val);
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-nowrap" >{index + 1}</td>
                                                        <td className="text-nowrap text-center" >{val.borrowedBookCode}</td>
                                                        <td className="text-nowrap text-center" >{val.bookDetailCode}</td>
                                                        <td className="text-nowrap text-center" >{val.title}</td>
                                                        <td className="text-nowrap text-center" >{this.convertToDate(val.borrowedDate)}</td>
                                                        <td className="text-nowrap text-center" >{this.convertToDate(val.returnDate)}</td>
                                                        <td className="text-nowrap text-center" >{this.convertToDate(val.threshold)}</td>
                                                        <td className="text-nowrap" >{val.type}</td>
                                                        <td className="text-nowrap" >{this.formatRupiah(val.total)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {/* <!-- /.col --> */}
                        </div>
                        {/* <!-- /.row --> */}

                        <div className="row">
                            {/* <!-- accepted payments column --> */}
                            <div className="col-6"></div>
                            {/* <!-- /.col --> */}
                            <div className="col-6">
                                <p className="lead" style={{ float: 'right' }}>Amount Due {this.convertToDate(dataInvoice.threshold)}</p>
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th style={{ width: "59%" }}>Total:</th>
                                                <td>{this.formatRupiah(`${dataInvoice.grandTotal}`)}</td>
                                            </tr>
                                        </thead>

                                    </table>
                                </div>
                            </div>
                            {/* <!-- /.col --> */}
                        </div>
                        {/* <!-- /.row --> */}

                        {/* <!-- this row will not appear when printing --> */}
                        <div className="row no-print">
                            <div className="col-12">
                                <Link to="/PaymentPrint" target="_blank">
                                    <i className="fas fa-print"></i> Print
                           </Link>
                                {action}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        } else {
            cardBody = "";
            action = "";

        }
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
                                    {cardBody}
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