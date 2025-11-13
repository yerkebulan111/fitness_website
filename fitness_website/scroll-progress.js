// Scroll Progress Bar functionality
$(document).ready(function () {
  // Update progress bar on scroll
  $(window).on("scroll", function () {
    updateProgressBar();
  });

  // Update progress bar on page load
  updateProgressBar();

  function updateProgressBar() {
    // Get scroll position
    const scrollTop = $(window).scrollTop();

    // Get total scrollable height
    const docHeight = $(document).height();
    const windowHeight = $(window).height();
    const scrollableHeight = docHeight - windowHeight;

    // Calculate percentage
    const scrollPercentage = (scrollTop / scrollableHeight) * 100;

    // Update progress bar width
    $("#scroll-progress-bar").css("width", scrollPercentage + "%");
  }
});
