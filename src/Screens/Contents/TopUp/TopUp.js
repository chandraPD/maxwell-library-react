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

//   const token=this.state.userToken;
//   const config = {
//     headers: { Authorization: `Bearer ${token}` }
// }
    // var b=Axios.get('http://localhost:8080/top_up_management/getRole',config)
    // console.log(b)
    // Axios.get('http://localhost:8080/top_up_management/getRole',config).then((getData)=>{
    // var role=getData.data;
    // if (role.data=="[ROLE_ADMIN]") {      
    //   this.setState({role: "[ROLE_ADMIN]" })
    // } else{
    //   this.setState({role: "[ROLE_USER]" })
    // }     
    // });
    // if (this.state.role=="[ROLE_ADMIN]") {      
    //   return(window.location.href = "/")
    // } else{
    //   return (        
    //     <Card onSubmit={showResults} >               
    //     </Card>
    //   )
    // } 
    // return (     
      return(<Card onSubmit={showResults} >               
        </Card>     )         
    }
  }

export default TopUp;