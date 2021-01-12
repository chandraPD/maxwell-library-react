import React, { Component } from 'react';
import './Detail.style.css'
import Swal from 'sweetalert2';
import Date from '../../../Components/Datepicker/Dates'
import Axios from '../../../Instances/axios-instances';
import { Link, withRouter } from "react-router-dom";
import moment from 'moment';
import Axios2 from '../../../Instances/axios-instances';
import $ from 'jquery'
import ReactStars from "react-rating-stars-component";
import { MDBIcon } from "mdbreact";

class Detail extends Component {

  constructor(props) {
    let activeRole    
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      activeRole = JSON.parse(localStorage.getItem('user')).userInfo.activeRole
    } else {
      activeRole = false;
    }        
    super(props)
    console.log(props);
    this.state = {
      fields: {},
      errors: {},
      data2: [],
      data: [],
      status: "",
      status2:"",      
      startDate: null,
      show: true,
      endDate: null,
      role: activeRole,
      category: [],
      description:"",      
      recommendedData: [],
      data3:[],
      star: "",
      bookId:this.props.match.params.bookId
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    let errors = {}    
    errors["description"] = ""    
    fields[field] = e.target.value;
    this.setState({ fields });
    this.setState({errors: errors})
    
  }

  async show() {
    console.log(this.state.role)
    if (this.state.role == "ROLE_USER") {
      this.setState({ show: true, role2: "User", show2: false, role2: "User" })
    } else {
      this.setState({ show: false, role2: "Admin", show2: true, role2: "Admin" })
    }
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;
    this.getData();
    this.getData2(bookId);
    this.fetchData(bookId);
    this.getStatus(bookId);
    
    this.getStatus2(bookId);
    this.show();
    this.setState({
      startDate: moment(),
      endDate: moment()
    })
    this.getRate(bookId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.fetchData(this.props.match.params.bookId)
      window.scrollTo(0, 0)
    }
  }

  getStartDate = (start) => {
    this.setState({ startDate: start })
  }

  getEndDate = (end) => {
    this.setState({ endDate: end })
  }

  borrow = (id) => {
    console.log(this.state.startDate);
    console.log(this.state.endDate);
    // console.log(Date.getStart());
    const dataBorrow = {
      bookId: id,
      borrowedDate: this.state.startDate,
      returnedDate: this.state.endDate,
    }
    console.log(dataBorrow);
    Axios.post("borrow/save", dataBorrow)
      .then((data) => {
        const result = data.data;
        if (result.status === 400) {
          Swal.fire(
            'Ups, Sorry',
            result.message,
            'warning'
          )
        } else {

          Swal.fire({
            title: "Success Borrow Book!",
            text: "Borrowed Book Success!",
            icon: "success",
            buttons: true,
          })
        }
      })

  }

  bookChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(this.state.description)
  };

  async getData() {
    await Axios2.get('wishlist/getAll').then((getData) => {
      const result = getData.data;
      $("#example1").DataTable().destroy();
      this.setState({ data2: result });
      this.fetchData(this.state.role);
      $("#example1").DataTable({
        responsive: true,
        autoWidth: false,
      });
    });
  }

  async getData2(id) {
    await Axios2.get('review/getAll/' + id).then((getData) => {
      console.log(getData.data);
      const result = getData.data;      
      this.setState({ data3: result });            
    });
  }

  async fetchData(bookId) {
    let fetchData = await Axios.get('/book/get-by-id/' + bookId)
    console.log(fetchData.data);
    this.setState({ data: fetchData.data })
    this.setState({ category: fetchData.data.categoryEntity })
    this.fetchRecommended(fetchData.data.categoryEntity.categoryId, bookId)
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    
    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "Description cannot be empty";
    }

    if (this.state.star=="") {
      formIsValid = false;
      errors["rate"] = "Rate cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async fetchRecommended(categoryId, bookId) {
    let fetchRecommend = await Axios.get('/book/get-rec-detail/' + categoryId + '/' + bookId)
    console.log(fetchRecommend)
    this.setState({ recommendedData: fetchRecommend.data })
  }

  async getRate(id) {
    await Axios2.get('review/rate/' + id).then((getStatus) => {
      if (getStatus.data==null || getStatus.data==""){
        console.log(getStatus)
      var status = getStatus.data;
      this.setState({ rate: 0 })
      return status
      } else{
        console.log(getStatus)
      var status = getStatus.data;
      this.setState({ rate: getStatus.data })
      return status
      }      
    })
  }

  async getStatus(id) {
    await Axios2.get('wishlist/get/' + id).then((getStatus) => {
      console.log(getStatus)
      var status = getStatus.data;
      this.setState({ status: getStatus.data })
      return status
    })
  }

  async getStatus2(id) {
    await Axios2.get('review/get/' + id).then((getStatus) => {
      console.log(getStatus)
      var status = getStatus.data;
      this.setState({ status2: getStatus.data })
      return status
    })
  }

  getId = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      showCancelButton: true,
      text: 'Are you sure want to confirm this?',
    })
      .then((result) => {
        if (result.isConfirmed) {
          console.log(this.state.status)
          if (this.state.status == true) {
            Axios2.post('wishlist/post/' + id)
              .then((res) => {
                console.log(res);
                this.getStatus(id);
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  showCancelButton: false,
                  text: 'Wishlist Cancel Already Success!',
                })
              })
          } else {
            Axios2.post('wishlist/post/' + id)
              .then((res) => {
                console.log(res);
                this.getStatus(id);
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  showCancelButton: false,
                  text: 'Wishlist Already Success!',
                })
              })
          }

        }
      })
  }

  getId2 = (id) => {
    $('#RateModal').modal('show');

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

  refresh() {        
    let errors = {}
    errors["rate"] = ""
    errors["description"] = ""    
    this.setState({star:""})
    this.setState({errors: errors})
    this.setState({fields:[],userId:"",errors:[]})  
  $('#editDescription').val('');  
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
        rate: this.state.star,
        comment: fields["description"] ,
        book_id:this.state.bookId      
      };

      console.log(book);    
      if (this.state.status2 == true) {
        Swal.fire({
          icon: 'warning',
          title: 'Warning!',
          showCancelButton: false,
          text: 'Ini akan update data review anda sebelumnya,apakah anda yakin?',
        }).then((isConfirmed) => {
          if (isConfirmed) {                
            Axios2.post('review/post/' + this.state.bookId,book)
          .then((res) => {
            console.log(res);
            this.getStatus2(this.state.bookId);
            this.getData();                        
                $('#RateModal').modal('hide');  
                $('.modal-backdrop').remove(); 
                this.refresh();
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              showCancelButton: false,
              text: 'Data Terupdate',
            })
          })
          }
        })
        
      } else {
        Axios2.post('review/post/' + this.state.bookId,book)
          .then((res) => {
            console.log(res);
            this.getStatus2(this.state.bookId);
            Swal.fire({
              icon: 'success',
              title: 'Success!',
              showCancelButton: false,
              text: 'Review Success!',
            })
            .then((isConfirmed) => {
              if (isConfirmed) {                
                this.getData();                        
                $('#RateModal').modal('hide');  
                $('.modal-backdrop').remove(); 
                this.refresh();
              }
            })
          })
      }  
    }
  }

  render() {    
    const rateStar = {
      size: 25,
      count: 5,
      color: "black",
      activeColor: "yellow",
      a11y: true,
      isHalf: true,
      emptyIcon: <i className="far fa-star" />,
      halfIcon: <i className="fa fa-star-half-alt" />,
      filledIcon: <i className="fa fa-star" />,
      onChange: (newValue) => {
        this.setState({ star: newValue })
      }
    };    
    const rateStar2 = {
      size: 25,
      count: 5,
      color: "black",
      edit:false,      
      activeColor: "yellow",
      a11y: true,
      isHalf: true,
      emptyIcon: <i className="far fa-star" />,
      halfIcon: <i className="fa fa-star-half-alt" />,
      filledIcon: <i className="fa fa-star" />,
      onChange: (newValue) => {
        this.setState({ star: newValue })
      }
    };  
    console.log(this.state.rate)
    const { data, category, recommendedData, show, star,description,rate,data3 } = this.state
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
              <div>
              {/* <ReactStars {...rateStar2}  value={}/> */}
              {rate}<MDBIcon icon="star"/>
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
                <div>
                  {show ? <button
                    type="button"
                    className="btn btn-primary add-btn"
                    onClick={() => { this.getId(data.bookId) }}
                    style={{ float: "right" }}
                  >
                    <i className="nav-icon fas fa-heart"></i>
                  </button> : null}
                  {show ? <button
                    type="button"
                    className="btn btn-primary add-btn"
                    onClick={() => { this.getId2(data.bookId) }}
                    style={{ float: "right" }}
                  >
                    <i className="nav-icon fas fa-star"></i>
                  </button> : null}
                </div>
              </div>
              <p className="date">{data.publishDate}</p>
              <p className="date">Available Stock: {data.qty}</p>
              <div className="row">
                <div className="col-sm-8">
                  <p className="content">
                    {data.description}
                  </p>
                </div>
                {this.printBorrowButton(data.statusBook)}

              </div>
            </section>
            <section>
            <div className="card shadow mb-4 mr-4">
        <a href="#collapseCardExamplee" className=" d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="collapseCardExamplee">
          <h6 className="m-0 font-weight-bold text-dark">Review</h6>
        </a>
        <div className="collapse show" id="collapseCardExamplee">
          <div className="card-body">                                   
            <div className="text-l font-weight-bold text-dark  mb-1">Comments:</div>
            <hr className="divider" />
            
            <div className="p-2 hover">              
            {data3.map((person) => {return(<div className="text-l font-weight-bold text-dark  mb-1"> {person.userEntity.email} {person.rate}  {person.comment}</div>) })}                                                                  
            
              <hr className="divider" />
            </div>            
          </div>
        </div>
      </div>
            </section>
            <section>
            
              {/*Adding list books*/}
              <div className="list-title">
                <h4>Recommended</h4><br />
              </div>
              <div className="row" id="recomended">
                {recommendedData.map((data, index) => {
                  return (
                    <div key={index} className="col-xs-4 col-sm-4 col-lg-4">
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
                      <Date startDateCallback={this.getStartDate} endDateCallBack={this.getEndDate} />
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

        <div className="modal fade" id="RateModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
          <div className="modal-dialog modal-md" role="document">
            <div className="modal-content" id="edit-module">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Borrow Book</h5>
                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
              <form id="addBook" onSubmit={this.contactSubmit.bind(this)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="input-group date" id="datetimepicker5" data-target-input="nearest">
                      <ReactStars {...rateStar} />
                      <span style={{ color: "red" }}>
                        {this.state.errors["rate"]}
                      </span>
                    </div>                    
                  </div>
                  <div>
                  <div className="form-group">                      
                      <textarea
                        className="form-control"
                        id="editDescription"
                        name="description"
                        placeholder="Enter Your Comment Here"
                        rows="4"
                        cols="50"
                        onChange={this.handleChange.bind(this, "description")}
                        value={this.state.fields["description"]}
                      ></textarea>
                      <span style={{ color: "red" }}>
                        {this.state.errors["description"]}
                      </span>
                    </div>
                    </div>
                </div>
                
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal" onClick={()=>this.refresh()}>Close</button>
                  <button type="submit" className="btn btn-warning">
                    Add
                  </button>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default withRouter(Detail);