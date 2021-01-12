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
    let user = JSON.parse( localStorage.getItem('user'))
    const userToken = user.token;
    console.log(userToken);
  }
  async getAllWish() {
    let fetchBook = await Axios.get('/wishlist/getAll')
    console.log(fetchBook);
    this.setState({allBook: fetchBook.data})
  }

  render() {
    const { allBook} = this.state

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
                </div>
                <div className="filter-container p-0 row custom-flex">

                  {allBook.map((data) => {
                    console.log(data)
                    return (
                      <div className="top-seller">
                        <div className="filtr-item list-book" />
                        <Link to={`Detail/${data.bookEntity.bookId}`}>
                          <img
                            src={data.bookEntity.imgDetail}
                            className="img-fluid img-book"
                            alt="white sample"
                          />                          
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
        </section>
      </div>

    );
  }
}

export default Wishlist;
