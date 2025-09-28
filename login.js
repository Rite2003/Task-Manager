let submitBtn = document.getElementById("submitBtn");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");
let email = document.getElementById("email");
let password = document.getElementById("password");

// Add event listener to each input field to handle Enter key press
let inputFields = document.querySelectorAll("input");
inputFields.forEach((field, idx) => {
  field.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Validate current field before moving to next
      let isValid = true; // Assume valid initially
      if (field.id === "name") {
        isValid = validateName();
      } else if (field.id === "email") {
        isValid = validateEmail();
      } else if (field.id === "password") {
        isValid = validatePassword();
      } else if (field.id === "confirmPassword") {
        isValid = validateConfirmPassword();
      }
      if (isValid) {
        // Move to next field if valid
        if (idx < inputFields.length - 1) {
          inputFields[idx + 1].focus();
        } else {
          submitBtn.click();
        }
      } // If not valid, stay on current field
    }
  });
});

//function to click on icon to clear the field
function clearIcon(errorElem, inputElem) {
  let icon = errorElem.previousElementSibling; //get the icon element
  // Remove check icon when user types after validation
  inputElem.addEventListener("input", () => {
    icon.classList.remove("fa-check");
    icon.classList.remove("fa-xmark");
    errorElem.innerHTML = "";
  });
  icon.addEventListener("click", () => {
    if (icon.classList.contains("fa-xmark")) {
      inputElem.value = "";
      errorElem.innerHTML = "";
      icon.classList.remove("fa-xmark");
      icon.classList.remove("fa-check");
      inputElem.focus();
    }
  });
}
// clearIcon(nameError, name);
clearIcon(emailError, email);
clearIcon(passError, password);
// clearIcon(confirmError, confirmPassword);

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
