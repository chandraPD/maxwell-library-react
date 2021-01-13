import React, { Component } from "react";
import SuccessImg from '../../../Assets/Media/check.png'
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'
import Swal from 'sweetalert2'
import Axios from '../../../Instances/axios-instances';
import { Link } from 'react-router-dom'

class SlideShowManagement extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      statusShow : "",
      chooseFile: "Choose File",
      uploadImage : ""
    };
  }

  //METHOD TAMBAHAN GET POST UPDATE DELETE  
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    $('#example1').DataTable().destroy();
    await Axios.get('slideshow/get-all-slideshow')
      .then((fetchedData)=> { 
        console.log(fetchedData);
        const resultSlideShow = fetchedData.data;
        this.setState({ data : resultSlideShow });
        const results = [];
        const result = this.state.data;
        var number = 1;
        
        result.map((slideshow) => {
              var row = [];
        
              //UNTUK KOLOM NOMER
              row.push(
                <td className="text-center">{number++}</td>
                );

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
        img : this.state.uploadImage
      };

    Axios.post('slideshow/add-slideshow', slideshow)
      .then((response) => {
        console.log(response)
      })
   
    $('#example1').DataTable({
      responsive: true,
      autoWidth: false,
    });
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
    if(this.state.img === ""){
      formIsValid = false;
      errors["slideshowImage"] = "Image cannot be empty"
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleUpdateValidation(){
    let errors = {};
    let formIsValid = true;

    if(this.state.title === ""){
      formIsValid = false;
      errors["slideshowTitle"] = "Title cannot be empty" 
    }
      

    if(this.state.subTitle === ""){
      formIsValid = false;
      errors["slideshowSubTitle"] = "Sub Title cannot be empty"
    }

    if(this.state.img === ""){
      formIsValid = false;
      errors["slideshowImage"] = "Image cannot be empty"
    }

    this.setState({ errors : errors});
    return formIsValid;
  }

  //FUNGSI UNTUK TOMBOL SUMBIT SAAT ADD-SLIDESHOW DITEKAN
  contactSubmit(e){
    e.preventDefault();
    const fields = this.state.fields;
    if (this.handleValidation()) {
      $('#modal-add').modal('toggle');

      const slideshow = {
        title : fields["slideshowTitle"], 
        subTitle : fields["slideshowSubTitle"],
        img : this.state.uploadImage
      }
      console.log(slideshow)

      let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }
      Axios.post('slideshow/add-slideshow', slideshow, config)
          .then((response) => {
            console.log(response);
            $('.modal-backdrop').remove();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Your Data has been Added',
              confirmButtonText: `OK`,
            }).then((result) => {
                if(result.isConfirmed) {
                  this.resetModal();
                  this.fetchData();
                  
                }
              });
            })
            
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Sorry !',
          text: 'You Must Fill The Requirement !',
          confirmButtonText: `OK`
        }).then((result) => {
            if(result.isConfirmed) {
              console.log(result);
            }
        })

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

    Axios.get('slideshow/get-slideshow-byId/' + id, config)
      .then((response) => {
        console.log(response);
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
      img : this.state.uploadImage
    }
    console.log(slideshow.img);

    let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }

    if(this.handleUpdateValidation()){
      Axios.put('slideshow/update-slideshow/' + id, slideshow, config)
      .then((response) => {
        console.log(response);
        $("#modal-edit").modal("toggle");
        $('.modal-backdrop').remove();
    });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your Data has been Update',
        confirmButtonText: `OK`
      }).then((result) => {
          if(result.isConfirmed) {
            this.fetchData();
          }
      })
    } else {
        Swal.fire({
          icon: 'warning',
          title: 'Sorry !',
          text: 'You Must Fill The Requirement !',
          confirmButtonText: `OK`
        }).then((result) => {
            if(result.isConfirmed) {
              console.log(result);
        }
      });
    }
}


  //METHOD DELETE DATA
  deleteDataSlideShow = (id) => {
      let user = JSON.parse(localStorage.getItem('user'))
      const userToken = user.token;
      console.log(userToken);

      const config = {
        headers : { Authorization : `Bearer ${userToken}`}
      }
    Axios.delete('slideshow/delete-data-slideshow/'+ id, config)
      .then((response) => {
        console.log(response);
        this.fetchData();
      })
  }
  //METHOD Perubahan Inputan di SlideShow
  slideShowChange = (event) => {
      this.setState({
        [event.target.name] : event.target.value
      });
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
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

    Axios.put(`slideshow/update-status/${id}/${status}`,null, config)
    .then((response) => {
      console.log(response);
      this.fetchData();
    })

  }

  // Handle Upload Slide Show Image
  handleUploadImage = (e) => {
    const file = e.target.files[0];
    this.setState({
      chooseFile : file.name
    });
    console.log(file);

    const reader = new FileReader();
    console.log(reader);
    reader.readAsDataURL(file);
    reader.onload = e => {
      let base64Image = e.target.result;
      let base64ImageStrip = base64Image.split("base64,")[1];

      this.setState({
        //setState dalam bentuk Base64
        uploadImage : base64ImageStrip
      });
      // console.log(this.state.uploadImage);
      
    }
  }

  resetModal() {
    let fields = this.state.fields
    fields["slideshowTitle"] = ""
    fields["slideshowSubTitle"] = ""
    fields["slideshowImage"] = ""
   

    let errors = {}
    errors["slideshowTitle"] = ""
    errors["slideshowSubTitle"] = ""
    errors["slideshowImage"] = ""


    this.setState({fields: fields})
    this.setState({errors: errors})
    this.setState({chooseFile: "Choose File"})
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
              <div className="col-sm-6"><h3>Slide Show Management</h3></div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
<<<<<<< HEAD
                  <li className="breadcrumb-item">
                    <a href='index.html'>Home</a>
                  </li>
                  <li className="breadcrumb-item active">Slide Show</li>
=======
                  <li className="breadcrumb-item"><Link to="/index">Home</Link></li>
                  <li className="breadcrumb-item active">Slideshow</li>
>>>>>>> 787d1e38cb77660232a3466b8d97263c6e1ced80
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
                <div className="col-md-6"></div>
                <div className="col-md-6 ctm-responsive">
                  <button type="button" className="btn btn-primary add-btn" data-toggle="modal" data-target="#modal-add"
                    style={{float:"right"}}>
                    <i className="nav-icon fas fa-plus"></i>
                      Add Slide Show Photo
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
            <h4 class="modal-title">Add New Slide Show Image</h4>
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
                      <input type="file" accept="image/*" class="custom-file-input" id="addSlideshowImg" name="img" onChange={this.handleUploadImage}
                      value={this.state.fields["slideshowImage"]}/>
                      <label class="custom-file-label" for="exampleInputFile" style={{overflow : "hidden"}}>{this.state.chooseFile}</label>                   
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
              <button type="button" class="btn btn-default" data-dismiss="modal" onClick={() => this.resetModal()}>Close</button>
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
                  <input type="text" class="form-control" name="title" id="editTitle" value ={this.state.title} 
                  onChange={this.slideShowChange}/>
                  <span style={{ color: "red" }}>
                        {this.state.errors["slideshowTitle"]}
                  </span>
                </div>
                <div class="form-group">
                  <label for="inputSubTitle">Sub Title</label>
                  <input type="text" class="form-control" name="subTitle" id="inputCategoryName"
                    value={this.state.subTitle} 
                    onChange={this.slideShowChange}/>
                  <span style={{ color: "red" }}>
                        {this.state.errors["slideshowSubTitle"]}
                  </span>
                </div>
                <div class="form-group">
                  <label for="exampleInputFile">Change Image</label>
                  <div class="input-group">
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="exampleInputFile" name="img" 
                      onChange={this.handleUploadImage}/>
                      <label class="custom-file-label" for="exampleInputFile" style={{ overflow : "hidden"}}>{this.state.img}</label>
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
              <button type="button" class="btn btn-default" data-dismiss="modal" onClick={() => this.resetModal()}>Cancel</button>
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
