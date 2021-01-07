import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import avatarUser from '../../../Assets/Media/user/profile.png'
import Swal from 'sweetalert2'
import axios from '../../../Instances/axios-instances';


class Profile extends Component {
    constructor(){
        super()
        this.state = {
            firstname: '',
            lastname: '',
            datebirth: '',
            email: '',
            address: '',
            number: '',
            img : '',
            balance : ''
        }
    }

    componentDidMount() {
        this.fetchDataUser()
    }

    async fetchDataUser() {
       let balance = JSON.parse(localStorage.getItem('balance'))
       await axios.get('/profile')
            .then((response) => {
                const dataProfile = response.data
                
                let date = new Date(dataProfile.dateOfBirth)
                let newdate = (date.getFullYear()) + '-' + '0' + (date.getMonth() + 1) + '-' +  date.getDate()

                this.setState({
                    firstname : dataProfile.firstName,
                    lastname : dataProfile.lastName,
                    img : dataProfile.img,
                    email : dataProfile.email,
                    balance : balance,
                    address : dataProfile.address,
                    datebirth : newdate,
                    number : dataProfile.phoneNumber
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    displayEditForm() {
        const editForm = document.querySelector('#container-editform');
        editForm.style.display = 'block';

    }

    hiddenEditForm(){
        const editForm = document.querySelector('#container-editform');
        editForm.style.display = 'none';
    }

    submitEditProfile() {
        const editForm = document.querySelector('#container-editform');
        const cancelForm = document.querySelector('.btn-editform button');

        editForm.style.display = 'none';

        var firstName = document.getElementById('user-firstname').value;
        var lastName = document.getElementById('user-lastname').value;
        var dateOfBirth = document.getElementById('date-birth').value;
        var emailUser = document.getElementById('user-email').value;
        var addressUser = document.getElementById('user-address').value;
        var phoneNumber = document.getElementById('user-number').value;

        if (firstName === '' || lastName === '' || dateOfBirth === '' || emailUser === '' || addressUser === '' || phoneNumber === ''){
                Swal.fire(
                    'Submit Failed !',
                    'You should fill in the blank',
                    'error'
                );
                editForm.style.display = 'none';
            }else{
                Swal.fire(
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
                                        <img src={this.state.img} className="img-circle elevation-2 profile-img-custom" style={{height : "100px"}} alt="avatarUser"/>
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
                                    <span id="firstname">{this.state.firstname}</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Last Name</h5>
                                    <span id="lastname">{this.state.lastname}</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5>Date of Birth</h5>
                                    <span id="birthday">{this.state.datebirth}</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5>Address</h5>
                                    <span id="address">{this.state.address}</span>
                                    <hr/>
                                </div>
                                </div>
                                <div className="col-lg-6">
                                <div className="data">
                                    <h5>Email</h5>
                                    <span id="email">{this.state.email}</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Phone Number</h5>
                                    <span id="phonenumber">{this.state.number}</span>
                                    <hr/>
                                </div>
                                <div className="data">
                                    <h5 >Your Balance</h5>
                                    <span id="mybalance">{`Rp. ${this.state.balance},-`}</span>
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
                        <label className="input-title">Profile Image</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-number" type="file"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">First Name</label>
                        </div>
                        <div className="col-lg-12">
                        <input className="input-value" id="user-firstname" type="text" name="user-firstname" value={this.state.firstname}/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Last Name</label>
                        </div>
                        <div className="col-lg-12">
                        <input value={this.state.lastname} className="input-value" id="user-lastname" type="text" name="user-lastname"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Date of Birth</label>
                        </div>
                        <div className="col-lg-12">
                        <input value={this.state.datebirth} className="input-value" id="date-birth" type="date" name="date-birth"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Address</label>
                        </div>
                        <div className="col-lg-12">
                        <input value={this.state.address} className="input-value" id="user-address" type="text" name="user-address"/>
                        </div>
                    </div>
                    </div>

                    <div className="form-item">
                    <div className="row">
                        <div className="col-lg-8">
                        <label className="input-title">Phone Number</label>
                        </div>
                        <div className="col-lg-12">
                        <input value={this.state.number} className="input-value" id="user-number" type="text" name="user-number" placeholder="+62-812-345-6789"/>
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