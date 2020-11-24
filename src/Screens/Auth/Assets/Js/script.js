    var login = document.getElementById("login");
    var register = document.getElementById("register");
    var forgotPassword = document.getElementById("forgotPassword");

    function displaySignUp() {
      login.style.display = "none";
      register.style.display = "block";
      forgotPassword.style.display = "none";
    }

    function displayLogIn() {
      login.style.display = "block";
      register.style.display = "none";
      forgotPassword.style.display = "none";
    }

    function displayForgotPassword() {
      login.style.display = "none";
      register.style.display = "none";
      forgotPassword.style.display = "block";
    }