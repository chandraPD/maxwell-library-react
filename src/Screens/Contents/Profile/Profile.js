import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {
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
                                        {/* <img src="/assets/media/user/profile.png" alt=""> */}
                                    </div>
                                    <Link to='/edit_profile'>
                                    <button type="button" className="btn btn-primary edit-profile">
                                        Edit Profile
                                    </button>
                                    </Link>
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
                                    <Link to='/change_password'>Change Password</Link>
                                </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </section>
            </div>
            </Fragment>

        )
    }
}
export default Profile