import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import NavBar from '../Screens/Navbar/NavBar'
import SideBar from '../Screens/SideBar/SideBar'
import Profile from '../Screens/Contents/Profile/Profile'
import ChangePassword from '../Screens/Contents/Profile/ChangePassword'
import EditProfile from '../Screens/Contents/Profile/EditProfile'
import RentManagement from '../Screens/Contents/RentManagement/RentManagement'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail/Detail'

class MainNavigation extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <SideBar /> 
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/detail'>
          <Detail />      
        </Route>
        <Route path='/profile'>
          <Profile />
        </Route>
        <Route path='/edit_profile'>
          <EditProfile/>
        </Route>
        <Route path='/change_password'>
          <ChangePassword/>
        </Route>
        <Footer />    
        <Route path='/RentManagement'>
          <RentManagement/>
        </Route>
        <Footer />
      </Router>
    )
  }
}
export default MainNavigation
