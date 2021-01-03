import React, { Component } from "react";
import MainNavigation from './Navigations/MainNavigations'

import AuthService from "./Services/auth.service";

class App extends Component {

  render() {
    return(
      <MainNavigation/>
    )
  }

}
export default App;
