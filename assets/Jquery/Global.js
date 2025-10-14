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