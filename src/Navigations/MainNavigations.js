import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Footer from '../Screens/Footer/Footer'
import NavBar from '../Screens/NavBar/NavBar'
import SideBar from '../Screens/SideBar/SideBar'
import Profile from '../Screens/Contents/Profile/Profile'
import ChangePassword from '../Screens/Contents/Profile/ChangePassword'
import RentManagement from '../Screens/Contents/RentManagement/RentManagement'
import Home from '../Screens/Contents/Home/Home'
import Detail from '../Screens/Contents/Detail/Detail'
import Auth from '../Screens/Auth/Auth'
import TopUp from '../Screens/Contents/TopUp/TopUp'
import CategoryManagement from '../Screens/Contents/CategoryManagement/CategoryManagement'
import SlideShowManagement from '../Screens/Contents/SlideShowManagement/SlideShowManagement'
import Payment from '../Screens/Contents/Payment/Payment'
import PaymentInvoicePrint from "../Screens/Contents/Payment/PaymentInvoicePrint"
import History from '../Screens/Contents/History/History';
import TopUpManagement from "../Screens/Contents/TopUpManagement/TopUpManagement"
import AdminProfile from '../Screens/Contents/Profile/AdminProfile'
import UserManagement from '../Screens/Contents/UserManagement/UserManagement'
import BookManagement from '../Screens/Contents/BookManagement/BookManagement'
import FineManagement from '../Screens/Contents/FineManagement/FineManagement'
import PaymentDetail from '../Screens/Contents/Payment/PaymentDetail'

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
                                <Route path='/Profile'>
                                    <Profile />
                                </Route>
                                <Route path='/ChangePassword'>
                                    <ChangePassword/>
                                </Route>
                                <Route path='/AdminProfile'>
                                    <AdminProfile/>
                                </Route>
                                <Route path='/Detail'>
                                    <Detail />
                                </Route>
                                <Route path='/RentManagement'>
                                    <RentManagement />
                                </Route>
                                <Route path='/FineManagement'>
                                    <FineManagement />
                                </Route>
                                <Route path='/TopUp'>
                                    <TopUp />
                                </Route>
                                <Route path='/CategoryManagement'>
                                    <CategoryManagement />
                                </Route>
                                <Route path='/TopUpManagement'>
                                    <TopUpManagement />
                                </Route>
                                <Route path='/SlideShowManagement'>
                                    <SlideShowManagement />
                                </Route>
                                <Route path='/Payment'>
                                    <Payment />
                                </Route>
                                <Route path='/PaymentDetail/:userId'>
                                    <PaymentDetail />
                                </Route>
                                <Route path='/History'>
                                    <History />
                                </Route>
                                <Route path='/usermanagement'>
                                    <UserManagement />
                                </Route>
                                <Route path='/bookmanagement'>
                                    <BookManagement />
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
