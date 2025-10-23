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




// fetch/Post
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Не обновлять страницу

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    
    function showSuccessMessage() {
        document.getElementById('successMessage').style.display = 'block';
    }

    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data);
        showSuccessMessage(); 
        document.getElementById('contactForm').reset(); 
    })
    .catch(error => console.error('Error:', error));
});

    