import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import Navbar from '../Screens/NavBar/NavBar'
import Sidebar from '../Screens/SideBar/SideBar'
import Detail from '../Screens/Contents/Detail'

class MainNavigation extends Component {
  render() {
    return(
      <Router>
        <Navbar />
        <Sidebar /> 
        <Route path='/'>          

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
