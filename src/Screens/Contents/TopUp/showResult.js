import Swal from 'sweetalert2';
import axios from 'axios';
import Axios2 from '../../../Instances/axios-instances';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {    
  const topup = {
    nominal: values.nominal,
    paymentMethod: values.payment,
  }  
  const topup2 = {        
    password: values.passwordconfirm
  }
  var  match=Axios2.post('top_up_management/getPass',topup2);        
  console.log((await match).data)
  if ((await match).data==true) {
    Axios2.post('top_up/post', topup)
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
  } else{
    Swal.fire({
      title: "Wrong Password",
      text: "Password Wrong",
      icon: "warning",
      buttons: true,    
    })
    .then((isConfirmed) => {
      if (isConfirmed) {
        window.location.href = "/";
    } 
    })
  }
  
});