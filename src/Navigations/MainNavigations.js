import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import Navbar from '../Screens/Navbar/Navbar'
import SideBar from '../Screens/SideBar/SideBar'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail'

class MainNavigation extends Component {
  render() {
    return(
      <Router>
        <Route path='/'>
          <Navbar />
          <Sidebar />
          <Route patah='/' >
              <Home />
          </Route>
        <Route path='/detail'>
          <Detail />      
        </Route>
        <Footer />    
      </Router>
    )
  }
}

export default MainNavigation
