// // Exercise 6

document.getElementById("btn").addEventListener("click", function (event) {
  event.preventDefault();
  validate();
});

function validate() {
  var error = 0;
  // Get the input fields
  var fName = document.getElementById("fName");
  var fEmail = document.getElementById("fEmail");
  var fAddress = document.getElementById("fAddress");
  var fLastN = document.getElementById("fLastN");
  var fPassword = document.getElementById("fPassword");
  var fPhone = document.getElementById("fPhone");

  // Get the error elements
  var errorName = document.getElementById("errorName");
  var errorEmail = document.getElementById("errorEmail");
  var errorAddress = document.getElementById("errorAddress");
  var errorLastN = document.getElementById("errorLastN");
  var errorPassword = document.getElementById("errorPassword");
  var errorPhone = document.getElementById("errorPhone");

  // Validate fields entered by the user
  var nameRegex = /^[a-zA-Z]+$/;
  var phoneRegex = /^\d{9}$/;
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;
  var emailRegex = /^\S+@\S+\.\S+$/;
  var addressRegex = /^[a-zA-Z\s0-9]+$/g;

  validateField(fName, nameRegex, errorName);
  validateField(fEmail, emailRegex, errorEmail);
  validateField(fAddress, addressRegex, errorAddress);
  validateField(fLastN, nameRegex, errorLastN);
  validateField(fPassword, passwordRegex, errorPassword);
  validateField(fPhone, phoneRegex, errorPhone);

  function validateField(field, regex, errorElement) {
    if (field.value.length >= 3 && regex.test(field.value)) {
      field.classList.remove("is-invalid");
      errorElement.style.display = "none";
    } else {
      error++;
      field.classList.add("is-invalid");
      errorElement.style.display = "block";
    }
  }

  //Modal ok checkout prompt
  if (error === 0) {
    setTimeout(() => {
      let myModal = new bootstrap.Modal(
        document.getElementById("customAlertModal")
      );
      myModal.show();
    }, 100);
  }
}

function refresh() {
  // Redirect to the main page
  window.location.href = "index.html";
}