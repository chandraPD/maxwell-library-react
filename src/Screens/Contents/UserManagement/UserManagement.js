import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table';
import Status from '../../../Components/Datatable/Status';
import axios from 'axios';
import './UserManagement.style.css'

import $ from 'jquery';
import "datatables.net-responsive/js/dataTables.responsive"
import "datatables.net-dt/css/jquery.dataTables.min.css"
class UserManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rows: [],
      results: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchDataUser();
  }

  async fetchDataUser() {
    let fetchedData = await axios.get(
      'https://dummyapi.io/data/api/user?limit=100',
      {
        headers: {
          'app-id': '5fb34a83ea9b56971e58ca12',
        },
      }
    );

    this.setState.isLoading = false;
    const resultUser = fetchedData.data.data;
    this.setState({ data: resultUser });
    $('#example1').DataTable().destroy();
    this.fetchData();
    $("#example1").DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  fetchData() {
    let results = [];
    let result = this.state.data;
    result.map((user) => {
      this.setState({ isLoading: true });
      let row = [];
      let statusVal = '';
      let actVal = (
        <div className="btn-group btn-group-sm">
          <div className="input-group-prepend">
            <button
              type="button"
              className="btn btn-default dropdown-toggle"
              data-toggle="dropdown"
            >
              User
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
                Librarian
              </a>
              <a className="dropdown-item" href="#">
                Superadmin
              </a>
            </div>
          </div>
        </div>
      );
      if (user.title == 'mr') {
        statusVal = <Status type="success" val="active" />;
      } else {
        statusVal = <Status type="danger" val="inactive" />;
      }

      row.push(<td className="text-center">{user.id}</td>);
      row.push(
        <td class="user-info">
          <img src={user.picture} alt="avatar" />
        </td>
      );
      row.push(
        <td className="text-center">{`${user.firstName} ${user.lastName}`}</td>
      );
      row.push(<td className="text-center">{user.email}</td>);
      row.push(<td className="text-center">{statusVal}</td>);
      row.push(<td className="text-center">{user.title}</td>);
      row.push(<td className="text-center">{actVal}</td>);
      results.push(row);
    });
    this.setState({ rows: results });
    this.setState({ isLoading: false });
  }

  render() {
    const { rows } = this.state;
    const headings = [
      'ID',
      'Photo',
      'Fullname',
      'Email',
      'Status',
      'Last Activity',
      'Level',
    ];

    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>User Management</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/index">Home</Link></li>
                  <li className="breadcrumb-item active">User Management</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  {/* /.card-header */}
                  <div className="card-body">
                    <DataTable headings={headings} rows={rows} />
                    {/* /.card-body */}
                  </div>
                </div>
                {/* /.card */}
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </section>
        {/* /.content */}
      </div>
    );
  }
}

export default UserManagement;
