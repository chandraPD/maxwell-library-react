    $(document).ready(function () {
      $.validator.setDefaults({
        submitHandler: function () {
          alert("Check your email!");
          displayLogIn();
        }
      });
      $('#formForgot').validate({
        rules: {
          userName: {
            required: true
          },
          email: {
            required: true,
            email: true,
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
