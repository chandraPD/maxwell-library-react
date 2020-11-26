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

class History extends Component {
  render () {
     return (
      
      <div className="wrapper">
   {/* Content Wrapper. Contains page content */}
   <div className="content-wrapper">
 
     {/* Main content */}
     <section className="content">
       <div className="card">
         <div className="history-table">
           <div className="panel panel-default panel-order">
             <div className="panel-heading" style={{padding: '2% 0'}}>
               <div className="row">
                 <div className="col-md-2">
                   <strong className="history-text borrowed" id="title-borrowed">Borrowed Books</strong>
                   <strong className="history-text current" id="title-current">Current Read</strong>
                 </div>
                 <div className="col-md-10">
                   <div className="btn-group">
                     <button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown">
                       View History
                     </button>
                     <div className="dropdown-menu">
                       <button className="dropdown-item" href="#" onclick="displayBorrowedBooks()">Borrowed</button>
                       <button className="dropdown-item" href="#" onclick="displayCurrentRead()">Current Read</button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
             <div className="panel-body borrowed" id="borrowed-books">
               <div className="row">
                 <div className="col-md-1"><img src={photo} alt="media-object" />
                 </div>
                 <div className="col-md-11">
                   <div className="row">
                     <div className="col-md-12">
                       <span><strong>Book Title (Borrowed)</strong></span>
                       <span className="label label-info-custom">Category</span>
                       <br />
                       <div className="book-description">
                         <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                           reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                           exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                       </div>
                       <br />
                     </div>
                     <div className="col-md-12">
                       Borrowed On: 05/30/2014
                     </div>
                     </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo2} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Borrowed)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo3} alt="media-object"/>
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Borrowed)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo4} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Borrowed)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus laboriosam
                          aliquid reiciendis dolore doloremque rerum minus, quo numquam nulla, et eveniet consectetur
                          vitae tempora! Facere dolore dicta ab in.</span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 05/30/2014
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo5} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Borrowed)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />

                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="card-tools">
                <ul className="pagination pagination-sm custom-pagination-pos">
                  <li className="page-item"><a href="#" className="page-link">«</a></li>
                  <li className="page-item"><a href="#" className="page-link">1</a></li>
                  <li className="page-item"><a href="#" className="page-link">2</a></li>
                  <li className="page-item"><a href="#" className="page-link">3</a></li>
                  <li className="page-item"><a href="#" className="page-link">»</a></li>
                </ul>
              </div>
            </div>
            {/* Current Read */}
            <div className="panel-body current" id="current-books">
              <div className="row">
                <div className="col-md-1"><img src={photo6} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Current)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 05/30/2014
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo7} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Current)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo8} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Current)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo9} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Current)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi accusamus laboriosam
                          aliquid reiciendis dolore doloremque rerum minus, quo numquam nulla, et eveniet consectetur
                          vitae tempora! Facere dolore dicta ab in.</span>
                      </div>
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 05/30/2014
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-1"><img src={photo10} alt="media-object" />
                </div>
                <div className="col-md-11">
                  <div className="row">
                    <div className="col-md-12">
                      <span><strong>Book Title (Current)</strong></span>
                      <span className="label label-info-custom">Category</span>
                      <br />
                      <div className="book-description">
                        <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate exercitationem
                          reiciendis ipsa? Nihil laborum recusandae, vero voluptate incidunt quas? Dolor ab enim
                          exercitationem sit quam reiciendis officiis sed sapiente aspernatur.</span>
                      </div>
                      <br />
                    </div>
                    <div className="col-md-12">
                      Borrowed On: 03/10/2013
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="card-tools">
                <ul className="pagination pagination-sm custom-pagination-pos">
                  <li className="page-item"><a href="#" className="page-link">«</a></li>
                  <li className="page-item"><a href="#" className="page-link">1</a></li>
                  <li className="page-item"><a href="#" className="page-link">2</a></li>
                  <li className="page-item"><a href="#" className="page-link">4</a></li>
                  <li className="page-item"><a href="#" className="page-link">»</a></li>
                </ul>
              </div>
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