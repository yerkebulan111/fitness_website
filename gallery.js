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