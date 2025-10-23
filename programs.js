// ===== Accordion behavior =====
const accordionHeaders = document.querySelectorAll('.accordion-question');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains('active');

    // Close all
    document.querySelectorAll('.accordion-question').forEach(h => h.classList.remove('active'));
    document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');

    // Toggle the clicked one
    if (!isActive) {
      header.classList.add('active');
      content.style.display = 'block';
    }
  });
});


// ===== Theme Color Changer =====
const colorButton = document.getElementById('colorButton');

// themes = [header, aside, main, footer, body]
const themes = [
  ['#845763','#E491A6','#92E4B4','#90C67F','#90C67F'], 
  ['','','','',''],
  ['#FF8DA1','#FF9CE9','#FFC2BA','#AD56C4','#AD56C4'],
  ['#2E6F40','#68BA7F','#CFFFDC','#253D2C','#253D2C'],
  ['#272757', '#505081', '#8686AC', '#0F0E47', '#0F0E47'],
  ['#6A89a7', '#88BDF2', '#BDDDFC', '#384959','#6A89a7'],
  ['#1E3A8A', '#E0E7FF', '#F1F5F9', '#1E293B', '#0F172A'], 
  ['#B91C1C', '#FEE2E2', '#FEF2F2', '#7F1D1D', '#450A0A'], 
  ['#14532D', '#DCFCE7', '#F0FDF4', '#166534', '#052E16'], 
  ['#78350F', '#FEF3C7', '#FFFBEB', '#92400E', '#451A03'], 
  ['#312E81', '#E0E7FF', '#EEF2FF', '#3730A3', '#1E1B4B'], 
  ['#6A1B9A', '#F3E5F5', '#F8EAF6', '#4A148C', '#12002D']  
];

colorButton.addEventListener('click', () => {
  const theme = themes[Math.floor(Math.random() * themes.length)];

  const [headerColor, asideColor, mainColor, footerColor, bodyColor] = theme;

  document.querySelector('header').style.backgroundColor = headerColor;
  document.querySelector('aside').style.backgroundColor = asideColor;
  document.querySelector('main').style.backgroundColor = mainColor;
  document.querySelector('footer').style.backgroundColor = footerColor;
  document.body.style.backgroundColor = bodyColor;
});


// ===== Current Date & Time =====
function updateDateTime() {
  const now = new Date();

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const formattedDate = now.toLocaleString('en-US', options);
  document.getElementById('dateTime').textContent = formattedDate;
}

// update once immediately, then every second
updateDateTime();
setInterval(updateDateTime, 1000);



// ===== Greeting Message =====
document.addEventListener("DOMContentLoaded", () => {
  function displayGreeting() {
    const now = new Date();
    const hour = now.getHours(); // 0–23
    let greeting = "";

    if (hour >= 5 && hour < 12) {
      greeting = "🌞 Good morning!";
    } else if (hour >= 12 && hour < 18) {
      greeting = "🌤️ Good afternoon!";
    } else {
      greeting = "🌙 Good evening!";
    }

    document.getElementById("greeting").textContent = greeting;
  }

  displayGreeting();
});
