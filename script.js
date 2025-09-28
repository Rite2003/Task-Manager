let submitBtn = document.getElementById("submitBtn");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");
let confirmError = document.getElementById("confirmError");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    validateName() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword()
  ) {
    //to store acc detail
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    localStorage.setItem("userName", name);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    // Removed the submit event listener, logic moved to click handler
    alert("Account created successfully! Please login.");
    window.location.href = "login.html"; // redirect to login page
  }
});

function validateName() {
  let name = document.getElementById("name").value;
  if (name.length == 0) {
    nameError.innerHTML = "Name is required";
    nameError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }

  if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameError.innerHTML = "Write a full name";
    nameError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }
  nameError.innerHTML = "";
  nameError.previousElementSibling.classList.remove("fa-xmark");
  nameError.previousElementSibling.classList.add("fa-check");
  return true;
}

function validateEmail() {
  let email = document.getElementById("email").value;
  if (email.length == 0) {
    emailError.innerHTML = "email is required";
    emailError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }

  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    emailError.innerHTML = "Enter a valid email";
    emailError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }
  emailError.innerHTML = "";
  emailError.previousElementSibling.classList.remove("fa-xmark");
  emailError.previousElementSibling.classList.add("fa-check");
  return true;
}

function validatePassword() {
  let password = document.getElementById("password").value;
  if (password.length == 0) {
    passError.innerHTML = "Password is required";
    passError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }

  if (
    !password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/
    )
  ) {
    passError.innerHTML =
      "Password should contain 1 Uppercase, 1 Lowecase, 1 Digit & 1 Alphabet";
    passError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }
  passError.innerHTML = "";
  passError.previousElementSibling.classList.remove("fa-xmark");
  passError.previousElementSibling.classList.add("fa-check");
  return true;
}

function validateConfirmPassword() {
  let confirmPassword = document.getElementById("confirmPassword").value;
  let password = document.getElementById("password").value;

  if (confirmPassword.length == 0) {
    confirmError.innerHTML = "Password is required";
    confirmError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }

  if (confirmPassword !== password) {
    confirmError.innerHTML = "Password does not match";
    confirmError.previousElementSibling.classList.add("fa-xmark");
    return false;
  }
  confirmError.innerHTML = "";
  confirmError.previousElementSibling.classList.remove("fa-xmark");
  confirmError.previousElementSibling.classList.add("fa-check");
  return true;
}
