import React, { Component } from "react";
import "./customtable.css";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "bootstrap";
import Swal from "sweetalert2";
import Axios from '../../../Instances/axios-instances';

class Author extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      errors: {},
      data: [],
      rows: [],
      results: [],
    };

    this.authorChange = this.authorChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    $('#example1').DataTable().destroy();
    const results = [];
    
    var no = 1;

    await Axios.get('/author/getAll')
          .then((response) => {
            const result = response.data;
            this.setState({data: result})
            result.map((author) => {
              console.log(author)
              var row = [];
              row.push(<td className="text-center">{no++}</td>);
              row.push(
                <td className="text-center py-0 align-middle">
                  <div className="btn-group btn-group-sm">
                    <Action
                      type="success"
                      title="Edit"
                      icon="pen"
                      dataToggle="modal"
                      dataTarget="#modal-edit"
                      onClick={() => this.getAuthor(author.authorId)}
                    />
                    <Action
                      type="danger"
                      title="Delete"
                      icon="trash"
                      dataToggle="modal"
                      dataTarget="#modal-delete"
                      onClick={() => this.getAuthor(author.authorId)}
                    />
                  </div>
                </td>
              );              
              row.push(<td>{author.authorName}</td>);
              results.push(row);
            })
            this.setState({ rows: results });

            $("#example1").DataTable({
              responsive: true,
              autoWidth: false,
              });
          })
  }

  getAuthor(id) {    
    let errors = {}    
    errors["AuthorName"] = "";
    this.setState({errors: errors});
    
    Axios
      .get("/author/getid/" + id)
      .then((response) => {
        console.log(response);
        this.setState({
          authorName: response.data.authorName,
          authorId: id,
          name: response.data.authorName
        });
      });      
  };

  updateAuthor = (id) => {
    var name=this.state.name
    console.log(name)
    const author = {
      authorName: this.state.authorName,

    };
    console.log(author.authorName)
    console.log(author)
    if(this.handleValidationUpdate()) {
    Axios
      .get("/author/getAuthor/" + author.authorName)
      .then((response) => {
        const result2= response.data;
        Axios
      .get("/author/getCount/" + id)
      .then((response) => {
        console.log(response);
        if(author.authorName==name){
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "You Enter the same Name",
            confirmButtonText: `OK`,
          })
        } else if(author.authorName==result2){
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "Name Already saved",
            confirmButtonText: `OK`,
          })
        } else if(response.data>0){
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "You can't update Data already used",
            confirmButtonText: `OK`,
          })
        } else{
          Axios
        .put("/author/update/" + id, author)
        .then((response) => {
          console.log(response);
          $("#modal-edit").modal("toggle");
          $('.modal-backdrop').remove();
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your Data has been Updated",
            confirmButtonText: `OK`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.fetchData()
            }
          });
        });
        }
      });
        
        console.log(result2)
         
          
         
      })
    }
  };

  handleValidationUpdate() {
    let errors = {};
    let formIsValid = true;

    if(this.state.authorName === "") {
      formIsValid = false;
      errors["AuthorName"] = "Author Name cannot be empty";
    }

    this.setState({errors: errors})
    return formIsValid
  }

  deleteAuthor = (id) => {
    Axios
      .get("/author/getCount/" + id)
      .then((response) => {
        console.log(response);
         if(response.data>0){
          Swal.fire({
            icon: "warning",
            title: "Warning",
            text: "You can't delete Data already used",
            confirmButtonText: `OK`,
          })
        } else{
          Axios
          .put("/author/delete/" + id)
          .then((response) => {
            console.log(response);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Your Data has been Deleted",
              confirmButtonText: `OK`,
            }).then((result) => {
              if (result.isConfirmed) {
                this.fetchData()
              }
            });
          });
        }
      });
    
  };

  authorChange = (event) => {    
    this.setState({
      [event.target.name]: event.target.value,
    });    
  };

  resetModal() {
    let fields = this.state.fields;
    let errors = {}
    fields["AuthorName"] = "";
    errors["AuthorName"] = "";

    this.setState({fields: fields});
    this.setState({errors: errors});
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Author Name
    if (!fields["AuthorName"]) {
      formIsValid = false;
      errors["AuthorName"] = "Author Name cannot be empty";
    }   

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    let fields = this.state.fields;
    e.preventDefault();
    if (this.handleValidation()) {
      $("#modal-add").modal("hide");
      $('.modal-backdrop').remove();
      const author = {
        authorName: fields["AuthorName"],
      };      
      console.log(author)
      Axios
        .post("/author/post", author)
        .then((response) => {
          console.log(response);
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Your Data has been Added",
            confirmButtonText: `OK`,
          }).then((result) => {
            if (result.isConfirmed) {
              this.fetchData()
              this.resetModal()
            }
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Author already exist!",
          }).then((result) => {
            if (result.isConfirmed) {
              $("#modal-add").modal("toggle");
            }
          })
        );
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    let errors = {}
    errors["AuthorName"] = "";
    fields[field] = e.target.value;
    this.setState({ fields });
    this.setState({ errors: errors})
  }

  render() {
    const { rows } = this.state;
    const headings = ["No", "Action", "Author Name"];
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3>Author Management</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Author</li>
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
                      onClick={()=>{this.resetModal()}}
                      style={{ float: "right" }}
                    >
                      <i className="nav-icon fas fa-plus"></i>
                      &nbsp; Add Author
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

        {/* <!--Modal Add--> */}
        <div className="modal fade" id="modal-add">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Author</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="addAuthor" onSubmit={this.contactSubmit.bind(this)}>
                <div className="modal-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="inputAuthorName">Author Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAuthorName"
                        name="author"
                        placeholder="Enter Author Name"
                        onChange={this.handleChange.bind(this, "AuthorName")}
                        value={this.state.fields["AuthorName"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["AuthorName"]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={() => this.resetModal()}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-warning">
                    Add
                  </button>
                </div>
              </form>
            </div>
            {/* <!-- /.modal-content --> */}
          </div>
          {/* <!-- /.modal-dialog --> */}
        </div>
        {/* <!-- /.modal --> */}

        {/* <!--Modal Edit--> */}
        <div className="modal fade" id="modal-edit">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Author</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="editAuthor">
                <div className="modal-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="editAuthorName">Author Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="authorName"
                        id="editAuthorName"
                        value={this.state.authorName}
                        onChange={this.authorChange}
                      />
                      <span style={{ color: "red" }}>
                            {this.state.errors["AuthorName"]}
                          </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => this.updateAuthor(this.state.authorId)}
                    className="btn btn-warning"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
            {/* <!-- /.modal-content --> */}
          </div>
          {/* <!-- /.modal-dialog --> */}
        </div>
        {/* <!-- /.modal --> */}

        {/* <!--Modal Delete--> */}
        <div className="modal fade" id="modal-delete">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Delete Author</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                If you Delete this, you can't be returned
              </div>
              <div className="modal-footer justify-content-between">
                <button
                  type="button"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  data-dismiss="modal"
                  onClick={() => this.deleteAuthor(this.state.authorId)}
                >
                  Delete
                </button>
              </div>
            </div>
            {/* <!-- /.modal-content --> */}
          </div>
          {/* <!-- /.modal-dialog --> */}
        </div>
        {/* <!-- /.modal --> */}
        
      </div>
    );
  }
}

export default Author;
