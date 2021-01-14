import React, { Component } from 'react';
import firstHero from '../../../Assets/Media/books/hero1.png';
import secondtHero from '../../../Assets/Media/books/hero2.png';
import thirdHero from '../../../Assets/Media/books/hero3.png';
import Flickity from 'react-flickity-component';
import { Link } from 'react-router-dom';
import Axios from '../../../Instances/axios-instances';

class Wishlist extends Component {

  constructor(props) {
    super(props)

    this.state = {

      allBook: []

    }
  }


  componentDidMount() {
    this.getAllWish();
    let user = JSON.parse(localStorage.getItem('user'))
    const userToken = user.token;
  }
  async getAllWish() {
    let fetchBook = await Axios.get('/wishlist/getAll')
    this.setState({ allBook: fetchBook.data })
  }

  render() {
    const { allBook } = this.state

    return (
      <div className="content-wrapper">
        <section className="content">

          {/* Top picks init */}
          <div className="container-fluid book-list">
            <div className="list-book-content">
              <div className="col-12">
                <div className="custom-flex2">
                  <h2 className="title-container">Wishlist Book</h2>
                  <h4 className="title-container">
                    This is where your favorite book place
                  </h4>
                  <hr></hr>
                </div>

                {allBook.map((data) => {
                  return (

                    <div className="panel-body wishlist-card">
                      <div className="row">
                        <div className="col-md-1"><Link to={`/Detail/${data.bookEntity.bookId}`}><img src={data.bookEntity.imgDetail} alt="media-object" className="img-fluid" style={{ borderRadius: "5px" }} /> </Link></div>
                        <div className="col-md-11">
                          <div className="row">
                            <div className="col-md-12">
                              <Link to={`/Detail/${data.bookEntity.bookId}`}>
                                <span><strong>{data.bookEntity.title}</strong></span>
                              </Link>
                              <span className="label label-info-custom">{data.bookEntity.categoryEntity.category}</span>
                              <br />
                              <div className="book-description">
                                <br />
                                <span>{data.bookEntity.description}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br></br>
                    </div>


                  )
                })}

                <div className="books-nf" style={{ display: 'none' }}>
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

export default Wishlist;
