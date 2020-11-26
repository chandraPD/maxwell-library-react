import React, { Component } from "react";
import SuccessImg from '../../../Assets/Media/check.png'
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import swal from 'sweetalert'
import 'bootstrap'

class SlideShowManagement extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    const results = [] 
    const result = [{
      no : 1,
      title: "Ubur-ubur Lembur",
      subtitle: "Raditya Dika",
      image: "https://chandrapd.github.io/maxwell-library/assets/media/books/uburlembur.png"
    },
    {
      no : 2,
      title: "Laskar Pelangi",
      subtitle: "Andrea Hirata",
      image: "https://chandrapd.github.io/maxwell-library/assets/media/books/laskar.png"
    },
    {
      no : 3,
      title: "Dilan 1990",
      subtitle: "Raditya Dika",
      image: "https://chandrapd.github.io/maxwell-library/assets/media/books/dilan.png"
    }]

    result.map((slideshow) => {
      var row = []

      row.push(<td className="text-center">{slideshow.no}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            <Action type="success" title="Edit" icon="pen" dataToggle="modal" dataTarget="#modal-edit"/>
            <Action type="danger" title="Delete" icon="trash" dataToggle="modal" dataTarget="#modal-delete"/>
          </div>
        </td>
      );
      row.push(<td className="text-center py-0 align-middle">
      <select className="custom-select">
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </td>)
      row.push(<td>{slideshow.title}</td>)
      row.push(<td>{slideshow.subtitle}</td>)
      row.push(<td><img src={slideshow.image} style={{width: "10rem", display: "block", marginLeft: "auto", marginRight: "auto"}}/></td>)
      results.push(row)
    })
    this.setState({ rows: results });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Title
    if (!fields["slideshowTitle"]) {
      formIsValid = false;
      errors["slideshowTitle"] = "Slideshow Title cannot be empty";
    }

    //Subtitle
    if (!fields["slideshowSubTitle"]) {
      formIsValid = false;
      errors["slideshowSubTitle"] = "Slideshow Subtitle cannot be empty";
    }

    //Image
    if (!fields["slideshowImage"]) {
      formIsValid = false;
      errors["slideshowImage"] = "Image cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      $('#modal-add').modal('toggle');
      swal({
        icon: 'success',
        title: 'Success',
        text: 'Your Data has been Added',
        buttons: {
          catch: {
            text: "OK",
            value: "catch"
          }
        }
      }).then((value) => {
        switch(value) {
          case "catch":
            window.location.reload()
            break;
        }
      })
        
    } else {

    }
  }
  

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }
  

  render() {
    const { rows } = this.state
    const headings = ["No.", "Action", "Status", "Title", "Sub Title", "Image"]
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
            <DataTable headings={headings} rows={rows} />
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
          <form role="form" id="addSlideshow" onSubmit={this.contactSubmit.bind(this)}>
            <div class="modal-body">
              <div class="card-body">
                <div class="form-group">
                  <label for="inputTitle">Title</label>
                  <input type="text" class="form-control" name="slideshowTitle" id="inputTitle"
                    placeholder="Enter Title" onChange={this.handleChange.bind(this, "slideshowTitle")}
                    value={this.state.fields["slideshowTitle"]}/>
                    <span style={{ color: "red" }}>
                        {this.state.errors["slideshowTitle"]}
                      </span>
                </div>
                
                <div class="form-group">
                  <label for="inputSubTitle">Sub Title</label>
                  <input type="text" class="form-control" name="slideshowSubTitle" id="inputSubTitle"
                    placeholder="Enter Sub Title" onChange={this.handleChange.bind(this, "slideshowSubTitle")} value={this.state.fields["slideshowSubTitle"]}/>
                    <span style={{ color: "red" }}>
                        {this.state.errors["slideshowSubTitle"]}
                      </span>
                </div>
                
                <div class="form-group">
                  <label for="addSlideshowImg">Choose Image</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" accept="image/*" class="custom-file-input" id="addSlideshowImg" name="slideshowImage" onChange={this.handleChange.bind(this, "slideshowImage")}
                    value={this.state.fields["slideshowImage"]}/>
                      <label class="custom-file-label" for="exampleInputFile">Choose file</label>                   
                    </div>
                  </div>
                  <span class="text-danger">Minimum size is 300x100 px</span> <br/>
                  <span style={{ color: "red" }}>
                        {this.state.errors["slideshowImage"]}
                      </span>
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
