import Swal from 'sweetalert2';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {    
  const token="eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNjA5MzE1NDgzLCJleHAiOjE2MDk5MjAyODN9.TwMbN2YlB1TQAYxgHxkpar6Ht3UqR9nDqaEZtwQqnISlcb6NkOqH5utTGaf6hJpKSYtwotRndvntPoaEZ0PgOA"
  const config = {
    headers: { Authorization: `Bearer ${token}` }
}
  const topup = {
    nominal: values.nominal,
    paymentMethod: values.payment,
  }
  axios.post('http://localhost:8080/top_up/post', topup,config)
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