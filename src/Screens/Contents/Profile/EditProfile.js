import React, { Component, Fragment } from 'react'

class EditProfile extends Component {
    render(){
        return(
        <Fragment>    
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
                    <input className="btn btn-primary" type="submit" value="Submit" onclick="submitEditProfile()"/>
                    <button type="button" className="btn btn-secondary">Close</button>
                    </div>
                </div>
            </section>
        </Fragment>
        )
    }
}
export default EditProfile