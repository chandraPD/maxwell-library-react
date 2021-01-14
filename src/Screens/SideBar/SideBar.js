
import React, { Component } from 'react';
import './SideBar.style.css'
import avatarUser from '../../Assets/Media/user/profile.png'
import logo from '../../Assets/Media/icon/bookshelf.png'
import { Link } from 'react-router-dom';
import AuthService from '../../Services/auth.service'
import NumberFormat from 'react-number-format';
import Axios from 'axios';
import $ from 'jquery'
import Axios2 from '../../Instances/axios-instances';

export default class SideBar extends Component {

  constructor(props) {
    let user = JSON.parse(localStorage.getItem('user'))
    super(props);
    let balance
    let userToken
    let activeRole

    if (user) {
      balance = JSON.parse(localStorage.getItem('balance'))
      userToken = user.token
      activeRole = JSON.parse(localStorage.getItem('user')).userInfo.activeRole
    } else {
      balance = 0;
      userToken = false;
      activeRole = false;
    }

    this.state = {
      balance: balance,
      show: true,
      show2: true,
      userToken: userToken,
      role2: "",
      name: "",
      userToken: userToken,
      role: activeRole,
      profileImage: ""
    }
  }
  interval = null;

  async show() {
    if (this.state.role == "ROLE_USER") {
      this.setState({ show: true, role2: "User", show2: false, role2: "User" })
    } else {
      this.setState({ show: false, role2: "Admin", show2: true, role2: "Admin" })
    }
  }

  async getNama() {
    await Axios2.get('/name').then((getName) => {
      this.setState({ name: getName.data })
    })
  }

  async getProfile() {
    await Axios2
      .get('/profile')
      .then((response) => {
        const dataProfile = response.data;
        this.setState({
          profileImage: dataProfile.img,
        });
      })
  }

  componentDidMount() {
    this.interval = setInterval(this.reNewBalance, 5000);
    this.show();
    this.getNama();
    this.getProfile();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  reNewBalance = () => {
    this.setState({
      balance: JSON.parse(localStorage.getItem('balance')),
    })
  }

  refresh() {
    $('input[type="radio"]').prop('checked', false);
  }

  formatRupiah = (nilai) => {
    return <NumberFormat value={nilai} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} />
  }

  render() {
    const balance = this.state.balance;
    const { show, show2 } = this.state;
    return (
      <aside className="main-sidebar elevation-4 sidebar-light-primary">
        {/* Brand Logo */}
        <Link to="/" className="brand-link">
          <img src={logo} alt="Maxwell Library" style={{ height: '2rem', marginLeft: '.7rem' }} />
          <span className="brand-text font-weight-light">Maxwell Library</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar os-host os-theme-light os-host-overflow os-host-overflow-y os-host-resize-disabled os-host-scrollbar-horizontal-hidden os-host-transition">
          <div className="os-resize-observer-host observed">
            <div className="os-resize-observer" style={{ left: 0, right: 'auto' }} />
          </div>
          <div className="os-size-auto-observer observed" style={{ height: 'calc(100% + 1px)', float: 'left' }}>
            <div className="os-resize-observer" />
          </div>
          <div className="os-content-glue" style={{ margin: '0px -8px', width: 249, height: 514 }} />
          <div className="os-padding">
            <div className="os-viewport os-viewport-native-scrollbars-invisible" style={{ overflowY: 'scroll' }}>
              <div className="os-content" style={{ padding: '0px 8px', height: '100%', width: '100%' }}>
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                  <div className="image my-center">
                    <Link to='/Profile'>
                      <img src={this.state.profileImage} className="img-circle elevation-2 profile-img-custom" alt="User Image" />
                    </Link>
                  </div>
                  <div className="info">
                    <Link to="Profile" className="d-block user-name">{this.state.name}</Link>
                    <p style={{ fontSize: '1.3rem', fontWeight: 'normal', marginBottom: 0, color: '#000' }}>{this.formatRupiah(this.state.balance)}</p>
                    <p className="p-role">{this.state.role2}</p>
                    {show ? <Link to="" onClick={() => window.location.href = "/TopUp"} className="btn btn-sm btn-primary" style={{ color: 'white' }}>
                      <i style={{ color: 'white' }} className="fas fa-plus-square" /> &nbsp; Top Up
              </Link> : null}
                  </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                  <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* Add icons to the links using the .nav-icon class
                 with font-awesome or any other icon font library */}
                    <li className="nav-item">
                      <Link to="/Profile" className="nav-link">
                        <i className="nav-icon fas fa-user" />
                        <p>
                          Profile
                  </p>
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/" className="nav-link" id="index">
                        <i className="nav-icon fas fa-book" />
                        <p>
                          Explore
                  </p>
                      </Link>
                    </li>
                    {show ? <li className="nav-item">
                      <Link to="/Wishlist" className="nav-link" id="index">
                        <i className="nav-icon fas fa-heart" />
                        <p>
                          Wishlist
                  </p>
                      </Link>
                    </li> : null}
                    <li className="nav-item">
                      {show ? <Link to="/History" className="nav-link" id="history">
                        <i className="nav-icon fas fa-history" />
                        <p>
                          History
                  </p>
                      </Link> : null}

                    </li>
                    <li className="nav-item has-treeview menu-open">
                      <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-list-ul" />
                        <p>
                          Process Management
                    <i className="fas fa-angle-left right" />
                        </p>
                      </a>

                      <ul className="nav nav-treeview">
                        <li className="nav-item">
                          {show2 ? <Link to="/UserManagement" className="nav-link">
                            <i className="fas fa-users nav-icon" />
                            <p>User Management</p>
                          </Link> : null}

                        </li>
                        <li className="nav-item">
                          {show2 ? <Link to="/Author" className="nav-link">
                            <i className="fas fa-user nav-icon" />
                            <p>Author Management</p>
                          </Link> : null}
                        </li>
                        <li className="nav-item">
                          {show2 ? <Link to="/BookManagement" className="nav-link">
                            <i className="fas fa-book nav-icon" />
                            <p>Book Management</p>
                          </Link> : null}
                        </li>
                        <li className="nav-item">
                          <Link to="/RentManagement" className="nav-link">
                            <i className="far fa-hourglass nav-icon" />
                            <p>Rent Management </p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link to="/FineManagement" className="nav-link">
                            <i className="fas fa-gavel nav-icon" />
                            <p>Fine Management</p>
                          </Link>
                        </li>
                        <li className="nav-item">
                          {show2 ? <Link to="/CategoryManagement" className="nav-link">
                            <i className="fas fa-th nav-icon" />
                            <p>Category Management</p>
                          </Link> : null}

                        </li>
                        <li className="nav-item">
                          {show2 ? <Link to="/SlideShowManagement" className="nav-link">
                            <i className="far fa-images nav-icon" />
                            <p>Slide Show Management</p>
                          </Link> : null}

                        </li>
                        <li className="nav-item">
                          {show2 ? <Link to="/DonationManagement" className="nav-link">
                            <i className="fa fa-hands-helping nav-icon" />
                            <p>Donation Management</p>
                          </Link> : null}
                        </li>
                        <li className="nav-item">
                          <Link to="/TopUpManagement" className="nav-link">
                            <i className="fa fa-credit-card nav-icon" />
                            <p>History Transaction</p>
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      {show ? <Link to="/Donation" className="nav-link">
                        <i className="nav-icon fas fa-people-carry" />
                        <p>
                          Donation
                  </p>
                      </Link> : null}

                    </li>
                    <li className="nav-item">
                      {show2 ? <Link to="/LogManagement" className="nav-link">
                        <i className="nav-icon fas fa-clipboard-list" />
                        <p>
                          Log Management
                  </p>
                      </Link> : null}

                    </li>
                    <li className="nav-item" onClick={AuthService.logout}>
                      <Link to="/Auth" className="nav-link" data-target="#modal-xl">
                        <i className="nav-icon fas fa-sign-out-alt" />
                        <p>
                          Log Out
                  </p>
                      </Link>
                    </li>
                  </ul>
                </nav>
                {/* /.sidebar-menu */}
              </div>
            </div>
          </div>
          <div className="os-scrollbar os-scrollbar-horizontal os-scrollbar-unusable os-scrollbar-auto-hidden">
            <div className="os-scrollbar-track">
              <div className="os-scrollbar-handle" style={{ width: '100%', transform: 'translate(0px, 0px)' }} />
            </div>
          </div>
          <div className="os-scrollbar os-scrollbar-vertical os-scrollbar-auto-hidden">
            <div className="os-scrollbar-track">
              <div className="os-scrollbar-handle" style={{ height: '49.8548%', transform: 'translate(0px, 0px)' }} />
            </div>
          </div>
          <div className="os-scrollbar-corner" />
        </div>
        {/* /.sidebar */}
      </aside>

    )
  }
}
