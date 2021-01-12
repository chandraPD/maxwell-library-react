import React, { Component } from 'react';
import './TopUp.style.css'
import Card from '../TopUp/Card';
import showResults from "./showResult";
import Axios from 'axios';

class TopUp extends Component {

  constructor(props) {
    let user = JSON.parse( localStorage.getItem('user'))  
      super(props);    
      this.state = {              
        role:"",
        userToken: user.token
      };
    }
    
   render () { 
      return(<Card onSubmit={showResults} >               
        </Card>     )         
    }
  }

export default TopUp;