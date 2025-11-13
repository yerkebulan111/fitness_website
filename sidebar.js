$(document).ready(function () {
  let sidebarOpen = false;

  // Ensure sidebar starts closed
  $("#sidebar").removeClass("active");
  $("#sidebarToggle").removeClass("active");
  $("main").removeClass("shifted");
  $("#sidebarOverlay").removeClass("active");

  // Toggle sidebar function
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;

    $("#sidebar").toggleClass("active");
    $("#sidebarToggle").toggleClass("active");
    $("main").toggleClass("shifted");
    $("#sidebarOverlay").toggleClass("active");

    // Change icon
    if (sidebarOpen) {
      $("#sidebarToggle i")
        .removeClass("fa-chevron-right")
        .addClass("fa-chevron-left");
    } else {
      $("#sidebarToggle i")
        .removeClass("fa-chevron-left")
        .addClass("fa-chevron-right");
    }
  }

  // Toggle button click
  $("#sidebarToggle").on("click", function () {
    toggleSidebar();
  });

  // Overlay click (close sidebar)
  $("#sidebarOverlay").on("click", function () {
    if (sidebarOpen) {
      toggleSidebar();
    }
  });

  // Sidebar menu active state
  $(".sidebar-menu a").on("click", function () {
    $(".sidebar-menu a").removeClass("active");
    $(this).addClass("active");

    // Close sidebar on mobile when clicking a link
    if ($(window).width() <= 768) {
      toggleSidebar();
    }
  });

  // Smooth scrolling for anchor links
  $('.sidebar-menu a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    const headerHeight = $("header").outerHeight();

    $("html, body").animate(
      {
        scrollTop: $(target).offset().top - headerHeight,
      },
      800
    );
  });

  // Auto-highlight active section while scrolling
  $(window).on("scroll", function () {
    const scrollPos = $(window).scrollTop() + 150;

    $(".sidebar-menu a").each(function () {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));

      if (
        refElement.length &&
        refElement.position().top <= scrollPos &&
        refElement.position().top + refElement.height() > scrollPos
      ) {
        $(".sidebar-menu a").removeClass("active");
        currLink.addClass("active");
      }
    });
  });
});