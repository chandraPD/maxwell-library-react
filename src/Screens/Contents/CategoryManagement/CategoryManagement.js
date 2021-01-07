import React, { Component } from "react";
import "./customtable.css";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "bootstrap";
import Swal from "sweetalert2";
import Axios from '../../../Instances/axios-instances';

class CategoryManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [],
      errors: {},
      data: [],
      rows: [],
      results: [],
      category: ''
    };

    this.categoryChange = this.categoryChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    $('#example1').DataTable().destroy();
    const results = [];
    
    var no = 1;

    await Axios.get('/category/get-all-active')
          .then((response) => {
            const result = response.data;
            this.setState({data: result})
            result.map((category) => {
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
                      onClick={() => this.getCategory(category.categoryId)}
                    />
                    <Action
                      type="danger"
                      title="Delete"
                      icon="trash"
                      dataToggle="modal"
                      dataTarget="#modal-delete"
                      onClick={() => this.getCategory(category.categoryId)}
                    />
                  </div>
                </td>
              );
              row.push(<td>{category.categoryId}</td>);
              row.push(<td>{category.category}</td>);
              results.push(row);
            })
            this.setState({ rows: results });

            $("#example1").DataTable({
              responsive: true,
              autoWidth: false,
              });
          })
  }

  getCategory = (id) => {
    Axios
      .get("/category/get-by-id/" + id)
      .then((response) => {
        console.log(response);
        this.setState({
          category: response.data.category,
          categoryId: id,
        });
      });
  };

  updateCategory = (id) => {

    const category = {
      category: this.state.category,
    };

    Axios
      .put("/category/update-category/" + id, category)
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
  };

  deleteCategory = (id) => {
    Axios
      .put("/category/delete-category/" + id)
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
  };

  categoryChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  resetModal() {
    let fields = this.state.fields;
    let errors = {}
    fields["CategoryName"] = "";
    errors["CategoryName"] = "";

    this.setState({fields: fields});
    this.setState({errors: errors});
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Category Name
    if (!fields["CategoryName"]) {
      formIsValid = false;
      errors["CategoryName"] = "Category Name cannot be empty";
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
      const category = {
        category: fields["CategoryName"],
      };
      console.log(category);
      Axios
        .post("/category/add-category", category)
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
            }
          });
        })
        .catch((error) =>
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Category already exist!",
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
    errors["CategoryName"] = "";
    fields[field] = e.target.value;
    this.setState({ fields });
    this.setState({ errors: errors})
  }

  render() {
    const { rows } = this.state;
    const headings = ["No", "Action", "Category ID(s)", "Category Name"];
    return (
      <div className="content-wrapper">
        {/* <!-- Content Header (Page header) --> */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3>Category Management</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
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
                      &nbsp; Add Category
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
                <h4 className="modal-title">Add Category</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="addCategory" onSubmit={this.contactSubmit.bind(this)}>
                <div className="modal-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="inputCategoryName">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCategoryName"
                        name="category"
                        placeholder="Enter Category"
                        onChange={this.handleChange.bind(this, "CategoryName")}
                        value={this.state.fields["CategoryName"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["CategoryName"]}
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
                <h4 className="modal-title">Edit Category</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="editCategory">
                <div className="modal-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="editCategoryName">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        id="editCategoryName"
                        value={this.state.category}
                        onChange={this.categoryChange}
                      />
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
                    onClick={() => this.updateCategory(this.state.categoryId)}
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
                <h4 className="modal-title">Delete Category</h4>
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
                  onClick={() => this.deleteCategory(this.state.categoryId)}
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

export default CategoryManagement;
