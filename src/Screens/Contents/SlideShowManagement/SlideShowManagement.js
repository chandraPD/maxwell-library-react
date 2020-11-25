import React, { Component } from "react";
import UburLemburImg from '../../../Assets/Media/books/uburlembur.png'
import LaskarPelangiImg from '../../../Assets/Media/books/laskar.png'
import DilanImg from '../../../Assets/Media/books/dilan.png'

class SlideShowManagement extends Component {
  render() {
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"><h3>Slideshow Management</h3></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Slideshow</li>
                </ol>
              </div>
            </div>
          </div>
          {/* <!-- /.container-fluid --> */}
        </section>

        <section className="content pdg-btm">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-md-6">

                </div>
                <div className="col-md-6 ctm-responsive">
                  <button type="button" className="btn btn-primary add-btn" data-toggle="modal" data-target="#modal-add"
                    style={{float:"right"}}>
                    <i className="nav-icon fas fa-plus"></i>
                     Add Slideshow Photo
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="card-body">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th className="head-number">No.</th>
                      <th className="action-col">Action</th>
                      <th style={{width:"10px"}}>Status</th>
                      <th>Title</th>
                      <th>Sub Title</th>
                      <th>Image</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td className="text-center py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" data-target="#modal-edit" title="Edit" className="btn btn-success"><i
                              className="fas fa-pen"></i></button>
                          <button data-toggle="modal" data-target="#modal-delete" title="Delete"
                            className="btn btn-danger"><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                      <td className="text-center py-0 align-middle">
                      <select className="custom-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </td>
                      <td>Ubur-ubur Lembur</td>
                      <td>Raditya Dika</td>
                      <td><img src={UburLemburImg}
                          style={{width: "10rem", display: "block", marginLeft: "auto", marginRight: "auto"}}/></td>

                    </tr>

                    <tr>
                      <td>2</td>
                      <td className="text-center py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" data-target="#modal-edit" title="Edit" className="btn btn-success"><i
                              className="fas fa-pen"></i></button>
                          <button data-toggle="modal" data-target="#modal-delete" title="Delete"
                            className="btn btn-danger"><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                      <td className="text-center py-0 align-middle">
                      <select className="custom-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </td>
                      <td>Laskar Pelangi</td>
                      <td>Andrea Hirata</td>
                      <td><img src={LaskarPelangiImg}
                          style={{width: "10rem", display: "block", marginLeft: "auto", marginRight: "auto"}}/></td>

                    </tr>

                    <tr>
                      <td>3</td>
                      <td className="text-center py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" data-target="#modal-edit" title="Edit" className="btn btn-success"><i
                              className="fas fa-pen"></i></button>
                          <button data-toggle="modal" data-target="#modal-delete" title="Delete"
                            className="btn btn-danger"><i className="fas fa-trash"></i></button>
                        </div>
                      </td>
                      <td className="text-center py-0 align-middle">
                      <select className="custom-select">
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </td>
                      <td>Dilan 1990</td>
                      <td>Raditya Dika</td>
                      <td><img src={DilanImg}
                          style={{width: "10rem", display: "block", marginLeft: "auto", marginRight: "auto"}}/></td>

                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    );
  }
}

export default SlideShowManagement;
