import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

class ReturnBook extends Component {

    constructor() {
        super();
        this.state = {
            listItem: [],
            listDetail: []
        }

        this.addRow = this.addRow.bind(this);
        this.setDetail = this.setDetail.bind(this);
    }

    componentDidMount() {
        this.addRow();
    }

    addRow() {
        this.setState({
            listItem: [...this.state.listItem, ''],
            listDetail: [...this.state.listDetail, '']
        });
    }
    setDetail(index) {
        const fillArray = [...this.state.listDetail]
        fillArray[index] = <div>
  <div className="form-group row"><div className="form-group col-sm-4"><span className="info">Book Title</span><input type="text" className="form-control" name="book_title[]" defaultValue="Dilan 1990" readOnly /></div><div className="form-group col-sm-4"><span>Borrowed On</span><input type="text" className="form-control" name="borrow_date[]" defaultValue="17 Nov 2020" readOnly /></div><div className="form-group col-sm-4"><span>Due On</span><input type="text" className="form-control" name="due_on[]" defaultValue="20 Nov 2020" readOnly /></div></div><div className="form-group row"><div className="form-group col-sm-4"><span className="info">Date Of Return</span><input type="text" className="form-control" name="return_date[]" defaultValue="21 Nov 2020" readOnly /></div><div className="form-group col-sm-4"><span>Late By (Days)</span><input type="text" className="form-control" name="late_by[]" defaultValue={1} readOnly /></div><div className="form-group col-sm-4"><span>Fine</span><input type="text" className="form-control" name="fine[]" defaultValue={5000} readOnly /></div></div>
</div>
        this.setState({ listDetail: fillArray })
    }
    deleteRow(index) {
        this.setState({
            listItem: this.state.listItem.filter((_, i) => i !== index),
        });
    }
    saveReturn() {
        Swal.fire('Saved!', 'Your Data has been Submit!', 'success')
    }
    render() {
        const { listItem, listDetail } = this.state;

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
                                    <form className="form-horizontal">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <button type="button" className="btn bg-gradient-primary" onClick={this.addRow}>Add</button>
                                            </div>
                                            <div className="return-book-list">
                                                {listItem.map((val, index) => {
                                                    return (
                                                        <div key={index} className="return-book-list-item">
                                                            <div className="form-group row">
                                                                <label className="col-3 col-form-label text-right">Book</label>
                                                                <div className="col">
                                                                    <select name="book_id[]" className="form-control" onChange={this.setDetail.bind(this, index)}>
                                                                        <option value>Choose Book</option>
                                                                        <option value="001">Dilan 1991</option>
                                                                        <option value="002">Dilan 1992</option>
                                                                        <option value="003">Dilan 1993</option>
                                                                    </select>
                                                                </div>
                                                                <div className="col-3">
                                                                    <button type="button" className="btn bg-gradient-danger" value="delete" onClick={this.deleteRow.bind(this, index)}>Delete</button>
                                                                </div>
                                                            </div>
                                                            <div className="return-book-list-detail">
                                                                <div>{listDetail[index]}</div>
                                                            </div>
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

export default ReturnBook