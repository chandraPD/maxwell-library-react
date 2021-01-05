import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {        
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }

        return response.data.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(email, password, confirmPassword) {
    return axios.post(API_URL + "signup", {
      email,
      password,
      confirmPassword
    });
  }

  getPassword(config){
    return axios.get(API_URL+"password",config);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
