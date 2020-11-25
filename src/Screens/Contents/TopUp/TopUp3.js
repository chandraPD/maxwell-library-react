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

const TopUp3 = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <form id="msform" onSubmit={handleSubmit}>
            {/* fieldsets */}
            <fieldset>
            <div>
  <ProgressBar variant="dark" now={75} />
  </div>
            <div className="form-card">
                        <div className="row">
                          <div className="col-7">
                            <h5 className="fs-title">Top Up Confirmation:</h5>
                          </div>
                          <div className="col-5">
                            <h5 className="steps">Step 3 - 4</h5>
                          </div>
                        </div>
                        <div className="row row-cols-1 row-cols-md-1">
                          <div className="form-group">
                            <label htmlFor="totalnominal">Total Nominal</label>
                            <input type="text" className="form-control" id="totalnominal" defaultValue disabled />
                          </div>
                          <div className="form-group">
                            <label htmlFor="paymentmethod">Payment Method</label>
                            <input type="text" className="form-control" id="paymentmethod" disabled />
                          </div>
                        </div>
                      </div>
                <Button color="dark" className="btn-pill pull-right action-button" type="submit" style={{}}>
               Next &nbsp;
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

TopUp3.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    previousPage: PropTypes.func,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'TopUpForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(TopUp3);
