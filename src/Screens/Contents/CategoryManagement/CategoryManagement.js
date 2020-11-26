import React, { Component } from "react";
import "./customtable.css";
import SuccessImg from "../../../Assets/Media/check.png";
import swal from "sweetalert";
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'

class CategoryManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const results = [];
    const result = [
      {
        no: 1,
        categoryId: "CTG0001",
        categoryName: "Fantasy",
      },
      {
        no: 2,
        categoryId: "CTG0002",
        categoryName: "Adventure",
      },
      {
        no: 3,
        categoryId: "CTG0003",
        categoryName: "Romance",
      },
      {
        no: 4,
        categoryId: "CTG0004",
        categoryName: "Contemporary",
      },
      {
        no: 5,
        categoryId: "CTG0005",
        categoryName: "Dystopian",
      },
      {
        no: 6,
        categoryId: "CTG0006",
        categoryName: "Mystery",
      },
      {
        no: 7,
        categoryId: "CTG0007",
        categoryName: "Horror",
      },
      {
        no: 8,
        categoryId: "CTG0008",
        categoryName: "Thriller",
      },
      {
        no: 9,
        categoryId: "CTG0009",
        categoryName: "Paranormal",
      },
      {
        no: 10,
        categoryId: "CTG0010",
        categoryName: "Historical Fiction",
      },
      {
        no: 11,
        categoryId: "CTG0011",
        categoryName: "Science Fiction",
      },
      {
        no: 12,
        categoryId: "CTG0012",
        categoryName: "Memoir",
      },
      {
        no: 13,
        categoryId: "CTG0013",
        categoryName: "Cooking",
      },
      {
        no: 14,
        categoryId: "CTG0014",
        categoryName: "Art",
      },
      {
        no: 15,
        categoryId: "CTG0015",
        categoryName: "Self-help",
      },
      {
        no: 16,
        categoryId: "CTG0016",
        categoryName: "Development",
      },
      {
        no: 17,
        categoryId: "CTG0017",
        categoryName: "Motivational",
      },
      {
        no: 18,
        categoryId: "CTG0018",
        categoryName: "Health",
      },
      {
        no: 19,
        categoryId: "CTG0019",
        categoryName: "History",
      },
      {
        no: 20,
        categoryId: "CTG0020",
        categoryName: "Travel",
      },
    ];

    result.map((category) => {
      var row = [];

      row.push(<td className="text-center">{category.no}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            <Action type="success" title="Edit" icon="pen" dataToggle="modal" dataTarget="#modal-edit"/>
            <Action type="danger" title="Delete" icon="trash" dataToggle="modal" dataTarget="#modal-delete"/>
          </div>
        </td>
      );
      row.push(<td>{category.categoryId}</td>);
      row.push(<td>{category.categoryName}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Category ID
    if (!fields["CategoryId"]) {
      formIsValid = false;
      errors["CategoryId"] = "Category ID cannot be empty";
    }

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
                <DataTable headings={headings} rows={rows} />
              </div>
            </div>
          </div>
        </section>

        {/* <!--Modal Add--> */}
        <div class="modal fade" id="modal-add">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add Category</h4>
                <button
                  type="button"
                  class="close"
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
                <div class="modal-body">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="inputCategoryId">Category ID</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputCategoryId"
                        name="categoryId"
                        placeholder="Enter ID"
                        onChange={this.handleChange.bind(this, "CategoryId")}
                        value={this.state.fields["CategoryId"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["CategoryId"]}
                      </span>
                    </div>
                    <div class="form-group">
                      <label for="inputCategoryName">Category Name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputCategoryName"
                        name="categoryName"
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
                <div class="modal-footer justify-content-between">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    onclick="resetModal()"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-warning">
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
        <div class="modal fade" id="modal-edit">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Category</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form role="form" id="editCategory">
                <div class="modal-body">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="editCategoryId">Category ID</label>
                      <input
                        type="text"
                        class="form-control"
                        name="categoryId"
                        id="editCategoryId"
                        value="CTG0001"
                      />
                    </div>
                    <div class="form-group">
                      <label for="editCategoryName">Category Name</label>
                      <input
                        type="text"
                        class="form-control"
                        name="categoryName"
                        id="editCategoryName"
                        value="Fantasy"
                      />
                    </div>
                  </div>
                </div>
                <div class="modal-footer justify-content-between">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" class="btn btn-warning">
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
        <div class="modal fade" id="modal-delete">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Delete Category</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                If you Delete this, you can't be returned
              </div>
              <div class="modal-footer justify-content-between">
                <button
                  type="button"
                  class="btn btn-default"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-warning"
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
          class="modal fade"
          id="deleteSuccess"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabesl"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Delete Complete!
                </h5>
                <button
                  class="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="check" src={SuccessImg} />
                <p>Data has been deleted</p>
              </div>
              <div class="modal-footer">
                <button
                  class="btn btn-secondary"
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
