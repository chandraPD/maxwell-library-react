import Axios from '../../../Instances/axios-instances';
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import moment from 'moment';

class CheckReturnBook extends Component {

    constructor() {
        super();
        this.state = {
            listBorrower: [],
            listBook: [],
            borrowBooks: [{ borrowBookId: "", denda: [] }],
        }

    }

    componentDidMount() {
        this.getListBorrowedBook();
        this.getListBorrower();
    }

    getListBorrower = () => {
        Axios.get("borrow/get-all-borrower-book")
            .then((data) => {
                const result = data.data;
                if (result.status === 200) {
                    result.data.map((val, index) => {
                        this.setState((prevState) => ({
                            listBorrower: [...prevState.listBorrower, val]
                        }));
                    });
                }
            })
    }

    getListBorrowedBook = () => {
        Axios.get("borrow/get-all-borrowed")
            .then((data) => {
                const result = data.data;
                if (result.status === 200) {
                    result.data.map((val, index) => {
                        this.setState((prevState) => ({
                            listBook: [...prevState.listBook, val]
                        }));
                    });
                }
            })
    }


    getListBorrowedBookByUserId = (id) => {

        // set all state
        this.setState({
            borrowBooks: [{ borrowBookId: "", denda: [] }],
        })

        Axios.get("borrow/get-all-borrowed-by-userid/" + id)
            .then((data) => {
                const result = data.data;
                if (result.status === 200) {
                    result.data.map((val, index) => {
                        this.setState((prevState) => ({
                            listBook: [...prevState.listBook, val]
                        }));
                    });
                }
            })
    }



    addBorrowBook = (e) => {
        this.setState((prevState) => ({
            borrowBooks: [...prevState.borrowBooks, { borrowBookId: "", denda: [] }],
        }))
    }

    deleteRow = (e) => {
        this.setState((prevState) => ({
            borrowBooks: prevState.borrowBooks.filter((_, i) => i !== e),
        }))
    }

    removeRow = (index, e) => {
        let borrowBooks = [...this.state.borrowBooks]
        borrowBooks[e.target.dataset.id].denda = borrowBooks[e.target.dataset.id].denda.filter((_, i) => i !== index);
        this.setState({ borrowBooks })
    }

    addRowDenda = (e) => {
        let borrowBooks = [...this.state.borrowBooks]
        let detailInvoice = {
            type: "",
            total: ""
        };
        if (borrowBooks[e].denda.length == 0) {
            Swal.fire('Ups..', "Harap memilih buku terlebih dahulu", 'warning')
        } else {
            borrowBooks[e].denda = [...borrowBooks[e].denda, detailInvoice];
            this.setState({ borrowBooks })
        }

    }

    handleChange = (e) => {

        if (["form-control borrowBookId"].includes(e.target.className)) { // Jika yang dipilih buku nya
            let borrowBooks = [...this.state.borrowBooks]
            // set value prev selected
            let a = this.state.borrowBooks.findIndex(obj => obj.borrowBookId == e.target.value);
            if (a != -1) {
                // sudah pernah ada
                borrowBooks[e.target.dataset.id].denda = [];
                borrowBooks[e.target.dataset.id].borrowBookId = "";
                this.setState({ borrowBooks })
                e.target.value = "";
                Swal.fire('Ups..', "Tidak boleh memilih buku yang sama", 'warning')
            } else {
                if (e.target.value !== "") {

                    // Belum pernah ada
                    let indexBookSelected = this.state.listBook.findIndex(obj => obj.borrowedBookId == e.target.value);
                    var startDate = moment(this.state.listBook[indexBookSelected].threshold);
                    var endDate = moment();
                    var diff = startDate.diff(endDate, "days");
                    var fine, lateBy;
                    if (diff < 0) {
                        diff = Math.abs(diff);
                        lateBy = diff;
                        fine = diff * 2000;
                    } else {
                        lateBy = 0;
                        fine = 0;
                    }
                    let detailInvoice = {
                        title: this.state.listBook[indexBookSelected].title,
                        borrowedDate: this.state.listBook[indexBookSelected].borrowedDate,
                        borrowedBookCode: this.state.listBook[indexBookSelected].borrowedBookCode,
                        threshold: this.state.listBook[indexBookSelected].threshold,
                        returnedDate: this.state.listBook[indexBookSelected].returnDate,
                        lateBy: lateBy,
                        fine: fine
                    };
                    if (borrowBooks[e.target.dataset.id].denda[0]) {
                        borrowBooks[e.target.dataset.id].denda = [detailInvoice];
                    } else {
                        borrowBooks[e.target.dataset.id].denda = [...borrowBooks[e.target.dataset.id].denda, detailInvoice];
                    }
                    borrowBooks[e.target.dataset.id].borrowBookId = e.target.value;
                    this.setState({ borrowBooks })
                } else {
                    borrowBooks[e.target.dataset.id].denda = [];
                    borrowBooks[e.target.dataset.id].borrowBookId = "";
                    this.setState({ borrowBooks })
                }
            }
        } else if (["form-control borrower"].includes(e.target.className)) { // jika yang dipilih select borrower nya
            // choose borrower
            // Reset Form
            this.setState({
                listBook: [],
                borrowBooks: [{ borrowBookId: "", denda: [] }],
            })
            if (e.target.value !== "") {
                this.getListBorrowedBookByUserId(e.target.value);
            }


        } else if (["form-control description", "form-control cost"].includes(e.target.className)) { // jika yang berubah adalah inputan

            let borrowBooks = [...this.state.borrowBooks];

            borrowBooks[e.target.dataset.id].denda[e.target.dataset.index][e.target.dataset.name] = e.target.value;

            this.setState({ borrowBooks })

        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }


    saveReturn = () => {
        const data = this.state.borrowBooks;
        Axios.post("borrow/return", data)
            .then((data) => {
                const result = data.data;
                if (result.status === 400) {
                    Swal.fire('Ups..', result.message, 'warning')
                } else if (result.status === 200) {
                    Swal.fire('Success', result.message, 'success')
                        .then(() => {
                            this.props.history.push('/RentManagement')
                        })
                }
            })
    }

    convertToDate = (date) => {
        if (date === null) {
            return "-"
        } else {
            return moment.utc(date).format('DD-MM-YYYY hh:mm')
        }
    }

    printListDetail = (index) => {
        let data = this.state.borrowBooks[index].denda;
        if (data != undefined) {
            return <div className="return-book-list-detail">
                {data.map((val, i) => {
                    if (i === 0) {
                        return <div className="form-group row col-sm-12">
                            <div className="form-group col-sm-2">
                                <span className="info">Book Title</span>
                                <input type="text" className="form-control" name="book_title[]" value={val.title + " " + val.borrowedBookCode} readOnly />
                            </div>
                            <div className="form-group col-sm-2">
                                <span>Borrowed On</span>
                                <input type="text" className="form-control" name="borrow_date[]" value={this.convertToDate(val.borrowedDate)} readOnly />
                            </div>
                            <div className="form-group col-sm-2">
                                <span>Due On</span>
                                <input type="text" className="form-control" name="due_on[]" value={this.convertToDate(val.threshold)} readOnly />
                            </div>
                            <div className="form-group col-sm-2">
                                <span className="info">Date Of Return</span>
                                <input type="text" className="form-control" name="return_date[]" value={this.convertToDate(val.returnDate)} readOnly />
                            </div>
                            <div className="form-group col-sm-2">
                                <span>Late By (Days)</span>
                                <input type="text" className="form-control" name="late_by[]" value={val.lateBy} readOnly />
                            </div>
                            <div className="form-group col-sm-2">
                                <span>Cost</span>
                                <input type="text" className="form-control" name="fine[]" value={val.fine} readOnly />
                            </div>
                        </div>

                    } else {
                        return <div className="form-group row col-sm-12">
                            <div className="form-group col-sm-5">
                                <span>Description</span>
                                <input type="text" data-id={index} data-index={i} data-name="type" className="form-control description" name="type[]" />
                            </div>
                            <div className="form-group col-sm-5">
                                <span>Cost</span>
                                <input type="number" data-id={index} data-index={i} data-name="total" className="form-control cost" name="cost[]" />
                            </div>
                            <div className="form-group col-sm-2">
                                <button type="button" className="btn bg-gradient-danger" data-id={index} value="remove" onClick={(e) => this.removeRow(i, e)}>Remove</button>
                            </div>
                        </div>

                    }
                })}
            </div>
        }

    }

    handleSubmit = (e) => { e.preventDefault() }
    render() {
        const { listBorrower, listBook, borrowBooks } = this.state;
        return (
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Return Book</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="RentManagement">Rent Management</Link></li>
                                    <li className="breadcrumb-item active">Return Book</li>
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
                                        <h3 className="card-title">Return Book</h3>
                                    </div>
                                    {/* /.card-header */}
                                    {/* form start */}
                                    <form onSubmit={this.handleSubmit} onChange={this.handleChange} className="form-horizontal">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <div className="col-3">
                                                    <button type="button" className="btn bg-gradient-primary" onClick={this.addBorrowBook}>Add</button>
                                                </div>
                                                <div className="col-3">
                                                    <select name="borrower" className="form-control borrower">
                                                        <option value="">Choose Borrower</option>
                                                        {listBorrower.map((val, index) => {
                                                            return (
                                                                <option key={index} value={val.id}>{val.fullName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="return-book-list">
                                                {borrowBooks.map((val, index) => {
                                                    let borrowBookId = `borrowBook-${index}`
                                                    return (
                                                        <div key={index} className="return-book-list-item">
                                                            <div className="form-group row">
                                                                <label className="col-3 col-form-label text-right">Book</label>
                                                                <div className="col">
                                                                    <select value={val.borrowedBookId} name={borrowBookId} data-id={index} id={borrowBookId} className="form-control borrowBookId">
                                                                        <option value="">Choose Book</option>
                                                                        {listBook.map((val, index) => {
                                                                            return (
                                                                                <option key={index} value={val.borrowedBookId}>{val.borrowedBookCode} || {val.bookDetailCode} || { val.title}</option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                                <div className="col-3">
                                                                    <button type="button" className="btn bg-gradient-danger mr-3" value="delete" onClick={() => this.deleteRow(index)}>Delete</button>
                                                                    <button type="button" className="btn bg-gradient-info" value="add" onClick={() => this.addRowDenda(index)}>Add</button>
                                                                </div>
                                                            </div>
                                                            {this.printListDetail(index)}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer text-center ">
                                                <Link to="RentManagement" className="btn btn-default">Cancel</Link>
                                                <button type="button" onClick={this.saveReturn} className="btn btn-info">Submit</button>
                                            </div>
                                            {/* /.card-footer */}
                                            {/* /.card-body */}
                                        </div></form>
                                    {/* /.card */}
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.container-fluid */}
                    </div></section>
                {/* /.content */}
            </div>

        )
    }

}

export default withRouter(CheckReturnBook)