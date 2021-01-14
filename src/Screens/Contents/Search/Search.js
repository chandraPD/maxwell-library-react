import React, { Component } from 'react'
import './searchpage.css'
import $ from 'jquery'
import {Link, withRouter} from 'react-router-dom'
import Axios from '../../../Instances/axios-instances'


class Search extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             title: "",
             dataSearch: [],
             countBook: "",
             search: "",
             visible: 3
        }

        this.handleChangeSearch = this.handleChangeSearch.bind(this)
        this.loadMore = this.loadMore.bind(this)
    }
    
    componentDidMount() {

        const titleSearch = this.props.match.params.title;
  
        this.setState({title: titleSearch})
    
        this.fetchData(titleSearch)
    }

    async fetchData(title) {
        let fetchData = await Axios.get('/book/get-by-title/' + title)
    
        const length = fetchData.data.length
        this.setState({dataSearch: fetchData.data})
        this.setState({countBook: length})
     
    }

    loadMore() {
        this.setState((prev) => {
            return {visible: prev.visible + 4}
        })
    }

    showCountBook() {
        if(this.state.countBook <= 1) {
            return <h4>{this.state.countBook} Book</h4>
        } else if(this.state.countBook > 1) {
            return <h4>{this.state.countBook} Books</h4>
        }
    }

    handleChangeSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        this.setState({search: e.target.value}, () => setTimeout(function() {
            this.fetchData(this.state.search)
        }.bind(this), 500))
        
    }


    render() {

        const {dataSearch, title, visible} = this.state

        return (
            <div className="content-wrapper">
                <section className="content">
                <div className="container-fluid search-content">

                    <input autoComplete="off" className="form-control form-control" type="text" value={title} name="title" onChange={this.handleChangeSearch}/>

                    {/* <p className="recommended-books-search">Suggested Categories : &nbsp;
                        <span className="badge badge-success category-book">novel</span>
                    </p> */}

                    <div className="hero-book-search">
                        {this.showCountBook()}
                        <div className="book-list-search">

                            {dataSearch.length > 0 ? dataSearch.slice(0, visible).map((data) => {
                                return(
                                    <div className="book-content">
                                        <div className="content-cover">
                                            <img src={data.imgDetail}
                                                alt={data.title}
                                                />
                                        </div>
                                        <Link to={`/Detail/${data.bookId}`} > <p className="title-search">{data.title}</p> </Link>
                                        <p className="description">
                                            {data.description}
                                        </p>
                                        <span className="badge badge-success category-book">{data.categoryEntity.category}</span>
                                    </div>
                                )
                            }) : <img src="https://www.drcycle.in/assets/images/NoRecordFound.png"/>}

                            {visible < dataSearch.length &&
                                <button onClick={this.loadMore} type="button" className="btn btn-dark">Load More</button>
                            }

                            
                        </div>

                    </div>


                </div>
            </section>
            </div>
        )
    }
}

export default withRouter(Search);
