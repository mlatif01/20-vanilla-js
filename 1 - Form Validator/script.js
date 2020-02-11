// --- DOM Elements ---
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const requirePassed = false; // flag variable for checking if input has a value

// --- Functions ---
// check required fields
function checkRequired(inputArr, requiredFlag) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      setErrorFor(input, `${getInputName(input)} is required`);
    } else {
      setSuccessFor(input);
      requiredFlag[input.id] = true;
    }
  });
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    setErrorFor(
      input,
      `${getInputName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    setErrorFor(
      input,
      `${getInputName(input)} must be less than ${max} characters`
    );
  } else {
    setSuccessFor(input);
  }
}

// check email
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    setSuccessFor(input);
  } else {
    setErrorFor(input, 'Email is not valid');
  }
}

// check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value.trim() !== input2.value.trim()) {
    setErrorFor(input2, 'Passwords do not match');
  }
}

// get input name
function getInputName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkInputs(e) {
  // prevent screen from reloading when submit
  e.preventDefault();

  const requiredFlag = {
    username: false,
    email: false,
    password: false,
    'confirm-password': false
  };

  checkRequired([username, email, password, confirmPassword], requiredFlag);

  // only do further check if input is flagged
  if (requiredFlag.username) {
    checkLength(username, 3, 15);
  }
  if (requiredFlag.password) {
    checkLength(password, 6, 25);
  }
  if (requiredFlag.email) {
    checkEmail(email);
  }

  checkPasswordsMatch(password, confirmPassword);
}

// Check for Error and Success
function setErrorFor(input, message) {
  const formGroup = input.parentElement; // select form-group element
  const small = formGroup.getElementsByTagName('small')[0]; // select the small tag
  // add text to small tag
  small.innerText = message;
  // hide small if it is visible
  small.style = 'visibility: visible;';
  // add error class to small tag
  formGroup.className = 'form-group error';
}

function setSuccessFor(input) {
  const formGroup = input.parentElement; // select form-group element
  const small = formGroup.getElementsByTagName('small')[0]; // select the small tag
  // hide small if it is visible
  small.style = 'visibility: hidden;';
  // add success class
  formGroup.className = 'form-group success';
}

// --- Event Listeners ---
form.addEventListener('submit', checkInputs);
