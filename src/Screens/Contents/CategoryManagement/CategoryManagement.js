import React, { Component } from "react";
import './customtable.css'

class CategoryManagement extends Component {
  render() {
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6"><h3>Category Management</h3></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Category</li>
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
                  <div className="col-md-12 ctm-responsive">
                    <button
                      type="button"
                      className="btn btn-primary add-btn"
                      data-toggle="modal"
                      data-target="#modal-add"
                      style={{ float: "right" }}
                    >
                      <i className="nav-icon fas fa-plus"></i>
                        Add Category
                    </button>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="card-body">
                  <table
                    id="example1"
                    className="table table-bordered table-striped"
                  >
                    <thead>
                      <tr>
                        <th className="head-number">No.</th>
                        <th className="action-col">Action</th>
                        <th>Category ID(s)</th>
                        <th>Category Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0001</td>
                        <td>Fantasy</td>
                      </tr>

                      <tr>
                        <td>2</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0002</td>
                        <td>Adventure</td>
                      </tr>

                      <tr>
                        <td>3</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0003</td>
                        <td>Romance</td>
                      </tr>

                      <tr>
                        <td>4</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0004</td>
                        <td>Contemporary</td>
                      </tr>

                      <tr>
                        <td>5</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0005</td>
                        <td>Dystopian</td>
                      </tr>

                      <tr>
                        <td>6</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0006</td>
                        <td>Mystery</td>
                      </tr>

                      <tr>
                        <td>7</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0007</td>
                        <td>Horror</td>
                      </tr>

                      <tr>
                        <td>8</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0008</td>
                        <td>Thriller</td>
                      </tr>

                      <tr>
                        <td>9</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0009</td>
                        <td>Paranormal</td>
                      </tr>

                      <tr>
                        <td>10</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0010</td>
                        <td>Historical Fiction</td>
                      </tr>

                      <tr>
                        <td>11</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0011</td>
                        <td>Science Fiction</td>
                      </tr>

                      <tr>
                        <td>12</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0012</td>
                        <td>Memoir</td>
                      </tr>

                      <tr>
                        <td>13</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0013</td>
                        <td>Cooking</td>
                      </tr>

                      <tr>
                        <td>14</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0014</td>
                        <td>Art</td>
                      </tr>

                      <tr>
                        <td>15</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0015</td>
                        <td>Self-help</td>
                      </tr>

                      <tr>
                        <td>16</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0016</td>
                        <td>Development</td>
                      </tr>

                      <tr>
                        <td>17</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0017</td>
                        <td>Motivational</td>
                      </tr>

                      <tr>
                        <td>18</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0018</td>
                        <td>Health</td>
                      </tr>

                      <tr>
                        <td>19</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0019</td>
                        <td>History</td>
                      </tr>

                      <tr>
                        <td>20</td>
                        <td className="text-center py-0 align-middle">
                          <div className="btn-group btn-group-sm">
                            <button
                              data-toggle="modal"
                              data-target="#modal-edit"
                              className="btn btn-success"
                              title="Edit"
                            >
                              <i className="fas fa-pen"></i>
                            </button>
                            <button
                              data-toggle="modal"
                              data-target="#modal-delete"
                              className="btn btn-danger"
                              title="Delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                        <td>CTG0020</td>
                        <td>Travel</td>
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

export default CategoryManagement;
