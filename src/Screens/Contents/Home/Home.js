import React, { Component } from 'react';
import './Home.style.css';
import firstHero from '../../../Assets/Media/books/hero1.png';
import secondtHero from '../../../Assets/Media/books/hero2.png';
import thirdHero from '../../../Assets/Media/books/hero3.png';
import Flickity from 'react-flickity-component';
import { Link } from 'react-router-dom';
import Axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       dataTop: [],
       allBook: []
    }
  }
  

  componentDidMount() {
    this.getTopFive();
    this.getAllBook();
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    console.log(userToken);
  }

  async getTopFive() {
    let fetchTop = await Axios.get('http://localhost:8080/book/get-recent-five')
    const resultTop = fetchTop.data      
    this.setState({dataTop: resultTop})      
  }

  async getAllBook() {
    let fetchBook = await Axios.get('http://localhost:8080/book/get-all')
    this.setState({allBook: fetchBook.data})
  }

  render() {
    const flickityOptions = {
      wrapAround: true,
      autoPlay: 2000,
      pageDots: false,
      initialIndex: 2,
    };

    const { dataTop, allBook } = this.state

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
              <div
                className="carousel-cell"
                style={{
                  backgroundImage: `url(${firstHero})`,
                }}
              >
                <div className="carousel-info">
                  <div className="carousel-text">
                    <h2>After Wedding</h2>
                    <h3>Raditya Dika</h3>
                  </div>
                </div>
              </div>
              <div
                className="carousel-cell"
                style={{
                  backgroundImage: `url(${secondtHero})`,
                }}
              >
                <div className="carousel-info">
                  <div className="carousel-text">
                    <h2>After Wedding</h2>
                    <h3>Raditya Dika</h3>
                  </div>
                </div>
              </div>
              <div
                className="carousel-cell"
                style={{
                  backgroundImage: `url(${thirdHero})`,
                }}
              >
                <div className="carousel-info">
                  <div className="carousel-text">
                    <h2>After Wedding</h2>
                    <h3>Raditya Dika</h3>
                  </div>
                </div>
              </div>
            </Flickity>
          </div>
          {/* Flickity ends */}

          {/* Top picks init */}
          <div className="container-fluid book-list">
            <div className="list-book-content">
              <div className="col-12">
                <div className="custom-flex2">
                  <h2 className="title-container">Top Picks For You</h2>
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
                            src="https://aimint.org/za/wp-content/uploads/sites/16/2016/04/image-placeholder-vertical.jpg"
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
                  <Link to="Detail">
                    <img
                      src="https://img.wattpad.com/cover/235119477-416-k713259.jpg"
                      alt="Conquer Dream, With Bos! cover"
                    />
                  </Link>
                </div>
                <div>
                  <a
                    className="title"
                    href="detail.html"
                    aria-label="Read Conquer Dream, With Bos!"
                  >
                    Conquer Dream, With Bos!
                  </a>
                  <br />
                  <p className="description">
                    Penangkapan mendadak kedua orang tua yang terseret di sebuah
                    kasus korupsi besar membuat takdir hidup jatuh miskin.
                    Chalya Ailen Hadinata, mati-matian mencari uang untuk
                    menghidupi dua adiknya ketika kedua orang tuanya mendekam di
                    dalam penjara. Chalya seakan kehilangan pegangan hidupnya.
                    Sekian lama termenung dari kesedihan, Chayla mencoba kembali
                    bangkit untuk adik-adiknya. Chayla berusaha mengembalikan
                    takdir...
                  </p>
                  <span className="badge category-book">fiction</span>
                </div>
              </div>
            </div>
            <div className="filter-container p-0 row custom-flex">
              <div className="top-seller">
                <div className="filtr-item list-book" />
                <Link to="Detail">
                  <img
                    src="https://img.wattpad.com/cover/138766480-200-k262515.jpg"
                    className="img-fluid img-book"
                    alt="white sample"
                  />
                  <span className="badge  category-book">fiction</span>
                </Link>
              </div>
              <div className="filtr-item list-book">
                <Link to="Detail">
                  <img
                    src="https://img.wattpad.com/cover/225027823-200-k139088.jpg"
                    className="img-fluid img-book"
                    alt="white sample"
                  />
                </Link>
                <span className="badge  category-book">romance</span>
              </div>
              <div className="filtr-item list-book">
                <Link to="Detail">
                  <img
                    src="https://img.wattpad.com/cover/142217672-200-k469744.jpg"
                    className="img-fluid img-book"
                    alt="white sample"
                  />
                </Link>
                <span className="badge  category-book">fantasy</span>
              </div>
              <div className="filtr-item list-book">
                <Link to="Detail">
                  <img
                    src="https://img.wattpad.com/cover/164853306-200-k69310.jpg"
                    className="img-fluid img-book"
                    alt="white sample"
                  />
                </Link>
                <span className="badge  category-book">novel</span>
              </div>
              <div className="filtr-item list-book">
                <Link to="Detail">
                  <img
                    src="https://img.wattpad.com/cover/143926052-200-k378110.jpg"
                    className="img-fluid img-book"
                    alt="white sample"
                  />
                </Link>
                <span className="badge  category-book">novel</span>
              </div>
            </div>
            <div className="books-nf" style={{ display: 'none' }}>
              <h3 className="book-not-found">Oops, Book Not Found</h3>
            </div>
          </div>

          <div className="list-book-content">
            <div className="col-12">
              <div className="custom-flex2">
                <h2 className="title-container">Book List</h2>
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
                            src="https://img.wattpad.com/cover/217637593-176-k15446.jpg"
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
        </section>
      </div>
    );
  }
}

export default Home;
