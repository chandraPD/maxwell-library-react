import React, { Component } from 'react'
import moment from 'moment';

export default class Footer extends Component {
    render() {
        return (
            <footer className="main-footer text-sm">
                <div className="float-right d-none d-sm-block">
                    &copy; 2014-2019 <a href="http://adminlte.io">AdminLTE.io</a> All rights reserved.
                </div>
                Made with <i className="nav-icon fas fa-heart"></i> by <strong>Maxwell Library</strong>
            </footer>
        )
    }
}