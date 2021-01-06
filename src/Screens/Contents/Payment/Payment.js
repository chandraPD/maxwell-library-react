import React, { Component } from "react";
import "./payment.css";
import MaxIcon from "../../Auth/Assets/Images/bookshelf.png";
import { Link, withRouter } from "react-router-dom";
import Swal from 'sweetalert2'
import Axios from '../../../Instances/axios-instances';
import NumberFormat from 'react-number-format';

class Payment extends Component {
   
   interval = null;
   constructor() {
      super();
      this.state = {
         balance: '',
         grandTotal: '',
         invoiceId: '',
         invoiceNeedPaid: [],
         dataInvoice: [],
         dataDetailInvoice: [],
      };
      this.reNewBalance();
   }

   componentDidMount() {
      const invoiceId = this.props.match.params.invoiceId;
      this.fetchDataInvoiceNeedPaid();
      this.getBalance();
      if (invoiceId) {
         this.setState({ invoiceId: invoiceId });
         this.getDetailInvoiceByInvoiceId(invoiceId);
      } else {
         this.setState({ invoiceId: "" });
      }
      this.interval = setInterval(this.reNewBalance, 5000);
   }

   formatRupiah = (nilai) => {
      return <NumberFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
   }

   handleChange = (event) => {
      var invoiceId = event.target.value;
      this.setState({ invoiceId: invoiceId });
      if (invoiceId === "") {
         return this.setState({ dataInvoice: "", dataDetailInvoice: "" });
      } else {
         this.getDetailInvoiceByInvoiceId(invoiceId);
      }
   }

   async getBalance() {
      const balance = await Axios.get('top_up_management/getBalance');
      this.setState({ balance: balance.data });
   }


   componentWillUnmount() {
      clearInterval(this.interval);
   }


   reNewBalance = () => {
      this.setState({
         balance: JSON.parse(localStorage.getItem('balance')),
      })
   }

   async fetchDataInvoiceNeedPaid() {
      const getData = await Axios.get('invoice/user/get-all-need-paid');
      this.setState({ invoiceNeedPaid: getData.data.data });

   }

   async getDetailInvoiceByInvoiceId(invoiceId) {
      try {
         const getInvoice = await Axios.get(`invoice/get-by-id/${invoiceId}`)
         const getInvoiceDetail = await Axios.get(`invoice-detail/get-by-invoice-id/${invoiceId}`)
         this.setState({ dataInvoice: getInvoice.data.data, dataDetailInvoice: getInvoiceDetail.data.data, grandTotal: getInvoice.data.data.grandTotal })
      } catch (err) {
         console.log(err);
      }
   }

   confirmPaid = () => {

      console.log(this.state.grandTotal);
      console.log(this.state.balance);
      if (this.state.grandTotal <= this.state.balance) {
         Axios.put()
         Swal.fire("Success", "Your Payment has been Accepted", "success")
      } else {
         Swal.fire({
            icon: 'error',
            title: 'Declined',
            text: 'Sorry, Your Current Balance is Insufficient.',
            showDenyButton: true,
            showConfirmButton: true,
            confirmButtonText: `Top Up`,
            denyButtonText: `OK`
         }).then((result) => {
            if (result.isConfirmed) {
               // this.props.history.push('/TopUp')
            }
            else {

            }
         })
      }

   }

   paymentDeclined() {
      Swal.fire({
         icon: 'error',
         title: 'Declined',
         text: 'Sorry, Your Current Balance is Insufficient.',
         showDenyButton: true,
         showConfirmButton: true,
         confirmButtonText: `Top Up`,
         denyButtonText: `OK`
      }).then((result) => {
         if (result.isConfirmed) {
            this.props.history.push('/TopUp')
         }
         else {

         }
      })
   }

   render() {
      const { invoiceId, invoiceNeedPaid, dataInvoice, dataDetailInvoice, balance } = this.state;
      let cardBody, action;

      if (dataInvoice != "") {

         if (dataInvoice.statusInvoice === "Waiting For Payment") {
            action =
               <button
                  type="submit"
                  data-toggle="modal"
                  data-target="#modal-confirm"
                  className="btn btn-success float-right"
               >
                  <i className="far fa-credit-card"></i> Pay
               </button>
         } else {
            action = ""
         }
         cardBody = <div className="card-body">
            <div>
               <div className="invoice p-3 mb-3">
                  {/* <!-- title row --> */}
                  <div className="row">
                     <div className="col-12">
                        <h4>
                           <img src={MaxIcon} style={{ height: '2rem' }} /> Maxwell Library <small className="float-right">Date: {dataInvoice.invoiceDate}</small>
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
                        <b>Invoice {dataInvoice.noInvoice}</b><br />
                        <br />
                     </div>
                     {/* <!-- /.col --> */}
                  </div>
                  {/* <!-- /.row --> */}

                  {/* <!-- Table row --> */}
                  <div className="row">
                     <div className="col-12 table-responsive">
                        <table className="table table-striped">
                           <thead>
                              <tr>
                                 <th>No.</th>
                                 <th>Book Title</th>
                                 <th>Borrowed On</th>
                                 <th>Due On</th>
                                 <th>Type</th>
                                 <th>Late By</th>
                                 <th>Fine Amount</th>
                              </tr>
                           </thead>
                           <tbody>
                              {
                                 dataDetailInvoice.map((val, index) => {
                                    return (
                                       <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{val.title}</td>
                                          <td>{val.borrowedDate}</td>
                                          <td>{val.treshold}</td>
                                          <td>{val.type}</td>
                                          <td>{val.late} Days</td>
                                          <td>{val.grandTotal}</td>
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
                        <p className="lead" style={{ float: 'right' }}>Amount Due {dataInvoice.treshold}</p>
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
         <div className="content-wrapper">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
               <div className="container-fluid">
                  <div className="row mb-2">
                     <div className="col-sm-6">
                        <h1>Fine Payment</h1>
                     </div>
                     <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                           <li className="breadcrumb-item">
                              <Link to="/">Home</Link>
                           </li>
                           <li className="breadcrumb-item">
                              <Link to="/FineManagement">Fine Management</Link>
                           </li>
                           <li className="breadcrumb-item active">Fine Payment</li>
                        </ol>
                     </div>
                  </div>
               </div>
               {/* <!-- /.container-fluid --> */}
            </section>

            <section className="content">
               <div className="container-fluid">
                  <div className="card">
                     <div className="card-header">
                        <div className="row">
                           <div className="col-sm-6">
                              <div className="form-group">
                                 <label>Select Invoice: </label>
                                 <select
                                    className="form-control inv-selector"
                                    id="invoice"
                                    onChange={this.handleChange}
                                    value={invoiceId}
                                 >
                                    <option value="" >Select Invoice</option>
                                    {
                                       invoiceNeedPaid.map((val, index) => {
                                          return (
                                             <option key={index} value={val.invoiceId} >{val.noInvoice}</option>
                                          )
                                       })
                                    }
                                 </select>
                              </div>
                           </div>

                           <div className="col-sm-6">
                              <div className="form-group balance-display">
                                 <label>Current Balance: </label>
                                 <p className="balance-value"> {this.formatRupiah(balance)} </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     {cardBody}
                  </div>
               </div>
            </section>

            {/* <!--Modal Add--> */}
            <div className="modal fade" id="modal-confirm">
               <div className="modal-dialog">
                  <div className="modal-content">
                     <div className="modal-header">
                        <h4 className="modal-title">Confirm Payment</h4>
                        <button
                           type="button"
                           className="close"
                           data-dismiss="modal"
                           aria-label="Close"
                        >
                           <span aria-hidden="true">&times;</span>
                        </button>
                     </div>
                     <div className="modal-body">
                        <div className="card-body">
                           <table className="table table-bordered table-striped">
                              <tbody>
                                 <tr>
                                    <td>Your Current Balance</td>
                                    <td>{this.formatRupiah(balance)}</td>
                                 </tr>
                                 <tr>
                                    <td>
                                       <b>Invoice Total</b>
                                    </td>
                                    <td>{this.formatRupiah(`${dataInvoice.grandTotal}`)}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                     <div className="modal-footer justify-content-between">
                        <button
                           type="button"
                           className="btn btn-default"
                           data-dismiss="modal"
                        >
                           Cancel
                </button>
                        <button
                           type="submit"
                           className="btn btn-warning"
                           id="btn-pay"
                           data-dismiss="modal"
                           onClick={this.confirmPaid}
                        >
                           Confirm
                </button>
                     </div>
                  </div>
                  {/* <!-- /.modal-content --> */}
               </div>
               {/* <!-- /.modal-dialog --> */}
            </div>
            {/* <!-- /.modal --> */}
         </div>
      );
   }
}

export default withRouter(Payment);
