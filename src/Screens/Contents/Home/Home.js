import React, { Component } from 'react';
import './Home.style.css';
import firstHero from '../../../Assets/Media/books/hero1.png';
import secondtHero from '../../../Assets/Media/books/hero2.png';
import thirdHero from '../../../Assets/Media/books/hero3.png';
import Flickity from 'react-flickity-component';
import { Link } from 'react-router-dom';
import Axios from '../../../Instances/axios-instances';

class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       dataTop: [],
       dataOld: [],
       allBook: [],
       slideShowActive : [],
       recommendedBook: [],
       recommendedCat: ""
    }
  }
  

  componentDidMount() {
    this.getTopFive();
    this.getAllBook();
    this.getOldestFive();
    this.getSlideShowActive();
    this.getRecommendedBook();
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    console.log(userToken);
  }

  async getTopFive() {
    let fetchTop = await Axios.get('/book/get-recent-five')
    const resultTop = fetchTop.data      
    this.setState({dataTop: resultTop})      
  }

  async getOldestFive() {
    let fetchOld = await Axios.get('/book/get-oldest-five')
    const resultOld = fetchOld.data
    this.setState({dataOld: resultOld})
  }

  async getAllBook() {
    let fetchBook = await Axios.get('/book/get-all')
    this.setState({allBook: fetchBook.data})
  }

  async getSlideShowActive() {
    let fetchSlideShowActive = await Axios.get('/slideshow/get-all-active');
    this.setState({ slideShowActive : fetchSlideShowActive.data});
  }

  async getRecommendedBook() {
    let fetchRecommended = await Axios.get('/book/get-max-qty')
    console.log(fetchRecommended)
    this.setState({recommendedBook: fetchRecommended.data})
    // this.setState({recommendedCat: this.state.recommendedBook.categoryEntity.category})
  }

  render() {
    const flickityOptions = {
      wrapAround: true,
      autoPlay: 2000,
      pageDots: false,
      initialIndex: 2,
    };

    const { dataTop, allBook, dataOld, slideShowActive, recommendedBook, recommendedCat } = this.state

    return (
      <div className="content-wrapper">
        <section className="content">
          {/* Flickity init */}
          <div className="carousel-main">
            <Flickity
              className={'main-carousel carousel'}
              elementType={'div'}
              options={flickityOptions}
              static={true}
              reloadOnUpdate={true}
            >
              {slideShowActive.map((data) => {
                    return (
                          <div
                          className="carousel-cell"
                          style={{
                            backgroundImage: `url(${data.img})`,
                            borderRadius: '30px'
                          }}
                        >
                          <div className="carousel-info">
                            <div className="carousel-text">
                              <h2>{data.title}</h2>
                              <h3>{data.subTitle}</h3>
                            </div>
                          </div>
                        </div>
                    )
                  })}
              

            </Flickity>
          </div>
          {/* Flickity ends */}

          {/* Top picks init */}
          <div className="container-fluid book-list">
            <div className="list-book-content">
              <div className="col-12">
                <div className="custom-flex2">
                  <h2 className="title-container">Recently Added</h2>
                  <h4 className="title-container">
                    Stories sparking conversation
                  </h4>
                </div>
                <div className="filter-container p-0 row custom-flex">

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
                          <span className="badge category-book">{data.categoryEntity.category}</span>
                        </Link>
                    </div>
                    )
                  })}
                  
                </div>
                <div className="books-nf" style={{ display: 'none' }}>
                  <h3 className="book-not-found">Oops, Book Not Found</h3>
                </div>
              </div>
            </div>
          </div>
          {/* Top picks ends */}

          <div className="list-book-content">
            <div className="col-12">
              <div className="custom-flex2">
                <h2 className="title-container">Recommended Stories</h2>
                <h4 className="title-container">Binge from start to finish</h4>
              </div>
              <div className="hero-book">
                <div className="hero-book-cover">
                  <Link to={`Detail/${recommendedBook.bookId}`}>
                    <img
                      src={recommendedBook.imgDetail}
                      alt={recommendedBook.title}
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    className="title"
                    to={`Detail/${recommendedBook.bookId}`}
                    aria-label={recommendedBook.title}
                  >
                    {recommendedBook.title}
                  </Link>
                  <br />
                  <p className="description">
                    {recommendedBook.description}
                  </p>
                  <span className="badge category-book">{recommendedCat}</span>
                </div>
              </div>
            </div>
            <div className="filter-container p-0 row custom-flex">
             

                {dataOld.map((data) => {
                      return (
                        <div className="top-seller">
                        <div className="filtr-item list-book" >
                          <Link to={`Detail/${data.bookId}`}>
                            <img
                              src={data.imgDetail}
                              className="img-fluid img-book"
                              alt="white sample"
                            />
                            <span className="badge category-book">{data.categoryEntity.category}</span>
                          </Link>
                        </div>
                        </div>
                      )
                    })}
                    
    
            
            <div className="books-nf" style={{ display: 'none' }}>
              <h3 className="book-not-found">Oops, Book Not Found</h3>
            </div>
          </div>

          <div className="list-book-content">
            <div className="col-12">
              <div className="custom-flex2">
                <Link to='/Catalogue' ><h2 className="title-container">View Book List </h2></Link>
                <h4 className="title-container">Find your best reads</h4>

              </div>
              <Flickity
                className={'carousel carousel-main book-list-bottom'}
                elementType={'div'}
                options={flickityOptions}
                static={true}
                reloadOnUpdate={true}
              >

                {allBook.map((data) => {
                    return (
                      <div className="carousel-cell">
                        <Link to={`Detail/${data.bookId}`}>
                          <img
                            src={data.imgDetail}
                            className="list-book-bottom carousel-cell-image"
                            alt="white sample"
                          />
                        </Link>
                      </div>
                    )
                  })}
              </Flickity>
            </div>
          </div>
          </div>
        </section>
      </div>

    );
  }
}

export default Home;
