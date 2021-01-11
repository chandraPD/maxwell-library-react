import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "../../../Instances/axios-instances";

class Catalogue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTop: [],
      category: [],
      fields: {}
    };
  }

  componentDidMount() {
    this.getAllBooks();
    this.getAllCategory();
    let user = JSON.parse(localStorage.getItem("user"));
    const userToken = user.token;
    console.log(userToken);
    let fields = {};
    fields["category"] = "All"
    fields["year"] = "All"
    this.setState({fields})
    console.log(fields)
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
      console.log(this.state.category)
  }

  handleChange = (field, e) => {
      let fields = this.state.fields
      fields[field] = e.target.value

      this.setState({fields})
      console.log(fields["category"] + " " + fields["year"])

    if(fields["category"] === "All" && fields["year"] === "All") {
        this.getAllBooks()
    } else if(fields["category"] !== "All" && fields["year"] === "All") {
        Axios.get('/book/get-by-category/' + fields["category"])
            .then((response) => {
                console.log(response)
                this.setState({dataTop: response.data})
                console.log(this.state.dataTop)
            })
    }  else if(fields["category"] === "All" && fields["year"] !== "All" ) {
        Axios.get('/book/get-by-year/' + fields["year"])
            .then((response) => {
                console.log(response)
                this.setState({dataTop: response.data})
                console.log(this.state.dataTop)
            })
    } else if(fields["category"] !== "All" && fields["year"] !== "All") {
        Axios.get('/book/get-by-category-year/' + fields["category"] + "/" + fields["year"])
            .then((response) => {
                console.log(response)
                this.setState({dataTop: response.data})
                console.log(this.state.dataTop)
            })
    }

  }

  render() {
    const { dataTop, category } = this.state;

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
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                        <option value="2019">2019</option>
                        <option value="2018">2018</option>
                        <option value="2017">2017</option>
                        <option value="2016">2016</option>
                        <option value="2015">2015</option>
                      </select>
                    </div>

                  </div>

                  <div className="col-sm-10">
                    <div className="d-flex justify-content-start flex-wrap">
                      {dataTop.map((data) => {
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
                      })}
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