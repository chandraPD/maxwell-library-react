import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../Instances/axios-instances';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.submitUpdateProfile = this.submitUpdateProfile.bind(this);
    this.state = {
      firstname: '',
      lastname: '',
      datebirth: '',
      email: '',
      address: '',
      number: '',
      img: '',
      balance: '',

      profileimage: '',
      updateFirstName: '',
      updateLastName: '',
      updateBirthDate: '',
      updateAddress: '',
      updatePhoneNumber: '',
    };
  }

  componentDidMount() {
    this.fetchDataUser();
  }

  handleChangeProfile(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  handleAddFile(e) {
    this.getBase64(e.target.files[0]).then((data) =>
      this.setState({
        [e.target.name]: data.split(',').pop(),
      })
    );
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  submitUpdateProfile(e) {
    e.preventDefault();

    let {
      profileimage,
      updateFirstName,
      updateLastName,
      updateBirthDate,
      updateAddress,
      updatePhoneNumber,
    } = this.state;

    let postData = {
      firstName: updateFirstName,
      lastName: updateLastName,
      address: updateAddress,
      phoneNumber: updatePhoneNumber,
      dateOfBirth: updateBirthDate,
      img: profileimage,
    };

    axios
      .post('profile', postData)
      .then(() => {
        this.hiddenEditForm();
        Swal.fire({
          icon: 'success',
          title: 'Update Profile Success!',
          showCancelButton: false,
          text: 'Update profile succes',
        }).then((result) => {
          if (result.isConfirmed) {
            this.fetchDataUser();
          }
        });
      })
      .catch((error) =>
        Swal.fire('Update Failed !', 'Incorrect parameter', 'error')
      );
  }

  async fetchDataUser() {
    let balance = JSON.parse(localStorage.getItem('balance'));
    let date = null
    await axios
      .get('/profile')
      .then((response) => {
        const dataProfile = response.data;

        if(dataProfile.dateOfBirth) {
          date = new Date(dataProfile.dateOfBirth).toISOString().slice(0, 10);
        }

        this.setState({
          firstname: dataProfile.firstName,
          lastname: dataProfile.lastName,
          img: dataProfile.img,
          email: dataProfile.email,
          balance: balance,
          address: dataProfile.address,
          datebirth: date,
          number: dataProfile.phoneNumber,
        });

        this.setState({
          updateFirstName: this.state.firstname,
          updateLastName: this.state.lastname,
          updateBirthDate: this.state.datebirth,
          updateAddress: this.state.address,
          updatePhoneNumber: this.state.number,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  displayEditForm() {
    const editForm = document.querySelector('#container-editform');
    editForm.style.display = 'block';
  }

  hiddenEditForm() {
    const editForm = document.querySelector('#container-editform');
    editForm.style.display = 'none';
  }

  submitEditProfile() {
    const editForm = document.querySelector('#container-editform');

    editForm.style.display = 'none';

    var firstName = document.getElementById('user-firstname').value;
    var lastName = document.getElementById('user-lastname').value;
    var dateOfBirth = document.getElementById('date-birth').value;
    var emailUser = document.getElementById('user-email').value;
    var addressUser = document.getElementById('user-address').value;
    var phoneNumber = document.getElementById('user-number').value;

    if (
      firstName === '' ||
      lastName === '' ||
      dateOfBirth === '' ||
      emailUser === '' ||
      addressUser === '' ||
      phoneNumber === ''
    ) {
      Swal.fire('Submit Failed !', 'You should fill in the blank', 'error');
      editForm.style.display = 'none';
    } else {
      Swal.fire('Submitted !', 'You clicked the button!', 'success');

      document.getElementById('firstname').innerHTML = firstName;
      document.getElementById('lastname').innerHTML = lastName;
      document.getElementById('birthday').innerHTML = dateOfBirth;
      document.getElementById('email').innerHTML = emailUser;
      document.getElementById('address').innerHTML = addressUser;
      document.getElementById('phonenumber').innerHTML = phoneNumber;
    }
  }
  render() {
    return (
      <Fragment>
        <div className="content-wrapper">
          <section className="content-user">
            <div className="container-profile">
              <div className="row">
                <div className="col-lg-12">
                  <div className="profile-account">
                    <div className="picture">
                      <img
                        src={this.state.img}
                        className="img-circle elevation-2 profile-img-custom"
                        style={{ height: '100px' }}
                        alt="avatarUser"
                      />
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
              <h1 className="title-profile">My Profile</h1>
              <div className="data-user">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="data">
                      <h5>First Name</h5>
                      <span id="firstname">{this.state.firstname}</span>
                      <hr />
                    </div>
                    <div className="data">
                      <h5>Last Name</h5>
                      <span id="lastname">{this.state.lastname}</span>
                      <hr />
                    </div>
                    <div className="data">
                      <h5>Date of Birth</h5>
                      <span id="birthday">{this.state.datebirth}</span>
                      <hr />
                    </div>
                    <div className="data">
                      <h5>Address</h5>
                      <span id="address">{this.state.address}</span>
                      <hr />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="data">
                      <h5>Email</h5>
                      <span id="email">{this.state.email}</span>
                      <hr />
                    </div>
                    <div className="data">
                      <h5>Phone Number</h5>
                      <span id="phonenumber">{this.state.number}</span>
                      <hr />
                    </div>
                    <div className="data">
                      <h5>Your Balance</h5>
                      <span id="mybalance">{`Rp. ${this.state.balance},-`}</span>
                      <hr />
                    </div>
                    <div className="data">
                      {/* <a href="change_password.html"><strong><u>Change Password</u></strong></a> */}
                      <Link to="/ChangePassword">Change Password</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Edit Form  */}
          <section className="padding-editform">
            <div id="container-editform">
              <h3 style={{ textAlign: 'center' }}>Edit Your Profile</h3>
              <form onSubmit={this.submitUpdateProfile}>
                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">Profile Image</label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        className="input-value"
                        id="user-image"
                        type="file"
                        accept="image/*"
                        name="profileimage"
                        onChange={this.handleAddFile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">First Name</label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        className="input-value"
                        id="user-firstname"
                        type="text"
                        name="updateFirstName"
                        placeholder="Input firstname"
                        value={this.state.updateFirstName}
                        onChange={this.handleChangeProfile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">Last Name</label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        value={this.state.updateLastName}
                        className="input-value"
                        id="user-lastname"
                        type="text"
                        name="updateLastName"
                        placeholder="Input lastname"
                        onChange={this.handleChangeProfile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">Date of Birth</label>
                    </div>
                    <div className="col-lg-12 input-group date">
                      <input
                        value={this.state.updateBirthDate}
                        className="input-value"
                        id="date-birth"
                        type="date"
                        min='1900-01-01'
                        max='2015-12-12'
                        name="updateBirthDate"
                        onChange={this.handleChangeProfile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">Address</label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        value={this.state.updateAddress}
                        className="input-value"
                        id="user-address"
                        type="text"
                        name="updateAddress"
                        placeholder="Input address"
                        onChange={this.handleChangeProfile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-item">
                  <div className="row">
                    <div className="col-lg-8">
                      <label className="input-title">Phone Number</label>
                    </div>
                    <div className="col-lg-12">
                      <input
                        value={this.state.updatePhoneNumber}
                        className="input-value"
                        id="user-number"
                        type="text"
                        name="updatePhoneNumber"
                        placeholder="0858868999"
                        onChange={this.handleChangeProfile.bind(this)}
                      />
                    </div>
                  </div>
                </div>

                <div className="btn-editform">
                  <input
                    className="btn btn-primary mr-2"
                    type="submit"
                    value="Submit"
                  />
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => this.hiddenEditForm()}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </Fragment>
    );
  }
}
export default Profile;
