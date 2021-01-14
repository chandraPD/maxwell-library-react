import React, { Component } from "react";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "datatables.net-responsive/js/dataTables.responsive";
import "datatables.net-dt/css/jquery.dataTables.css";
import Swal from "sweetalert2";
import Axios from '../../../Instances/axios-instances';
import moment from 'moment'
import { Link } from 'react-router-dom'

class BookManagement extends Component {
  constructor() {
    super();
    this.state = {
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      category: [],
      author: [],
      imgBanner: "",
      imgDetail: "",
      chooseFileBanner: "Choose Image Banner",
      chooseFileDetail: "Choose Image Detail"
    };

    this.bookChange = this.bookChange.bind(this);
  }

  componentDidMount() {
    this.getCategory();
    this.getAuthor();
    this.fetchData();
  }

  async getCategory() {
    let fetchCategory = await Axios.get(
      "/category/get-all-active"
    );
    const resultCategory = fetchCategory.data;
    this.setState({ category: resultCategory });
  }

  async getAuthor() {
    let fetchAuthor = await Axios.get('/author/getAll')
    const resultAuthor = fetchAuthor.data
    this.setState({author: resultAuthor})
  }

  async fetchData() {
    $("#example1").DataTable().destroy();
    let results = [];

    var no = 1;

    await Axios.get('/book/get-all-active')
        .then((response) => {
          const result = response.data
          this.setState({data: result})
          result.map((book) => {
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
            row.push(<td className="text-center">{book.bookCode}</td>);
            row.push(<td className="text-center">{book.title}</td>);
            row.push(<td className="text-center">{book.authorEntity.authorName}</td>);
            row.push(<td className="text-center"><img src={book.imgBanner} alt="placeholder" style={{width: 146, height: 100}} /></td>);
            row.push(<td className="text-center"><img src={book.imgDetail} alt="placeholder" style={{width: 100, height: 146}} /></td>);
            row.push(<td className="text-center">{this.convertToDate(book.publishDate)}</td>);
            row.push(<td className="text-center">{book.qty}</td>);
            row.push(<td className="text-center">{book.categoryEntity.category}</td>);
            results.push(row);
                })
            this.setState({ rows: results });

            $("#example1").DataTable({
              responsive: true,
              autoWidth: false,
            });
        })
  }

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    let errors = {}
    errors["title"] = ""
    errors["author"] = ""
    errors["categoryId"] = ""
    errors["statusBook"] = ""
    errors["description"] = ""
    errors["publishDate"] = ""
    errors["statusBook"] = ""
    errors["imgBanner"] = ""
    errors["imgDetail"] = ""
    this.setState({errors: errors})
  };

  resetModal() {
    let fields = this.state.fields
    fields["title"] = ""
    fields["author"] = ""
    fields["categoryId"] = ""
    fields["statusBook"] = ""
    fields["description"] = ""
    fields["publishDate"] = ""
    fields["statusBook"] = ""
    fields["imgBanner"] = ""
    fields["imgDetail"] = ""
    fields["title"] = ""

    let errors = {}
    errors["title"] = ""
    errors["author"] = ""
    errors["categoryId"] = ""
    errors["statusBook"] = ""
    errors["description"] = ""
    errors["publishDate"] = ""
    errors["statusBook"] = ""
    errors["imgBanner"] = ""
    errors["imgDetail"] = ""

    this.setState({fields: fields})
    this.setState({errors: errors})
    this.setState({imgBanner: ""})
    this.setState({imgDetail: ""})
    this.setState({chooseFileBanner: "Choose Image Banner"})
    this.setState({chooseFileDetail: "Choose Image Detail"})
  }

  getBook = (id) => {
    Axios.get("/book/get-by-id/" + id).then((response) => {


      this.setState({
        authorId: response.data.authorEntity.authorId,
        description: response.data.description,
        imgBanner: response.data.imgBanner,
        imgDetail: response.data.imgDetail,
        publishDate: response.data.publishDate,
        qty: response.data.qty,
        statusBook: response.data.statusBook,
        title: response.data.title,
        categoryId: response.data.categoryEntity.categoryId,
        bookId: id
      });
    });
  };

  updateBook = (id) => {
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const book = {
      authorId: this.state.authorId,
      description: this.state.description,
      imgBanner: this.state.imgBanner,
      imgDetail: this.state.imgDetail,
      publishDate: this.state.publishDate,
      qty: this.state.qty,
      statusBook: this.state.statusBook,
      title: this.state.title,
      categoryId: this.state.categoryId,
    };


    if(this.handleValidationUpdate()) {
      Axios.get('/book/get-title-fix/' + book.title + '/' + book.authorId)
            .then((response) => {
              const resultBook = response.data

                Axios.get('/book-detail/get-book-detail-count/Available/' + id)
                    .then((response) => {

                       if(response.data > 0) {
                        Swal.fire({
                          icon: "warning",
                          title: "Warning",
                          text: "You can't update Data already used",
                          confirmButtonText: `OK`,
                        })
                      } else {
                        Axios
                        .put("/book/update-book/" + id, book, config)
                        .then((response) => {

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

                    })

            })
    }

  };

  deleteBook = (id) => {
    Axios.get('/book-detail/get-book-detail-count/Available/' + id)
          .then((response) => {
            if(response.data > 0) {
              Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "You can't delete Data already used",
                confirmButtonText: `OK`,
              })
            } else {
              Axios
                .put("/book/delete-book/" + id)
                .then((response) => {

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
          })
  };

  handleChange(field, e) {
    let fields = this.state.fields;
    let errors = {}
    errors["title"] = ""
    errors["author"] = ""
    errors["description"] = ""
    errors["publishDate"] = ""
    errors["categoryId"] = ""
    errors["imgBanner"] = ""
    errors["imgDetail"] = ""
    fields[field] = e.target.value;
    this.setState({ fields });
    this.setState({errors: errors})
    
  }

  handleImageDetail = (e) => {
    const fileImg = e.target.files[0]
    this.setState({chooseFileDetail: fileImg.name})

    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileImg)

    fileReader.onload = e => {
      let base64Image = e.target.result
      let base64ImageStrip = base64Image.split("base64,")[1];
      
      this.setState({imgDetail: base64ImageStrip})

    }
  }

  convertToDate = (date) => {
    if(date === null) {
      return "-"
    } else {
      return moment.utc(date).format("D MMMM yyyy")
    }
  }

  handleImageBanner = (e) => {
    const fileImg = e.target.files[0]
    this.setState({chooseFileBanner: fileImg.name})

    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileImg)

    fileReader.onload = e => {
      let base64Image = e.target.result
      let base64ImageStrip = base64Image.split("base64,")[1];
      
      this.setState({imgBanner: base64ImageStrip})
 
    }
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

    //Category
    if (!fields["categoryId"]) {
      formIsValid = false;
      errors["categoryId"] = "Please Choose a Category!";
    }

    if(this.state.imgBanner === "") {
      formIsValid = false;
      errors["imgBanner"] = "Image Banner cannot be empty!";
    }

    if(this.state.imgDetail === "") {
      formIsValid = false;
      errors["imgDetail"] = "Image Detail cannot be empty!";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleValidationUpdate() {
    let errors = {};
    let formIsValid = true;

    if(this.state.title === "") {
      formIsValid = false;
      errors["title"] = "Title cannot be empty";
    }

    if(this.state.authorId === "") {
      formIsValid = false;
      errors["author"] = "Author cannot be empty";
    }

    if(this.state.categoryId === "") {
      formIsValid = false;
      errors["categoryId"] = "Please Choose a Category!";
    }

    if(this.state.description === "") {
      formIsValid = false;
      errors["description"] = "Description cannot be empty";
    }

    if(this.state.imgBanner === "") {
      formIsValid = false;
      errors["imgBanner"] = "Image Banner cannot be empty!";
    }

    if(this.state.imgDetail === "") {
      formIsValid = false;
      errors["imgDetail"] = "Image Detail cannot be empty!";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    let fields = this.state.fields;
    let user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    e.preventDefault();
    if (this.handleValidation()) {
      $("#modal-add").modal("toggle");
      $('.modal-backdrop').remove();
      const book = {
        authorId: fields["author"],
        description: fields["description"],
        imgBanner: this.state.imgBanner,
        imgDetail: this.state.imgDetail,
        qty: fields["qty"],
        statusBook: fields["statusBook"],
        title: fields["title"],
        categoryId: fields["categoryId"],
        publishDate: fields["publishDate"],
      };



      Axios
        .post("/book/add-book", book, config)
        .then((response) => {
 
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
    const { rows, category, author } = this.state;
    const headings = [
      "No.",
      "Action",
      "Book ID",
      "Title",
      "Author",
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
                  <li className="breadcrumb-item"><Link to="/index">Home</Link></li>
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
                          <label htmlFor="inputTitle">Title <small className="red-asterisk">*</small></label>
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
                      <label htmlFor="inputAuthor">Author <small className="red-asterisk">*</small></label>
                      <select
                        name="authorId"
                        className="form-control"
                        id="inputAuthor"
                        value={this.state.fields["author"]}
                        onChange={this.handleChange.bind(this, "author")}
                      >
                        <option value="null">Choose Author</option>
                        {author.map((author) => {
                          return (
                            <option value={author.authorId}>
                              {author.authorName}
                            </option>
                          );
                        })}
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["author"]}
                      </span>
                    </div>
                      </div>
                    </div>

                    

                    <div className="form-group">
                      <label htmlFor="inputCategoryId">Category <small className="red-asterisk">*</small></label>
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
                      <label htmlFor="inputDescription">Description <small className="red-asterisk">*</small></label>
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
                    <label htmlFor="inputImgBanner">Image Banner <small className="red-asterisk">*</small></label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input type="file" accept="image/*" className="custom-file-input" id="inputImgBanner" name="imgBanner" onChange={this.handleImageBanner}
                        value={this.state.fields["imgBanner"]}/>
                          <label className="custom-file-label" for="exampleInputFile" style={{overflow:"hidden"}}>{this.state.chooseFileBanner}</label>                   
                        </div>
                      </div> 
                      <span style={{ color: "red" }}>
                            {this.state.errors["imgBanner"]}
                          </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputImgDetail">Image Detail <small className="red-asterisk">*</small></label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input type="file" accept="image/*" className="custom-file-input" id="inputImgDetail" name="imgDetail" onChange={this.handleImageDetail}
                        value={this.state.fields["imgDetail"]}/>
                          <label className="custom-file-label" for="exampleInputFile" style={{overflow:"hidden"}}>{this.state.chooseFileDetail}</label>                   
                        </div>
                      </div>
                      <span style={{ color: "red" }}>
                            {this.state.errors["imgDetail"]}
                          </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="inputPublishDate">Publish Date <small className="red-asterisk">*</small></label>
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

                    <small><span className="red-asterisk">*</span> Required</small>    
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

                    <div className="form-group">
                      <label htmlFor="editAuthor">Author</label>
                      <select
                        name="authorId"
                        className="form-control"
                        id="editAuthor"
                        value={this.state.authorId}
                        onChange={this.bookChange}
                      >
                        {author.map((author) => {
                          return (
                            <option value={author.authorId}>
                              {author.authorName}
                            </option>
                          );
                        })}
                      </select>
                      <span style={{ color: "red" }}>
                        {this.state.errors["author"]}
                      </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editCategoryId">Category</label>
                      <select
                        name="categoryId"
                        className="form-control"
                        id="editCategoryId"
                        value={this.state.categoryId}
                        onChange={this.bookChange}
                      >
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
                      <div className="input-group">
                        <div className="custom-file">
                          <input type="file" accept="image/*" className="custom-file-input" id="editImgBanner" name="imgBanner" onChange={this.handleImageBanner}  />
                          <label className="custom-file-label" for="exampleInputFile" style={{overflow:"hidden"}}>{this.state.imgBanner}</label>                   
                        </div>
                      </div> 
                      <span style={{ color: "red" }}>
                            {this.state.errors["imgBanner"]}
                          </span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="editImgDetail">Image Detail</label>
                      <div className="input-group">
                        <div className="custom-file">
                          <input type="file" accept="image/*" className="custom-file-input" id="editImgDetail" name="imgDetail" onChange={this.handleImageDetail}/>
                          <label className="custom-file-label" for="exampleInputFile" style={{overflow:"hidden"}}>{this.state.imgDetail}</label>                   
                        </div>
                      </div>
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
                  type="button"
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
