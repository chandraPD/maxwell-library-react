import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import NavBar from '../Screens/NavBar/NavBar'
import SideBar from '../Screens/SideBar/SideBar'
import RentManagement from '../Screens/Contents/RentManagement/RentManagement'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail/Detail'
import Auth from '../Screens/Auth/Auth'
import CategoryManagement from '../Screens/Contents/CategoryManagement/CategoryManagement'
import SlideShowManagement from '../Screens/Contents/SlideShowManagement/SlideShowManagement'
import Payment from '../Screens/Contents/Payment/Payment'
import PaymentInvoicePrint from "../Screens/Contents/Payment/PaymentInvoicePrint"
import History from '../Screens/Contents/History/History';

class MainNavigation extends Component {
    render() {
        return ( <Router>
                <Switch>
                    <Route path='/auth'>
                        <Auth />
                    </Route>
                    <Route path='/PaymentPrint'>
                        <PaymentInvoicePrint />
                    </Route>
                    <Route path='/'>
                            <NavBar />
                            <SideBar />
                            <Switch>
                                <Route exact path='/'>
                                    <Home />
                                </Route>
                                <Route path='/detail'>
                                    <Detail />
                                </Route>
                                <Route path='/RentManagement'>
                                    <RentManagement />
                                </Route>
                                <Route path='/CategoryManagement'>
                                    <CategoryManagement />
                                </Route>
                                <Route path='/SlideShowManagement'>
                                    <SlideShowManagement />
                                </Route>
                                <Route path='/Payment'>
                                    <Payment />
                                </Route>
                                <Route path='/History'>
                                    <History />
                                </Route>
                            </Switch>
                            <Footer />
                    </Route>
                </Switch>
            </Router>
        )
    }
}
export default MainNavigation
