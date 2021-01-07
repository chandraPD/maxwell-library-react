import React, { Component } from 'react';
import './TopUpManagement.style.css'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import Card from '../TopUp/Card';
import "bootstrap";
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import Status from '../../../Components/Datatable/Status'
import { MDBIcon } from "mdbreact";
import NumberFormat from 'react-number-format';
import AuthService from '../../../Services/auth.service';
import Axios2 from '../../../Instances/axios-instances';

class TopUpManagement extends Component {
  
  constructor(props) {  
    super(props);    
    this.state = {      
      fields: {},
      errors: {},
      data: [],
      rows: [],
      results: [],
      result: [],
      data: [],        
      headings: [],
      user:[],
      role:"",
      show:true,
      password:""      
    };
  }
  componentDidMount() {                 
    this.getAll();
    this.show();
    this.getRole();    
    this.getUser();
  }

  async getRole(){    
    const getRole = await Axios2.get('top_up_management/getRole');
    var role=getRole;
    if (role.data=="[ROLE_ADMIN]") {      
      this.setState({role: "[ROLE_ADMIN]" })
    } else{
      this.setState({role: "[ROLE_USER]" })
    } 
    if (this.state.role=="[ROLE_ADMIN]") {      
      this.setState({headings: ["No", "ID", "Action", "Email", "Total Nominal (Rp)", "Payment Method", "Status"] })
    } else{
      this.setState({headings: ["No", "ID", "Email", "Total Nominal (Rp)", "Payment Method", "Status"] })
    } 
  }

  async getAll(){  
    const getRole = await Axios2.get('top_up_management/getRole');
    await Axios2.get('top_up_management/getAll').then((getData)=>{
      const result_topup = getData.data;
      this.setState({ data: result_topup });
      this.fetchData(getRole);
      $("#example1").DataTable({
        responsive: true,
        autoWidth: false,
      });  
    });    
    console.log(getRole)
   
    var role=getRole;    
    console.log(role.data)
    if (role.data=="[ROLE_ADMIN]") {      
      this.setState({role: "[ROLE_ADMIN]" })
    } else{
      this.setState({role: "[ROLE_USER]" })
    } 

   
            
    // $("#example1").DataTable().destroy();
      
    // this.fetchData();
  }

  getUser(){         
    Axios2.get('user').then((getData)=>{
      const result_topup = getData.data;
      console.log(getData)
      this.setState({ user: result_topup });
      
    })    
  }

  getId = (id) => {
    Axios2.get('top_up_management/getId/' + id)
      .then((res) => {
        console.log(res);
        this.setState({
          nominal:res.data.nominal,
          paymentMethod:res.data.paymentMethod
        })
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      showCancelButton: true,
      text: 'Are you sure want to confirm this?',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios2.put('top_up/accept/' + id, res)
        .then((response) => {
          console.log(response);
        })
        Swal.fire({
        icon: 'success',
        title: 'Success!',
        showCancelButton: false,
        text:  'Confirm Top Up Already Success!',
        }).then((result)=>{
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
    })
      })
  }

  getId2 = (id) => {  
    Axios2.get('top_up_management/getId/' + id)
      .then((res) => {
        console.log(res);
        this.setState({
          nominal:res.data.nominal,
          paymentMethod:res.data.paymentMethod
        })
    Swal.fire({
      icon: 'warning',
      title: 'Warning!',
      showCancelButton: true,
      text: 'Are you sure want to Cancel this?',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Axios2.put('top_up/cancel/' + id, res)
        .then((response) => {
          console.log(response);
        })
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          showCancelButton: false,
          text:  'Cancel Top Up Already Success!',
          }).then((result)=>{
            if(result.isConfirmed){
              window.location.reload();
            }
          })
      }
    })
      })
  }

  fetchData(getRole) {
    var role=getRole;
    console.log(role.data)
    let results = [];
    let result = this.state.data;
    var no=1;


    result.forEach( topup => {
      var row = [];
      var actVal, statusVal = '';
      if (topup.statusPayment == 'Success') {
        actVal = <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            -
          </div>
        </td>
        statusVal = <Status type="success" val="Success" />
      } else if (topup.statusPayment == 'Cancelled') {
        actVal = <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            -
          </div>
        </td>
        statusVal = <Status type="danger" val="Cancelled" />
      } else {
        actVal = <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            <Action type="success" title="Edit" icon="fas fa-check" onClick={() => this.getId(topup.historyBalanceId)} />
            <Action type="danger" title="Delete" icon="fas fa-ban" onClick={() => this.getId2(topup.historyBalanceId)} />
          </div>
        </td>
        statusVal = <Status type="warning" val="Pending" />
      }
      row.push(<td className="text-center" >{no++}</td>);
      row.push(<td className="text-center" >{topup.historyBalanceId}</td>);
      if (role.data==="[ROLE_ADMIN]"){
        row.push(<td className="text-center" >{actVal}</td>);
      }      
      // row.push(<td className="text-center" >{actVal}</td>);
      row.push(<td className="text-center" >{topup.userBalanceEntity.userEntity.email}</td>);
      row.push(<td>{<NumberFormat value={topup.nominal} displayType={'text'} thousandSeparator={true} prefix={'Rp. '}/>}</td>);
      row.push(<td>{topup.paymentMethod}</td>);
      row.push(<td className="text-center" >{statusVal}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
  }

  async show(){
    const getRole = await Axios2.get('top_up_management/getRole');
    var role=getRole;
    if (role.data=="[ROLE_ADMIN]") {      
      this.setState({role: "[ROLE_ADMIN]" })
    } else{
      this.setState({role: "[ROLE_USER]" })
    } 
    if (this.state.role=="[ROLE_ADMIN]") {      
      this.setState({show:true })
    } else{
      this.setState({show:false})
    }
  }

  handleValidation2() {    
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Password
    if (!fields["PasswordConfirm"]) {
      formIsValid = false;
      errors["PasswordConfirm"] = "Password cannot be empty";
    }

    //Confrim Password
    if (!fields["PasswordConfirm2"]) {
      formIsValid = false;
      errors["PasswordConfirm2"] = "Password Confirm cannot be empty";
    }

    if (fields["PasswordConfirm"]!==fields["PasswordConfirm2"]){
      formIsValid = false;
      errors["PasswordConfirm2"] = "Password don't Match";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async validatepass(){
    let fields = this.state.fields;    
  const topup = {    
    user_balance_id: fields["Name"],
    password: fields["PasswordConfirm"]
  }
    var  match=await Axios2.post('top_up_management/getPass',topup);    
    return match.data
  }

  contactSubmit2(e) {    
    let fields = this.state.fields;
    e.preventDefault();
    if (this.handleValidation2()) {      
      $('#passwordModal').modal('hide');
      const topup = {
        nominal: fields["Nominal"],
        paymentMethod: fields["Payment"],
        user_balance_id: fields["Name"],
        password: fields["PasswordConfirm"]
      }
      console.log(topup)            
      this.validatepass().then(x => {       
        if (x==true) {
          Axios2.post('top_up/post2', topup)
              .then((response) => {
                console.log(response);
              })
        Swal.fire({
          title: "Success Save Top Up Data!",
          text: "You Already Success to save this data!",
          icon: "success",
          buttons: true,
        })
        .then((isConfirmed) => {
          if (isConfirmed) {
            window.location.reload();
        }
        })
        } else {
          Swal.fire({
            title: "Wrong Password",
            text: "Failed Wrong Password",
            icon: "warning",
            buttons: true,
          })
          .then((isConfirmed) => {
            if (isConfirmed) {
              window.location.reload();
          }
          })
        }
    })      
      
      

    } 
  }

  handleChange2(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["Name"]) {
      formIsValid = false;
      errors["Name"] = "Name cannot be empty";
    }

    //Nominal
    if (!fields["Nominal"]) {
      formIsValid = false;
      errors["Nominal"] = "Nominal cannot be empty";
    }

    //Payment
    if (!fields["Payment"]) {
      formIsValid = false;
      errors["Payment"] = "Payment cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  contactSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      $('#topupModal').modal('hide');
      $('#checkModal').modal('show');
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });    
  } 

  refresh(){
    window.location.reload();
  }

  render() {
    
    const { rows,headings,show,user } = this.state;    
    console.log(this.state.user)      
    return (            
      <div className="wrapper">
        {/* Navbar */}      
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          {/* /.modal */}
          <div className="modal fade" id="cancelModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Do you want to cancel?
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">Are you serious want to cancel?</div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">
                    Close
                  </button>
                  <a className="btn btn-danger" id="btn-delete" href="#" data-dismiss="modal" data-toggle="modal" data-target="#CancelModal" onclick="cancelstatus()">Cancel</a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="topupModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Top Up
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form
                role="form"
                id="addtopup"
                onSubmit={this.contactSubmit.bind(this)}
              >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">ID User:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="topup-user" name="name" className="form-control" placeholder="Enter ID User" onChange={this.handleChange.bind(this, "Name")} value={this.state.fields["Name"]} />
                      <span style={{ color: "red" }}>
                            {this.state.errors["Name"]}
                          </span>
                          {/* <select id="dropdown" className="custom-select"
            OnChange={this.handleDropdownChange}>
              {this.state.user.map(person => <option value={person.userId}>{person.email}</option>)}                            
            </select> */}
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-lg-5">
                      <label className="title-module">Total Nominal:</label>
                    </div>
                    <div className="col-lg-7">
                      <div className="form-group">
                        <div className="radio-group">
                          <div className="row row-cols-md-3" style={{ textAlign: 'center' }}>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option1" value="10000"  onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option1" style={{ fontWeight: 'normal' }}>Rp. 10000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option2" value="20000"  onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option2" style={{ fontWeight: 'normal' }}>Rp. 20000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option3" value="30000"  onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option3" style={{ fontWeight: 'normal' }}>Rp. 30000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option4" value="50000"  onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option4" style={{ fontWeight: 'normal' }}>Rp. 50000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option5" value="100000"  onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option5" style={{ fontWeight: 'normal' }}>Rp. 100000</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option" id="option6" value="200000" onChange={this.handleChange.bind(this, "Nominal")} />
                              <label htmlFor="option6" style={{ fontWeight: 'normal' }}>Rp. 200000</label>
                            </div>
                            <span style={{ color: "red" }}>
                            {this.state.errors["Nominal"]}
                          </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-lg-5">
                      <label className="title-module">Payment Method:</label>
                    </div>
                    <div className="col-lg-7">
                      <div className="form-group">
                        <div className="radio-group method">
                          <div className="row row-cols-md-3" style={{ textAlign: 'center' }}>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method1" Value="Credit Card" onChange={this.handleChange.bind(this, "Payment")} />
                              <label htmlFor="option1" style={{ fontWeight: 'normal' }}>Credit Card</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method2" Value="Paypall" onChange={this.handleChange.bind(this, "Payment")} />
                              <label htmlFor="option2" style={{ fontWeight: 'normal' }}>Paypall</label>
                            </div>
                            <div className="icheck-primary">
                              <input type="radio" name="option2" id="option-method3" Value="OVO" onChange={this.handleChange.bind(this, "Payment")} />
                              <label htmlFor="option3" style={{ fontWeight: 'normal' }}>OVO</label>
                            </div>
                            <div className="icheck-primary gopay">
                              <input type="radio" name="option2" id="option-method4" Value="Gopay" onChange={this.handleChange.bind(this, "Payment")}  />
                              <label htmlFor="option4" style={{ fontWeight: 'normal' }}>Gopay</label>
                            </div>
                            <div className="icheck-primary dana">
                              <input type="radio" name="option2" id="option-method5" Value="Dana" onChange={this.handleChange.bind(this, "Payment")} />
                              <label htmlFor="option5" style={{ fontWeight: 'normal' }}>Dana</label>
                            </div>
                            <div className="icheck-primary cash">
                              <input type="radio" name="option2" id="option-method6" Value="Cash" onChange={this.handleChange.bind(this, "Payment")}  />
                              <label htmlFor="option6" style={{ fontWeight: 'normal' }}>Cash</label>
                            </div>
                            <span style={{ color: "red" }}>
                            {this.state.errors["Payment"]}
                          </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal">
                    Close
                  </button>
                  <button className="btn btn-primary" id="btn-delete" type="submit" >Next</button>
                </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal fade" id="checkModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Check Data Top Up
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Username:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checkuser" name="name" className="form-control" value={this.state.fields["Name"]} readOnly placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Total Nominal:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checknominal" name="name" className="form-control" value={this.state.fields["Nominal"]} readOnly placeholder />
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Payment Method:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="text" id="checkmethod" name="name" className="form-control" value={this.state.fields["Payment"]} readOnly placeholder />
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal" data-target="#topupModal" data-toggle="modal">
                    Back
                  </button>
                  <a className="btn btn-primary" id="btn-delete" href="#" data-dismiss="modal" data-toggle="modal" data-target="#passwordModal">Next</a>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="passwordModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabesl" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Password
                  </h5>
                  <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <form
                role="form"
                id="addtopup"
                onSubmit={this.contactSubmit2.bind(this)}
              >
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Password:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="password" id="PasswordConfirm" name="PasswordConfirm" className="form-control" placeholder="Password" onChange={this.handleChange2.bind(this, "PasswordConfirm")} value={this.state.fields["PasswordConfirm"]} />
                      <span style={{ color: "red" }}>
                            {this.state.errors["PasswordConfirm"]}
                          </span>
                    </div>
                  </div>
                  <hr className="divider" />
                  <div className="row">
                    <div className="col-md-5">
                      <label className="title-module">Confirm Password:</label>
                    </div>
                    <div className="col-md-7">
                      <input type="password" id="PasswordConfirm2" name="PasswordConfirm2" className="form-control" placeholder="Confirm Password" onChange={this.handleChange2.bind(this, "PasswordConfirm2")} value={this.state.fields["PasswordConfirm2"]} />
                      <span style={{ color: "red" }}>
                            {this.state.errors["PasswordConfirm2"]}
                          </span>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" data-dismiss="modal" data-toggle="modal" data-target="#checkModal">
                    Back
                  </button>
                  <button className="btn btn-success" id="btn-delete" type="submit">Confirm</button>
                </div>
                </form>
              </div>
            </div>
          </div>
          {/* Main content */}

          <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3>Top Up Management</h3>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href='/'>Home</a>
                    </li>
                    <li className="breadcrumb-item active">Top Up Management</li>
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
                      { show ?  <button
                        type="button"
                        className="btn btn-primary add-btn"
                        data-toggle="modal"
                        data-target="#topupModal"                                                
                        style={{ float: "right" }}
                      >
                        <i className="nav-icon fas fa-plus"></i>
                      Add Top Up                 
                    </button> : null}                     
                    </div>
                  </div>
                </div>

                <div className="card-body">                  
                  <DataTable headings={headings} rows={rows} />                    
                </div>
              </div>
            </div>
          </section>
          {/* /.content */}
        </div>
        {/* /.content-wrapper */}
      </div>
    )
  }
}

export default TopUpManagement;