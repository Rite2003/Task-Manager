let submitBtn = document.getElementById("submitBtn");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateEmail() && validatePassword()) {
    //to get acc detail and match them
    let savedEmail = localStorage.getItem("userEmail");
    let savedPassword = localStorage.getItem("userPassword");
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    if (email === savedEmail && password === savedPassword) {
      alert("Login successful!");
      window.location.href = "home.html"; // redirect to home/dashboard
    } else {
      alert("Invalid email or password!");
    }
  }
});

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
