// import { render } from '@testing-library/react'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import swal from 'sweetalert'

class ChangePassword extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            fields: {},
            errors: {}
        }
    }

    handleValidationChangePassword(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //email
        if(!fields['email']) {
            formIsValid = false;
            errors['email'] = 'Email cannot be empty'
        }

        if(typeof fields['email'] !== "undefined") {
            let lastAtPos = fields['email'].lastIndexOf('@')
            let lastDotPos = fields['email'].lastIndexOf('.')
      
            if(!(lastAtPos < lastDotPos && lastAtPos > 0 && fields['email'].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors['email'] = "Email is not valid"
            }
          }

        //oldPassword
        if(fields['oldPassword'] != null){
            let lengthPass = fields['oldPassword'].length
            if(lengthPass < 8) {
                formIsValid = false
                errors['oldPassword'] = "Your Password Must Be At Least 8 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            } else if(lengthPass > 20){
                formIsValid = false
                errors['oldPassword'] = "Your Password Must Be More Than 20 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            }
        }
        if(!fields['oldPassword']){
            formIsValid = false;
            errors['oldPassword'] = 'Old Password cannot be empty'
        }

        //newPassword
        if(fields['newPassword'] != null){
            let lengthPass = fields['newPassword'].length
            if(lengthPass < 8) {
                formIsValid = false
                errors['newPassword'] = "Your Password Must Be At Least 8 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            }else if(lengthPass > 20){
                formIsValid = false
                errors['newPassword'] = "Your Password Must Be More Than 20 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            }
        }
        if(!fields['newPassword']){
            formIsValid = false;
            errors['newPassword'] = 'New Password cannot be empty'
        }

        //verifyPassword
        if(fields['verifyPassword'] != null){
            let lengthPass = fields['verifyPassword'].length
            if(lengthPass < 8) {
                formIsValid = false
                errors['verifyPassword'] = "Your Password Must Be At Least 8 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            }else if(lengthPass > 20){
                formIsValid = false
                errors['verifyPassword'] = "Your Password Must Be More Than 20 Character Long"
                swal(
                    'Submit Failed !',
                    'You must fill password according to the requirement',
                    'error'
                );
            }
        }
        if(!fields['verifyPassword']){
            formIsValid = false;
            errors['verifyPassword'] = 'Verify Password cannot be empty'
        }
        
        this.setState({errors: errors})
        return formIsValid
    }


    contactSubmitChangePassword(e) {
        e.preventDefault();
        let fields = this.state.fields;
    
        if(this.handleValidationChangePassword()){
            swal(
                'Submitted',
                'You clicked the button!',
                'success'
                ).then(()=> this.props.history.push('/profile')) 
            }
            

    }

    handleChangePassword(field, e) {
        let fields = this.state.fields
        fields[field] = e.target.value
        this.setState({fields})
    }

    // CheckNewPassword = (e) => {
    //     if(document.getElementById('verifyPassword').value === e){
    //        document.getElementById('matchPassword').style.display = 'block'
    //        document.getElementById('notMatchPassword').style.display = 'none'
    //     }else{
    //         document.getElementById('matchPassword').style.display = 'none'
    //         document.getElementById('notMatchPassword').style.display = 'block'
    //     }
    // }

    // CheckVerifyPassword = (e) => {
    //     if(document.getElementById('newPassword').value === e){
    //        document.getElementById('matchPassword').style.display = 'block'
    //        document.getElementById('passwordHelpBlock3').style.display = 'none'
    //        document.getElementById('notMatchPassword').style.display = 'none'
    //     }else{
    //         document.getElementById('matchPassword').style.display = 'none'
    //         document.getElementById('notMatchPassword').style.display = 'block'
    //     }
    // }
        
    render(){
        return(
            <div className="content-wrapper" onSubmit={this.contactSubmitChangePassword.bind(this)}>
                <div className="container-changepwd">
                    <div className="content-changepwd">
                        <h3 className="changepwd-title">Change Password</h3>
                        <form id="changePwdForm">
                            <div className="form-group row mb-5">
                                <label className="col-sm-3 col-form-label">Email</label>
                                <div className="col-sm-8">
                                    <input 
                                    type="email" 
                                    name="email" 
                                    className="form-control" 
                                    placeholder="example@gmail.com" 
                                    id="email"
                                    onChange={this.handleChangePassword.bind(this, 'email')}/>
                                </div>
                                <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["email"]}</span>
                            </div>
                            <div className="form-group row mb-5">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">Old Password</label>
                                <div className="col-sm-8">
                                    <input 
                                    type="password" 
                                    name="oldPassword" 
                                    className="form-control" 
                                    id="oldPassword"
                                    onChange={this.handleChangePassword.bind(this, 'oldPassword')}/>
                                    <small id="passwordHelpBlock1" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                                <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["oldPassword"]}</span>
                            </div>
                            <div className="form-group row mb-5">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">New Password</label>
                                <div className="col-sm-8">
                                    <input 
                                    type="password" 
                                    name="newPassword" 
                                    className="form-control" 
                                    id="newPassword"
                                    onChange={this.handleChangePassword.bind(this, 'newPassword')}/>
                                        {/* // this.CheckNewPassword(e.target.value)} */}
                                        
                                    <small id="passwordHelpBlock2" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                </div>
                                <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors["newPassword"]}</span>
                            </div>
                            <div className="form-group row mb-5">
                                <label for="inputPassword3" className="col-sm-3 col-form-label">Verify Password</label>
                                <div className="col-sm-8">
                                    <input 
                                    type="password" 
                                    name="verifyPassword" 
                                    className="form-control" 
                                    id="verifyPassword"
                                    onChange={this.handleChangePassword.bind(this, 'verifyPassword')}/>
                                        {/* // this.CheckVerifyPassword(e.target.value)} */}
                                        
                                    <small id="passwordHelpBlock3" className="form-text text-muted">
                                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                                    </small>
                                    <span id='matchPassword' style={{display : 'none', color: 'green', marginTop: '10px'}}><strong>Password Match</strong></span>
                                    <span id='notMatchPassword' style={{display : 'none', color: 'red', marginTop: '10px'}}><strong>Password Doesn't Match</strong></span>
                                </div>
                                <span style={{color: "red", marginLeft: "15px", fontSize: "13px"}}>{this.state.errors['verifyPassword']}</span>
                            </div>
                            <br/>
                            <div className="save-pwd mr-3">
                                <input id="save-change" type="submit" value="Confirm" className="btn btn-primary mr-2" onClick={()=> this.contactSubmitChangePassword.bind(this)}/>
                                {/* <a href="Profile.html"> */}
                                <Link to='/Profile'><button id="close-change" type="button" className="btn btn-light">Close</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ChangePassword)