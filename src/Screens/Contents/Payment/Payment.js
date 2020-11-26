import React, { Component } from "react";
import "./payment.css";
import $ from "jquery";
import MaxIcon from "../../Auth/Assets/Images/bookshelf.png";
import { Link } from "react-router-dom";
import swal from "sweetalert";

class Payment extends Component {
  componentDidMount() {
    $("#selector").on("change", function () {
      var divClass = $(this).val();
      $(".detail").hide();
      console.log(divClass);
      $("." + divClass).slideDown("medium");
    });
  }

  paymentSuccessful() {
    swal("Success", "Your Payment has been Accepted", "success")
  }

  paymentDeclined() {
    swal({
      icon: 'error',
      title: 'Declined',
      text: 'Sorry, Your Current Balance is Insufficient',
      buttons: {
        cancel: "OK",
        catch: {
          text: "Go to Top Up",
          value: "catch"
        }
      }
    }).then((value) => {
      switch(value) {
        case "catch":
          window.location.href='/TopUp'
          break;
      }
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Fine Payment</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="fine_management.html">Fine Management</a>
                  </li>
                  <li class="breadcrumb-item active">Fine Payment</li>
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
                        id="selector"
                      >
                        <option>Select Invoice</option>
                        <option value="invoice-1">Invoice #007612</option>
                        <option value="invoice-2">Invoice #007783</option>
                        <option value="invoice-3">Invoice #007790</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="form-group balance-display">
                      <label>Current Balance: </label>
                      <p className="balance-value">Rp. 50.000</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="hd-payment invoice-1 detail">
                  <h3>Invoice</h3>
                  <div className="invoice p-3 mb-3">
                    {/* <!-- title row --> */}
                    <div className="row">
                      <div className="col-12">
                        <h4>
                          <img src={MaxIcon} style={{ height: "2rem" }} />{" "}
                          Maxwell Library
                          <small className="float-right">
                            Date: 19/11/2020
                          </small>
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
                          <strong>Niki Zefanya</strong>
                          <br />
                          795 Folsom Ave, Suite 600
                          <br />
                          San Francisco, CA 94107
                          <br />
                          Phone: (555) 539-1037
                          <br />
                          Email: john.doe@example.com
                        </address>
                      </div>
                      {/* <!-- /.col --> */}
                      <div className="col-sm-4 invoice-col">
                        <b>Invoice #007612</b>
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
                              <th>Late By</th>
                              <th>Fine Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>Dilan 1990</td>
                              <td>16/11/2020</td>
                              <td>18/11/2020</td>
                              <td>2 Days</td>
                              <td>Rp. 10.000</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>Harry Potter</td>
                              <td>16/11/2020</td>
                              <td>18/11/2020</td>
                              <td>2 Days</td>
                              <td>Rp. 10.000</td>
                            </tr>
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
                        <p className="lead" style={{ float: "right" }}>
                          Amount Due 25/11/2020
                        </p>

                        <div className="table-responsive">
                          <table className="table">
                            <tr>
                              <th style={{ width: "59%" }}>Total:</th>
                              <td>Rp. 20.000</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}

                    {/* <!-- this row will not appear when printing --> */}
                    <div className="row no-print">
                      <div className="col-12">
                        <Link to="/PaymentPrint">
                          <a target="_blank" className="btn btn-default">
                            <i className="fas fa-print"></i> Print
                          </a>
                        </Link>
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-confirm"
                          className="btn btn-success float-right"
                        >
                          <i className="far fa-credit-card"></i> Pay
                        </button>
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-decline"
                          className="btn btn-danger float-right custom-dcl"
                        >
                          <i className="far fa-credit-card"></i> Pay (Declined)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hd-payment invoice-2 detail">
                  <h3>Invoice</h3>
                  <div className="invoice p-3 mb-3">
                    {/* <!-- title row --> */}
                    <div className="row">
                      <div className="col-12">
                        <h4>
                          <img src={MaxIcon} style={{ height: "2rem" }} />{" "}
                          Maxwell Library
                          <small className="float-right">
                            Date: 18/11/2020
                          </small>
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
                          <strong>Niki Zefanya</strong>
                          <br />
                          795 Folsom Ave, Suite 600
                          <br />
                          San Francisco, CA 94107
                          <br />
                          Phone: (555) 539-1037
                          <br />
                          Email: john.doe@example.com
                        </address>
                      </div>
                      {/* <!-- /.col --> */}
                      <div className="col-sm-4 invoice-col">
                        <b>Invoice #007783</b>
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
                              <th>Late By</th>
                              <th>Fine Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>Fantastic Beasts</td>
                              <td>15/11/2020</td>
                              <td>17/11/2020</td>
                              <td>3 Days</td>
                              <td>Rp. 15.000</td>
                            </tr>

                            <tr>
                              <td>2.</td>
                              <td>Brief Answer to The Big Question</td>
                              <td>15/11/2020</td>
                              <td>17/11/2020</td>
                              <td>3 Days</td>
                              <td>Rp. 15.000</td>
                            </tr>
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
                        <p className="lead float-right">
                          Amount Due 19/11/2020
                        </p>

                        <div className="table-responsive">
                          <table className="table">
                            <tr>
                              <th style={{ width: "59%" }}>Total:</th>
                              <td>Rp. 30.000</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}

                    {/* <!-- this row will not appear when printing --> */}
                    <div className="row no-print">
                      <div className="col-12">
                        <a
                          href="payment_invoice_print.html"
                          target="_blank"
                          className="btn btn-default"
                        >
                          <i className="fas fa-print"></i> Print
                        </a>
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-confirm"
                          className="btn btn-success float-right "
                        >
                          <i className="far fa-credit-card"></i> Pay
                        </button>
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-decline"
                          className="btn btn-danger float-right custom-dcl"
                        >
                          <i className="far fa-credit-card"></i> Pay (Declined)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hd-payment invoice-3 detail">
                  <h3>Invoice</h3>
                  <div className="invoice p-3 mb-3">
                    {/* <!-- title row --> */}
                    <div className="row">
                      <div className="col-12">
                        <h4>
                          <img src={MaxIcon} style={{ height: "2rem" }} />{" "}
                          Maxwell Library
                          <small className="float-right">
                            Date: 20/11/2020
                          </small>
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
                          <strong>Niki Zefanya</strong>
                          <br />
                          795 Folsom Ave, Suite 600
                          <br />
                          San Francisco, CA 94107
                          <br />
                          Phone: (555) 539-1037
                          <br />
                          Email: john.doe@example.com
                        </address>
                      </div>
                      {/* <!-- /.col --> */}
                      <div className="col-sm-4 invoice-col">
                        <b>Invoice #007790</b>
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
                              <th>Late By</th>
                              <th>Fine Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>Ubur-ubur Lembur</td>
                              <td>17/11/2020</td>
                              <td>19/11/2020</td>
                              <td>1 Days</td>
                              <td>Rp. 5.000</td>
                            </tr>

                            <tr>
                              <td>2.</td>
                              <td>Harry Potter</td>
                              <td>17/11/2020</td>
                              <td>19/11/2020</td>
                              <td>1 Days</td>
                              <td>Rp. 5.000</td>
                            </tr>
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
                        <p className="lead float-right">
                          Amount Due 24/11/2020
                        </p>

                        <div className="table-responsive">
                          <table className="table">
                            <tr>
                              <th style={{ width: "59%" }}>Total:</th>
                              <td>Rp. 10.000</td>
                            </tr>
                          </table>
                        </div>
                      </div>
                      {/* <!-- /.col --> */}
                    </div>
                    {/* <!-- /.row --> */}

                    {/* <!-- this row will not appear when printing --> */}
                    <div className="row no-print">
                      <div className="col-12">
                        <a
                          href="payment_invoice_print.html"
                          target="_blank"
                          className="btn btn-default"
                        >
                          <i className="fas fa-print"></i> Print
                        </a>
                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-confirm"
                          className="btn btn-success float-right"
                        >
                          <i className="far fa-credit-card"></i> Pay
                        </button>

                        <button
                          type="submit"
                          data-toggle="modal"
                          data-target="#modal-decline"
                          className="btn btn-danger float-right custom-dcl"
                        >
                          <i className="far fa-credit-card"></i> Pay (Declined)
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <!--Modal Add--> */}
        <div class="modal fade" id="modal-confirm">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Confirm Payment</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="card-body">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Your Current Balance</td>
                        <td>Rp. 50.000</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Invoice Total</b>
                        </td>
                        <td>Rp. 20.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer justify-content-between">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-warning"
                  id="btn-pay"
                  data-dismiss="modal"
                  onClick={() => this.paymentSuccessful()}
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

        {/* <!--Modal Declined--> */}
        <div class="modal fade" id="modal-decline">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Confirm Payment</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="card-body">
                  <table class="table table-bordered table-striped">
                    <tbody>
                      <tr>
                        <td>Your Current Balance</td>
                        <td>Rp. 10.000</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Invoice Total</b>
                        </td>
                        <td>Rp. 20.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="modal-footer justify-content-between">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-warning"
                  id="btn-declined"
                  data-dismiss="modal"
                  onClick={() => this.paymentDeclined()}
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

export default Payment;
