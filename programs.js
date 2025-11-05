// ===== Accordion behavior =====
const accordionHeaders = document.querySelectorAll(".accordion-question");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    const isActive = header.classList.contains("active");

    // Close all
    document
      .querySelectorAll(".accordion-question")
      .forEach((h) => h.classList.remove("active"));
    document
      .querySelectorAll(".accordion-content")
      .forEach((c) => (c.style.display = "none"));

    // Toggle the clicked one
    if (!isActive) {
      header.classList.add("active");
      content.style.display = "block";
    }
  });
});

// ===== Theme Color Changer =====
const colorButton = document.getElementById("colorButton");

// themes = [header, aside, main, footer, body]
const themes = [
  ["#845763", "#E491A6", "#92E4B4", "#90C67F", "#90C67F"],
  ["", "", "", "", ""],
  ["#FF8DA1", "#FF9CE9", "#FFC2BA", "#AD56C4", "#AD56C4"],
  ["#2E6F40", "#68BA7F", "#CFFFDC", "#253D2C", "#253D2C"],
  ["#272757", "#505081", "#8686AC", "#0F0E47", "#0F0E47"],
  ["#6A89a7", "#88BDF2", "#BDDDFC", "#384959", "#6A89a7"],
  ["#1E3A8A", "#E0E7FF", "#F1F5F9", "#1E293B", "#0F172A"],
  ["#B91C1C", "#FEE2E2", "#FEF2F2", "#7F1D1D", "#450A0A"],
  ["#14532D", "#DCFCE7", "#F0FDF4", "#166534", "#052E16"],
  ["#78350F", "#FEF3C7", "#FFFBEB", "#92400E", "#451A03"],
  ["#312E81", "#E0E7FF", "#EEF2FF", "#3730A3", "#1E1B4B"],
  ["#6A1B9A", "#F3E5F5", "#F8EAF6", "#4A148C", "#12002D"],
];

colorButton.addEventListener("click", () => {
  const theme = themes[Math.floor(Math.random() * themes.length)];

  const [headerColor, asideColor, mainColor, footerColor, bodyColor] = theme;

  document.querySelector("header").style.backgroundColor = headerColor;
  document.querySelector("aside").style.backgroundColor = asideColor;
  document.querySelector("main").style.backgroundColor = mainColor;
  document.querySelector("footer").style.backgroundColor = footerColor;
  document.body.style.backgroundColor = bodyColor;
});

// ===== Current Date & Time =====
function updateDateTime() {
  const now = new Date();

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const formattedDate = now.toLocaleString("en-US", options);
  document.getElementById("dateTime").textContent = formattedDate;
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


// ===== JQuery Search Functionality =====

$(document).ready(function() {
    
    // Program names for autocomplete
    const programNames = [
        "Cardio Training",
        "Strength Training",
        "Yoga & Flexibility",
        "Swimming Pool Program",
        "Martial Arts",
        "HIIT Training",
        "Pilates",
        "CrossFit",
        "Dance Fitness"
    ];

    // Real-time Search and Live Filter
    $('#searchInput').on('keyup', function() {
        const searchTerm = $(this).val().toLowerCase().trim();

        // to remove previous highlights
        removeHighlights();

        if (searchTerm === '') {
            // Show all cards if search is empty
            $('.container').show();
            $('#noResults').hide();
            $('#autocomplete').hide();
            return;
        }

        let visibleCount = 0;

        // to filter cards
        $('.container').filter(function() {
            const programData = $(this).attr('data-program');
            const cardText = $(this).text().toLowerCase();
            const matches = programData.includes(searchTerm) || cardText.includes(searchTerm);
            
            $(this).toggle(matches);
            
            if (matches) {
                visibleCount++;
                // to highlight matching text in visible cards
                highlightText($(this), searchTerm);
            }
            
            return matches;
        });

        // show/hide "no results" message
        if (visibleCount === 0) {
            $('#noResults').show();
        } else {
            $('#noResults').hide();
        }

        // to highlight in FAQ section
        highlightInFAQ(searchTerm);
    });

    // AUTOCOMPLETE SEARCH SUGGESTIONS 
    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().toLowerCase().trim();
        const $autocomplete = $('#autocomplete');

        if (searchTerm === '') {
            $autocomplete.hide();
            return;
        }

        // to filter matching program names
        const matches = programNames.filter(function(program) {
            return program.toLowerCase().includes(searchTerm);
        });

        if (matches.length > 0) {
            // to build autocomplete dropdown
            $autocomplete.empty();
            
            matches.forEach(function(program) {
                const $item = $('<div class="autocomplete-item"></div>').text(program);
                
                // to click handler for autocomplete item
                $item.on('click', function() {
                    $('#searchInput').val(program);
                    $autocomplete.hide();
                    $('#searchInput').trigger('keyup'); // trigger search
                });
                
                $autocomplete.append($item);
            });
            
            $autocomplete.show();
        } else {
            $autocomplete.hide();
        }
    });

    // to hide autocomplete when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.search-container').length) {
            $('#autocomplete').hide();
        }
    });

    // SEARCH HIGHLIGHTING 
    function highlightText($element, searchTerm) {
        // to highlight in h2 and p tags within the card (but not in more-info)
        $element.find('h2, .short-desc').each(function() {
            const $this = $(this);
            let html = $this.html();
            
            //to remove existing highlights first
            html = html.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');
            
            // to create regex for case-insensitive search
            const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
            
            // to wrap matches in highlight span
            html = html.replace(regex, '<span class="highlight">$1</span>');
            
            $this.html(html);
        });
    }

    function highlightInFAQ(searchTerm) {
        $('.accordion-question, .accordion-content p').each(function() {
            const $this = $(this);
            let html = $this.html();
            
            // to remove existing highlights
            html = html.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');
            
            if (searchTerm) {
                const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
                html = html.replace(regex, '<span class="highlight">$1</span>');
            }
            
            $this.html(html);
        });
    }

    function removeHighlights() {
        $('.highlight').each(function() {
            $(this).replaceWith($(this).text());
        });
    }

    // to escape special regex characters
    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    //  LEARN MORE / CLOSE FUNCTIONALITY 
    $('.learn-more-btn').on('click', function() {
        const $card = $(this).closest('.container');
        const $moreInfo = $card.find('.more-info');
        const $learnMoreBtn = $(this);
        const $closeBtn = $card.find('.close-btn');

        // to show more info with animation
        $moreInfo.slideDown(400);
        
        // to hide "Learn More" button and show "Close" button
        $learnMoreBtn.hide();
        $closeBtn.show();
    });

    $('.close-btn').on('click', function() {
        const $card = $(this).closest('.container');
        const $moreInfo = $card.find('.more-info');
        const $learnMoreBtn = $card.find('.learn-more-btn');
        const $closeBtn = $(this);

        // to hide more info with animation
        $moreInfo.slideUp(400);
        
        // tp show "Learn More" button and hide "Close" button
        $closeBtn.hide();
        $learnMoreBtn.show();
    });

});



// === Day/Night Theme Toggle with Local Storage ===
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const notification = document.getElementById("theme-notification");
  const sound = document.getElementById("notif-sound");
  const greetingElement = document.getElementById("greeting");

  // check local storage on page load
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'night') {
    document.body.classList.add("night");
    themeToggle.textContent = "☀️";
    if (greetingElement) {
      greetingElement.classList.add("night");
    }
  } else {
    // Default to day mode
    document.body.classList.remove("night");
    themeToggle.textContent = "🌙";
    if (greetingElement) {
      greetingElement.classList.remove("night");
    }
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
      greetingElement.classList.add("night");
      
      // save to local storage
      localStorage.setItem('theme', 'night');
      
    } else {
      themeToggle.textContent = "🌙";
      showNotification("☀️ Day Mode Activated");
      greetingElement.classList.remove("night");
      
      // save to local storage
      localStorage.setItem('theme', 'day');
    }
  });

});