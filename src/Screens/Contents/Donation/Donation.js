import React, { Component } from 'react';
import photo from '../../../Assets/Media/books/donate1.jpg'
import photo1 from '../../../Assets/Media/books/donate2.jpg'
import photo2 from '../../../Assets/Media/books/donate3.jpg'
import Swal from 'sweetalert2'
import Reactdom from 'react-dom'

class Donation extends Component {
    submitdonate() {

    var Email = document.getElementById('inputEmail').value;
    var Name = document.getElementById('inputName').value;
    var PhoneNumber = document.getElementById('inputPhone').value;
    var DonationNumber = document.getElementById('inputBookbybook').value;

    if (Email == ''|| Name == ''|| PhoneNumber == ''|| DonationNumber == ''){
        Swal.fire(
            'Submit Failed !',
            'You should fill in the blank',
            'error'
        );
    }else{
        Swal.fire(
            'Submitted !',
            'You clicked the button!',
            'success'
        );
    }
    }


  render() {
    return (
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid"></div>
          {/* /.container-fluid */}
        </section>
        <section>
          {/*Adding list donate reason*/}
          <div className="list-reason">
            <center>
              {' '}
              <h1 className="title-text">
                GREAT REASONS TO DONATE GOOD USED BOOKS!
              </h1>
            </center>
            <p>
              Even in today’s high-tech world, traditional hard copy books still
              have the amazing ability to offer inspiration, insight and
              education. Sometimes, there’s just nothing better than holding a
              book in your hand, rather than a cell phone or a tablet. Below are
              some fantastic reasons why you should donate good quality used
              books.
            </p>
          </div>
          <div className="row" id="reason">
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card" id="reasoncard">
                <img
                  src={photo}
                  className="card-img-top"
                  alt="donate1"
                />
                <div className="card-body">
                  <h5 className="list-reason">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptate exercitationem reiciendis ipsa? Nihil laborum
                    recusandae, vero voluptate incidunt quas? Dolor ab enim
                    exercitationem sit quam reiciendis officiis sed sapiente
                    aspernatur.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card" id="reasoncard">
                <img
                  src={photo1}
                  className="card-img-top"
                  alt="donate2"
                />
                <div className="card-body">
                  <h5 className="list-reason">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptate exercitationem reiciendis ipsa? Nihil laborum
                    recusandae, vero voluptate incidunt quas? Dolor ab enim
                    exercitationem sit quam reiciendis officiis sed sapiente
                    aspernatur.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xs-4 col-sm-4 col-lg-4">
              <div className="card" id="reasoncard">
                <img
                  src={photo2}
                  className="card-img-top"
                  alt="donate3"
                />
                <div className="card-body">
                  <h5 className="list-reason">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptate exercitationem reiciendis ipsa? Nihil laborum
                    recusandae, vero voluptate incidunt quas? Dolor ab enim
                    exercitationem sit quam reiciendis officiis sed sapiente
                    aspernatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/*Donate Form*/}
          {/* /.card */}
          {/* Horizontal Form */}
          <div className="card card-info">
            <div className="card-header">
              <h3 className="card-title">Donation Form</h3>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form className="form-horizontal">
              <div className="card-body">
                <div className="donate form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-2 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="donate form-group row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-2 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      id="inputName"
                      placeholder="Name"
                    />
                  </div>
                </div>
                <div className="donate form-group row">
                  <label
                    htmlFor="inputDonationtype"
                    className="col-sm-2 col-form-label"
                  >
                    Donation Type
                  </label>
                  <div className="col-sm-10">
                      <select class="custom-select">
                        <option>Person</option>
                        <option>Organization</option>
                      </select>
                  </div>
                </div>
                <div className="donate form-group row">
                  <label
                    htmlFor="inputNumberofphone3"
                    className="col-sm-2 col-form-label"
                  >
                    Phone Number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="phone_number"
                      className="form-control"
                      id="inputPhone"
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="donate form-group row">
                  <label
                    htmlFor="inputNumberofbook"
                    className="col-sm-2 col-form-label"
                  >
                    Total Book by number
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="number_donation"
                      className="form-control"
                      id="inputBookbybook"
                      placeholder="1,2,3,..."
                    />
                  </div>
                </div>
              </div>
              {/* /.card-body */}
              <div className="card-footer">
                <div className="btn-submitform">
                  <a
                    className="btn btn-info float-right"
                      onClick={() => this.submitdonate()}
                  >
                    Submit
                  </a>
                </div>
              </div>
              {/* /.card-footer */}
            </form>
          </div>
        </section>
        {/* /.content-wrapper */}
      </div>
    );
  }
}
 
export default Donation;