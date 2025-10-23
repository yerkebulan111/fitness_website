document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("main-nav");
  if (!nav) return;


  nav.setAttribute("role", "navigation");

  
  const links = Array.from(nav.querySelectorAll("ul > li > a"));

  if (!links.length) {
    console.warn("⚠️ No nav links found!");
    return;
  }

  
  links.forEach((link, i) => {
    link.setAttribute("role", "menuitem");
    link.tabIndex = i === 0 ? 0 : -1;
  });

  
  function focusIndex(newIndex) {
    const idx = ((newIndex % links.length) + links.length) % links.length; 
    links.forEach((l, i) => (l.tabIndex = i === idx ? 0 : -1));
    links[idx].focus();
  }

  nav.addEventListener("keydown", (event) => {
    const active = document.activeElement;
    const currentIndex = links.indexOf(active);

    if (currentIndex === -1) return;

    
    const key = event.key;

    if (key === "ArrowRight" || key === "ArrowDown") {
      event.preventDefault();
      focusIndex(currentIndex + 1);
    } else if (key === "ArrowLeft" || key === "ArrowUp") {
      event.preventDefault();
      focusIndex(currentIndex - 1);
    } else if (key === "Enter" || key === " " || key === "Spacebar") {
      
      event.preventDefault();
      active.click();
    }
  });

  nav.addEventListener("focusin", (e) => {
    const active = document.activeElement;
    const idx = links.indexOf(active);
    if (idx === -1) {
      // If focus goes into nav but not on a link (rare), put focus to first link
      focusIndex(0);
    } else {
      // ensure the roving tabindex is in sync in case something else changed it
      links.forEach((l, i) => (l.tabIndex = i === idx ? 0 : -1));
    }
  });
});
