document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault(); 
  
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      const confirm = confirmInput.value.trim();
  
      
      if (name === "") {
        alert("Please enter your name.");
        nameInput.focus();
        return;
      }
  
      if (email === "") {
        alert("Please enter your email.");
        emailInput.focus();
        return;
      }
  
        
      const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        emailInput.focus();
        return;
      }
  
      if (password === "") {
        alert("Please enter your password.");
        passwordInput.focus();
        return;
      }
  
      if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        passwordInput.focus();
        return;
      }
  
      if (confirm === "") {
        alert("Please confirm your password.");
        confirmInput.focus();
        return;
      }
  
      if (password !== confirm) {
        alert("Passwords do not match.");
        confirmInput.focus();
        return;
      }
  
      
      alert("Registration successful!");
      form.reset();
    });
  });
  


  