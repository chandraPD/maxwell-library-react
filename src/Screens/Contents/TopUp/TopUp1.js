import React from 'react';
import './TopUp.style.css'
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import {
  Button
} from 'reactstrap';
import { ProgressBar } from 'react-bootstrap';
import validate from './Validate'

const TopUp1 = (props) => {
  console.log(props)
  const { handlekeyup, handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form id="msform" onSubmit={handleSubmit} >
      {/* fieldsets */}
      <fieldset>
        <div>
          <ProgressBar variant="dark" now={25} animated/>
        </div>
        <div className="form-card">
          <div className="row">
            <div className="col-6">
              <h5 className="fs-title">Total Nominal:</h5>
            </div>
            <div className="col-6">
              <h5 className="steps">Step 1 - 4</h5>
            </div>
          </div>
          <div className="radio-group">
            <div className="row row-cols-md-3" style={{ textAlign: 'center' }}>
              <div className="icheck-primary">
                <label className="label-nominal" >
                  <Field name="nominal" component="input" type="radio" value="10000" />
                  {' '}
            Rp 10.000
          </label>
              </div>
              <div className="icheck-primary">
              <label className="label-nominal">
                  <Field name="nominal" component="input" type="radio" value="20000" />
                  {' '}
            Rp 20.000
          </label>
              </div>
              <div className="icheck-primary">
              <label className="label-nominal">
                  <Field name="nominal" component="input" type="radio" value="30000" />
                  {' '}
            Rp 30.000
          </label>
              </div>
              <div className="icheck-primary">
              <label className="label-nominal">
                  <Field name="nominal" component="input" type="radio" value="50000" />
                  {' '}
            Rp 50.000
          </label>
              </div>
              <div className="icheck-primary">
              <label className="label-nominal">
                  <Field name="nominal" component="input" type="radio" value="100000" />
                  {' '}
            Rp 100.000
          </label  >
              </div>
              <div className="icheck-primary">
              <label className="label-nominal">
                  <Field name="nominal" component="input" type="radio" value="200000" />
                  {' '}
            Rp 200.000
          </label>
              </div>
            </div>            
          </div>
          
          {/* <div className="input-group" style={{ marginTop: '1rem' }}>
            <div className="input-group-prepend">
              <span className="input-group-text"><Field name="nominal" component="input" type="radio" value=""/></span>
            </div>
            <Field name="nominalany" component="input" type="text" />
          </div> */}
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

};

export default reduxForm({
  form: 'TopUpForm',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(TopUp1);