import React, { Component } from "react";
import DataTable from "../../../Components/Datatable/Table";
import axios from "axios";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "datatables.net-responsive/js/dataTables.responsive";
import "datatables.net-dt/css/jquery.dataTables.css";
import Swal from "sweetalert2";

class BookManagement extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      isLoading: true,
      category: [],
    };

    this.bookChange = this.bookChange.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.fetchDataBook();
  }

  async fetchDataBook() {
    let fetchedData = await axios.get(
      "http://localhost:8080/book/get-all-active"
    );
    console.log(fetchedData);
    this.setState.isLoading = false;
    const resultUser = fetchedData.data;
    this.setState({ data: resultUser });
    $("#example1").DataTable().destroy();
    this.fetchData();
    $("#example1").DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  async getCategory() {
    let fetchCategory = await axios.get(
      "http://localhost:8080/category/get-all-active"
    );
    console.log(fetchCategory);
    const resultCategory = fetchCategory.data;
    this.setState({ category: resultCategory });
  }

  fetchData() {
    let results = [];
    let result = this.state.data;
    var no = 1;
    result.forEach((book) => {
      this.setState({ isLoading: true });
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
              onClick={() => this.getBook(book.bookId)}
            />
            <Action
              type="danger"
              title="Delete"
              icon="trash"
              dataToggle="modal"
              dataTarget="#modal-delete"
              onClick={() => this.getBook(book.bookId)}
            />
            <Action
              type="info"
              title="Detail"
              icon="eye"
              link={`BookDetail/${book.bookId}`}
            />
          </div>
        </td>
      );
      row.push(<td className="text-center">{book.bookId}</td>);
      row.push(<td className="text-center">{book.title}</td>);
      row.push(<td className="text-center">{book.author}</td>);
      row.push(<td className="text-justify">{book.description}</td>);
      row.push(<td className="text-center">{book.imgBanner}</td>);
      row.push(<td className="text-center"><img src={book.imgDetail} alt="placeholder" style={{width: 100, height: 146}} /></td>);
      row.push(<td className="text-center">{book.publishDate}</td>);
      row.push(<td className="text-center">{book.qty}</td>);
      row.push(<td className="text-center">{book.categoryEntity.category}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
    this.setState({ isLoading: false });
  }

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  getBook = (id) => {
    axios.get("http://localhost:8080/book/get-by-id/" + id).then((response) => {
      console.log(response);
      this.setState({
        author: response.data.author,
        description: response.data.description,
        imgBanner: response.data.imgBanner,
        imgDetail: response.data.imgDetail,
        publishDate: response.data.publishDate,
        qty: response.data.qty,
        statusBook: response.data.statusBook,
        title: response.data.title,
        categoryId: response.data.categoryEntity.categoryId,
        bookId: id,
      });
    });
  };

  updateBook = (id) => {
    const token =
      "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzIiwiaWF0IjoxNjA5MjQwMTkxLCJleHAiOjE2MDk4NDQ5OTF9.bWFIxMvfoxByjHi6u7SHJH8xBwed44RmK2SAt69HsaZ5JwaO9eECOCxUW74vQoLthrthuLAiIIgyoY41qB1EpQ";
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const book = {
      author: this.state.author,
      description: this.state.description,
      imgBanner: this.state.imgBanner,
      imgDetail: this.state.imgDetail,
      publishDate: this.state.publishDate,
      qty: this.state.qty,
      statusBook: this.state.statusBook,
      title: this.state.title,
      categoryId: this.state.categoryId,
    };

    axios
      .put("http://localhost:8080/book/update-book/" + id, book, config)
      .then((response) => {
        console.log(response);
      });
  };

  deleteBook = (id) => {
    axios
      .put("http://localhost:8080/book/delete-book/" + id)
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    // Title
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    }

    //Author
    if (!fields["author"]) {
      formIsValid = false;
      errors["author"] = "Author cannot be empty";
    }

    //Description
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Description cannot be empty";
    }

    //Publish Date
    if (!fields["publishDate"]) {
      formIsValid = false;
      errors["publishDate"] = "Publish Date cannot be empty";
    }

    //Status Book
    if (!fields["statusBook"]) {
      formIsValid = false;
      errors["statusBook"] = "Status Book cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    let fields = this.state.fields;
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    console.log(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    e.preventDefault();
    if (this.handleValidation()) {
      $("#modal-add").modal("toggle");

      const book = {
        author: fields["author"],
        description: fields["description"],
        imgBanner: fields["imgBanner"],
        imgDetail: fields["imgDetail"],
        qty: fields["qty"],
        statusBook: fields["statusBook"],
        title: fields["title"],
        categoryId: fields["categoryId"],
        publishDate: fields["publishDate"],
      };

      console.log(book);

      axios
        .post("http://localhost:8080/book/add-book", book, config)
        .then((response) => {
          console.log(response);
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
        }).catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Book already exist!",
        }).then((result) => {
          if (result.isConfirmed) {
            $("#modal-add").modal("toggle");
          }
        })
      );
    }
  }

  render() {
    const { rows, category } = this.state;
    const headings = [
      "No.",
      "Action",
      "Book ID",
      "Title",
      "Author",
      "Description",
      "Image Banner",
      "Image Detail",
      "Publish Date",
      "Quantity",
      "Category",
    ];

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Book Management</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Book Management</li>
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
                      <div className="col-md-12 ctm-responsive">
                        <button
                          type="button"
                          className="btn btn-primary add-btn"
                          data-toggle="modal"
                          data-target="#modal-add"
                          style={{ float: "right" }}
                        >
                          <i className="nav-icon fas fa-plus"></i>
                          &nbsp; Add Book
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
                <h4 className="modal-title">Add Book</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="addBook" onSubmit={this.contactSubmit.bind(this)}>
                <div className="modal-body">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="inputTitle">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputTitle"
                            name="title"
                            placeholder="Enter Title"
                            onChange={this.handleChange.bind(this, "title")}
                            value={this.state.fields["title"]}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["title"]}
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="inputAuthor">Author</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputAuthor"
                            name="author"
                            placeholder="Enter Author"
                            onChange={this.handleChange.bind(this, "author")}
                            value={this.state.fields["author"]}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["author"]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* <div className="form-group">
                      <label htmlFor="inputCategoryId">Category ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCategoryId"
                        name="categoryId"
                        placeholder="Enter Category ID"
                        onChange={this.handleChange.bind(this, "categoryId")}
                        value={this.state.fields["categoryId"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["categoryId"]}
                      </span>
                    </div> */}

                    <div className="form-group">
                      <label htmlFor="inputCategoryId">Category</label>
                      <select
                        name="categoryId"
                        className="form-control"
                        id="inputCategoryId"
                        value={this.state.fields["categoryId"]}
                        onChange={this.handleChange.bind(this, "categoryId")}
                      >
                        <option value="null">Choose Category</option>
                        {category.map((category) => {
                          return (
                            <option value={category.categoryId}>
                              {category.category}
                            </option>
                          );
                        })}
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["categoryId"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputDescription">Description</label>
                      <textarea
                        className="form-control"
                        id="inputDescription"
                        name="description"
                        placeholder="Enter Description"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange.bind(this, "description")}
                        value={this.state.fields["description"]}
                      ></textarea>
                      <span style={{ color: "red" }}>
                        {this.state.errors["description"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputImgBanner">Image Banner</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputImgBanner"
                        name="imgBanner"
                        placeholder="Enter Image Banner"
                        onChange={this.handleChange.bind(this, "imgBanner")}
                        value={this.state.fields["imgBanner"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["imgBanner"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputImgDetail">Image Detail</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputImgDetail"
                        name="imgDetail"
                        placeholder="Enter Image Detail"
                        onChange={this.handleChange.bind(this, "imgDetail")}
                        value={this.state.fields["imgDetail"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["imgDetail"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputPublishDate">Publish Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="inputPublishDate"
                        name="publishDate"
                        placeholder="Enter Publish Date"
                        onChange={this.handleChange.bind(this, "publishDate")}
                        value={this.state.fields["publishDate"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["publishDate"]}
                      </span>
                    </div>

                    {/* <div className="form-group">
                      <label htmlFor="inputStatusBook">Status Book</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputStatusBook"
                        name="statusBook"
                        placeholder="Enter Status Book"
                        onChange={this.handleChange.bind(this, "statusBook")}
                        value={this.state.fields["statusBook"]}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["statusBook"]}
                      </span>
                    </div> */}

                    <div className="form-group">
                      <label htmlFor="inputStatusBook">Status Book</label>
                      <select
                        name="statusBook"
                        className="form-control"
                        id="inputStatusBook"
                        value={this.state.fields["statusBook"]}
                        onChange={this.handleChange.bind(this, "statusBook")}
                      >
                        <option value="null">Choose Status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["categoryId"]}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer justify-content-between">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    // onClick={resetModal()}
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
                <h4 className="modal-title">Edit Book</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form id="editBook">
                <div className="modal-body">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="editTitle">Title</label>
                          <input
                            type="text"
                            className="form-control"
                            id="editTitle"
                            name="title"
                            onChange={this.bookChange}
                            value={this.state.title}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["title"]}
                          </span>
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="form-group">
                          <label htmlFor="editAuthor">Author</label>
                          <input
                            type="text"
                            className="form-control"
                            id="editAuthor"
                            name="author"
                            placeholder="Enter Author"
                            onChange={this.bookChange}
                            value={this.state.author}
                          />
                          <span style={{ color: "red" }}>
                            {this.state.errors["author"]}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editDescription">Description</label>
                      <textarea
                        className="form-control"
                        id="editDescription"
                        name="description"
                        placeholder="Enter Description"
                        rows="4"
                        cols="50"
                        onChange={this.bookChange}
                        value={this.state.description}
                      ></textarea>
                      <span style={{ color: "red" }}>
                        {this.state.errors["description"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editImgBanner">Image Banner</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editImgBanner"
                        name="imgBanner"
                        placeholder="Enter Image Banner"
                        onChange={this.bookChange}
                        value={this.state.imgBanner}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["imgBanner"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editImgDetail">Image Detail</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editImgDetail"
                        name="imgDetail"
                        placeholder="Enter Image Detail"
                        onChange={this.bookChange}
                        value={this.state.imgDetail}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["imgDetail"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editPublishDate">Publish Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="editPublishDate"
                        name="publishDate"
                        placeholder="Enter Publish Date"
                        onChange={this.bookChange}
                        value={this.state.publishDate}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["publishDate"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editStatusBook">Status Book</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editStatusBook"
                        name="statusBook"
                        placeholder="Enter Status Book"
                        onChange={this.bookChange}
                        value={this.state.statusBook}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["statusBook"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editCategoryId">Category ID</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editCategoryId"
                        name="categoryId"
                        placeholder="Enter Category ID"
                        onChange={this.bookChange}
                        value={this.state.categoryId}
                      />
                      <span style={{ color: "red" }}>
                        {this.state.errors["categoryId"]}
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
                    onClick={() => this.updateBook(this.state.bookId)}
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
                <h4 className="modal-title">Delete Book</h4>
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
                  data-toggle="modal"
                  data-target="#deleteSuccess"
                  data-dismiss="modal"
                  onClick={() => this.deleteBook(this.state.bookId)}
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

export default BookManagement;
