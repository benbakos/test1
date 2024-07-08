/**
 * Handles navigating to the next slide in Swiper containers within the active tab.
 */
function handleSwiperNavigation() {
    $('.cmp-tabs__tabpanel--active .swiper-container').each(function (i, el) {
        var name = el.className.match(/swiper-container_\d+/);
        if (name && name.length > 0 && name[0] && document.querySelector('.' + name[0])) {
            var mySwiper = document.querySelector('.' + name[0]).swiper;
            mySwiper.slideNext();
        }
    });
}

/**
 * Handles clicking the next button in carousels within the active tab.
 */
function handleCarouselNavigation() {
    $('.cmp-tabs__tabpanel--active .cmp-carousel__action--next').click();
}

/**
 * Handles navigation when no tabs are present on the page.
 */
function handleNoTabNavigation() {
    if (document.querySelector(".swiper-container")) {
        var mySwiper = document.querySelector('.swiper-container').swiper;
        mySwiper.slideNext();
    } else {
        $('.cmp-carousel__action--next').click();
    }
}

/**
 * Click event handler for elements with the 'pulse' class.
 * @param {Event} e - The event object.
 */
function handlePulseClick(e) {
    e.preventDefault();
    var tabs = $(".cmp-tabs__tab");

    if (tabs.length > 0) {
        if ($('.cmp-tabs__tabpanel--active .swiper-container').length > 0) {
            handleSwiperNavigation();
        } else {
            handleCarouselNavigation();
        }
    } else {
        handleNoTabNavigation();
    }
}

/**
 * Adjusts the position of pulse elements by modifying their `top` and `left` CSS properties.
 */
function adjustPulseElementsPosition() {
    var pulseElements = document.querySelectorAll('.pulse-position .pulseIcon button');

    for (var i = 0; i < pulseElements.length; i++) {
        var element = pulseElements[i];
        var top = parseFloat(element.style.top);
        var left = parseFloat(element.style.left);
        element.style.top = (top + 0.165) + '%';
        element.style.left = (left + 0.15) + '%';
    }
}

/**
 * Adds a CSS rule to remove borders from pulse elements after a 4-second delay.
 */
function addCSSRuleAfterDelay() {
    setTimeout(function () {
        $('head').append('<style>.pulse:before{border:none !important}</style>');
    }, 4000);
}

/**
 * Document ready handler. Sets up event handlers and initial adjustments.
 */
$(document).ready(function () {
    // Attach click event handler to pulse elements
    $('.pulse').click(handlePulseClick);

    // Adjust positions of pulse elements
    adjustPulseElementsPosition();

    // Add CSS rule after a delay
    addCSSRuleAfterDelay();
});
