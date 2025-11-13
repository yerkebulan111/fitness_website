/* login.js - Login functionality with Local Storage */

// Get registered users from Local Storage
function getRegisteredUsers() {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
}

// Find user by email
function findUserByEmail(email) {
    const users = getRegisteredUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase());
}

// Validate login credentials
function validateLogin(email, password) {
    const user = findUserByEmail(email);
    
    if (!user) {
        return {
            success: false,
            message: "No account found with this email address."
        };
    }
    
    if (user.password !== password) {
        return {
            success: false,
            message: "Incorrect password. Please try again."
        };
    }
    
    return {
        success: true,
        user: user
    };
}

// Save login session
function saveLoginSession(user, rememberMe) {
    const sessionData = {
        userId: user.id,
        name: user.name,
        email: user.email,
        loginTime: new Date().toISOString()
    };
    
    if (rememberMe) {
        localStorage.setItem("currentUser", JSON.stringify(sessionData));
        localStorage.setItem("rememberMe", "true");
    } else {
        sessionStorage.setItem("currentUser", JSON.stringify(sessionData));
    }
    
    console.log("User logged in:", user.name);
}

// Check if user is already logged in
function checkExistingSession() {
    const rememberMe = localStorage.getItem("rememberMe");
    const currentUser = rememberMe 
        ? localStorage.getItem("currentUser")
        : sessionStorage.getItem("currentUser");
    
    if (currentUser) {
        try {
            const userData = JSON.parse(currentUser);
            console.log("Active session found:", userData.name);
            return userData;
        } catch (e) {
            console.error("Error parsing session data:", e);
        }
    }
    return null;
}

// Show notification
function showNotification(message, isSuccess = false) {
    const notification = $("#notification");
    const notificationIcon = $("#notificationIcon");
    const notificationTitle = $("#notificationTitle");
    const notificationMessage = $("#notificationMessage");
    
    if (isSuccess) {
        notification.removeClass("error").addClass("success");
        notificationIcon.text("✓");
        notificationTitle.text("Success");
    } else {
        notification.removeClass("success").addClass("error");
        notificationIcon.text("✗");
        notificationTitle.text("Error");
    }
    
    notificationMessage.text(message);
    notification.addClass("show").fadeIn(300);
    
    setTimeout(function() {
        notification.fadeOut(300, function() {
            $(this).removeClass("show");
        });
    }, 4000);
}

// Show success modal
function showSuccessModal(userName) {
    $("#userName").text(userName);
    $("#successModal").addClass("show");
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

// Input validation helpers
function validateEmailInput() {
    const email = $("#email").val().trim();
    const emailError = $("#emailError");
    const emailInput = $("#email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === "") {
        emailError.text("Please enter your email address");
        emailError.addClass("show");
        emailInput.addClass("error");
        return false;
    }
    
    if (!emailRegex.test(email)) {
        emailError.text("Please enter a valid email address");
        emailError.addClass("show");
        emailInput.addClass("error");
        return false;
    }
    
    emailError.removeClass("show");
    emailInput.removeClass("error");
    return true;
}

function validatePasswordInput() {
    const password = $("#password").val();
    const passwordError = $("#passwordError");
    const passwordInput = $("#password");
    
    if (password === "") {
        passwordError.text("Please enter your password");
        passwordError.addClass("show");
        passwordInput.addClass("error");
        return false;
    }
    
    passwordError.removeClass("show");
    passwordInput.removeClass("error");
    return true;
}

// Clear error on input
$("#email").on("input", function() {
    $("#emailError").removeClass("show");
    $(this).removeClass("error");
});

$("#password").on("input", function() {
    $("#passwordError").removeClass("show");
    $(this).removeClass("error");
});

// Form submission
$("#loginForm").on("submit", function(e) {
    e.preventDefault();
    
    // Validate inputs
    const isEmailValid = validateEmailInput();
    const isPasswordValid = validatePasswordInput();
    
    if (!isEmailValid || !isPasswordValid) {
        return;
    }
    
    const email = $("#email").val().trim();
    const password = $("#password").val();
    const rememberMe = $("#rememberMe").is(":checked");
    
    const loginBtn = $("#loginBtn");
    const originalText = loginBtn.html();
    
    // Disable button and show spinner
    loginBtn.prop("disabled", true);
    loginBtn.html('<span class="spinner"></span>Logging in...');
    
    // Simulate server authentication delay
    setTimeout(function() {
        const result = validateLogin(email, password);
        
        // Reset button
        loginBtn.prop("disabled", false);
        loginBtn.html(originalText);
        
        if (result.success) {
            // Save login session
            saveLoginSession(result.user, rememberMe);
            
            // Show success modal
            showSuccessModal(result.user.name);
            
            // Redirect to home page after 2 seconds
            setTimeout(function() {
                window.location.href = "index.html";
            }, 2000);
        } else {
            // Show error notification
            showNotification(result.message, false);
            
            // Clear password field
            $("#password").val("");
        }
    }, 1500);
});

// Check for existing session on page load
$(document).ready(function() {
    const existingSession = checkExistingSession();
    
    if (existingSession) {
        // Optional: Auto-redirect if user is already logged in
        // showNotification(`Welcome back, ${existingSession.name}! Redirecting...`, true);
        // setTimeout(() => window.location.href = "index.html", 1500);
        
        // Or just show a message
        console.log("User already logged in:", existingSession.name);
    }
    
    // Check if there are any registered users
    const users = getRegisteredUsers();
    if (users.length === 0) {
        console.log("No registered users found. Users need to sign up first.");
    } else {
        console.log(`${users.length} registered user(s) found in the system.`);
    }
});

// Forgot password functionality (placeholder)
$(".forgot-password").on("click", function(e) {
    e.preventDefault();
    showNotification("Password recovery feature coming soon!", false);
});

// Keyboard accessibility - Enter key on inputs
$("#email, #password").on("keypress", function(e) {
    if (e.which === 13) {
        e.preventDefault();
        $("#loginForm").submit();
    }
});