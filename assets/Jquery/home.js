// ********************* Home Page's Banner Section Animation ***********
$(function () {
    const phrases = [
        "Income Tax",
        "Goods and Services Tax",
        "Business Advisory and CFO Services",
        "Due Diligence and Valuation Services",
        "Financial Reporting Advisory",
        "Secretarial and Business Setup Services"
    ];
    let idx = 0;
    const $span = $(".clarity-animated");
    const $circle = $(".banner-circular-bg");
    const duration = 5000; // 5 seconds per phrase

    function nextText() {
        // Reset text animation
        $span.css({ animation: 'none', opacity: 0 }).text(phrases[idx]);
        void $span[0].offsetWidth;
        $span.css({
            animation: `claritySlide ${duration}ms cubic-bezier(.71,0,.18,1) forwards`
        });

        // Trigger one smooth rotation each time text changes
        $circle
            .css({ animation: 'none' }) // reset animation
            .outerWidth(); // force reflow
        $circle.css({
            animation: `rotate-circular-bg 3.5s ease-in-out forwards`
        });

        idx = (idx + 1) % phrases.length;
        setTimeout(nextText, duration);
    }

    nextText();
});


// ****************************** Home Page Services Functionality 
$(document).ready(function () {
    const serviceData = {
        income: {
            img: "assets/IMAGES/Services-Container-img1.png",
            text: "Comprehensive tax planning and compliance to optimize your financial outcomes"
        },
        goods: {
            img: "assets/IMAGES/Service-Container-img2.png",
            text: "End-to-end GST registration, filing, and advisory for seamless compliance"
        },
        business: {
            img: "assets/IMAGES/Service-Container-img3.png",
            text: "Strategic financial guidance to strengthen operations and drive growth"
        },
        diligence: {
            img: "assets/IMAGES/financial-service.jpg",
            text: "Accurate financial assessments to support informed investments and decisions"
        },
        fund: {
            img: "assets/IMAGES/Service-Container-img4.png",
            text: "Expert support to ensure accurate, compliant, and timely financial statements"
        },
        secreterial: {
            img: "assets/IMAGES/secreterial-img.jpg",
            text: "Hassle-free company formation and regulatory compliance management"
        },

    };

    let services = $(".service-box");
    let current = 0;
    let autoPlayInterval;
    let autoPlayDelay = 4000; // 4 seconds

    function showService(index) {
        let box = services.eq(index);
        let key = box.data("service");
        let content = serviceData[key];

        services.removeClass("active");
        box.addClass("active");

        let newContent = $(`
      <div class="service-content">
        <img src="${content.img}" alt="${key}" />
        <p>${content.text}</p>
      </div>
    `);

        $(".services-image .service-content.active")
            .removeClass("active")
            .fadeOut(300, function () {
                $(this).remove();
                $(".services-image").append(newContent);
                setTimeout(() => {
                    newContent.addClass("active");
                }, 50);
            });
    }

    // Manual Click
    services.click(function () {
        current = $(this).index();
        showService(current);
        resetAutoPlay();
    });

    // Auto Play Logic
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            current = (current + 1) % services.length;
            showService(current);
        }, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    startAutoPlay(); // Start automatically
});

// ***************************** Services Page Functionality
$(document).ready(function () {
    const serviceSections = $(".premium-card");
    const serviceTabs = $(".premium-tab");
    const rotateDelay = 4000; // 4 seconds
    let currentIndex = 0;
    let autoRotate;

    // Show all cards by default
    serviceSections.show();

    // Show a section and highlight its tab
    function showService(section) {
        serviceSections.hide();
        section.fadeIn(600);
        const sectionTitle = section.find("h3").text().trim();

        serviceTabs.removeClass("active");
        serviceTabs.each(function () {
            if (sectionTitle.includes($(this).text().trim())) {
                $(this).addClass("active");
            }
        });
    }

    // Get currently visible sections for rotation
    function getVisibleSections() {
        return serviceSections.filter(":visible");
    }

    // Auto-rotate through visible sections
    function rotateServices() {
        const visibleSections = getVisibleSections();
        if (visibleSections.length <= 1) return;
        currentIndex = (currentIndex + 1) % visibleSections.length;
        showService(visibleSections.eq(currentIndex));
    }

    function startRotation() {
        stopRotation();
        autoRotate = setInterval(rotateServices, rotateDelay);
    }

    function stopRotation() {
        clearInterval(autoRotate);
    }

    // Tab click functionality
    serviceTabs.click(function () {
        const tabText = $(this).text().trim();
        if (tabText === "All Services") {
            // Show all sections
            serviceSections.fadeIn(600);
            currentIndex = 0;
            startRotation(); // Resume rotation
        } else {
            // Show only selected section
            serviceSections.each(function () {
                const sectionTitle = $(this).find("h3").text().trim();
                if (sectionTitle.includes(tabText)) {
                    $(this).fadeIn(600);
                    currentIndex = 0; // Reset rotation index
                } else {
                    $(this).fadeOut(600);
                }
            });
            stopRotation(); // Pause rotation when filtered
        }
        // Highlight clicked tab
        serviceTabs.removeClass("active");
        $(this).addClass("active");
    });

    // Pause rotation on hover
    $(".premium-card, .premium-tab").hover(stopRotation, startRotation);

    // Start rotation for all sections by default
    startRotation();
});


// ABOUT US SECTION  COUNTER  
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".count");
    const speed = 200; // Smaller = faster animation

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute("data-target");
            const updateCount = () => {
                const current = +counter.innerText;
                const increment = Math.ceil(target / speed);
                if (current < target) {
                    counter.innerText = current + increment;
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Run animation only when the section is visible
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // run only once
            }
        });
    }, { threshold: 0.4 });

    const storySection = document.querySelector("#our-story");
    observer.observe(storySection);
});


// Live Counter For Character 
const messageField = document.querySelector('textarea[name="message"]');
const charCount = document.getElementById('charCount');
const maxLength = messageField.getAttribute('maxlength');

messageField.addEventListener('input', () => {
    const currentLength = messageField.value.length;
    charCount.textContent = `${currentLength} / ${maxLength}`;

    // Optional: warn when near limit
    if (currentLength > maxLength * 0.9) {
        charCount.style.color = "#d9534f"; // red when near limit
    } else {
        charCount.style.color = "#666"; // default color
    }
});
