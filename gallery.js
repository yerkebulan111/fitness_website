$(document).ready(function() {
    
    let counterAnimated = false; // to ensure animation runs only once

    // Check if stats section is in viewport
    function isInViewport($element) {
        const elementTop = $element.offset().top;
        const elementBottom = elementTop + $element.outerHeight();
        const viewportTop = $(window).scrollTop();
        const viewportBottom = viewportTop + $(window).height();
        
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }

    // Animate counter
    function animateCounter($counter, target) {
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;

        const timer = setInterval(function() {
            current += increment;
            
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Format number with commas
            $counter.text(Math.floor(current).toLocaleString());
        }, 16);
    }

    // trigger animation when stats section is visible
    function checkAndAnimate() {
        const $statsSection = $('.stats-section');
        
        if (!counterAnimated && isInViewport($statsSection)) {
            counterAnimated = true; // tp prevent re-animation
            
            // to animate each counter
            $('.stat-number').each(function() {
                const $this = $(this);
                const target = parseInt($this.attr('data-target'));
                animateCounter($this, target);
            });
        }
    }

    // to check on scroll
    $(window).on('scroll', function() {
        checkAndAnimate();
    });

    // to check on page load
    checkAndAnimate();

});


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

//   // toggle theme on button click
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