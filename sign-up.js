// function showToast(message) {
//   const toast = document.getElementById("toast");
//   toast.innerHTML = `<span class="icon">✔</span> ${message}`;
//   toast.classList.add("show");

//   setTimeout(() => {
//     toast.classList.remove("show");
//   }, 3000);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const form = document.getElementById("registerForm");
//   const nameInput = document.getElementById("name");
//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");
//   const confirmInput = document.getElementById("confirm");
//   const submitBtn = document.getElementById("submitBtn");

//   form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const name = nameInput.value.trim();
//     const email = emailInput.value.trim();
//     const password = passwordInput.value.trim();
//     const confirm = confirmInput.value.trim();

//     if (name === "") {
//       alert("Please enter your name.");
//       nameInput.focus();
//       return;
//     }

//     if (email === "") {
//       alert("Please enter your email.");
//       emailInput.focus();
//       return;
//     }

//     const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
//     if (!emailPattern.test(email)) {
//       alert("Please enter a valid email address.");
//       emailInput.focus();
//       return;
//     }

//     if (password === "") {
//       alert("Please enter your password.");
//       passwordInput.focus();
//       return;
//     }

//     if (password.length < 6) {
//       alert("Password must be at least 6 characters long.");
//       passwordInput.focus();
//       return;
//     }

//     if (confirm === "") {
//       alert("Please confirm your password.");
//       confirmInput.focus();
//       return;
//     }

//     if (password !== confirm) {
//       alert("Passwords do not match.");
//       confirmInput.focus();
//       return;
//     }

//     /* === Spinner & disable button === */
//     submitBtn.disabled = true;
//     submitBtn.innerHTML = `<span class="spinner"></span>Please wait...`;

//     setTimeout(() => {
//       showToast("Registration successful!");
//       form.reset();
//       submitBtn.disabled = false;
//       submitBtn.innerHTML = "Sign up";
//     }, 2000);
//   });
// });



/* Multi-step form logic */
let currentStep = 1;
const totalSteps = 3;
const formData = {
  name: "",
  email: "",
  newsletter: false,
  password: "",
  confirmPassword: "",
};

// Local Storage functions
function getRegisteredUsers() {
  const users = localStorage.getItem("registeredUsers");
  return users ? JSON.parse(users) : [];
}

function saveUserToLocalStorage(userData) {
  const users = getRegisteredUsers();
  users.push(userData);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function isEmailRegistered(email) {
  const users = getRegisteredUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Update progress bar
function updateProgressBar() {
  const progressLine = document.getElementById("progressLine");
  const progressSteps = document.querySelectorAll(".progress-step");

  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressLine.style.width = progressPercentage + "%";

  progressSteps.forEach((step, index) => {
    const stepNumber = index + 1;
    if (stepNumber < currentStep) {
      step.classList.add("completed");
      step.classList.remove("active");
    } else if (stepNumber === currentStep) {
      step.classList.add("active");
      step.classList.remove("completed");
    } else {
      step.classList.remove("active", "completed");
    }
  });
}

// Display step based on callback
function displayStep(step) {
  const steps = document.querySelectorAll(".form-step");
  steps.forEach((s) => s.classList.remove("active"));

  const currentStepElement = document.querySelector(
    `.form-step[data-step="${step}"]`
  );
  if (currentStepElement) {
    currentStepElement.classList.add("active");
  }

  const backBtn = document.getElementById("backBtn");
  const nextBtn = document.getElementById("nextBtn");
  const submitBtn = document.getElementById("submitBtn");

  if (step === 1) {
    backBtn.style.display = "none";
  } else {
    backBtn.style.display = "block";
  }

  if (step === totalSteps) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }

  updateProgressBar();
}

// Validation functions
function validateName() {
  const name = document.getElementById("name").value.trim();
  const nameError = document.getElementById("nameError");
  const nameInput = document.getElementById("name");

  if (name === "") {
    nameError.textContent = "Please enter your name";
    nameError.classList.add("show");
    nameInput.classList.add("error");
    return false;
  }

  if (name.length < 2) {
    nameError.textContent = "Name must be at least 2 characters long";
    nameError.classList.add("show");
    nameInput.classList.add("error");
    return false;
  }

  nameError.classList.remove("show");
  nameInput.classList.remove("error");
  formData.name = name;
  return true;
}

function validateEmail() {
  const email = document.getElementById("email").value.trim();
  const emailError = document.getElementById("emailError");
  const emailInput = document.getElementById("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    emailError.textContent = "Please enter your email address";
    emailError.classList.add("show");
    emailInput.classList.add("error");
    return false;
  }

  if (!emailRegex.test(email)) {
    emailError.textContent = "Please enter a valid email address";
    emailError.classList.add("show");
    emailInput.classList.add("error");
    return false;
  }

  emailError.classList.remove("show");
  emailInput.classList.remove("error");
  formData.email = email;
  formData.newsletter = document.getElementById("newsletter").checked;
  return true;
}

function validatePassword() {
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const passwordError = document.getElementById("passwordError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  let isValid = true;

  // Validate password strength
  if (password === "") {
    passwordError.textContent = "Please enter a password";
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
    isValid = false;
  } else if (password.length < 8) {
    passwordError.textContent = "Password must be at least 8 characters long";
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
    isValid = false;
  } else if (!/[A-Z]/.test(password)) {
    passwordError.textContent =
      "Password must contain at least one uppercase letter";
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
    isValid = false;
  } else if (!/[a-z]/.test(password)) {
    passwordError.textContent =
      "Password must contain at least one lowercase letter";
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
    isValid = false;
  } else if (!/[0-9]/.test(password)) {
    passwordError.textContent = "Password must contain at least one number";
    passwordError.classList.add("show");
    passwordInput.classList.add("error");
    isValid = false;
  } else {
    passwordError.classList.remove("show");
    passwordInput.classList.remove("error");
  }

  // Validate password confirmation
  if (confirmPassword === "") {
    confirmPasswordError.textContent = "Please confirm your password";
    confirmPasswordError.classList.add("show");
    confirmPasswordInput.classList.add("error");
    isValid = false;
  } else if (password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match";
    confirmPasswordError.classList.add("show");
    confirmPasswordInput.classList.add("error");
    isValid = false;
  } else {
    confirmPasswordError.classList.remove("show");
    confirmPasswordInput.classList.remove("error");
  }

  if (isValid) {
    formData.password = password;
    formData.confirmPassword = confirmPassword;
  }

  return isValid;
}

// Password toggle functionality
$("#togglePassword").on("click", function() {
    const passwordInput = $("#password");
    const eyeIcon = $(this).find(".eye-icon");
    
    if (passwordInput.attr("type") === "password") {
        passwordInput.attr("type", "text");
        eyeIcon.text("🙈");
    } else {
        passwordInput.attr("type", "password");
        eyeIcon.text("👁️");
    }
});

$("#toggleConfirmPassword").on("click", function() {
    const passwordInput = $("#confirmPassword");
    const eyeIcon = $(this).find(".eye-icon");
    
    if (passwordInput.attr("type") === "password") {
        passwordInput.attr("type", "text");
        eyeIcon.text("🙈");
    } else {
        passwordInput.attr("type", "password");
        eyeIcon.text("👁️");
    }
});

// Password strength indicator
function checkPasswordStrength(password) {
  const strengthBar = document.querySelector(".password-strength-bar");
  const strengthText = document.querySelector(".password-strength-text");
  const strengthContainer = document.querySelector(".password-strength");

  if (password === "") {
    strengthContainer.classList.remove("show");
    strengthText.classList.remove("show");
    return;
  }

  strengthContainer.classList.add("show");
  strengthText.classList.add("show");

  let strength = 0;

  // Length check
  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;

  // Character variety checks
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  strengthBar.className = "password-strength-bar";
  strengthText.className = "password-strength-text show";

  if (strength <= 2) {
    strengthBar.classList.add("weak");
    strengthText.classList.add("weak");
    strengthText.textContent = "Weak password";
  } else if (strength <= 4) {
    strengthBar.classList.add("medium");
    strengthText.classList.add("medium");
    strengthText.textContent = "Good password";
  } else {
    strengthBar.classList.add("strong");
    strengthText.classList.add("strong");
    strengthText.textContent = "Strong password";
  }
}

// Password input event listener
document.getElementById("password").addEventListener("input", function () {
  checkPasswordStrength(this.value);
});

// Next button click handler
document.getElementById("nextBtn").addEventListener("click", function () {
  let isValid = false;

  if (currentStep === 1) {
    isValid = validateName();
  } else if (currentStep === 2) {
    isValid = validateEmail();
  }

  if (isValid && currentStep < totalSteps) {
    currentStep++;
    displayStep(currentStep);
  }
});

// Back button click handler
document.getElementById("backBtn").addEventListener("click", function () {
  if (currentStep > 1) {
    currentStep--;
    displayStep(currentStep);
  }
});

// Reset button click handler (jQuery)
$("#resetBtn").on("click", function () {
  const currentStepElement = $(`.form-step[data-step="${currentStep}"]`);
  currentStepElement.find("input").val("").removeClass("error");
  currentStepElement.find(".error-message").removeClass("show");

  if (currentStep === 2) {
    $("#newsletter").prop("checked", false);
  }

  if (currentStep === 3) {
    $(".password-strength").removeClass("show");
    $(".password-strength-text").removeClass("show");
  }
});

// Show notification (jQuery)
function showNotification(message) {
  $("#notificationMessage").text(message);
  $("#notification").addClass("show").fadeIn(300);

  setTimeout(function () {
    $("#notification").fadeOut(300, function () {
      $(this).removeClass("show");
    });
  }, 4000);
}

// Form submission (jQuery)
$("#signupForm").on("submit", function (e) {
  e.preventDefault();

  if (validatePassword()) {
    // Check if email is already registered
    if (isEmailRegistered(formData.email)) {
      showNotification("This email is already registered. Please use a different email or log in.");
      return;
    }

    const submitBtn = $("#submitBtn");
    const originalText = submitBtn.html();

    // Disable button and show spinner
    submitBtn.prop("disabled", true);
    submitBtn.html('<span class="spinner"></span>Please wait...');

    // Simulate server call
    setTimeout(function () {
      // Create user object (excluding confirmPassword, storing only necessary data)
      const userData = {
        id: Date.now(), // Unique ID based on timestamp
        name: formData.name,
        email: formData.email,
        newsletter: formData.newsletter,
        password: formData.password, // In production, this should be hashed
        registeredAt: new Date().toISOString()
      };

      // Save to Local Storage
      saveUserToLocalStorage(userData);

      // Reset button
      submitBtn.prop("disabled", false);
      submitBtn.html(originalText);

      // Show success notification
      showNotification("Congratulations! You have registered successfully!");

      console.log("User registered:", { name: userData.name, email: userData.email });
      console.log("Total registered users:", getRegisteredUsers().length);

      // Reset form after successful submission
      setTimeout(function () {
        $("#signupForm")[0].reset();
        currentStep = 1;
        displayStep(currentStep);
        $(".password-strength").removeClass("show");
        $(".password-strength-text").removeClass("show");
        
        // Clear formData object
        formData.name = "";
        formData.email = "";
        formData.newsletter = false;
        formData.password = "";
        formData.confirmPassword = "";
      }, 2000);
    }, 2000);
  }
});

// Initialize form
displayStep(currentStep);