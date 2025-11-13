// === Star Rating ===
document.addEventListener("DOMContentLoaded", () => {
  const starRatings = document.querySelectorAll('.star-rating');

  starRatings.forEach(rating => {
    const stars = rating.querySelectorAll('i');
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.getAttribute('data-value'));
        stars.forEach((s, index) => {
          if (index < value) {
            s.classList.add('active');
            s.classList.remove('fa-regular');
            s.classList.add('fa-solid');
          } else {
            s.classList.remove('active');
            s.classList.remove('fa-solid');
            s.classList.add('fa-regular');
          }
        });
      });
    });
  });
});


// // === Day/Night Theme Toggle ===
// document.addEventListener("DOMContentLoaded", () => {
//   const themeToggle = document.getElementById("theme-toggle");

//   themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("night");

//     // change icon
//     if (document.body.classList.contains("night")) {
//       themeToggle.textContent = "☀️";
//     } else {
//       themeToggle.textContent = "🌙";
//     }
//   });
// });


// === Day/Night Theme Toggle with Local Storage ===
// document.addEventListener("DOMContentLoaded", () => {
//   const themeToggle = document.getElementById("theme-toggle");
//   const notification = document.getElementById("theme-notification");
//   const sound = document.getElementById("notif-sound");

//   // check local storage on page load
//   const savedTheme = localStorage.getItem('theme');
  
//   if (savedTheme === 'night') {
//     document.body.classList.add("night");
//     themeToggle.textContent = "☀️";
//   } else {
//     // Default to day mode
//     document.body.classList.remove("night");
//     themeToggle.textContent = "🌙";
//   }

//   // function to show popup notification
//   function showNotification(message) {
//     notification.textContent = message;
//     notification.classList.add("show");
//     sound.currentTime = 0; // restart sound
//     sound.play().catch(() => {}); // ignore autoplay errors
//     setTimeout(() => {
//       notification.classList.remove("show");
//     }, 2000);
//   }

//   //  toggle theme on button click 
//   themeToggle.addEventListener("click", () => {
//     document.body.classList.toggle("night");

//     if (document.body.classList.contains("night")) {
//       themeToggle.textContent = "☀️";
//       showNotification("🌙 Night Mode Activated");
      
//       // save to local storage
//       localStorage.setItem('theme', 'night');
      
//     } else {
//       themeToggle.textContent = "🌙";
//       showNotification("☀️ Day Mode Activated");
      
//       // save to local storage
//       localStorage.setItem('theme', 'day');
//     }
//   });
// });



// === Trainer Learn More/Close Toggle ===
document.querySelectorAll('.trainer-card button').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.trainer-card');
    const info = card.querySelector('.trainer-more-info');

    if (info.style.display === 'block') {
      info.style.display = 'none';
      button.textContent = 'Learn More';
    } else {
      info.style.display = 'block';
      button.textContent = 'Close';
    }
  });
});


// === Show Current Time ===
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("showTimeBtn");
  const timeDisplay = document.getElementById("currentTime");
  let intervalId = null;

  toggleBtn.addEventListener("click", function () {
    if (intervalId === null) {
      // Show and start updating the time
      timeDisplay.style.display = "inline-block";
      toggleBtn.textContent = "Close";
      updateTime();
      intervalId = setInterval(updateTime, 1000);
    } else {
      // Stop and hide the time
      clearInterval(intervalId);
      intervalId = null;
      timeDisplay.style.display = "none";
      toggleBtn.textContent = "Show Current Time";
    }
  });

  function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
  }
});



