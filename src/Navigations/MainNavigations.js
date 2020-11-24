import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import NavBar from '../Screens/NavBar/NavBar'
import SideBar from '../Screens/SideBar/SideBar'
import RentManagement from '../Screens/Contents/RentManagement/RentManagement'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail/Detail'
import Auth from '../Screens/Auth/Auth'

class MainNavigation extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/auth'>
          <Auth />
        </Route>
        
        <Route exact path='/'>
          <NavBar />
          <SideBar /> 
          <Home />
           <Footer />
          </Route>

        <Route path='/detail'>
          <NavBar />
          <SideBar /> 
          <Detail />    
          <Footer />  
        </Route>

        <Route path='/RentManagement'>
          <NavBar />
          <SideBar /> 
          <RentManagement/>
          <Footer /> 
        </Route>
        
      </Router>
    )
  }
}
export default MainNavigation
