import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Instances/axios-instances";

class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTop: [],
      category: [],
      fields: {},
      year: []
    };
  }

  componentDidMount() {
    this.getAllBooks();
    this.getAllCategory();
    this.getYear();
    let user = JSON.parse(localStorage.getItem("user"));
    const userToken = user.token;
    let fields = {};
    fields["category"] = "All"
    fields["year"] = "All"
    this.setState({fields})
  }

  async getAllBooks() {
    let fetchTop = await Axios.get("/book/get-all-active");
    const resultTop = fetchTop.data;
    this.setState({ dataTop: resultTop });
  }

  async getAllCategory() {
      let fetchCategory = await Axios.get("/category/get-all-active")
      const categoryData = fetchCategory.data;
      this.setState({category: categoryData})
  }

  async getYear() {
    let fetchYear = await Axios.get('/book/get-year')
    const yearData = fetchYear.data
    this.setState({year: yearData})
  }

  handleChange = (field, e) => {
      let fields = this.state.fields
      fields[field] = e.target.value

      this.setState({fields})

    if(fields["category"] === "All" && fields["year"] === "All") {
        this.getAllBooks()
    } else if(fields["category"] !== "All" && fields["year"] === "All") {
        Axios.get('/book/get-by-category/' + fields["category"])
            .then((response) => {
                this.setState({dataTop: response.data})
            })
    }  else if(fields["category"] === "All" && fields["year"] !== "All" ) {
        Axios.get('/book/get-by-year/' + fields["year"])
            .then((response) => {
                this.setState({dataTop: response.data})
            })
    } else if(fields["category"] !== "All" && fields["year"] !== "All") {
        Axios.get('/book/get-by-category-year/' + fields["category"] + "/" + fields["year"])
            .then((response) => {
                this.setState({dataTop: response.data})
            })
    }

  }

  render() {
    const { dataTop, category, year } = this.state;

    return (
      <div className="content-wrapper">
        <section className="content">
          {/* Top picks init */}
          <div className="container-fluid book-list">
            <div className="list-book-content">
              <div className="col-12">
                <div className="custom-flex2">
                  <h2 className="title-container">Book Catalogue</h2>
                  <h4 className="title-container">Explore All Books</h4>
                </div>
                <hr></hr>
                <div className="row">
                  <div
                    className="col-sm-2"
                    style={{ borderRight: "1px solid #eeeeee" }}
                  >
                    <p className="text-center">Category</p>

                    <div className="form-group" style={{marginLeft: "20px"}}>
                      <select
                        name="categoryId"
                        className="form-control"
                        id="inputCategoryId"
                        style={{ width: "100%" }}
                        onChange={this.handleChange.bind(this, "category")}
                      >
                        <option value="All" selected>Show All</option>
                        {category.map((category) => {
                          return (
                            <option value={category.categoryId}>
                              {category.category}
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    <p className="text-center">Year</p>

                    <div className="form-group" style={{marginLeft: "20px"}}>
                      <select
                        name="year"
                        className="form-control"
                        id="inputYear"
                        style={{ width: "100%" }}
                        onChange={this.handleChange.bind(this, "year")}
                      >
                        <option value="All" selected>All Year</option>
                        {year.map((year) => {
                          return(
                            <option value={year}>
                              {year}
                            </option>
                          )
                        })}
                      </select>
                    </div>

                  </div>

                  <div className="col-sm-10">
                    <div className="d-flex justify-content-start flex-wrap">
                      {dataTop.length > 0 ? dataTop.map((data) => {
                          return (
                            <div className="top-seller">
                              <div className="filtr-item list-book" />
                              <Link to={`Detail/${data.bookId}`}>
                                <img
                                  src={data.imgDetail}
                                  className="img-fluid img-book"
                                  alt="white sample"
                                />
                                <span
                                  className="badge category-book"
                                  style={{ marginBottom: "5%" }}
                                >
                                  {data.categoryEntity.category}
                                </span>
                              </Link>
                            </div>
                          );
                        }) : <img src="https://www.drcycle.in/assets/images/NoRecordFound.png" style={{display: "block", marginLeft:"auto", marginRight:"auto"}}/>}
                    </div>
                  </div>
                </div>
                <div className="books-nf" style={{ display: "none" }}>
                  <h3 className="book-not-found">Oops, Book Not Found</h3>
                </div>
              </div>
            </div>
          </div>
          {/* Top picks ends */}
        </section>
      </div>
    );
  }
}

export default Catalogue;
