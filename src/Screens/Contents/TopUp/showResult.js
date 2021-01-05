import Swal from 'sweetalert2';
import axios from 'axios';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {    
  let user = JSON.parse( localStorage.getItem('user'))
  const userToken = user.token;
  console.log(userToken);
  const token=userToken
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