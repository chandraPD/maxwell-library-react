// import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class ChangePassword extends Component {
    render(){
        return(
            <div className="content-wrapper">
                <div className="container-changepwd">
                    <div className="content-changepwd">
                        <h3 className="changepwd-title">Change Password</h3>
                        <form id="changePwdForm">
                            <div className="form-group row mb-3">
                                <label className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-8">
                                    <input type="email" name="email" className="form-control" placeholder="example@gmail.com" id="email"/>
                                </div>
                            </div>
                            <br/>
                            <div className="form-group row mb-3">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">Old Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="oldPassword" className="form-control" id="oldPassword"/>
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">New Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="newPassword" className="form-control" id="newPassword"/>
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">Verify Password</label>
                                <div className="col-sm-8">
                                    <input type="password" name="verifyPassword" className="form-control" id="verifyPassword"/>
                                    <small id="passwordHelpBlock" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                            </div>
                            <br/>
                            <div className="save-pwd mr-3">
                                <input id="save-change" type="submit" value="Confirm" className="btn btn-primary mr-2" onClick={()=>swal('Submitted!','Success to Change Your Password','success')}/>
                                {/* <a href="Profile.html"> */}
                                <Link to='/profile'><button id="close-change" type="button" className="btn btn-light">Close</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ChangePassword