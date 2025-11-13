$(document).ready(function () {
  // Animated Number Counter
  let counterAnimated = false;

  function animateCounter() {
    $(".stat-number").each(function () {
      const $this = $(this);
      const target = parseInt($this.attr("data-target"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          $this.text(target.toLocaleString() + (target === 98 ? "" : "+"));
          clearInterval(timer);
        } else {
          $this.text(Math.floor(current).toLocaleString());
        }
      }, 16);
    });
  }

  // Trigger counter animation when stats section comes into view
  $(window).on("scroll", function () {
    const statsOffset = $(".stats-section").offset().top;
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (!counterAnimated && scrollTop + windowHeight > statsOffset + 100) {
      counterAnimated = true;
      animateCounter();
    }

    // Lazy loading images
    $(".lazy-image").each(function () {
      const $img = $(this);
      const imgOffset = $img.offset().top;

      if (scrollTop + windowHeight > imgOffset) {
        const src = $img.attr("data-src");
        if (src && !$img.attr("src")) {
          $img.attr("src", src);
          $img.on("load", function () {
            $img.removeClass("lazy-image");
          });
        }
      }
    });
  });

  // Trigger scroll event on page load to load images in viewport
  $(window).trigger("scroll");

  // Smooth scrolling for navigation links
  $(".nav-links a").on("click", function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    if (target !== "#") {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top - 70,
        },
        800
      );
    }
  });
});
