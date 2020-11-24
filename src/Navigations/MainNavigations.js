import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import Navbar from '../Screens/Navbar/Navbar'
import Sidebar from '../Screens/SideBar/Sidebar'

class MainNavigation extends Component {
  render() {
    return(
      <Router>
        <Route path='/'>
          <Navbar />
          <Sidebar />
          <Footer />
        </Route>
      </Router>
    )
  }
}

export default MainNavigation
