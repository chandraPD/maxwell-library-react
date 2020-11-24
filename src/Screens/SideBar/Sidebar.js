
import React, { Component } from 'react';
import './SideBar.style.css'

import { Link } from 'react-router-dom'

export default class Sidebar extends Component {
    render() {
        return (
    <aside className="main-sidebar elevation-4 sidebar-light-primary">
    <a href="index.html" className="brand-link">
        {/* <img src="./auth/assets/images/bookshelf.png" alt="Maxwell Library" style="height: 2rem; margin-left: .7rem;"> */}
        <span className="brand-text font-weight-light">Maxwell Library</span>
    </a>

    <div
        className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition">
        <div className="os-resize-observer-host observed">
        <div className="os-resize-observer" style={{left: "0px", right: "auto"}}></div>
        </div>
        <div className="os-size-auto-observer observed" style={{height: "calc(100% + 1px)", float: "left"}}>
        <div className="os-resize-observer"></div>
        </div>
        <div className="os-content-glue" style={{margin: "0px -8px", width: "249px", height: "514px"}}></div>
        <div className="os-padding">
        <div className="os-viewport os-viewport-native-scrollbars-invisible">
            <div className="os-content" style={{padding: "0px 8px", height: "100%", width: "100%"}}>
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image my-center">
                <a href="Profile.html">
                {/* <img src="./assets/media/user/profile.png" className="img-circle elevation-2 profile-img-custom"alt="User Image"> */}
                </a>
                </div>
                <div className="info">
                <a href="Profile.html" className="d-block user-name">Niki Zefanya</a>
                <p style={{fontSize: "1.3rem", fontWeight: "normal", marginBottom: "0px", color: "#000"}}>Rp. 50.000,-</p>
                <a href="./top_up.html" className="btn btn-sm btn-primary" style={{color: "white"}}>
                    <i className="fas fa-plus-square"></i> &nbsp; Top Up
                </a>
                </div>
            </div>

            <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item">
                <Link to='/profile' className="nav-link">
                    <i className="nav-icon fas fa-user"></i>
                    <p>
                    Profile
                    </p>
                </Link>
                </li>
                <li className="nav-item">
                    <a href="./index.html" className="nav-link" id="index">
                    <i className="nav-icon fas fa-book"></i>
                    <p>
                        Explore
                    </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./history.html" className="nav-link" id="history">
                    <i className="nav-icon fas fa-history"></i>
                    <p>
                        History
                    </p>
                    </a>
                </li>
                <li className="nav-item has-treeview menu-open">
                    <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-list-ul"></i>
                    <p>
                        Process Management
                        <i className="fas fa-angle-left right"></i>
                    </p>
                    </a>
                    <ul className="nav nav-treeview">
                    <li className="nav-item">
                        <a href="./user_management.html" className="nav-link">
                        <i className="fas fa-users nav-icon"></i>
                        <p>User Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./book_management.html" className="nav-link">
                        <i className="fas fa-book nav-icon"></i>
                        <p>Book Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./rent_management.html" className="nav-link">
                        <i className="far fa-hourglass nav-icon"></i>
                        <p>Rent Management </p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./fine_management.html" className="nav-link">
                        <i className="fas fa-gavel nav-icon"></i>
                        <p>Fine Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./category_management.html" className="nav-link">
                        <i className="fas fa-th nav-icon"></i>
                        <p>Category Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="./slideshow_management.html" className="nav-link">
                        <i className="far fa-images nav-icon"></i>
                        <p>Slide Show Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="donate_management.html" className="nav-link">
                        <i className="fa fa-hands-helping nav-icon"></i>
                        <p>Donation Management</p>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="top_up_management.html" className="nav-link">
                        <i className="fa fa-credit-card nav-icon"></i>
                        <p>Top Up Management</p>
                        </a>
                    </li>
                    </ul>
                </li>
                <li className="nav-item">
                    <a href="./donation.html" className="nav-link">
                    <i className="nav-icon fas fa-people-carry"></i>
                    <p>
                        Donation
                    </p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="./auth/index.html" className="nav-link" data-target="#modal-xl">
                    <i className="nav-icon fas fa-sign-out-alt"></i>
                    <p>
                        Log Out
                    </p>
                    </a>
                </li>
                </ul>
            </nav>
            </div>
        </div>
        </div>
        <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
        <div className="os-scrollbar-track">
            <div className="os-scrollbar-handle" style={{width: "100%", transform: "translate(0px, 0px)"}}></div>
        </div>
        </div>
        <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
        <div className="os-scrollbar-track">
            <div className="os-scrollbar-handle" style={{height: "49.8548%", transform: "translate(0px, 0px)"}}></div>
        </div>
        </div>
        <div className="os-scrollbar-corner"></div>
    </div>
    </aside>
        )
    }
}
