// Keyboard Navigation for Menu
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('main-nav');
  const menuItems = nav.querySelectorAll('a');
  let currentIndex = -1;

  // Make menu items focusable
  menuItems.forEach((item, index) => {
    item.setAttribute('tabindex', index === 0 ? '0' : '-1');
  });

  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only handle arrow keys when focus is on menu or no specific element is focused
    const activeElement = document.activeElement;
    const isMenuFocused = Array.from(menuItems).includes(activeElement);
    
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      
      if (currentIndex === -1 || !isMenuFocused) {
        // Start navigation from first item
        currentIndex = 0;
      } else {
        // Move to next item
        currentIndex = (currentIndex + 1) % menuItems.length;
      }
      
      focusMenuItem(currentIndex);
    } 
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      
      if (currentIndex === -1 || !isMenuFocused) {
        // Start navigation from last item
        currentIndex = menuItems.length - 1;
      } else {
        // Move to previous item
        currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
      }
      
      focusMenuItem(currentIndex);
    }
    else if (e.key === 'Enter' && isMenuFocused) {
      // Allow Enter key to follow the link
      e.preventDefault();
      menuItems[currentIndex].click();
    }
    else if (e.key === 'Escape' && isMenuFocused) {
      // Remove focus from menu
      menuItems[currentIndex].blur();
      currentIndex = -1;
    }
  });

  // Track current index when clicking on menu items
  menuItems.forEach((item, index) => {
    item.addEventListener('focus', () => {
      currentIndex = index;
    });

    item.addEventListener('click', () => {
      currentIndex = index;
    });
  });

  // Function to focus a menu item
  function focusMenuItem(index) {
    // Remove tabindex from all items
    menuItems.forEach(item => {
      item.setAttribute('tabindex', '-1');
    });
    
    // Set tabindex and focus on current item
    menuItems[index].setAttribute('tabindex', '0');
    menuItems[index].focus();
    
    // Add visual indication (optional - add CSS for this)
    menuItems.forEach(item => item.classList.remove('keyboard-focus'));
    menuItems[index].classList.add('keyboard-focus');
  }
});