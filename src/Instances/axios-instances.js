import axios from "axios";
const instance = axios.create({
    baseURL: 'http://localhost:8080/',
  });

  if(localStorage.getItem('user')  !== null){
    instance.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
  }
  export default instance;