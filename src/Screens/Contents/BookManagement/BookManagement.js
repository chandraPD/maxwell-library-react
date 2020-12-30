import React, { Component } from "react";
import DataTable from "../../../Components/Datatable/Table";
import axios from "axios";
import Action from "../../../Components/Datatable/Action";
import $ from "jquery";
import "datatables.net-responsive/js/dataTables.responsive";
import "datatables.net-dt/css/jquery.dataTables.css";

class BookManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rows: [],
      results: [],
      isLoading: true,
    };
  }

  componentDidMount() {
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
            <Action type="success" title="Edit" icon="pen" dataToggle="modal" dataTarget="#modal-edit" />
            <Action type="danger" title="Delete" icon="trash" dataToggle="modal" dataTarget="#modal-delete" />
            <Action type="info" title="Detail" icon="eye"/>
          </div>
        </td>
      );
      row.push(<td className="text-center">{book.title}</td>);
      row.push(<td className="text-center">{book.author}</td>);
      row.push(<td className="text-justify">{book.description}</td>);
      row.push(<td className="text-center">{book.imgBanner}</td>);
      row.push(<td className="text-center">{book.imgDetail}</td>);
      row.push(<td className="text-center">{book.publishDate}</td>);
      row.push(<td className="text-center">{book.qty}</td>);
      row.push(<td className="text-center">{book.categoryEntity.category}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
    this.setState({ isLoading: false });
  }

  render() {
    const { rows } = this.state;
    const headings = [
      "Book ID",
      "Action",
      "Title",
      "Author",
      "Description",
      "Image Banner",
      "Image Detail",
      "Publish Date",
      "Quantity",
      "Category"
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
      </div>
    );
  }
}

export default BookManagement;
