import axios from "axios";
console.log(localStorage)
const instance = axios.create({
    // baseURL: 'http://localhost:8080/',
    baseURL: 'https://maxwell-library.herokuapp.com/',
  });

  if(localStorage.getItem('user')  !== null){
    instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  export default instance;