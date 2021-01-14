import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../Instances/axios-instances'

class ChangePassword extends Component {
  constructor() {
    super();

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidationChangePassword() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //oldPassword
    if (fields['oldPassword'] != null) {
      let lengthPass = fields['oldPassword'].length;
      if (lengthPass < 8) {
        formIsValid = false;
        errors['oldPassword'] =
          'Your Password Must Be At Least 8 Character Long';
        Swal.fire(
          'Submit Failed !',
          'You must fill password according to the requirement',
          'error'
        );
      } else if (lengthPass > 20) {
        formIsValid = false;
        errors['oldPassword'] =
          'Your Password Must Be More Than 20 Character Long';
        Swal.fire(
          'YSubmit Failed !',
          'ou must fill password according to the requirement',
          'error'
        );
      }
    }
    if (!fields['oldPassword']) {
      formIsValid = false;
      errors['oldPassword'] = 'Old Password cannot be empty';
    }

    //newPassword
    if (fields['newPassword'] != null) {
      let lengthPass = fields['newPassword'].length;
      if (lengthPass < 8) {
        formIsValid = false;
        errors['newPassword'] =
          'Your Password Must Be At Least 8 Character Long';
        Swal.fire(
          'Submit Failed !',
          'You must fill password according to the requirement',
          'error'
        );
      } else if (lengthPass > 20) {
        formIsValid = false;
        errors['newPassword'] =
          'Your Password Must Be More Than 20 Character Long';
        Swal.fire(
          'Submit Failed !',
          'You must fill password according to the requirement',
          'error'
        );
      }
    }
    if (!fields['newPassword']) {
      formIsValid = false;
      errors['newPassword'] = 'New Password cannot be empty';
    }

    //verifyPassword
    if (fields['verifyPassword'] != null) {
      let lengthPass = fields['verifyPassword'].length;
      if (lengthPass < 8) {
        formIsValid = false;
        errors['verifyPassword'] =
          'Your Password Must Be At Least 8 Character Long';
        Swal.fire(
          'Submit Failed !',
          'You must fill password according to the requirement',
          'error'
        );
      } else if (lengthPass > 20) {
        formIsValid = false;
        errors['verifyPassword'] =
          'Your Password Must Be More Than 20 Character Long';
        Swal.fire(
          'Submit Failed !',
          'You must fill password according to the requirement',
          'error'
        );
      }
    }
    if (!fields['verifyPassword']) {
      formIsValid = false;
      errors['verifyPassword'] = 'Verify Password cannot be empty';
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  async contactSubmitChangePassword(e) {
    e.preventDefault();

    if (this.handleValidationChangePassword()) {

        let oldPassword = this.state.fields["oldPassword"]
        let newPassword = this.state.fields["newPassword"]

        const dataChangePassword = {
            oldPassword : oldPassword,
            newPassword : newPassword
        }

        const postChangePassword = await axios.post('/user/password/change', dataChangePassword)

        if (postChangePassword.data.status === 200 ) {
            Swal.fire({

                icon: 'success',
                title: 'Change Password Success !',
                showCancelButton: false
                }).then((result) => {

                if (result.isConfirmed) {
                    this.props.history.push('/profile')
                }
                })
        } else {
            Swal.fire(
                'Change password Failed !',
                postChangePassword.data.messages,
                'error'
            )
        }
    }
  }

  handleChangePassword(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div
        className="content-wrapper"
        onSubmit={this.contactSubmitChangePassword.bind(this)}
      >
        <div className="container-changepwd">
          <div className="content-changepwd">
            <h3 className="changepwd-title">Change Password</h3>
            <form id="changePwdForm">
              <div className="form-group row mb-5">
                <label for="inputPassword3" className="col-sm-3 col-form-label">
                  Old Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    name="oldPassword"
                    maxlength="20"
                    className="form-control"
                    id="oldPassword"
                    onChange={this.handleChangePassword.bind(
                      this,
                      'oldPassword'
                    )}
                  />
                  <small
                    id="passwordHelpBlock1"
                    className="form-text text-muted"
                  >
                  </small>
                </div>
                <span
                  style={{ color: 'red', marginLeft: '15px', fontSize: '13px' }}
                >
                  {this.state.errors['oldPassword']}
                </span>
              </div>
              <div className="form-group row mb-1">
                <label for="inputPassword3" className="col-sm-3 col-form-label">
                  New Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    name="newPassword"
                    maxlength="20"
                    className="form-control"
                    id="newPassword"
                    onChange={this.handleChangePassword.bind(
                      this,
                      'newPassword'
                    )}
                  />
                  <small
                    id="passwordHelpBlock2"
                    className="form-text text-muted"
                  >
                    Your password must be 8-20 characters long.
                  </small>
                </div>
                <span
                  style={{ color: 'red', marginLeft: '15px', fontSize: '13px' }}
                >
                  {this.state.errors['newPassword']}
                </span>
              </div>
              <div className="form-group row mb-5">
                <label for="inputPassword3" className="col-sm-3 col-form-label">
                  Verify Password
                </label>
                <div className="col-sm-8">
                  <input
                    type="password"
                    name="verifyPassword"
                    maxlength="20"
                    className="form-control"
                    id="verifyPassword"
                    onChange={this.handleChangePassword.bind(
                      this,
                      'verifyPassword'
                    )}
                  />
                  <span
                    id="matchPassword"
                    style={{
                      display: 'none',
                      color: 'green',
                      marginTop: '10px',
                    }}
                  >
                    <strong>Password Match</strong>
                  </span>
                  <span
                    id="notMatchPassword"
                    style={{ display: 'none', color: 'red', marginTop: '10px' }}
                  >
                    <strong>Password Doesn't Match</strong>
                  </span>
                </div>
                <span
                  style={{ color: 'red', marginLeft: '15px', fontSize: '13px' }}
                >
                  {this.state.errors['verifyPassword']}
                </span>
              </div>
              <br />
              <div className="save-pwd mr-3">
                <input
                  id="save-change"
                  type="submit"
                  value="Confirm"
                  className="btn btn-primary mr-2"
                  onClick={() => this.contactSubmitChangePassword.bind(this)}
                />
                {/* <a href="Profile.html"> */}
                <Link to="/Profile">
                  <button
                    id="close-change"
                    type="button"
                    className="btn btn-light"
                  >
                    Close
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChangePassword);
