import React, { Component } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

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
import PaymentInvoicePrintPaid from "../Screens/Contents/Payment/PaymentInvoicePrintPaid"
import History from '../Screens/Contents/History/History'
import TopUpManagement from "../Screens/Contents/TopUpManagement/TopUpManagement"
import AdminProfile from '../Screens/Contents/Profile/AdminProfile'
import UserManagement from '../Screens/Contents/UserManagement/UserManagement'
import BookManagement from '../Screens/Contents/BookManagement/BookManagement'
import FineManagement from '../Screens/Contents/FineManagement/FineManagement'
import DetailInvoice from '../Screens/Contents/DetailInvoice/DetailInvoice'
import ReturnBook from '../Screens/Contents/ReturnBook/ReturnBook'
import CheckReturnBook from '../Screens/Contents/ReturnBook/CheckReturnBook'
import PaymentDetail from '../Screens/Contents/Payment/PaymentDetail'
import DonationManagement from '../Screens/Contents/DonationManagement/DonationManagement'
import Donation from '../Screens/Contents/Donation/Donation'
import BookDetail from '../Screens/Contents/BookManagement/BookDetail'
import LogManagement from "../Screens/Contents/LogManagement/LogManagement";
import Author from "../Screens/Contents/Author/Author"
import Wishlist from "../Screens/Contents/Wishlist/Wishlist"
import Catalogue from '../Screens/Contents/Catalogue/Catalogue'
import PrivateRoute from './PrivateRoute'
import Search from '../Screens/Contents/Search/Search'
import AuthRoute from './AuthRoute'
import Axios from '../Instances/axios-instances';


class MainNavigation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: localStorage.getItem('user')
        };
    }
    interval = null;

    componentDidMount() {
        this.interval = setInterval(this.getBalance, 30000);
        this.getBalance();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
    getBalance = () => {
        if (JSON.parse(localStorage.getItem('user')) != null) {
            let user = JSON.parse(localStorage.getItem('user'))
            Axios.get('top_up_management/getBalance')
                .then((balance) => {
                    localStorage.setItem('balance', JSON.stringify(balance.data));
                })
        } else {
            localStorage.setItem('balance', 0);
        }
    }

    render() {
        return (<Router >
            <Switch>
                <AuthRoute path='/auth'
                    authenticated={this.state.isAuthenticated}
                    component={Auth}>
                </AuthRoute>
                <Route path='/PaymentPrint/:invoiceId'>
                    <PaymentInvoicePrint />
                </Route>
                <Route exact path='/PaymentPrintPaid'>
                    <PaymentInvoicePrintPaid />
                </Route>
                <Route path='/Donation'>
                    <Donation />
                    <Footer />
                </Route>
                <Route path='/'>
                    <NavBar />
                    <SideBar />
                    <Switch>
                        <PrivateRoute exact path='/'
                            authenticated={this.state.isAuthenticated}
                            component={Home}>
                        </PrivateRoute>
                        <PrivateRoute path='/Profile'
                            authenticated={this.state.isAuthenticated}
                            component={Profile}>
                        </PrivateRoute>
                        <PrivateRoute path='/ChangePassword'
                            authenticated={this.state.isAuthenticated}
                            component={ChangePassword}>
                        </PrivateRoute>
                        <PrivateRoute path='/AdminProfile'
                            authenticated={this.state.isAuthenticated}
                            component={AdminProfile}>
                        </PrivateRoute>
                        <PrivateRoute path='/Detail/:bookId'
                            authenticated={this.state.isAuthenticated}
                            component={Detail}>
                        </PrivateRoute>
                        <PrivateRoute path='/Search/:title'
                            authenticated={this.state.isAuthenticated}
                            component={Search}>
                        </PrivateRoute>
                        <PrivateRoute path='/RentManagement'
                            authenticated={this.state.isAuthenticated}
                            component={RentManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/Author'
                            authenticated={this.state.isAuthenticated}
                            component={Author}>
                        </PrivateRoute>
                        <PrivateRoute path='/FineManagement'
                            authenticated={this.state.isAuthenticated}
                            component={FineManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/TopUp'
                            authenticated={this.state.isAuthenticated}
                            component={TopUp}>
                        </PrivateRoute>
                        <PrivateRoute path='/CategoryManagement'
                            authenticated={this.state.isAuthenticated}
                            component={CategoryManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/Catalogue'
                            authenticated={this.state.isAuthenticated}
                            component={Catalogue}>
                        </PrivateRoute>
                        <PrivateRoute path='/TopUpManagement'
                            authenticated={this.state.isAuthenticated}
                            component={TopUpManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/SlideShowManagement'
                            authenticated={this.state.isAuthenticated}
                            component={SlideShowManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/Payment/:invoiceId?'
                            authenticated={this.state.isAuthenticated}
                            component={Payment}>
                        </PrivateRoute>
                        <PrivateRoute path='/Wishlist'
                            authenticated={this.state.isAuthenticated}
                            component={Wishlist}>
                        </PrivateRoute>
                        <PrivateRoute path='/PaymentDetail/:userId'
                            authenticated={this.state.isAuthenticated}
                            component={PaymentDetail}>
                        </PrivateRoute>
                        <PrivateRoute path='/History'
                            authenticated={this.state.isAuthenticated}
                            component={History}>
                        </PrivateRoute>
                        <PrivateRoute path='/usermanagement'
                            authenticated={this.state.isAuthenticated}
                            component={UserManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/bookmanagement'
                            authenticated={this.state.isAuthenticated}
                            component={BookManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/bookdetail/:bookId'
                            authenticated={this.state.isAuthenticated}
                            component={BookDetail}>
                        </PrivateRoute>
                        <PrivateRoute path='/DetailInvoice/:invoiceId'
                            authenticated={this.state.isAuthenticated}
                            component={DetailInvoice}>
                        </PrivateRoute>
                        <PrivateRoute path='/ReturnBook'
                            authenticated={this.state.isAuthenticated}
                            component={ReturnBook}>
                        </PrivateRoute>
                        <PrivateRoute path='/CheckReturnBook'
                            authenticated={this.state.isAuthenticated}
                            component={CheckReturnBook}>
                        </PrivateRoute>
                        <PrivateRoute path='/DonationManagement'
                            authenticated={this.state.isAuthenticated}
                            component={DonationManagement}>
                        </PrivateRoute>
                        <PrivateRoute path='/LogManagement'
                            authenticated={this.state.isAuthenticated}
                            component={LogManagement}>
                        </PrivateRoute>
                    </Switch>
                    <Footer />
                </Route>
            </Switch>
        </Router>
        )
    }
}
export default MainNavigation
