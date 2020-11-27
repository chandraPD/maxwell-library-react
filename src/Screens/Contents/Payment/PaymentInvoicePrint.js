import React, { Component } from "react";
import MaxIcon from '../../Auth/Assets/Images/bookshelf.png'

class PaymentInvoicePrint extends Component {
  
  componentDidMount() {
    window.addEventListener("load", window.print());
  }  

  render() {
    return (
      <div className="wrapper">
        <section className="invoice">
          {/* <!-- title row --> */}
          <div className="row">
            <div className="col-12">
              <h4>
                <img
                  src={MaxIcon}
                  style={{height: "2rem"}}
                />{" "}
                Maxwell Library
                <small className="float-right">Date: 19/11/2020</small>
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
              <p className="lead" style={{float:"right"}}>
                Amount Due 25/11/2020
              </p>

              <div className="table-responsive">
                <table className="table">
                  <tr>
                    <th style={{width:"50%"}}>Subtotal:</th>
                    <td>Rp. 20.000</td>
                  </tr>
                </table>
              </div>
            </div>
            {/* <!-- /.col --> */}
          </div>
          {/* <!-- /.row --> */}

          {/* <!-- /.row --> */}
        </section>
      </div>
    );
  }
}

export default PaymentInvoicePrint;
