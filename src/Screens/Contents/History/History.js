import React, { Component } from 'react';
import './History.style.css'
import photo from '../../../Assets/Media/books/brief-answer-to-the-big-questions.jpg'
import photo2 from '../../../Assets/Media/books/novel-dilan.jpg'
import photo3 from '../../../Assets/Media/books/fantastic-beasts.jpg'
import photo4 from '../../../Assets/Media/books/harry-potter.jpg'
import photo5 from '../../../Assets/Media/books/laskar.png'
import photo6 from '../../../Assets/Media/books/brief-answer-to-the-big-questions.jpg'
import photo7 from '../../../Assets/Media/books/novel-dilan.jpg'
import photo8 from '../../../Assets/Media/books/fantastic-beasts.jpg'
import photo9 from '../../../Assets/Media/books/harry-potter.jpg'
import photo10 from '../../../Assets/Media/books/laskar.png'
import { Link } from 'react-router-dom'
import axios from '../../../Instances/axios-instances'

class History extends Component {

  constructor() {
    super();
    this.state = {
      borroweddata: [],
      currentreaddata: [] 
    };


  }

  componentDidMount() {
    this.fetchDataBorrowedBooks()
    this.fetchDataCurrentBooks()

  }

  async fetchDataBorrowedBooks() {
    await axios.get('history/borrowed').then((response) => {

      this.setState({
        borroweddata: response.data.data
      })

    })

  }


  async fetchDataCurrentBooks() {
    await axios.get('history/currentread').then((response) => {

      this.setState({
        currentreaddata: response.data.data
      })

    })

  }
  

  displayCurrentRead() {
    var titleCurrent = document.getElementById('title-current');
    var currentBooks = document.getElementById('current-books');
    var titleBorrowed = document.getElementById('title-borrowed');
    var borrowedBooks = document.getElementById('borrowed-books');

    titleCurrent.style.display = 'block';
    currentBooks.style.display = 'block';

    titleBorrowed.style.display = 'none';
    borrowedBooks.style.display = 'none';
  }

  displayBorrowedBooks() {
    var titleCurrent = document.getElementById('title-current');
    var currentBooks = document.getElementById('current-books');
    var titleBorrowed = document.getElementById('title-borrowed');
    var borrowedBooks = document.getElementById('borrowed-books');

    titleBorrowed.style.display = 'block';
    borrowedBooks.style.display = 'block';

    titleCurrent.style.display = 'none';
    currentBooks.style.display = 'none';
  }

  render() {
    let borroweddata = this.state.borroweddata
    let currentreaddata = this.state.currentreaddata

    return (

      <div className="wrapper">
        {/* Content Wrapper. Contains page content */}
        <div className="content-wrapper">

          {/* Main content */}
          <section className="content">
            <div className="card">
              <div className="history-table">
                <div className="panel panel-default panel-order">
                  <div className="panel-heading" style={{ padding: '2% 0' }}>
                    <div className="row">
                      <div className="col-md-2">
                        <strong className="history-text borrowed" id="title-borrowed">Borrowed Books</strong>
                        <strong className="history-text current" id="title-current">Current Read</strong>
                      </div>
                      <div className="col-md-10">
                        <div className="btn-group">
                          <button type="button" className="btn btn-warning" onClick={() => this.displayCurrentRead()}>
                    Current Read
                  </button>
                  <button type="button" className="btn btn-warning" onClick={() => this.displayBorrowedBooks()}>
                    Borrowed Book
                  </button>
                        
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="panel-body borrowed" id="borrowed-books">
                    {borroweddata.map(item => <div className="row">
                      <div className="col-md-1"><img src={item.bookDetailEntity.bookEntity.imgDetail} alt="media-object" /></div>
                      <div className="col-md-11">
                        <div className="row">
                          <div className="col-md-12">
                            <span><strong>{item.bookDetailEntity.bookEntity.title}</strong></span>
                            <span className="label label-info-custom">{item.bookDetailEntity.bookEntity.categoryEntity.category}</span>
                            <br />
                            <div className="book-description">
                              <span>{item.bookDetailEntity.bookEntity.description}</span>
                            </div>
                          </div>
                          <br />
                          <div className="col-md-12">
                            Borrowed On: {item.borrowedDate}
                          </div>
                        </div>
                      </div>
                    </div>)}

                  </div>


                  {/* Current Read */}
                  <div className="panel-body current" id="current-books">
                   {currentreaddata.map(item => <div className="row">
                      <div className="col-md-1"><img src={item.bookDetailEntity.bookEntity.imgDetail} alt="media-object" /></div>
                      <div className="col-md-11">
                        <div className="row">
                          <div className="col-md-12">
                            <span><strong>{item.bookDetailEntity.bookEntity.title}</strong></span>
                            <span className="label label-info-custom">{item.bookDetailEntity.bookEntity.categoryEntity.category}</span>
                            <br />
                            <div className="book-description">
                              <span>{item.bookDetailEntity.bookEntity.description}</span>
                            </div>
                          </div>
                          <br />
                          <div className="col-md-12">
                            Borrowed On: {item.borrowedDate}
                          </div>
                        </div>
                      </div>
                    </div>)}
                   
                 
                  
                 
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* /.content-wrapper */}
        </div>
      </div>
    )
  }
}

export default History;