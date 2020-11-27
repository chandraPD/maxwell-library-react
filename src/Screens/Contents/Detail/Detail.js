import React, { Component, useState } from 'react';
import './Detail.style.css'
import Swal from 'sweetalert2';
import foto from '../../../Assets/Media/books/covernya2.png'
import foto2 from '../../../Assets/Media/books/novel-dilan.jpg'
import foto3 from '../../../Assets/Media/books/buku-seni-minimalis.jpg'
import foto4 from '../../../Assets/Media/books/novel-milea.jpg'
import Date from '../../../Components/Datepicker/Dates'

class Detail extends Component {

  render() {

    return (

      <div>
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}

            <section className="content-header">
              <div className="container-fluid">
                <div className="button">
                  <div className="back-btn">
                    <a href="/" className="button-arrow" role="button"><i className="fas fa-arrow-left arrow" /></a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <img className="big-preview" width="1600px" height="1200px" />
                    <div className="menu-right">
                      <ul className="menuhead">
                        <li><a href="#" data-toggle="modal" data-target="#ModalBook">Edit</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#deleteModal">Delete</a></li>
                      </ul>
                      <img className="small-preview" src={foto} />
                    </div>
                  </div>
                </div>
              </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
              <div className="category">
                <p>Novel</p>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <h1 className="titletext">Dilan 1991</h1>
                  </div>
                  <div className="col-sm-6">
                    <h1 className="statustext">Available</h1>
                  </div>
                </div>
                <p className="date">08 November 2020</p>
                <div className="row">
                  <div className="col-sm-8">
                    <p className="content">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac diam eget est rutrum ultrices. Donec
                      laoreet enim a massa dapibus, cursus egestas dui pulvinar. Proin sit amet accumsan lectus. Nullam auctor
                      auctor consequat. Donec semper magna erat, sed fringilla lacus pretium eget. Cras porttitor, nibh sit
                      amet interdum bibendum, nibh velit accumsan tellus, vel vehicula tellus leo vitae ipsum. Praesent sit
                      amet libero sed orci ullamcorper efficitur. Pellentesque in euismod purus, sit amet ultrices tortor.
                      Vestibulum ante dui, tempor at dui id, tincidunt euismod diam. Integer pellentesque massa nibh, ac
                      eleifend odio malesuada sed. Phasellus orci sem, cursus nec orci ut, accumsan facilisis lacus. Nullam at
                      elementum nibh, ac gravida felis. In sagittis rhoncus nisi tempus dignissim. Sed fringilla consequat
                      ante vitae lobortis. Cras posuere ligula vel enim suscipit malesuada. Vivamus non nulla ut ante
                      imperdiet euismod quis nec massa.
                  </p>
                  </div>
                </div>
                <div className="borrowbutton">
                  <button id="button_borrow" value="borrow" className="btn btn-warning" href="#" data-toggle="modal" data-target="#BorrowModal">Borrow</button>
                </div>
              </div>
            </section>
            <section>
              {/*Adding list books*/}
              <div className="list-title">
                <h4>Recommended</h4><br />
              </div>
              <div className="row" id="recomended">
                <div className="col-xs-4 col-sm-4 col-lg-4">
                  <div className="card" id="recomendedcard">
                    <img src={foto2} className="card-img-top" alt="Dilan 1991" />
                    <div className="card-body">
                      <h5 className="recommend-title">Dilan 1991</h5>
                      <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati aspernatur enim
                      ullam officia ... </p>
                      <a className="recomendedcard-read btn" href="#">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4">
                  <div className="card" id="recomendedcard">
                    <img src={foto3} className="card-img-top" alt="Dilan 1991" />
                    <div className="card-body">
                      <h5 className="recommend-title">Seni Hidup Minimalis</h5>
                      <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati aspernatur enim
                      ullam officia ... </p>
                      <a className="recomendedcard-read btn" href="#">Read More</a>
                    </div>
                  </div>
                </div>
                <div className="col-xs-4 col-sm-4 col-lg-4">
                  <div className="card" id="recomendedcard">
                    <img src={foto4} className="card-img-top" alt="Milea" />
                    <div className="card-body">
                      <h5 className="recommend-title">Milea</h5>
                      <p className="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati aspernatur enim
                      ullam officia ... </p>
                      <a className="recomendedcard-read btn" href="#">Read More</a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* /.content */}
          </div>
        </div>
        {/* /.modal */}
        <div className="modal fade" id="deleteModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Do you want to delete?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">If you delete this, you can't be returned</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                <a className="btn btn-danger" id="btn-delete" href="#" data-dismiss="modal" onClick={() => Swal.fire('Success!', 'Success Delete Book!', 'success')}>Delete</a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="cancelModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Do you want to cancel?</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">Are you serious want to cancel?</div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                <a className="btn btn-danger" id="btn-delete" href="#" data-dismiss="modal" data-toggle="modal" data-target="#CancelModal" onclick="clickstatus()">Cancel</a>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="CancelModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cancel Complete!</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <img className="check" src="./assets/media/check.png" />
                <p>Book already Canceled to borrow</p>
              </div>
              <div className="modal-footer">
                <button id="btn" className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="ModalBook" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content" id="edit-module">
              <div className="modal-header">
                <h5 className="modal-title" id="modal-title">Edit Data</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-lg-2">
                    <label className="title-module">Url Image</label>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" name="url" className="form-control" placeholder="/assets/background.png" />
                  </div>
                </div>
                <hr className="divider" />
                <div className="row">
                  <div className="col-lg-2">
                    <label className="title-module">Book Tittle</label>
                  </div>
                  <div className="col-lg-4">
                    <input type="text" name="title" className="form-control" placeholder="Dilan 1991" />
                  </div>
                </div>
                <hr className="divider" />
                <div className="row">
                  <div className="col-lg-2">
                    <label className="title-module">Date:</label>
                  </div>
                  <div className="col-lg-4">
                    <div className="input-group date" id="datetimepicker4" data-target-input="nearest">
                      <input type="text" name="date" className="form-control datetimepicker-input" data-target="#datetimepicker4" />
                      <div className="input-group-append" data-target="#datetimepicker4" data-toggle="datetimepicker">
                        <div className="input-group-text"><i className="fa fa-calendar" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div className="row">
                  <div className="col-lg-2">
                    <label className="title-module">Category</label>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <select className="form-control" name="category">
                        <option value>Choose Category</option>
                        <option value="Novel">Novel</option>
                        <option value="Comic Book">Comic Book</option>
                        <option value="Detective and Mystery">Detective and Mystery</option>
                        <option value="Historical Fiction">Historical Fiction</option>
                        <option value="Horror">Horror</option>
                        <option value="literary Fiction">literary Fiction</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr className="divider" />
                <div className="row">
                  <div className="col-lg-2">
                    <label className="title-module">Description</label>
                  </div>
                  <hr className="divider" />
                  <div className="col-lg-10">
                    <textarea name="description" className="ckeditor" cols={50} rows={5} placeholder="Type Here" defaultValue={""} />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                <button id="confirmBook" className="btn btn-warning" data-dismiss="modal" onClick={() => Swal.fire('Success!', 'Success Edit Book Data!', 'success')}>Save</button>
              </div>
            </div>
          </div>
        </div>
        <div className="modal fade" id="BorrowModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="edit-module">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Borrow Book</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <hr className="divider" />
                <div className="row">
                  <div className="col-md-3">
                    <label className="title-module">Username:</label>
                  </div>
                  <div className="col-md-6">
                    <input type="text" name="name" className="form-control" readOnly placeholder="Niki Zefanya" />
                  </div>
                </div>
                <hr className="divider" />
                <div className="row">
                  <div className="col-md-3">
                    <label className="title-module">Date Borrow:</label>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group date" id="datetimepicker5" data-target-input="nearest">
                      <Date />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-warning" id="btn-delete" href="#" data-dismiss="modal" onClick={() => Swal.fire({
                    title: "Success Borrow Book!",
                    text: "You Already Success to borrow this book!",
                    icon: "success",
                    buttons: true,
                  })}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Detail;