import React from 'react';
import './TopUp.style.css'
import PropTypes from 'prop-types';
import gopay from '../../../Assets/Media/icon/gopaybg.png'
import dana from '../../../Assets/Media/icon/danabg.png'
import { Field, reduxForm } from 'redux-form';
import {
    Button
} from 'reactstrap';
import { ProgressBar } from 'react-bootstrap';
import validate from './Validate'


const TopUp2 = (props) => {
    console.log(props)
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
                    <div className="radio-group">
            <div className="row row-cols-md-3" style={{ textAlign: 'center' }}>
              <div className="icheck-primary">
                <label>
                  <Field name="payment" component="input" type="radio" value="Credit Card" />
                  {' '}
        <img src="https://www.pinclipart.com/picdir/big/48-488752_credit-card-atm-card-logo-png-clipart.png" alt="" style={{ height: '2rem' }} />
            Credit Card
          </label>
              </div>
              <div className="icheck-primary">
              <label>
                  <Field name="payment" component="input" type="radio" value="Paypal" />
                  {' '}
        <img src="https://cdn0.iconfinder.com/data/icons/shift-ecommerce/32/Paypal-512.png" alt="" style={{ height: '2rem' }} />
            Paypal
          </label>
              </div>
              <div className="icheck-primary">
              <label>
                  <Field name="payment" component="input" type="radio" value="OVO" />
                  {' '}
        <img src="https://play-lh.googleusercontent.com/8zSxWSL5U-2KbIgeTHttb5FtDuW07GThugzAzyF75p-J0RQC0hZ0xZNxjZk9kpxk1Q" alt="" style={{ height: '2rem' }} />
            OVO
          </label>
              </div>
              <div className="icheck-primary">
              <label>
                  <Field name="payment" component="input" type="radio" value="Gopay" />
                  {' '}
        <img src={gopay} alt="" style={{ height: '2rem' }} />
            Gopay
          </label>
              </div>
              <div className="icheck-primary">
              <label>
                  <Field name="payment" component="input" type="radio" value="Dana" />
                  {' '}
        <img src={dana} alt="" style={{ height: '2rem' }} />
            Dana
          </label>
              </div>
              <div className="icheck-primary">
              <label>
                  <Field name="payment" component="input" type="radio" value="Cash" />
                  {' '}
        <img src="https://www.clipartmax.com/png/middle/223-2235279_cash-in-hand-icon.png" alt="" style={{ height: '2rem' }} />
            Cash
          </label>
              </div>
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
    validate
})(TopUp2);
