// Task 0 
$(document).ready(function(){
    console.log("jQuery is ready!");
  });
  
  

  
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
    e.preventDefault(); 

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    
    function showSuccessMessage() {
        document.getElementById('successMessage').style.display = 'block';  // block занимает всю ширину контейнера
    }




    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    .then(response => response.json())                       // Когда сервер ответит, эта строка превращает ответ в объект JavaScript.
    .then(data => {
        console.log('Server response:', data);
        showSuccessMessage(); 
        document.getElementById('contactForm').reset(); 
    })
    .catch(error => console.error('Error:', error));
});

    

// 7 assignment 

$(document).ready(function () {
    $('#copyPhone').on('click', function () {
      const phoneText = $('#clubPhone').text().trim();
      navigator.clipboard.writeText(phoneText);
  
      const btn = $(this);
      btn.text('✔ Copied!');
      setTimeout(() => btn.text('Copy'), 2000);
    });
  
    $('#copyEmail').on('click', function () {
      const emailText = $('#clubEmail').text().trim();
      navigator.clipboard.writeText(emailText);
  
      const btn = $(this);
      btn.text('✔ Copied!');
      setTimeout(() => btn.text('Copy'), 2000);
    });
  });



  // -------------------------
// ✅ Notification System
// -------------------------
function showNotification(message) {
    // Создаём элемент уведомления
    const notification = $('<div class="toast-message"></div>').text(message);
  
    // Добавляем в body
    $('body').append(notification);
  
    // Показываем с анимацией
    notification.fadeIn(400);
  
    // Исчезает через 3 секунды
    setTimeout(() => {
      notification.fadeOut(800, function() {
        $(this).remove();
      });
    }, 3000);
  }
  

  $('#contactForm').on('submit', function(e) {
    e.preventDefault();
    showNotification('✅ Message sent successfully!');
  });
  
  



