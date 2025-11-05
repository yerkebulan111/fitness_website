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
          /*alert("Message sent successfully");*/
          document.querySelector("form").reset();
      }
  });
  






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
  
  



// === Day/Night Theme Toggle with Local Storage ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const notification = document.getElementById("theme-notification");
  const sound = document.getElementById("notif-sound");

  // check local storage on page load
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'night') {
    document.body.classList.add("night");
    themeToggle.textContent = "☀️";
  } else {
    // Default to day mode
    document.body.classList.remove("night");
    themeToggle.textContent = "🌙";
  }

  // function to show popup notification
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add("show");
    sound.currentTime = 0; // restart sound
    sound.play().catch(() => {}); // ignore autoplay errors
    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  // toggle theme on button click
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("night");

    if (document.body.classList.contains("night")) {
      themeToggle.textContent = "☀️";
      showNotification("🌙 Night Mode Activated");
      
      // save to local storage
      localStorage.setItem('theme', 'night');
      
    } else {
      themeToggle.textContent = "🌙";
      showNotification("☀️ Day Mode Activated");
      
      // save to local storage
      localStorage.setItem('theme', 'day');
    }
  });
});