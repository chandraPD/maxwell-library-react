import React, { Component } from "react";
import SuccessImg from '../../../Assets/Media/check.png'
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

class SlideShowManagement extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      isLoading : true,
      statusShow : ""
    };
  }

  //METHOD TAMBAHAN GET POST UPDATE DELETE  
  componentDidMount() {
    this.fetchData();
  }


  // SAVE STATUS ACTIVE OR INACTIVE
  handleDropdownChange = (id, event) => {
    
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    console.log(userToken);

    console.log(id);
    
    const status = event.target.value;
    console.log(status);
    const config = {
      headers : { Authorization : `Bearer ${userToken}`}
    }

    axios.put(`http://localhost:8080/slideshow/update-status/${id}/${status}`,null, config)
    .then((response) => {
      console.log(response);
      this.fetchData();
    })

  }

  async fetchData() {
    $('#example1').DataTable().destroy();
    await axios.get('http://localhost:8080/slideshow/get-all-slideshow')
      .then((fetchedData)=> { 
        console.log(fetchedData);
        const resultSlideShow = fetchedData.data;
        this.setState({ data : resultSlideShow });
        const results = [];
        const result = this.state.data;
        var number = 1;
        
        result.map((slideshow) => {
              var row = [];
        
              row.push(<td className="text-center">{number++}</td>);

              //UNTUK TOMBOL EDIT DAN DELETE
              row.push(
                <td className="text-center py-0 align-middle">
                  <div className="btn-group btn-group-sm">
                    <Action type="success" title="Edit" icon="pen" dataToggle="modal" dataTarget="#modal-edit" onClick={() => this.getSlideShowById(slideshow.slideShowId)}/>
                    <Action type="danger" title="Delete" icon="trash" dataToggle="modal" dataTarget="#modal-delete" onClick={() => this.getSlideShowById(slideshow.slideShowId)}/>
                  </div>
                </td>
              );

              //UNTUK OPTION ACTIVE DAN INACTIVE
              row.push(
                <td className="text-center py-0 align-middle">
                <select name="statusShow" id="dropdown" className="custom-select"
                  value = {slideshow.statusShow === true ? "1" : "0"}
                  onChange={(e) => this.handleDropdownChange(slideshow.slideShowId, e)}>
                    <option value='1'>Active</option>
                    <option value='0'>Inactive</option>
                  </select>
                </td>
              );

              //UNTUK MENAMPILKAN JUDUL
              row.push(
                <td>{slideshow.title}</td>
              );

              //UNTUK MENAMPILKAN SUBJUDUL
              row.push(
                <td>{slideshow.subTitle}</td>
              );

              //UNTUK MENAMPILKAN GAMBAR
              row.push(
                <td><img src={slideshow.img} alt ="gambar buku" 
                style={{width: "10rem", display: "block", marginLeft: "auto", marginRight: "auto"}}/>
                </td>
              );
              results.push(row)
            })

            this.setState({ rows: results });
            $("#example1").DataTable({
              responsive: true,
              autoWidth: false,
          });
        });
  }

  //FUNGSI TOMBOL SUBMIT PADA MODAL ADD SLIDESHOW
  submitSlideShow = () => {
    const slideshow = {
        title : this.state.title,
        subTitle : this.state.subTitle,
        img : this.state.img
      };

    axios.post('http://localhost:8080/slideshow/add-slideshow', slideshow)
      .then((response) => {
        console.log(response)
      })
   
    $('#example1').DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  //FUNGSI TOMBOL SUBMIT PADA MODAL ADD SLIDESHOW
  submitSlideShow = () => {
    const slideshow = {
        title : this.state.title,
        subTitle : this.state.subTitle,
        img : this.state.img
      };

    axios.post('http://localhost:8080/slideshow/add-slideshow', slideshow)
      .then((response) => {
        console.log(response)
      })
  }

  //VALIDASI UNTUK ADD SLIDESHOW
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

  //FUNGSI UNTUK TOMBOL SUMBIT SAAT ADD-SLIDESHOW DITEKAN
  contactSubmit(e) {
    e.preventDefault();
    const fields = this.state.fields;
    if (this.handleValidation()) {
      $('#modal-add').modal('toggle');

      const slideshow = {
        title : fields["slideshowTitle"], 
        subTitle : fields["slideshowSubTitle"],
        img : fields["slideshowImage"]
      }
      console.log(slideshow)

      let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }
      axios.post('http://localhost:8080/slideshow/add-slideshow', slideshow, config)
          .then((response) => {
            console.log(response)
          })
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your Data has been Added',
        confirmButtonText: `OK`
      }).then((result) => {
          if(result.isConfirmed) {
            console.log(result);
            window.location.reload();
          }
      })
      //TADINYA ADA ELSE
    }
  }

  //METHOD UNTUK GET-BY-ID
  getSlideShowById = (id) => {
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    console.log(userToken);

    const config = {
      headers : { Authorization : `Bearer ${userToken}`}
    }

    axios.get('http://localhost:8080/slideshow/get-slideshow-byId/' + id, config)
      .then((response) => {
        console.log(response.data.data);
        this.setState({
          slideShowId : response.data.data.slideShowId,
          title : response.data.data.title,
          subTitle : response.data.data.subTitle,
          img : response.data.data.img
        })
      })
  }

  //METHOD UNTUK UPDATE
  editSlideShow = (id) => {
    const slideshow = {
      title : this.state.title,
      subTitle : this.state.subTitle,
      img : this.state.img
    }
    console.log(slideshow);

    let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }

    axios.put('http://localhost:8080/slideshow/update-slideshow/' + id, slideshow, config)
      .then((response) => {
        console.log(response);
    }).then($("#modal-edit").modal("toggle"));
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your Data has been Update',
        confirmButtonText: `OK`
      }).then((result) => {
          if(result.isConfirmed) {
            console.log(result);
            window.location.reload();
          }
      })
}

  //METHOD DELETE MENGGUNAKAN SOFTDELETE
  // deleteSlideShow = (id) => {
  //     let user = JSON.parse(localStorage.getItem('user'))
  //     const userToken = user.token;
  //     console.log(userToken);

  //     const config = {
  //       headers : { Authorization : `Bearer ${userToken}`}
  //     }
  //   axios.put('http://localhost:8080/slideshow/delete-slideshow/'+ id,config)
  //     .then((response) => {
  //       console.log(response);
  //       window.location.reload();
  //       })
  // }

  //METHOD DELETE DATA
  deleteDataSlideShow = (id) => {
      let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }
    axios.delete('http://localhost:8080/slideshow/delete-data-slideshow/'+ id, config)
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
  }
  //METHOD Perubahan Inputan di SlideShow
  slideShowChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
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
                    <a href='/'>Home</a>
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
            <h4 class="modal-title">Add New Slideshow Image</h4>
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
          <form id="editSlideshow">
            <div class="modal-body">
              <div class="card-body">
                <div class="form-group">
                  <label for="editTitle">Title</label>
                  <input type="text" class="form-control" name="title" id="editTitle" value ={this.state.title} onChange={this.slideShowChange}/>
                </div>
                <div class="form-group">
                  <label for="inputSubTitle">Sub Title</label>
                  <input type="text" class="form-control" name="subTitle" id="inputCategoryName"
                    value={this.state.subTitle} onChange={this.slideShowChange}/>
                </div>
                <div class="form-group">
                  <label for="exampleInputFile">Change Image</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="exampleInputFile" name="img" onChange={this.slideShowChange}/>
                      <label class="custom-file-label" for="exampleInputFile">choose file</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              <button id="submitEdit" type="button" onClick={() => this.editSlideShow(this.state.slideShowId)} class="btn btn-warning">Save changes</button>
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
            <button class="btn btn-warning" data-toggle="modal" data-target="#DeleteSuccess"
              data-dismiss="modal" onClick={() => this.deleteDataSlideShow(this.state.slideShowId)}>Delete</button>
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
