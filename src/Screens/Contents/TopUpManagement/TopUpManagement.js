import React, { Component } from 'react';
import './TopUpManagement.style.css'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import Card from '../TopUp/Card';

class TopUpManagement extends Component {



    render () {


      return (        
        <div className="wrapper">
        {/* Navbar */}
        <div w3-include-html="include_navbar.html" />
        <div w3-include-html="include_sidebar.html" />
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          {/* /.modal */}
          <div className="modal fade" id="cancelModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Do you want to cancel?
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Are you serious want to cancel?</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">
                    Close
                  </button>
                  <a className="btn btn-danger" id="btn-delete" href="#" data-dismiss="modal" data-toggle="modal" data-target="#CancelModal" onclick="cancelstatus()">Cancel</a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="topupModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Top Up
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Username:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="topup-user" name="name" className="form-control" placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-lg-5">
                      <label className="title-module">Total Nominal:</label>
                    </div>
                    <div className="col-lg-7">
                      <div className="form-group">
                        <div className="radio-group">
                          <div className="row row-cols-md-3" style={{textAlign: 'center'}}>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option1" defaultValue={10000} />
                              <label htmlFor="option1" style={{fontWeight: 'normal'}}>Rp. 10000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option2" defaultValue={20000} />
                              <label htmlFor="option2" style={{fontWeight: 'normal'}}>Rp. 20000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option3" defaultValue={30000} />
                              <label htmlFor="option3" style={{fontWeight: 'normal'}}>Rp. 30000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option4" defaultValue={40000} />
                              <label htmlFor="option4" style={{fontWeight: 'normal'}}>Rp. 40000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option5" defaultValue={50000} />
                              <label htmlFor="option5" style={{fontWeight: 'normal'}}>Rp. 50000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option6" defaultValue={60000} />
                              <label htmlFor="option6" style={{fontWeight: 'normal'}}>Rp. 60000</label>
                            </div>
                          </div>
                        </div>
                        <div className="input-group" style={{marginTop: '1rem'}}>
                          <div className="input-group-prepend">
                            <span className="input-group-text"><input type="radio" defaultValue name="option" id="option7" /></span>
                          </div>
                          <input type="text" className="form-control any" id="any" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-lg-5">
                      <label className="title-module">Payment Method:</label>
                    </div>
                    <div className="col-lg-7">
                      <div className="form-group">
                        <div className="radio-group method">
                          <div className="row row-cols-md-3" style={{textAlign: 'center'}}>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method1" defaultValue="Credit Card" />
                              <label htmlFor="option1" style={{fontWeight: 'normal'}}>Credit Card</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method2" defaultValue="Paypall" />
                              <label htmlFor="option2" style={{fontWeight: 'normal'}}>Paypall</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method3" defaultValue="OVO" />
                              <label htmlFor="option3" style={{fontWeight: 'normal'}}>OVO</label>
                            </div>
                            <div className="icheck-primary gopay">
                              <input type="radio" name="option2" id="option-method4" defaultValue="Gopay" />
                              <label htmlFor="option4" style={{fontWeight: 'normal'}}>Gopay</label>
                            </div>
                            <div className="icheck-primary dana">
                              <input type="radio" name="option2" id="option-method5" defaultValue="Dana" />
                              <label htmlFor="option5" style={{fontWeight: 'normal'}}>Dana</label>
                            </div>
                            <div className="icheck-primary cash">
                              <input type="radio" name="option2" id="option-method6" defaultValue="Cash" />
                              <label htmlFor="option6" style={{fontWeight: 'normal'}}>Cash</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">
                    Close
                  </button>
                  <a className="btn btn-primary" id="btn-delete" href="#" data-dismiss='modal' data-toggle="modal" data-target="#checkModal">Next</a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="checkModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Check Data Top Up
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Username:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checkuser" name="name" className="form-control" readOnly placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Total Nominal:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checknominal" name="name" className="form-control" readOnly placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Payment Method:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checkmethod" name="name" className="form-control" readOnly placeholder />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal" data-target="#topupModal" data-toggle="modal">
                    Back
                  </button>
                  <a className="btn btn-primary" id="btn-delete" href="#" data-dismiss="modal" data-toggle="modal" data-target="#passwordModal">Next</a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="passwordModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Password
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Password:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="password" id="passwordconfirm" name="name" className="form-control" placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Confirm Password:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="password" id="passwordconfirm2" name="name" className="form-control" placeholder />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal" data-toggle="modal" data-target="#checkModal">
                    Back
                  </button>
                  <a className="btn btn-success" id="btn-delete" href="#" data-toggle="modal" data-dismiss="modal" onClick={()=>swal('Success!','Success Delete Book!','success')}>Confirm</a>
                </div>
              </div>
            </div>
          </div>
          {/* Main content */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Top Up Management</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Top Up</li>
                  </ol>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section className="content">
            <div className="card">
              {/* / Content Table */}
              <div className="card-header">
                <button type="button" className="btn bg-gradient-primary" style={{float: 'right'}} data-toggle="modal" data-target="#topupModal">
                  <i className="nav-icon fas fa-plus" /> &nbsp; Top Up
                </button>
              </div>
              <div className="card-body">
                <table id="example1" className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>ID</th>
                      <th>Action</th>
                      <th>Username</th>
                      <th>Total Nominal (Rp)</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Budi</td>
                      <td>10000</td>
                      <td>Paypall</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Joko</td>
                      <td>15000</td>
                      <td>Credit Card</td>
                      <td><span className="badge badge-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>3</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Antok</td>
                      <td>150000</td>
                      <td>Cash</td>
                      <td><span className="badge badge-danger">Cancel</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>4</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Amelia</td>
                      <td>100000</td>
                      <td>Dana</td>
                      <td><span className="badge badge-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>5</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Daniel</td>
                      <td>25000</td>
                      <td>Cash</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>6</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Kevin</td>
                      <td>10000</td>
                      <td>Credit Card</td>
                      <td><span className="badge badge-danger">Cancel</span></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>6</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Kevin</td>
                      <td>10000</td>
                      <td>Cash</td>
                      <td><span className="badge badge-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>7</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Naix</td>
                      <td>12000</td>
                      <td>OVO</td>
                      <td><span className="badge badge-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>8</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onclick="confirmclick()" className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onclick="cancelclick()" className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Emilia</td>
                      <td>20000</td>
                      <td>Paypall</td>
                      <td><span className="badge badge-success">Success</span></td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>9</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once confirm this, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already Success!", {
      icon: "success",
    });
  }
})} className="btn btn-success" title="Edit"><i className="fas fa-check" /></button>
                          <button data-toggle="modal" onClick={()=>swal({
  title: "Are you sure?",
  text: "Once canceled, you will not be able to recover this Top Up!",
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Top Up already canceled!", {
      icon: "success",
    });
  }
})} className="btn btn-danger" title="Delete"><i className="fas fa-ban" />
                          </button></div>
                      </td>
                      <td>Thor</td>
                      <td>15000</td>
                      <td>Cash</td>
                      <td><span className="badge badge-danger">Cancel</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* / Content Table */}
            </div>
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </div>
      )
    }
  }

export default TopUpManagement;