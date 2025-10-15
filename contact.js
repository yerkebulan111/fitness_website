document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    document.querySelectorAll(".error").forEach(e => e.remove());

    let formValid = true; 

    if (name === "") {
        showError("write your name");
        formValid = false;
    }

    if (email === "") {
        showError("add your email");
        formValid = false;
    }
    else if (!emailPattern.test(email)) {
        showError("Invalid email format");
        formValid = false;
    }

    if (message === "") {
        showError("Message cannot be empty");
        formValid = false;
    }

    if (formValid) {
        alert("Message sent successfully");
        document.querySelector("form").reset();
    }
});


function showError(text) {
    let p = document.createElement("p");
    p.textContent = text;
    p.classList.add("error");
    p.style.color = "red";
    document.querySelector("form").appendChild(p);
}
    