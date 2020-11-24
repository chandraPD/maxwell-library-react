import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import Navbar from '../Screens/Navbar/Navbar'
import Sidebar from '../Screens/SideBar/Sidebar'
import Profile from '../Screens/Contents/Profile/Profile'
import ChangePassword from '../Screens/Contents/Profile/ChangePassword'
import EditProfile from '../Screens/Contents/Profile/EditProfile'

class MainNavigation extends Component {
  render() {
    return(
      <Router>
        <Navbar />
        <Sidebar />
        
        <Route path='/'>
          <Route path='/profile'>
            <Profile />
            <EditProfile/>
          </Route>
          {/* <Route path='/edit_profile'>
              <EditProfile/>
          </Route> */}
          <Route path='/change_password'>
            <ChangePassword/>
          </Route>
        </Route>
        <Footer />
      </Router>
    )
  }
}

export default MainNavigation
