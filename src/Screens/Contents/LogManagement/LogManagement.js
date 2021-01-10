import React, { Component } from 'react';
import DataTable from "../../../Components/Datatable/Table";
import Action from "../../../Components/Datatable/Action";
import $ from 'jquery'
import 'bootstrap'
import Axios from '../../../Instances/axios-instances';

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
    // $("#example1").DataTable.destroy();

    await Axios.get('log/get-all-log')
    .then((fetchedData) => {
      console.log(fetchedData);
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
          <td>
            {log.dateTime}
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

    render() {
        const { rows } = this.state
        const headings = [
                "No.",
                "Time",
                "Action",
                "Description"
            ]
        return (
            <div className="content-wrapper">
            {/* <!-- Content Header (Page header) --> */}
            <section className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-6"><h3>Log Management</h3></div>
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                      <li className="breadcrumb-item">
                        <a href='/'>Home</a>
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
