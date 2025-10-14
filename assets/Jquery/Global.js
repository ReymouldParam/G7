// Header Effect 
$(document).ready(function () {
    const header = $(".main-header");
    const stickOffset = 50;
    // Distance From Top before header sticks

    $(window).on("scroll", function () {
        if ($(window).scrollTop() > stickOffset) {
            header.addClass("sticky");
        } else {
            header.removeClass("sticky");
        }
    });
});

// Mobile header 
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const header = document.querySelector('.main-header');

mobileToggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');

    // Animate the hamburger into an X
    mobileToggle.classList.toggle('open');
});
