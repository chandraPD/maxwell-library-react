import swal from 'sweetalert'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {  
  swal({
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