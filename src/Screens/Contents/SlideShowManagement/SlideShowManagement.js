import React, { Component } from "react";
import UburLemburImg from '../../../Assets/Media/books/uburlembur.png'
import LaskarPelangiImg from '../../../Assets/Media/books/laskar.png'
import DilanImg from '../../../Assets/Media/books/dilan.png'
import SuccessImg from '../../../Assets/Media/check.png'

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

        {/* Modal Add */}
      <div class="modal fade" id="modal-add">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Add new Slideshow Image</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form role="form" id="addSlideshow">
            <div class="modal-body">
              <div class="card-body">
                <div class="form-group">
                  <label for="inputTitle">Title</label>
                  <input type="text" class="form-control" name="slideshowTitle" id="inputTitle"
                    placeholder="Enter Title"/>
                </div>
                <div class="form-group">
                  <label for="inputSubTitle">Sub Title</label>
                  <input type="text" class="form-control" name="slideshowSubTitle" id="inputSubTitle"
                    placeholder="Enter Sub Title"/>
                </div>
                <div class="form-group">
                  <label for="addSlideshowImg">Choose Image</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="addSlideshowImg" name="slideshowImage"/>
                      <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                    </div>
                  </div>
                  <span class="text-danger">Minimum size is 300x100 px</span>
                </div>

              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal" onclick="resetModal()">Close</button>
              <button type="submit" class="btn btn-warning">Add</button>
            </div>
          </form>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>

    {/* <!--Modal Edit--> */}
    <div class="modal fade" id="modal-edit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Edit Slideshow</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form role="form" id="editSlideshow">
            <div class="modal-body">
              <div class="card-body">
                <div class="form-group">
                  <label for="editTitle">Title</label>
                  <input type="text" class="form-control" name="slideshowTitle" id="editTitle"
                    value="Ubur-ubur Lembur"/>
                </div>
                <div class="form-group">
                  <label for="inputSubTitle">Sub Title</label>
                  <input type="text" class="form-control" name="slideshowSubTitle" id="inputCategoryName"
                    value="Raditya Dika"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputFile">Change Image</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="exampleInputFile" name="slideshowImage"/>
                      <label class="custom-file-label" for="exampleInputFile">uburlembur.png</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-warning">Save changes</button>
            </div>
          </form>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>

    {/* <!--Modal Delete--> */}
    <div class="modal fade" id="modal-delete">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Delete Slideshow</h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            If you Delete this, you can't be returned
          </div>
          <div class="modal-footer justify-content-between">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
            <button type="submit" class="btn btn-warning" data-toggle="modal" data-target="#DeleteSuccess"
              data-dismiss="modal">Delete</button>
          </div>
        </div>
        {/* <!-- /.modal-content --> */}
      </div>
      {/* <!-- /.modal-dialog --> */}
    </div>

    {/* <!--Delete Completed--> */}
    <div class="modal fade" id="DeleteSuccess" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabesl"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Delete Complete!</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <img class="check" src={SuccessImg}/>
            <p>Data has been deleted</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

      </div>
    );
  }
}

export default SlideShowManagement;
