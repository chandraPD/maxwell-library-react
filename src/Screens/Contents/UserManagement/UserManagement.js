import React, { Component } from 'react';
import DataTable from '../../../Components/Datatable/Table';
import Status from '../../../Components/Datatable/Status';
import axios from '../../../Instances/axios-instances';
import './UserManagement.style.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-responsive/js/dataTables.responsive';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import Action from '../../../Components/Datatable/Action';
import Swal from 'sweetalert2'
class UserManagement extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      rows: [],
      results: [],
      isLoading: true,
      addRole: {
        userId : null,
        userRoles : []
      }
    };
  }

  componentDidMount() {
    this.fetchDataUser();
  }

  async fetchDataUser() {
    let fetchedData = await axios.get('user/manage');

    this.setState.isLoading = false;
    const resultUser = fetchedData.data.data;
    this.setState({ data: resultUser });
    $('#example1').DataTable().destroy();
    this.fetchData();
    $('#example1').DataTable({
      responsive: true,
      autoWidth: false,
    });
  }

  handleChangeRole = async (id, event) => {
    let role = event.target.value
    let dataRole = {
      role : role
    }

    await axios.post(`user/${id}/changerole/`, dataRole)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Change Role Success!',
        showCancelButton: false
        }).then((result) => {
        if (result.isConfirmed) {
          this.fetchDataUser()
        }
        })
    })
    .catch((error) => {
      Swal.fire(
        'Change Role Failed !',
        '',
        'error'
    )
    })
  }

  handleSubmitRole = async (e) => {
    e.preventDefault()
    let UserId = this.state.addRole.userId
    let UserRole = {
      role : this.state.addRole.userRoles[0]
    }

    await axios.post(`user/${UserId}/addrole/`, UserRole)
    .then((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Add Role Success!',
        showCancelButton: false
        }).then((result) => {
        if (result.isConfirmed) {
          this.fetchDataUser()
          $("#modal-edit").modal("toggle")
          $('.modal-backdrop').remove()
        }
        })
    })
    .catch((error) =>{
      Swal.fire(
        'Add Role Failed !',
        'All role already registered',
        'error'
    )
      $("#modal-edit").modal("toggle")
      $('.modal-backdrop').remove()
    })
  }

  getRoleUpdate(id, roles) {

    let userRole = []
    let availableRole = ['ROLE_USER', 'ROLE_ADMIN']

    roles.map(role => {
      userRole.push(role.name)
    })
    availableRole = availableRole.filter(value => !userRole.includes(value))

    this.setState({
      addRole : {
        userId : id,
        userRoles : availableRole
      }
    }
    )
  }

  fetchData() {
    let results = [];
    let result = this.state.data;
    result.map((user) => {
      this.setState({ isLoading: true });
      let row = [];
      let statusVal = '';

      let actVal = (
        <td className="text-center py-0 align-middle">
          <select
            name="statusShow"
            id="dropdown"
            className="custom-select"
            value={user.activeRole}
            onChange={(e) => this.handleChangeRole(user.id, e)}
          >
            {user.registeredRoles.map((role) => {
              return (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              );
            })}
          </select>
        </td>
      );
      if (user.status == 'active') {
        statusVal = <Status type="success" val="active" />;
      } else {
        statusVal = <Status type="danger" val="inactive" />;
      }

      row.push(<td className="text-center">{user.id}</td>);
      row.push(
        <td class="user-info text-center py-0 align-middle">
          <img src={user.img} alt="avatar" />
        </td>
      );
      row.push(<td className="text-center">{`${user.fullName}`}</td>);
      row.push(<td className="text-center">{user.email}</td>);
      row.push(<td className="text-center">{statusVal}</td>);
      row.push(<td className="text-center">{actVal}</td>);
      row.push(
        <td className="text-center py-0 align-middle">
          <div className="btn-group btn-group-sm">
            <Action
              type="success"
              title="Add Role"
              dataToggle="modal"
              dataTarget="#modal-edit"
              icon="plus"
              onClick = {() => this.getRoleUpdate(user.id, user.registeredRoles)}
            />
          </div>
        </td>
      );
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
      'Active Role',
      'Add Role',
    ];

    return (
      <div className="content-wrapper">
        {/* <!--Modal Edit--> */}
        <div class="modal fade" id="modal-edit">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Add User Role</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form role="form" id="editSlideshow" onSubmit={(e) => {this.handleSubmitRole(e)}}>
                <div class="modal-body">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="editTitle">Select Role</label>
                      <select
                        name="statusShow"
                        id="dropdown"
                        className="custom-select"
                        value="testing"
                      >
                        {this.state.addRole.userRoles.map((role) => {
                            return (
                              <option value={role}>
                              {role}
                              </option>
                                )
                        })}
                      </select>
                      <span style={{ color: 'red' }}>
                        {this.state.isLoading}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="modal-footer justify-content-between">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button id="submitEdit" type="submit" class="btn btn-warning">
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>User Management</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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
