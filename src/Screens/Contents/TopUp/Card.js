import React, { Component } from 'react';
import './TopUp.style.css'
import Stepper from 'react-stepper-horizontal';
import TopUp1 from '../TopUp/TopUp1'
import TopUp2 from '../TopUp/TopUp2'
import TopUp3 from '../TopUp/TopUp3'
import TopUp4 from '../TopUp/TopUp4'
import { reset } from 'redux-form';

class Card extends Component {


  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 0,
      steps: [
        { title: 'Nominal' },
        { title: 'Payment' },
        { title: 'Confirm' },
        { title: 'Password' },
      ]
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  render() {
    const { onSubmit } = this.props;
    const { page, steps } = this.state;

    return (

      <div className="content-wrapper ctm-wrap-tpup">
        {/* {dispatch(reset('TopUpForm'))} */}
        <section className="signup-step-container">
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                <div className="card px-4 pt-4 pb-4 mt-6 mb-6">
                  <h2 id="heading">Top Up Your User Account</h2>
                  <p>Fill all form field to go to next step</p>
                  <Stepper steps={steps} activeStep={page} />
                  {page === 0 && <TopUp1 onSubmit={this.nextPage} />}
                  {page === 1 && (
                    <TopUp2
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                    />
                  )}
                  {page === 2 && (
                    <TopUp3
                      previousPage={this.previousPage}
                      onSubmit={this.nextPage}
                    />
                  )}
                  {page === 3 && (
                    <TopUp4
                      previousPage={this.previousPage}
                      onSubmit={onSubmit}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* /.content */}
      </div>
    )
  }
}


export default Card;