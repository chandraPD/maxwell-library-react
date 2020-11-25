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

const TopUp4 = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <form id="msform" onSubmit={handleSubmit}>
            {/* fieldsets */}
            <fieldset>
            <div>
  <ProgressBar variant="dark" now={100} />
  </div>
            <div className="form-card">
                        <div className="row">
                          <div className="col-7">
                            <h5 className="fs-title">Confirmation Password:</h5>
                          </div>
                          <div className="col-5">
                            <h5 className="steps">Step 4 - 4</h5>
                          </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-1">
                          <div className="form-group">
                            <div className="md-2"><input className="form-control" id="passwordconfirm" type="password" placeholder="Password" /></div>
                          </div>
                          <div className="form-group">
                            <div className="md-2"><input className="form-control" id="passwordconfirm2" type="password" placeholder="Confirm Password" /></div>
                          </div>
                        </div>
                      </div>
                <Button color="dark" className="btn-pill pull-right action-button" type="submit" style={{}}>
               Submit &nbsp;
              <i className="fa fa-chevron-right" />
            </Button>
                <Button color="primary" className="btn-pill pull-left action-button-previous  action-button" onClick={previousPage} >
                    <i className="fa fa-chevron-left" />
                &nbsp; Previous
            </Button>
            
            </fieldset>
        </form>
    );
};

TopUp4.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    previousPage: PropTypes.func,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'TopUpForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(TopUp4);
