import React, { Component } from 'react';
import './TopUp.style.css'
import PropTypes from 'prop-types';
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import { reduxForm } from 'redux-form';
import {
    Button
  } from 'reactstrap';
import { ProgressBar } from 'react-bootstrap';

const TopUp1 = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <form id="msform" onSubmit={handleSubmit}>
        {/* fieldsets */}
        <fieldset>
        <div>
  <ProgressBar variant="dark" now={25} />
  </div>
          <div className="form-card">
            <div className="row">
              <div className="col-7">
                <h5 className="fs-title">Total Nominal:</h5>
              </div>
              <div className="col-5">
                <h5 className="steps">Step 1 - 4</h5>
              </div>
            </div>
            <div className="radio-group">
              <div className="row row-cols-md-3" style={{textAlign: 'center'}}>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option1" defaultValue={10000} />
                  <label htmlFor="option1" style={{fontWeight: 'normal'}}>Rp.
                    10000</label>
                </div>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option2" defaultValue={20000} />
                  <label htmlFor="option2" style={{fontWeight: 'normal'}}>Rp.
                    20000</label>
                </div>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option3" defaultValue={30000} />
                  <label htmlFor="option3" style={{fontWeight: 'normal'}}>Rp.
                    30000</label>
                </div>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option4" defaultValue={40000} />
                  <label htmlFor="option4" style={{fontWeight: 'normal'}}>Rp.
                    40000</label>
                </div>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option5" defaultValue={50000} />
                  <label htmlFor="option5" style={{fontWeight: 'normal'}}>Rp.
                    50000</label>
                </div>
                <div className="icheck-primary">
                  <input type="radio" name="option" id="option6" defaultValue={60000} />
                  <label htmlFor="option6" style={{fontWeight: 'normal'}}>Rp.
                    60000</label>
                </div>
              </div>
            </div>
            <div className="input-group" style={{marginTop: '1rem'}}>
              <div className="input-group-prepend">
                <span className="input-group-text"><input type="radio" defaultValue name="option" id="option7" /></span>
              </div>
              <input type="text" className="form-control any" id="any" />
            </div>
          </div> <Button color="dark" className="btn-pill pull-right action-button" type="submit" style={{}}>
               Next &nbsp;
              <i className="fa fa-chevron-right" />
            </Button>
        </fieldset>
      </form>
    );
  };
  
  TopUp1.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    previousPage: PropTypes.func,
    submitting: PropTypes.bool
  };
  
  export default reduxForm({
    form: 'TopUpForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,    
  })(TopUp1);