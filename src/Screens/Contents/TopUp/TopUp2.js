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

function click(){
    this.parent().find('.radio1').removeClass('selected');
    this.addClass('selected');
    };

const TopUp2 = (props) => {
    const { handleSubmit, pristine, previousPage, submitting } = props;
    return (
        <form id="msform" onSubmit={handleSubmit}>
            {/* fieldsets */}
            <fieldset>
            <div>
  <ProgressBar variant="dark" now={50} />
  </div>
                <div className="form-card">
                    <div className="row">
                        <div className="col-7">
                            <h5 className="fs-title">Payment Method:</h5>
                        </div>
                        <div className="col-5">
                            <h5 className="steps">Step 2 - 4</h5>
                        </div>
                    </div>
                    <div className="radio-group2" onclick={click}>
                        <div className="row row-cols-md-3" style={{ justifyContent: 'center' }}>
                            <a className="btn btn-app radio1" name="payment1" data-id="Credit Card" style={{ marginRight: '3.5rem' }}>
                                <img src="https://www.pinclipart.com/picdir/big/48-488752_credit-card-atm-card-logo-png-clipart.png" alt="" style={{ height: '2rem' }} /> &nbsp; Card
                            </a>
                            <a className="btn btn-app radio1" name="payment1" data-id="Paypal">
                                <img src="https://cdn0.iconfinder.com/data/icons/shift-ecommerce/32/Paypal-512.png" alt="" style={{ height: '2rem' }} /> &nbsp; Paypal
                            </a>
                            <a className="btn btn-app radio1" name="payment1" data-id="OVO" style={{ marginRight: '3.5rem' }}>
                                <img src="https://play-lh.googleusercontent.com/8zSxWSL5U-2KbIgeTHttb5FtDuW07GThugzAzyF75p-J0RQC0hZ0xZNxjZk9kpxk1Q" alt="" style={{ height: '2rem' }} /> &nbsp; OVO
                            </a>
                            <a className="btn btn-app radio1" name="payment1" data-id="Gopay">
                                <img src="./assets/media/icon/gopaybg.png" alt="" style={{ height: '2rem' }} /> &nbsp; Gopay
                            </a>
                            <a className="btn btn-app radio1" name="payment1" data-id="Dana" style={{ marginRight: '3.5rem' }}>
                                <img src="./assets/media/icon/danabg.png" alt="" style={{ height: '2rem' }} /> &nbsp; Dana
                            </a>
                            <a className="btn btn-app radio1" name="payment1" data-id="Cash">
                                <img src="https://www.clipartmax.com/png/middle/223-2235279_cash-in-hand-icon.png" alt="" style={{ height: '2rem' }} /> &nbsp; Cash
                            </a>
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

TopUp2.propTypes = {
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    previousPage: PropTypes.func,
    submitting: PropTypes.bool
};

export default reduxForm({
    form: 'TopUpForm',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(TopUp2);
