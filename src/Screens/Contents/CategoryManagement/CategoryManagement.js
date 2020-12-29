import React, { Component } from "react";
import "./customtable.css";
import SuccessImg from "../../../Assets/Media/check.png";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

class CategoryManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      isLoading: true,
      categoryName: ""
    };
  }

  componentDidMount() {
    this.fetchDataCategory();
  }

  async fetchDataCategory() {
    let fetchedData = await axios.get(
      'http://localhost:8080/category/get-all-active'
    );
    console.log(fetchedData)
    this.setState.isLoading = false;
    const resultCategory = fetchedData.data;
    this.setState({ data: resultCategory });
    
    $('#example1').DataTable().destroy();
    this.fetchData();
    $("#example1").DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  fetchData() {
    const results = [];
    const result = this.state.data

    result.map((category) => {
      this.setState({ isLoading: true });
      var row = [];

      row.push(<td className="text-center">{category.categoryId}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            <Action type="success" title="Edit" icon="pen" dataToggle="modal" dataTarget="#modal-edit"/>
            <Action type="danger" title="Delete" icon="trash" dataToggle="modal" dataTarget="#modal-delete"/>
          </div>
        </td>
      );
      row.push(<td>{category.categoryId}</td>);
      row.push(<td>{category.category}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
  }

  submitCategory = () => {
      const category = {
        categoryName: this.state.categoryName
      }

      axios.post('http://localhost:8800/category/add-category', category)
           .then((response) => {
             console.log(response)
           })
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
    e.preventDefault();
    if (this.handleValidation()) {
      $('#modal-add').modal('toggle');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Your Data has been Added',
        confirmButtonText: `OK`
      }).then((result) => {
          if(result.isConfirmed) {
            window.location.reload()
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
                    <a href='/'>Home</a>
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
              <form
                role="form"
                id="addCategory"
                onSubmit={this.contactSubmit.bind(this)}
              >
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
                    onClick="resetModal()"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-warning" onClick={this.submitCategory}>
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
              <form role="form" id="editCategory">
                <div className="modal-body">
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="editCategoryName">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="category"
                        id="editCategoryName"
                        value={this.state.categoryName}
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
                  <button type="submit" className="btn btn-warning">
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
                  type="submit"
                  className="btn btn-warning"
                  data-toggle="modal"
                  data-target="#deleteSuccess"
                  data-dismiss="modal"
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

        {/* <!--Delete Completed--> */}
        <div
          className="modal fade"
          id="deleteSuccess"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabesl"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Delete Complete!
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <img className="check" src={SuccessImg} />
                <p>Data has been deleted</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CategoryManagement;
