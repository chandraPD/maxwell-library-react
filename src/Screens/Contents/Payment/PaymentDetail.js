import React, { Component } from "react";
import "./payment.css";
import $ from "jquery";
import MaxIcon from "../../Auth/Assets/Images/bookshelf.png";
import { Link, withRouter } from "react-router-dom";
import Swal from 'sweetalert2'

class Payment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userId: '',
             detailUser: {}
        }
    }
    

  componentDidMount() {
    const userId = this.props.match.params.userId
    this.getDetailUser(userId)
  }

  async getDetailUser(userId) {
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
    var userData = result[userId - 1]
    this.setState({detailUser: userData})
  }

  paymentSuccessful() {
    Swal.fire("Success", "Your Payment has been Accepted", "success")
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
      if(result.isConfirmed) {
        this.props.history.push('/TopUp')
      }
      else {

      }
    })
  }

  render() {
    const {borrower, date_borrowed, date_of_return, due_on, fine, title} = this.state.detailUser
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
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/FineManagement">Fine Management</a>
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
   
                  <div className="form-group balance-display">
                      <label>Current Balance: </label>
                      <p className="balance-value">Rp. 50.000</p>
                    </div>
                  <div className="col-sm-6">
                    
                  </div>
            
              </div>

              <div className="card-body">
                <div className="invoice-1">
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
                          <strong>{borrower}</strong>
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
                              <td>{title}</td>
                              <td>{date_borrowed}</td>
                              <td>{date_of_return}</td>
                              <td>{due_on} Days</td>
                              <td>Rp. {fine}</td>
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
                              <td>Rp. {fine}</td>
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
                        <Link to="/PaymentPrint" target="_blank">
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
              </div>
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
        <div className="modal fade" id="modal-decline">
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

export default withRouter(Payment);
