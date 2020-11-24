import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import Navbar from '../Screens/NavBar/NavBar'
import SideBar from '../Screens/SideBar/SideBar'
import RentManagement from '../Screens/Contents/RentManagement/RentManagement'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail/Detail'

class MainNavigation extends Component {
  render() {
    return (
      <Router>
        <Navbar />
        <SideBar /> 
        <Route path='/'>
          <Route path='/' >
              <Home />
          </Route>
        <Route path='/detail'>
          <Detail />      
        </Route>
        <Route path='/RentManagement'>
          <RentManagement/>
        </Route>
        <Footer />
      </Router>
    )
  }
}
export default MainNavigation
