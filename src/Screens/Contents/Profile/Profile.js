import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import avatarUser from '../../../Assets/Media/user/profile.png'
import swal from 'sweetalert'


class Profile extends Component {

    displayEditForm() {
        const editForm = document.querySelector('#container-editform');
        editForm.style.display = 'block';

    }

    hiddenEditForm(){
        const editForm = document.querySelector('#container-editform');
        editForm.style.display = 'none';
    }

    submitEditProfile() {
        const editButton = document.querySelector('button.edit-profile');
        const editForm = document.querySelector('#container-editform');
        const cancelForm = document.querySelector('.btn-editform button');
        
        editForm.style.display = 'none';
    
        var firstName = document.getElementById('user-firstname').value;
        var lastName = document.getElementById('user-lastname').value;
        var dateOfBirth = document.getElementById('date-birth').value;
        var emailUser = document.getElementById('user-email').value;
        var addressUser = document.getElementById('user-address').value;
        var phoneNumber = document.getElementById('user-number').value;
    
        if (firstName == '' || lastName == '' || dateOfBirth == '' || emailUser == '' || addressUser == '' || phoneNumber == ''){
                swal(
                    'Submit Failed !',
                    'You should fill in the blank',
                    'error'
                );
                editForm.style.display = 'none';
            }else{
                swal(
                    'Submitted !',
                    'You clicked the button!',
                    'success'
                );
    
                document.getElementById('firstname').innerHTML = firstName;
                document.getElementById('lastname').innerHTML = lastName;
                document.getElementById('birthday').innerHTML = dateOfBirth;
                document.getElementById('email').innerHTML = emailUser;
                document.getElementById('address').innerHTML = addressUser;
                document.getElementById('phonenumber').innerHTML = phoneNumber;
                
            }
    
    }
    render(){
        return(
            <Fragment>
            <div className="content-wrapper">
                <section className="content-user">
                    <div className="container-profile">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="profile-account">
                                    <div className="picture">
                                        <img src={avatarUser} alt=""/>
                                    </div>
                                    <button 
                                    type="button" 
                                    className="btn btn-primary edit-profile"
                                    name="editProfile"
                                    onClick={() => this.displayEditForm()}
                                    >
                                    Edit Profile
                                    </button>
                                </div>
                            </div>
                        
                        </div>
                        <h1 className="title-profile">
                        My Profile
                        </h1>
                        <div className="data-user">
                            <div className="row">
                                <div className="col-lg-6">
                                <div className="data">
                                    <h5 >First Name</h5>
                                    <span id="firstname">Niki</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Last Name</h5>
                                    <span id="lastname">Zefanya</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5>Date of Birth</h5>
                                    <span id="birthday">19/06/2020</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5>Address</h5>
                                    <span id="address">Indonesia</span>
                                    <hr/>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="data">
                                    <h5>Email</h5>
                                    <span id="email">example@gmail.com</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Phone Number</h5>
                                    <span id="phonenumber">+628123456789</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Your Balance</h5>
                                    <span id="mybalance">Rp 50.000,-</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    {/* <a href="change_password.html"><strong><u>Change Password</u></strong></a> */}
                                    <Link to='/ChangePassword'>Change Password</Link>
                                </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </section>

                {/* Edit Form  */}
                <section className="padding-editform">
                <div id="container-editform">
                <h3 style={{textAlign: 'center'}}>Edit Your Profile</h3>
                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">First Name</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-firstname" type="text" name="user-firstname"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Last Name</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-lastname" type="text" name="user-lastname"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Date of Birth</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="date-birth" type="text" name="date-birth" placeholder="dd/mm/yyyy"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Address</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-address" type="text" name="user-address"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Email</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-email" type="email" name="user-email" placeholder="example@gmail.com"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Phone Number</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-number" type="text" name="user-number" placeholder="+62-812-345-6789"/>
                        </div>
                    </div>
                    </div>

                    <div className="btn-editform">
                    <input className="btn btn-primary mr-2" type="submit" value="Submit" onClick={()=> this.submitEditProfile()}/>
                    <button type="button" className="btn btn-secondary" onClick={() => this.hiddenEditForm()}>Close</button>
                    </div>
                </div>
            </section>
            </div>
            </Fragment>

        )
    }
}
export default Profile