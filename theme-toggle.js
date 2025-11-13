// theme-toggle.js - Complete theme toggle with localStorage persistence

(function() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const body = document.body;
  
  // Check for saved theme preference or default to 'day'
  const savedTheme = localStorage.getItem('theme');
  
  // Apply saved theme immediately on page load (before page renders)
  if (savedTheme === 'night') {
    body.classList.add('night');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = '☀️';
    }
  } else {
    body.classList.remove('night');
    if (themeToggleBtn) {
      themeToggleBtn.textContent = '🌙';
    }
  }
  
  // Toggle theme on button click
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      body.classList.toggle('night');
      
      if (body.classList.contains('night')) {
        // Switch to night mode
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'night');
        showNotification('Night mode activated 🌙');
        playSound();
      } else {
        // Switch to day mode
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'day');
        showNotification('Day mode activated ☀️');
        playSound();
      }
    });
  }
  
  // Show notification function
  function showNotification(message) {
    let notification = document.getElementById('theme-notification');
    
    if (!notification) {
      // Create notification element if it doesn't exist
      notification = document.createElement('div');
      notification.id = 'theme-notification';
      notification.className = 'theme-notification';
      document.body.appendChild(notification);
    }
    
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 2000);
  }
  
  // Play notification sound (optional)
  function playSound() {
    const sound = document.getElementById('notif-sound');
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(e => console.log('Sound play failed:', e));
    }
  }
})();