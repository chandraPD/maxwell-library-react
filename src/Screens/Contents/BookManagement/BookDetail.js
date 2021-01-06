import React, { Component } from "react";
import DataTable from "../../../Components/Datatable/Table";
import axios from "axios";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "datatables.net-responsive/js/dataTables.responsive";
import "datatables.net-dt/css/jquery.dataTables.css";
import Swal from "sweetalert2";
import { Link, withRouter } from "react-router-dom";
import SuccessImg from "../../../Assets/Media/check.png";

class BookDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bookId: "",
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      title: "",
    };

    this.detailBookChange = this.detailBookChange.bind(this)
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    console.log(bookId);
    this.fetchDataBookDetail(bookId);
  }

  async fetchDataBookDetail(bookId) {
    await axios.get(
      `http://localhost:8080/book-detail/get-by-book-id/${bookId}`
    ).then((response) => {
      this.setState({ data: response.data });
      this.fetchData();
      $("#example1").DataTable({
        responsive: true,
        autoWidth: false,
      });

      var jumlah = response.data.length

      const count = {
        qty: jumlah
      }

      axios.put("http://localhost:8080/book/update-qty-book/" + bookId, count)
        .then((response) => {
          console.log(response)
        })  

    })

  }

  fetchData() {
    let results = [];
    let result = this.state.data;
    var no = 1;

    result.forEach((detailBook) => {
      let row = [];

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
              onClick = {() => this.getDetailBook(detailBook.bookDetailId)}
            />
            <Action
              type="danger"
              title="Delete"
              icon="trash"
              dataToggle="modal"
              dataTarget="#modal-delete"
              onClick = {() => this.getDetailBook(detailBook.bookDetailId)}
            />
          </div>
        </td>
      );
      row.push(<td className="text-center">{detailBook.bookDetailCode}</td>);
      row.push(<td className="text-center">{detailBook.typeOfDamage}</td>);
      row.push(<td className="text-center">{detailBook.descOfDamage}</td>);
      this.setState({ title: detailBook.bookEntity.title})
      results.push(row);
    });
    this.setState({ rows: results });
    
  }

  resetModal() {
    let fields = this.state.fields
    fields["typeOfDamage"] = ""
    fields["descOfDamage"] = ""

    this.setState({fields: fields})
  }

  handleChange(field, e) {
      let fields = this.state.fields
      fields[field] = e.target.value
      this.setState({fields})
  }

  detailBookChange = (event) => {
      this.setState({
          [event.target.name]: event.target.value
      })
  }

  updateDetailBook = (id) => {
      const detailBook = {
          typeOfDamage: this.state.typeOfDamage,
          descOfDamage: this.state.descOfDamage,
          bookId: this.props.match.params.bookId
      }

      axios.put('http://localhost:8080/book-detail/update-detail/' + id, detailBook)
        .then((response) => {
            console.log(response)
            $("#modal-edit").modal("toggle");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Your Data has been Updated",
              confirmButtonText: `OK`,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
        })
  }

  deleteDetailBook = (id) => {
    axios.put('http://localhost:8080/book-detail/delete-detail/' + id)
    .then((response) => {
      console.log(response)
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your Data has been Deleted",
        confirmButtonText: `OK`,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    })
  }

  getDetailBook = (id) => {
      axios.get("http://localhost:8080/book-detail/get-detail-book/" + id)
        .then((response) => {
            console.log(response)
            this.setState({
                typeOfDamage: response.data.typeOfDamage,
                descOfDamage: response.data.descOfDamage,
                bookDetailId: id
            })
        })
  }

  handleValidation() {
      let fields = this.state.fields
      let errors = {}
      let formIsValid = true

      // Type of Damage
      if(!fields["typeOfDamage"]) {
          formIsValid = false
          errors["typeOfDamage"] = "Type of Damage cannot be empty"
      }

      this.setState({ errors: errors})
      return formIsValid
  }

  contactSubmit(e) {
      let fields = this.state.fields
      e.preventDefault()
      if(this.handleValidation()) {
        $("#modal-add").modal("toggle")

        const detailBook = {
            typeOfDamage: fields["typeOfDamage"],
            descOfDamage: fields["descOfDamage"],
            bookId: this.props.match.params.bookId
        }

        console.log(detailBook)

        axios.post("http://localhost:8080/book-detail/add-detail", detailBook)
            .then((response)=> {
                console.log(response)
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Your Data has been Added",
                  confirmButtonText: `OK`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
            })
      } else {

      }
  }

  render() {
    const { rows } = this.state;
    const headings = [
      "No.",
      "Action",
      "Book Detail ID",
      "Type of Damage",
      "Desc of Damage",
    ];

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Detail Book</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to='/BookManagement'>Book Management</Link>
                  </li>
                  <li className="breadcrumb-item active">Detail Book</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-6 ctm-responsive">
                          <h3>{this.state.title}</h3>
                      </div>
                      <div className="col-md-6 ctm-responsive">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          data-toggle="modal"
                          data-target="#modal-add"
                          style={{ float: "right" }}
                        >
                          <i className="nav-icon fas fa-plus"></i>
                          &nbsp; Add Detail
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* /.card-header */}
                  <div className="card-body">
                    <DataTable headings={headings} rows={rows} />
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}

        {/* <!--Modal Add--> */}
        <div className="modal fade" id="modal-add">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Detail</h4>
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
                id="addBookDetail"
                onSubmit={this.contactSubmit.bind(this)}
              >
                <div className="modal-body">
                  <div className="card-body">

                    <div className="form-group">
                      <label htmlFor="inputTypeofDamage">Type of Damage</label>
                      <select
                        name="typeOfDamage"
                        className="form-control"
                        id="inputTypeofDamage"
                        value={this.state.fields["typeOfDamage"]}
                        onChange={this.handleChange.bind(this, "typeOfDamage")}
                      >
                        <option value="null">Choose Type of Damage</option>
                        <option value="Minor">Minor</option>
                        <option value="Major">Major</option>
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["typeOfDamage"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputDescofDamage">Description of Damage</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputDescofDamage"
                        name="descOfDamage"
                        placeholder="Enter Description of Damage"
                        onChange={this.handleChange.bind(this, "descOfDamage")}
                        value={this.state.fields["descOfDamage"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["descOfDamage"]}
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
                <h4 className="modal-title">Edit Detail Book</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="editDetailBook">
                <div className="modal-body">
                  <div className="card-body">

                    <div className="form-group">
                      <label htmlFor="editTypeOfDamage">Type of Damage</label>
                      <select
                        name="typeOfDamage"
                        className="form-control"
                        id="editTypeOfDamage"
                        value={this.state.typeOfDamage}
                        onChange={this.detailBookChange}
                      >
                        <option value="Minor">Minor</option>
                        <option value="Major">Major</option>
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["typeOfDamage"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editDescOfDamage">Description Of Damage</label>
                      <input
                        type="text"
                        className="form-control"
                        name="descOfDamage"
                        id="editDescOfDamage"
                        value={this.state.descOfDamage}
                        onChange={this.detailBookChange}
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
                  <button type="button" onClick={() => this.updateDetailBook(this.state.bookDetailId)} className="btn btn-warning">
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
                <h4 className="modal-title">Delete Detail Book</h4>
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
                  className="btn btn-warning"
                  type="button"
                  data-dismiss="modal"
                  onClick={() => this.deleteDetailBook(this.state.bookDetailId)}
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

export default withRouter(BookDetail);
