import React, { Component } from 'react';
import './TopUp.style.css'
import Card from '../TopUp/Card';
import showResults from "./showResult";

class TopUp extends Component {



    render () {


      return (        
        <Card onSubmit={showResults} >               
        </Card>
      )
    }
  }

export default TopUp;