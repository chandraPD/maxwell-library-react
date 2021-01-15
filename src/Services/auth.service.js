import axios from "axios";

// const API_URL = "http://localhost:8080/auth/";
const API_URL = "https://maxwell-library.herokuapp.com/auth/";

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
    window.location.reload();
  }

  register(firstName, lastName, email, password, confirmPassword) {
    return axios.post(API_URL + "register", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    });
  }

  updateProfile(firstName, lastName, address, phoneNumber, dateOfBirth, img) {
    return axios.post(API_URL + "profile", {
      firstName,
      lastName,
      address,
      phoneNumber,
      dateOfBirth,
      img
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
