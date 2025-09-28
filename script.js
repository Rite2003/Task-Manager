let submitBtn = document.getElementById("submitBtn");
let nameError = document.getElementById("nameError");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");
let confirmError = document.getElementById("confirmError");
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");

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
clearIcon(nameError, name);
clearIcon(emailError, email);
clearIcon(passError, password);
clearIcon(confirmError, confirmPassword);

// Removed the submit event listener, logic moved to click handler
submitBtn.addEventListener("click", (e) => {
  e.preventDefault(); // why this use here if not use then page reload and data lost
  //validation check
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
    alert("Account created successfully! Please login.");
    window.location.href = "login.html"; // redirect to login page
  }
});

//validation functions
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
