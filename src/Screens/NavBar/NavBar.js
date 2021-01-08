
import React, { Component, useCallback } from 'react';
import './NavBar.style.css'
import {Link, withRouter} from 'react-router-dom';
class NavBar extends Component {

    constructor(props) {
        super(props)
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
             search: ""
        }
    }

    onChange = (e) => {
        this.setState({search: e.target.value}, () => console.log(this.state.search))
    }

    onSubmitHandler = (e) => {
        this.props.history.push("/Search/" + this.state.search);
    }
    

    render() {
        return (
            <nav className="main-header navbar navbar-expand navbar-light navbar-white d-flex flex-row">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">All Categories</a>
                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{left: 0, right: 'inherit'}}>
                    <li><a href="./category.html" className="dropdown-item">Novel</a></li>
                    <li><a href="./category.html" className="dropdown-item">Comic Book</a></li>
                    <li>
                    <a href="./category.html" className="dropdown-item">Detective and Mystery</a>
                    </li>
                    <li><a href="./category.html" className="dropdown-item">Historical Fiction</a></li>
                    <li><a href="./category.html" className="dropdown-item">Horror</a></li>
                    <li><a href="./category.html" className="dropdown-item">literary Fiction</a></li>
                    {/* End Level two */}
                </ul>
                </li>
                <li className="nav-item dropdown">
                <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="nav-link dropdown-toggle">All Time</a>
                <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow" style={{left: 0, right: 'inherit'}}>
                    <li><a href="./year.html" className="dropdown-item">2020</a></li>
                    <li><a href="./year.html" className="dropdown-item">2019</a></li>
                    <li><a href="./year.html" className="dropdown-item">2018</a></li>
                    <li><a href="./year.html" className="dropdown-item">2017</a></li>
                    <li><a href="./year.html" className="dropdown-item">2016</a></li>
                    <li><a href="./year.html" className="dropdown-item">2015</a></li>
                    {/* End Level two */}
                </ul>
                </li>
            </ul>
            {/* SEARCH FORM */}
            <form id="search-books" className="form-inline flex-grow-1" onSubmit={this.onSubmitHandler}>
                <div id="searchbar" className="form-group has-search">
                <span className="fa fa-search form-control-feedback" />
                <input id="input-search" type="text" className="form-control" placeholder="Search Book" onChange={this.onChange} autoComplete="off" />
                </div>
            </form>
            <div className="toggle-navbar-nav">
                <ul className="navbar-nav toggle-navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                </li>
                </ul>
            </div>
            </nav>
        )
    }
}
export default withRouter(NavBar)