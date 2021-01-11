import React, { Component } from "react";
import "./Assets/Css/login.css";
import LoginImage from "./Assets/Images/cover.png";
import BookShelfImage from "./Assets/Images/bookshelf.png";
import { Link, Redirect, withRouter } from "react-router-dom";
import AuthService from '../../Services/auth.service'
import Swal from 'sweetalert2'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

    this.state = {
       fields: {},
       errors: {}
    }
  }

  handleValidationSignUp() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //firstname
    if(!fields["firstNameSignUp"]) {
      formIsValid = false
      errors["firstNameSignUp"] = "Cannot be empty"
    }

     //lastname
     if(!fields["lastNameSignUp"]) {
      formIsValid = false
      errors["lastNameSignUp"] = "Cannot be empty"
    }

    //email
    if(!fields["emailSignUp"]) {
      formIsValid = false
      errors["emailSignUp"] = "Cannot be empty"
    }

    if(typeof fields["emailSignUp"] !== "undefined") {
      let lastAtPos = fields["emailSignUp"].lastIndexOf('@')
      let lastDotPos = fields["emailSignUp"].lastIndexOf('.')

      if(!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["emailSignUp"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["emailSignUp"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["emailSignUp"] = "Email is not valid"
      }
    }

    if(fields["PasswordSignUp"] != null) {
      let lengthPass = fields["PasswordSignUp"].length
      if(lengthPass < 8) {
        formIsValid = false
        errors["PasswordSignUp"] = "Your password must be at least 8 characters long"
      }
    }

    if(!fields["PasswordSignUp"]) {
      formIsValid = false
      errors["PasswordSignUp"] = "Password cannot be empty"
    }

    this.setState({errors: errors})
    return formIsValid
  }

  handleValidationSignIn() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //email
    if(!fields["emailSignIn"]) {
      formIsValid = false
      errors["emailSignIn"] = "Email cannot be empty"
    }

    if(typeof fields["emailSignIn"] !== "undefined") {
      let lastAtPos = fields["emailSignIn"].lastIndexOf('@')
      let lastDotPos = fields["emailSignIn"].lastIndexOf('.')

      if(!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["emailSignIn"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["emailSignIn"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["emailSignIn"] = "Email is not valid"
      }
    }

    if(!fields["PasswordSignIn"]) {
      formIsValid = false
      errors["PasswordSignIn"] = "Password cannot be empty"
    }

    this.setState({errors: errors})
    return formIsValid
  }

  handleValidationForgotPass() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //username
    if(!fields["userNameForgotPass"]) {
      formIsValid = false;
      errors["userNameForgotPass"] = "Username cannot be empty"
    }

    //email
    if(!fields["emailForgotPass"]) {
      formIsValid = false
      errors["emailForgotPass"] = "Cannot be empty"
    }

    if(typeof fields["emailForgotPass"] !== "undefined") {
      let lastAtPos = fields["emailForgotPass"].lastIndexOf('@')
      let lastDotPos = fields["emailForgotPass"].lastIndexOf('.')

      if(!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["emailForgotPass"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["emailForgotPass"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["emailForgotPass"] = "Email is not valid"
      }
    }

    this.setState({errors: errors})
    return formIsValid
  }

  contactSubmitSignUp(e) {
    e.preventDefault()

    if(this.handleValidationSignUp()){
      alert("Success!")
    } else {

    }
  }

  contactSubmitSignIn(e) {
    e.preventDefault()

    if(this.handleValidationSignIn()){
      this.props.history.push('/')
    } else {

    }
  }

  contactSubmitForgotPass(e) {
    e.preventDefault()

    if(this.handleValidationForgotPass()){
      alert("Success!")
    } else {
    }
  }

  handleChangeSignUp(field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({fields})
  }

  handleChangeSignIn(field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({fields})
  }

  handleChangeForgotPass(field, e) {
    let fields = this.state.fields
    fields[field] = e.target.value
    this.setState({fields})
  }


  displaySignUp() {
      var login = document.getElementById("login")
      var register = document.getElementById("register")
      var forgotPassword = document.getElementById("forgotPassword")

      login.style.display = "none"
      register.style.display = "block"
      forgotPassword.style.display = "none"
  }

  displayLogIn() {
    var login = document.getElementById("login")
    var register = document.getElementById("register")
    var forgotPassword = document.getElementById("forgotPassword")

    login.style.display = "block";
    register.style.display = "none";
    forgotPassword.style.display = "none";
  }

  displayForgotPassword() {
    var login = document.getElementById("login")
    var register = document.getElementById("register")
    var forgotPassword = document.getElementById("forgotPassword")

    login.style.display = "none";
    register.style.display = "none";
    forgotPassword.style.display = "block";
  }

  handleRegister(e) {
    e.preventDefault()

     let firstName = this.state.fields["firstNameSignUp"]
     let lastName = this.state.fields["lastNameSignUp"]
     let email = this.state.fields["emailSignUp"]
     let password = this.state.fields["PasswordSignUp"]
     let confirmPassword = this.state.fields["ConfirmPasswordSignUp"]

    if (this.handleValidationSignUp()) {
    	AuthService.register(firstName, lastName, email, password, confirmPassword).then(
        () => {
          Swal.fire({

            icon: 'success',
            title: 'Register Success!',
            showCancelButton: false,
            text: 'Please continue to login',
            }).then((result) => {

            if (result.isConfirmed) {
            window.location.reload()
            }
            })
        }
      )
      .catch(error => Swal.fire(
        'Register Failed !',
        'Either email is taken or password is incorrect',
        'error'
    ))
  }
      this.handleValidationSignUp()
  }

  handleLogin(e) {
    e.preventDefault()

    if(this.handleValidationSignIn()){
      let email = this.state.fields["emailSignIn"]
      let password = this.state.fields["PasswordSignIn"]


    AuthService.login(email, password).then(
      () => {
        this.props.history.push("/");
        window.location.reload();
      }
    ).catch(error => Swal.fire(
      'Login Failed !',
      'Either email or password is incorrect',
      'error'
  ))
    } else {

    }
  }

  render() {
    return (
      <main className="main-style">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-7 px-0 d-none d-sm-block">
              <div className="main-title">
                <h1>
                  Book is a window <br />
                  to the world
                </h1>
                <p>Photo by Mark Pan4ratte on Unsplash</p>
                <div className="img-cover"></div>
                <img src={LoginImage} alt="login image" className="login-img" />
              </div>
            </div>
            <div className="col-sm-5 login-section-wrapper">
              <div className="brand-wrapper">
                <img src={BookShelfImage} alt="logo" className="logo" />
              </div>

              {/* <!--Login Form--> */}
              <div className="login-wrapper my-auto" id="login" onSubmit={this.handleLogin}>
                <h1 className="form-title">Login</h1>
                <p className="form-subtitle">
                  Welcome Back, Please Login to your Account
                </p>

                <form action="#" id="loginForm" >
                  <div className="container-form">
                    <div className="login form-group bottom-label">
                      <label for="exampleInputEmail1" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="emailSignIn"
                        className="form-control custom-form"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                        onChange={this.handleChangeSignIn.bind(this, "emailSignIn")}
                        value={this.state.fields["emailSignIn"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["emailSignIn"]}</span>
                    </div>
                    <div className="login form-group bottom-label">
                      <label
                        for="exampleInputPassword1"
                        className="label-login"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control custom-form"
                        id="exampleInputPassword1"
                        placeholder="Password"
                        onChange={this.handleChangeSignIn.bind(this, "PasswordSignIn")}
                        value={this.state.fields["PasswordSignIn"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["PasswordSignIn"]}</span>
                    </div>
                  </div>
                  <div className="pass-manager">
                    <input
                      type="checkbox"
                      id="rememberPassword"
                      name="rememberPassword"
                    />
                    <label for="rememberPassword">Remember Password</label>

                    <button
                      type="button"
                      className="forgot-btn"
                      onClick={() => this.displayForgotPassword()}
                    >
                      Forgot Password
                    </button>

                  </div>
                  <div className="container-btn">
                    <div className="row">
                      <button
                        name="login"
                        id="submit"
                        className="btn login-btn"
                        type="submit"
                        value="Login"
                      >Login</button>
                      <input
                        name="signup"
                        id="signup"
                        className="btn signup-btn"
                        type="button"
                        value="Sign Up"
                        onClick={() => this.displaySignUp()}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* <!--Register Form--> */}
              <div className="register-wrapper my-auto" id="register" onSubmit={this.handleRegister} >
                <h1 className="form-title">Register</h1>
                <p className="form-subtitle">
                  Welcome! Please Register to your Account
                </p>

                <form role="form" id="formRegister">
                  <div className="container-form">

                    <div className="login form-group bottom-label">
                      <label for="firstName" className="label-login">
                       First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control custom-form"
                        id="firstName"
                        placeholder="Enter first name"
                        autocomplete="off"
                        onChange={this.handleChangeSignUp.bind(this, "firstNameSignUp")}
                        value={this.state.fields["firstNameSignUp"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["firstNameSignUp"]}</span>
                    </div>

                    <div className="login form-group bottom-label">
                      <label for="lastname" className="label-login">
                       Last Name
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control custom-form"
                        id="lastname"
                        placeholder="Enter last name"
                        autocomplete="off"
                        onChange={this.handleChangeSignUp.bind(this, "lastNameSignUp")}
                        value={this.state.fields["lastNameSignUp"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["lastNameSignUp"]}</span>
                    </div>

                    <div className="login form-group bottom-label">
                      <label for="inputEmail" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="emailSignUp"
                        className="form-control custom-form"
                        id="inputEmail"
                        placeholder="Enter email"
                        autocomplete="off"
                        onChange={this.handleChangeSignUp.bind(this, "emailSignUp")}
                        value={this.state.fields["emailSignUp"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["emailSignUp"]}</span>
                    </div>
                    <div className="login form-group bottom-label">
                      <label for="inputPassword" className="label-login">
                        Password
                      </label>
                      <input
                        type="password"
                        name="passwordSignUp"
                        className="form-control custom-form"
                        id="exampleInputPassword"
                        placeholder="Password"
                        onChange={this.handleChangeSignUp.bind(this, "PasswordSignUp")}
                        value={this.state.fields["PasswordSignUp"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["PasswordSignUp"]}</span>
                    </div>
                    <div className="login form-group bottom-label">
                      <label for="inputPassword" className="label-login">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPasswordSignUp"
                        className="form-control custom-form"
                        id="exampleInputPassword"
                        placeholder="Confirm Password"
                        onChange={this.handleChangeSignUp.bind(this, "ConfirmPasswordSignUp")}
                        value={this.state.fields["ConfirmPasswordSignUp"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["PasswordSignUp"]}</span>
                    </div>
                  </div>
                  <div className="container-btn">
                    <div className="row ">
                      <button
                        name="signup"
                        id="signup"
                        className="btn signup-btn"
                        type="submit"
                        value="Sign Up"
                      >Sign Up</button>
                      <input
                        name="login"
                        id="login"
                        className="btn login-btn"
                        type="button"
                        value="Login"
                        onClick={() => this.displayLogIn()}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* <!--Form Forgot Password--> */}
              <div className="forgot-wrapper my-auto" id="forgotPassword" onSubmit={this.contactSubmitForgotPass.bind(this)}>
                <h1 className="form-title">Forgot Password</h1>
                <p className="form-subtitle">
                  Forgot your password? Don't worry, we got you covered.
                </p>

                <form action="#" id="formForgot">
                  <div className="container-form">
                    <div className="login form-group bottom-label">
                      <label for="inputUsername" className="label-login">
                        Username
                      </label>
                      <input
                        type="text"
                        name="userNameForgotPass"
                        className="form-control custom-form"
                        id="inputUsername"
                        placeholder="Enter username"
                        autocomplete="off"
                        onChange={this.handleChangeSignUp.bind(this, "userNameForgotPass")}
                        value={this.state.fields["userNameForgotPass"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["userNameForgotPass"]}</span>
                    </div>
                    <div className="login form-group bottom-label">
                      <label for="inputEmail" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="emailForgotPass"
                        className="form-control custom-form"
                        id="inputEmail"
                        placeholder="Enter email"
                        autocomplete="off"
                        onChange={this.handleChangeSignUp.bind(this, "emailForgotPass")}
                        value={this.state.fields["emailForgotPass"]}
                      />
                      <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["emailForgotPass"]}</span>
                    </div>
                  </div>
                  <div className="container-btn">
                    <div className="row ">
                      <button
                        name="submit"
                        id="submit"
                        className="btn submit-btn"
                        type="submit"
                        value="Submit"
                      >Submit</button>
                      <input
                        name="login"
                        id="login"
                        className="btn login-btn"
                        type="button"
                        value="Back to Login"
                        onClick={() => this.displayLogIn()}
                      />
                    </div>
                  </div>
                </form>
              </div>

              <p className="terms">
                By signing up, you agree to Book’s <br />
                Terms and Conditions & Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default withRouter(Auth);
