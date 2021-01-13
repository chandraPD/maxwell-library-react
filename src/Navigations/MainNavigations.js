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
            isAuthenticated :  localStorage.getItem('user')
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
        if(JSON.parse(localStorage.getItem('user')) != null){
            let user = JSON.parse(localStorage.getItem('user'))
            Axios.get('top_up_management/getBalance')
            .then((balance) => {
                localStorage.setItem('balance', JSON.stringify(balance.data));
            })
        }else{
            localStorage.setItem('balance', 0);
        }
      }

    render() {
        return ( <Router >
                <Switch>
                    <AuthRoute path='/auth'
                    authenticated={this.state.isAuthenticated}
                    component={Auth}>
                    </AuthRoute>
                    <Route path='/PaymentPrint'>
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
                                <Route path='/Profile'>
                                    <Profile />
                                </Route>
                                <Route path='/ChangePassword'>
                                    <ChangePassword/>
                                </Route>
                                <Route path='/AdminProfile'>
                                    <AdminProfile/>
                                </Route>
                                <Route path='/Detail/:bookId'>
                                    <Detail />
                                </Route>
                                <Route path='/Search/:title'>
                                    <Search />
                                </Route>
                                <Route path='/RentManagement'>
                                    <RentManagement />
                                </Route>
                                <Route path='/Author'>
                                    <Author />
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
                                <Route path='/Catalogue'>
                                    <Catalogue />
                                </Route>
                                <Route path='/TopUpManagement'>
                                    <TopUpManagement />
                                </Route>
                                <Route path='/SlideShowManagement'>
                                    <SlideShowManagement />
                                </Route>
                                <Route path='/Payment/:invoiceId?'>
                                    <Payment />
                                </Route>
                                <Route path='/Wishlist'>
                                    <Wishlist/>
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
                                <Route path='/bookdetail/:bookId'>
                                    <BookDetail />
                                </Route>
                                <Route path='/DetailInvoice/:invoiceId'>
                                    <DetailInvoice />
                                </Route>
                                <Route path='/ReturnBook'>
                                    <ReturnBook />
                                </Route>
                                <Route path='/CheckReturnBook'>
                                    <CheckReturnBook />
                                </Route>
                                <Route path='/DonationManagement'>
                                    <DonationManagement />
                                </Route>
                                <Route path='/LogManagement'>
                                    <LogManagement />
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
