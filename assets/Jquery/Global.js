// Header Effect 
$(document).ready(function() {
    gsap.registerPlugin(ScrollTrigger);

    const header = $(".main-header");

    // Check if device is mobile (width <= 767px)
    const isMobile = window.innerWidth <= 767;
    const isTablet = window.innerWidth > 767 && window.innerWidth <= 1100;

    if (!isMobile && !isTablet) {
        // Set initial styles (for desktop only)
        gsap.set(header, {
            position: "absolute",
            top: "10%",
            left: "50%",
            xPercent: -50,
            width: "52%",
            borderRadius: "16px",
            padding: "14px 26px",
            background: "var(--header-bg)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.12)"
        });

        // Smooth transition as user scrolls 0 → 200px
        gsap.to(header, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "40 top",
                scrub: 1.5,
            },
            top: 0,
            position: "fixed",
            width: "100%",
            borderRadius: "0 0 20px 20px",
            padding: "18px 60px",
            background: "linear-gradient(to bottom, var(--header-bg) 0%, #0B9444 155%)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            ease: "power3.inOut"
        });
    } else if (isTablet) {
        // For tablet, allow it to stay fixed
        gsap.to(header, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "40 top",
                scrub: 1.5,
            },
            top: 0,
            position: "fixed",
            width: "100%",
            borderRadius: "0 0 20px 20px",
            padding: "14px 40px",
            background: "linear-gradient(to bottom, var(--header-bg) 0%, #0B9444 155%)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
            ease: "power3.inOut"
        });
    } else {
        // For mobile, make it sticky but simpler
        gsap.to(header, {
            scrollTrigger: {
                trigger: document.body,
                start: "top top",
                end: "40 top",
                scrub: 1.5,
            },
            position: "fixed",
            top: 0,
            width: "100%",
            borderRadius: "0",
            padding: "12px 20px",
            background: "var(--header-bg)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
            ease: "power3.inOut"
        });
    }
});

// Mobile header toggle
const mobileToggle = document.querySelector('.mobile-menu-toggle');
const header = document.querySelector('.main-header');

if (mobileToggle && header) {
    mobileToggle.addEventListener('click', () => {
        header.classList.toggle('nav-open');
        // Animate the hamburger into an X
        mobileToggle.classList.toggle('open');
    });
}