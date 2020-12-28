import Swal from 'sweetalert2';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

// class BookManagement extends Component {
//   constructor() {
//     super();
//     this.state = {
//       data: [],
//       rows: [],
//       results: [],
//       isLoading: true,
//     };
//   }

//   componentDidMount() {
//     this.fetchDataUser();
//   }

//   async fetchDataUser() {
//     let fetchedData = await axios.get(
//       'https://www.googleapis.com/books/v1/volumes?q=search-terms&key=AIzaSyBHK4rd4qp4AVCEkutrS4c3m5n7_QzwzQ8'
//     );

//     this.setState.isLoading = false;
//     const resultUser = fetchedData.data.items;
//     this.setState({ data: resultUser });
//     $('#example1').DataTable().destroy();
//     this.fetchData();
//     $("#example1").DataTable({
//       responsive: true,
//       autoWidth: false,
//     });
//   }

//   fetchData() {
//     let results = [];
//     let result = this.state.data;
//     result.map((book) => {
//       this.setState({ isLoading: true });
//       let row = [];

//       row.push(<td className="text-center">{book.volumeInfo.title}</td>);
//       row.push(
//         <td class="user-info">
//           <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
//         </td>
//       );
//       row.push(<td className="text-center">{book.volumeInfo.authors[0]}</td>);
//       row.push(
//         <td className="text-center">{book.volumeInfo.categories[0]}</td>
//       );
//       row.push(<td className="text-center">{book.volumeInfo.subtitle}</td>);
//       row.push(<td className="text-center">{book.volumeInfo.publisher}</td>);
//       results.push(row);
//     });
//     this.setState({ rows: results });
//     this.setState({ isLoading: false });
//   }

//   render() {
//     const { rows } = this.state;
//     const headings = [
//       'Title',
//       'Photo',
//       'Author',
//       'Category',
//       'Description',
//       'Date Added',
//     ];

//     return (
//       <div className="content-wrapper">
//         <section className="content-header">
//           <div className="container-fluid">
//             <div className="row mb-2">
//               <div className="col-sm-6">
//                 <h1>User Management</h1>
//               </div>
//               <div className="col-sm-6">
//                 <ol className="breadcrumb float-sm-right">
//                   <li className="breadcrumb-item">
//                     <a href="index.html">Home</a>
//                   </li>
//                   <li className="breadcrumb-item active">User Management</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* Main content */}
//         <section className="content">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-12">
//                 <div className="card">
//                   {/* /.card-header */}
//                   <div className="card-body">
//                     <DataTable headings={headings} rows={rows} />
//                     {/* /.card-body */}
//                   </div>
//                 </div>
//                 {/* /.card */}
//               </div>
//               {/* /.col */}
//             </div>
//             {/* /.row */}
//           </div>
//           {/* /.container-fluid */}
//         </section>
//         {/* /.content */}
//       </div>
//     );
//   }
// }

export default (async function showResults(values) {    
  const topup = {
    nominal: values.nominal,
    paymentMethod: values.payment,
  }
  axios.post('http://localhost:8080/top_up/post', topup)
        .then((response) => {
          console.log(response);
        })
  console.log(topup)  
  Swal.fire({
    title: "Success Save Top Up Data!",
    text: "You Already Success to save this data!",
    icon: "success",
    buttons: true,    
  })
  .then((isConfirmed) => {
    if (isConfirmed) {
      window.location.href = "/";
  } 
  })
});