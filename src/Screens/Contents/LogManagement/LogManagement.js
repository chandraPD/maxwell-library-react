import React, { Component } from 'react';
import DataTable from "../../../Components/Datatable/Table";
import $ from 'jquery'
import 'bootstrap'
import Axios from '../../../Instances/axios-instances';
import moment from 'moment';

class LogManagement extends Component {

  constructor(props){
    super(props)
    this.state = {
      rows: [],
      data: []
    };
  }

  componentDidMount(){
    this.fetchData();
  }

  async fetchData(){
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;

    const config = {
      headers : { Authorization : `Bearer ${userToken}`}
    }

    await Axios.get('log/get-log-lastActivity', config)
    .then((fetchedData) => {
      const resultLog = fetchedData.data;
      this.setState({
        data : resultLog
      });
      const result = this.state.data;
      const results = [];
      var number = 1;

      result.map((log) => {
        var row = [];

        row.push(
          <td className="text-center">{number++}</td>
        );

        row.push(
          <td className="text-center text-nowrap">
            {this.convertToDate(log.dateTime)}
          </td>
        );

        row.push(
          <td>
            {log.name}
          </td>
        );

        row.push(
          <td>
            {log.email}
          </td>
        );
        row.push(
          <td>
            {log.action}
          </td>
        );

        row.push(
          <td>
            {log.description}
          </td>
        );

        results.push(row)
      })

      this.setState({
        rows : results
      });
      $("#example1").DataTable({
        responsive: true,
        autoWidth: false,
      });
    });
  }

  convertToDate = (date) => {
    if (date === null) {
        return "-"
    } else {
        return moment.utc(date).format('DD-MM-YYYY HH:mm')
    }
}

    render() {
        const { rows } = this.state
        const headings = [
                "No.",
                "Time",
                "FullName",
                "Email",
                "Action",
                "Description"
            ]
        return (
            <div className="content-wrapper">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6"><h3>Last Activity</h3></div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href='index.html'>Home</a>
                      </li>
                      <li className="breadcrumb-item active">Log</li>
                    </ol>
                  </div>
                </div>
              </div>
              {/* <!-- /.container-fluid --> */}
            </section>
           
            <section className="content pdg-btm">
                <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                    <DataTable headings={headings} rows={rows} />
                    </div>
                </div>
                </div>
            </section>

          </div>      
          );
    }
}

export default LogManagement;
