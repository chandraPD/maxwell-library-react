import axios from "axios";
const instance = axios.create({
    // baseURL: 'http://localhost:8080/',
<<<<<<< HEAD
    baseURL: 'https://maxwell-library.herokuapp.com/'
=======
    baseURL: 'https://maxwell-library.herokuapp.com/',
>>>>>>> 7cb9964914321f73d5a47692e89207ac1e3a526e
  });

  if(localStorage.getItem('user')  !== null){
    instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  export default instance;