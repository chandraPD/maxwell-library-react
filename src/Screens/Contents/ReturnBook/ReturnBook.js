import Axios from '../../../Instances/axios-instances';
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2';
import moment from 'moment';

class ReturnBook extends Component {

    constructor() {
        super();
        this.state = {
            listBook: [],
            listItem: [],
            listDetail: [],
            borrowBooks: [{ borrowBookId: "" }],
        }

    }

    componentDidMount() {
        this.getListBorrowedBook();
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

    addBorrowBook = (e) => {
        this.setState((prevState) => ({
            borrowBooks: [...prevState.borrowBooks, { borrowBookId: "" }],
            listDetail: [...this.state.listDetail, '']
        }))
    }

    deleteRow = (e) => {
        this.setState((prevState) => ({
            borrowBooks: prevState.borrowBooks.filter((_, i) => i !== e),
            listDetail: prevState.listDetail.filter((_, i) => i !== e)
        }), console.log(this.state.borrowBooks))

    }

    handleChange = (e) => {
        console.log(this.state.borrowBooks)
        if (["form-control borrowBookId"].includes(e.target.className)) {
            let borrowBooks = [...this.state.borrowBooks]
            // set value prev selected

            let a = this.state.borrowBooks.findIndex(obj => obj.borrowBookId == e.target.value);
            if (a != -1) {
                // sudah pernah ada
                Swal.fire('Ups..', "Tidak boleh memilih buku yang sama", 'warning')
            } else {
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
                borrowBooks[e.target.dataset.id].denda = detailInvoice;
                borrowBooks[e.target.dataset.id].borrowBookId = e.target.value;
                this.setState({ borrowBooks }, () => console.log(this.state.borrowBooks))
            }
        } else if (["form-control type", "form-control total"].includes(e.target.className)) {
            let borrowBooks = [...this.state.borrowBooks]
            borrowBooks[e.target.dataset.id][e.target.className] = e.target.value;
            this.setState({ borrowBooks }, () => console.log(this.state.borrowBooks))
        } else {
            this.setState({ [e.target.name]: e.target.value });
            console.log(this.state);
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
                <div className="form-group row">
                    <div className="form-group col-sm-4">
                        <span className="info">Book Title</span>
                        <input type="text" className="form-control" name="book_title[]" value={data.title + " " + data.borrowedBookCode} readOnly />
                    </div>
                    <div className="form-group col-sm-4">
                        <span>Borrowed On</span>
                        <input type="text" className="form-control" name="borrow_date[]" value={this.convertToDate(data.borrowedDate)} readOnly />
                    </div>
                    <div className="form-group col-sm-4">
                        <span>Due On</span>
                        <input type="text" className="form-control" name="due_on[]" value={this.convertToDate(data.threshold)} readOnly />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="form-group col-sm-4">
                        <span className="info">Date Of Return</span>
                        <input type="text" className="form-control" name="return_date[]" value={this.convertToDate(data.returnDate)} readOnly />
                    </div>
                    <div className="form-group col-sm-4">
                        <span>Late By (Days)</span>
                        <input type="text" className="form-control" name="late_by[]" value={data.lateBy} readOnly />
                    </div>
                    <div className="form-group col-sm-4">
                        <span>Fine</span>
                        <input type="text" className="form-control" name="fine[]" value={data.fine} readOnly />
                    </div>
                </div>
            </div>
        }

    }

    handleSubmit = (e) => { e.preventDefault() }
    render() {
        const { listBook, listItem, listDetail, borrowBooks } = this.state;
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
                                                <button type="button" className="btn bg-gradient-primary" onClick={this.addBorrowBook}>Add</button>
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
                                                                    <button type="button" className="btn bg-gradient-danger" value="delete" onClick={() => this.deleteRow(index)}>Delete</button>
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

export default withRouter(ReturnBook)