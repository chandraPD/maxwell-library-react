import React, { Component } from 'react';
import './Detail.style.css'
import Swal from 'sweetalert2';
import Date from '../../../Components/Datepicker/Dates'
import Axios from '../../../Instances/axios-instances';
import { Link, withRouter } from "react-router-dom";

class Detail extends Component {

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      category: [],
      recommendedData: []
    }
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    this.fetchData(bookId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.fetchData(this.props.match.params.bookId)
      window.scrollTo(0, 0)
    }
  }

  borrow = (id) => {

    const data = {

    }
    Axios.post("borrow/save", data)
    Swal.fire({
      title: "Success Borrow Book!",
      text: "Borrowed Book Success!",
      icon: "success",
      buttons: true,
    })
  }


  async fetchData(bookId) {
    let fetchData = await Axios.get('/book/get-by-id/' + bookId)
    console.log(fetchData.data);
    this.setState({ data: fetchData.data })
    this.setState({ category: fetchData.data.categoryEntity })
    this.fetchRecommended(fetchData.data.categoryEntity.categoryId, bookId)
  }

  async fetchRecommended(categoryId, bookId) {
    let fetchRecommend = await Axios.get('/book/get-rec-detail/' + categoryId + '/' + bookId)
    console.log(fetchRecommend)
    this.setState({ recommendedData: fetchRecommend.data })
  }

  printStatusBook = (statusBook) => {
    if (statusBook === 'Available') {
      return <h1 className="statustextgreen">{statusBook}</h1>
    } else if (statusBook === 'Unavailable') {
      return <h1 className="statustextred">{statusBook}</h1>
    }
  }

  printBorrowButton = (statusBook) => {
    if (statusBook === 'Available') {
      return <div className="borrowbutton">
        <button id="button_borrow" value="borrow" className="btn btn-warning" href="#" data-toggle="modal" data-target="#BorrowModal">Borrow</button>
      </div>
    } else {
      // nothing
    }

  }

  setDate = (event) => {
    console.log(event);
  }

  render() {

    const { data, category, recommendedData } = this.state
    return (

      <div>
        <div className="wrapper">
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}

            <section className="content-header">
              <div className="container-fluid">
                <div className="button">
                  <div className="back-btn">
                    <a href="/" className="button-arrow" role="button"><i className="fas fa-arrow-left arrow" /></a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">

                    <img className="big-preview" src={data.imgBanner} width="1600px" height="1200px" />

                    <div className="menu-right">
                      {/* <ul className="menuhead">
                        <li><a href="#" data-toggle="modal" data-target="#ModalBook">Edit</a></li>
                        <li><a href="#" data-toggle="modal" data-target="#deleteModal">Delete</a></li>
                      </ul> */}
                      <img className="small-preview" src={data.imgDetail} />
                    </div>
                  </div>
                </div>
              </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
              <div className="category">
                <p>{category.category}</p>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-6">
                    <h1 className="titletext">{data.title}</h1>
                  </div>
                  <div className="col-sm-6">
                    {this.printStatusBook(data.statusBook)}
                  </div>
                </div>
                <p className="date">{data.publishDate}</p>
                <div className="row">
                  <div className="col-sm-8">
                    <p className="content">
                      {data.description}
                    </p>
                  </div>
                </div>
                {this.printBorrowButton(data.statusBook)}
              </div>
            </section>
            <section>
              {/*Adding list books*/}
              <div className="list-title">
                <h4>Recommended</h4><br />
              </div>
              <div className="row" id="recomended">
                {recommendedData.map((data) => {
                  return (
                    <div className="col-xs-4 col-sm-4 col-lg-4">
                      <div className="card" id="recomendedcard">
                        <img src={data.imgDetail} className="card-img-top" alt="Dilan 1991" />
                        <div className="card-body">
                          <h5 className="recommend-title">{data.title}</h5>
                          <p className="card-text max-desc">{data.description} </p>
                          <Link to={`${data.bookId}`}>Read More</Link>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
            {/* /.content */}
          </div>
        </div>

        <div className="modal fade" id="BorrowModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="edit-module">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Borrow Book</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3">
                    <label className="title-module">Date Borrow:</label>
                  </div>
                  <div className="col-md-6">
                    <div className="input-group date" id="datetimepicker5" data-target-input="nearest">
                      <Date onChange={() => this.setDate()} />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-warning" id="btn-delete" href="#" data-dismiss="modal" onClick={() => this.borrow(data.bookId)}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Detail);