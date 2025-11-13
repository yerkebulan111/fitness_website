const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("main-nav");
const navLinks = mainNav.querySelectorAll("a");

// Toggle menu on hamburger click
menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mainNav.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
    menuToggle.classList.remove("active");
    mainNav.classList.remove("active");
  }
});
