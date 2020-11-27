    $(document).ready(function () {
      $.validator.setDefaults({
        submitHandler: function () {
          alert("Registration Complete!");
          window.location.href = "../index.html";
        }
      });
      $('#formRegister').validate({
        rules: {
          userName: {
            required: true
          },
          fullName: {
            required: true
          },
          email: {
            required: true,
            email: true,
          },
          password: {
            required: true,
            minlength: 8
          },
        },
        messages: {
          userName: {
            required: "Please enter your username",
          },
          email: {
            required: "Please enter a email address",
            email: "Please enter a valid email address"
          },
          password: {
            required: "Please provide a password",
            minlength: "Your password must be at least 8 characters long"
          },
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
