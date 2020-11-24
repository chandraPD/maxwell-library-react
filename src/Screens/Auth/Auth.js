import React, { Component } from "react";
import "./Assets/Css/login.css";
import LoginImage from "./Assets/Images/cover.png";
import BookShelfImage from "./Assets/Images/bookshelf.png";
import { Link } from "react-router-dom";

class Auth extends Component {

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

  render() {
    return (
      <main>
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
              <div className="login-wrapper my-auto" id="login">
                <h1 className="form-title">Login</h1>
                <p className="form-subtitle">
                  Welcome Back, Please Login to your Account
                </p>

                <form action="#" id="loginForm">
                  <div className="container-form">
                    <div className="form-group bottom-label">
                      <label for="exampleInputEmail1" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control custom-form"
                        id="exampleInputEmail1"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="form-group bottom-label">
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
                      />
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
                    <Link to="/">
                      <input
                        name="login"
                        id="login"
                        className="btn login-btn"
                        type="submit"
                        value="Login"
                      />
                      </Link>
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
              <div className="register-wrapper my-auto" id="register">
                <h1 className="form-title">Register</h1>
                <p className="form-subtitle">
                  Welcome! Please Register to your Account
                </p>

                <form role="form" id="formRegister">
                  <div className="container-form">
                    <div className="form-group bottom-label">
                      <label for="inputUsername" className="label-login">
                        Username
                      </label>
                      <input
                        type="text"
                        name="userName"
                        className="form-control custom-form"
                        id="inputUsername"
                        placeholder="Enter username"
                        autocomplete="off"
                      />
                    </div>
                    <div className="form-group bottom-label">
                      <label for="inputFullName" className="label-login">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        className="form-control custom-form"
                        id="inputFullName"
                        placeholder="Enter full name"
                        autocomplete="off"
                      />
                    </div>
                    <div className="form-group bottom-label">
                      <label for="inputEmail" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control custom-form"
                        id="inputEmail"
                        placeholder="Enter email"
                        autocomplete="off"
                      />
                    </div>
                    <div className="form-group bottom-label">
                      <label for="inputPassword" className="label-login">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        className="form-control custom-form"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                    </div>
                  </div>
                  <div className="container-btn">
                    <div className="row ">
                      <input
                        name="signup"
                        id="signup"
                        className="btn signup-btn"
                        type="submit"
                        value="Sign Up"
                      />
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
              <div className="forgot-wrapper my-auto" id="forgotPassword">
                <h1 className="form-title">Forgot Password</h1>
                <p className="form-subtitle">
                  Forgot your password? Don't worry, we got you covered.
                </p>

                <form action="#" id="formForgot">
                  <div className="container-form">
                    <div className="form-group bottom-label">
                      <label for="inputUsername" className="label-login">
                        Username
                      </label>
                      <input
                        type="text"
                        name="userName"
                        className="form-control custom-form"
                        id="inputUsername"
                        placeholder="Enter username"
                        autocomplete="off"
                      />
                    </div>
                    <div className="form-group bottom-label">
                      <label for="inputEmail" className="label-login">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="email"
                        className="form-control custom-form"
                        id="inputEmail"
                        placeholder="Enter email"
                        autocomplete="off"
                      />
                    </div>
                  </div>
                  <div className="container-btn">
                    <div className="row ">
                      <input
                        name="submit"
                        id="submit"
                        className="btn submit-btn"
                        type="submit"
                        value="Submit"
                      />
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

export default Auth;
