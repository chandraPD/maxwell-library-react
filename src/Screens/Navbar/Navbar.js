
import React, { Component } from 'react';
import './Navbar.style.css'
export default class Navbar extends Component {
    render() {
        return (
            <header className="main-header">
                <nav className="main-header navbar navbar-expand navbar-light navbar-white d-flex flex-row">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                className="nav-link dropdown-toggle">All Categories</a>
                            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow"
                                style={{left: "0px", right: "inherit"}}>
                                <li><a href="./category.html" className="dropdown-item">Novel</a></li>
                                <li><a href="./category.html" className="dropdown-item">Comic Book</a></li>
                                <li>
                                    <a href="./category.html" className="dropdown-item">Detective and Mystery</a>
                                </li>
                                <li><a href="./category.html" className="dropdown-item">Historical Fiction</a></li>
                                <li><a href="./category.html" className="dropdown-item">Horror</a></li>
                                <li><a href="./category.html" className="dropdown-item">literary Fiction</a></li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                className="nav-link dropdown-toggle">All Time</a>
                            <ul aria-labelledby="dropdownSubMenu1" className="dropdown-menu border-0 shadow"
                                style={{left: "0px", right: "inherit"}}>
                                <li><a href="./year.html" className="dropdown-item">2020</a></li>
                                <li><a href="./year.html" className="dropdown-item">2019</a></li>
                                <li><a href="./year.html" className="dropdown-item">2018</a></li>
                                <li><a href="./year.html" className="dropdown-item">2017</a></li>
                                <li><a href="./year.html" className="dropdown-item">2016</a></li>
                                <li><a href="./year.html" className="dropdown-item">2015</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form id="search-books" className="form-inline flex-grow-1" action="./searchpage.html">
                        <div id="searchbar" className="form-group has-search">
                            <span className="fa fa-search form-control-feedback"></span>
                            <input id="input-search" type="text" className="form-control" placeholder="Search Book" />
                        </div>
                    </form>
                    <div className="toggle-navbar-nav">
                        <ul className="navbar-nav toggle-navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i
                                    className="fas fa-bars"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}
