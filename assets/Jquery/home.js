// ********************* Home Page's Banner Section Animation ***********
$(function () {
    const phrases = [
        "Business Clarity",
        "Financial Clarity",
        "Career Clarity",
        "Growth Clarity"
    ];
    let idx = 0;
    const $span = $(".clarity-animated");
    const duration = 5000; // 5 seconds: smooth, professional

    function nextText() {
        $span.css({ animation: 'none', opacity: 0 }).text(phrases[idx]);
        void $span[0].offsetWidth;
        $span.css({
            animation: `claritySlide ${duration}ms cubic-bezier(.71,0,.18,1) forwards`
        });
        idx = (idx + 1) % phrases.length;
        setTimeout(nextText, duration);
    }
    nextText();
});

// ****************************** Home Page Services Functionality 
$(document).ready(function () {
    const serviceData = {
        Cfo: {
            img: "assets/IMAGES/Services-Container-img1.png",
            text: "The CFO oversees financial planning, maintains reports, and manages financial risks."
        },
        Bussiness: {
            img: "assets/IMAGES/Service-Container-img2.png",
            text: "Our support services streamline your business operations for productivity and scalability."
        },
        Entity: {
            img: "assets/IMAGES/Service-Container-img3.png",
            text: "We help organizations restructure efficiently for optimized performance and compliance."
        },
        Fund: {
            img: "assets/IMAGES/Service-Container-img4.png",
            text: "We help organizations restructure efficiently for optimized performance and compliance."
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
    const serviceSections = $(".service-section");
    const serviceTabs = $(".service-tab");
    const rotateDelay = 6000; // 6 seconds
    let currentIndex = 0;
    let autoRotate;

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

    // Get visible sections for rotation
    function getVisibleSections() {
        return serviceSections.filter(":visible");
    }

    // Auto-rotate through visible sections
    function rotateServices() {
        const visibleSections = getVisibleSections();
        if (visibleSections.length <= 1) return; // No rotation if only one visible

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
            startRotation(); // Resume rotation through all
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
    $(".service-section, .service-tab").hover(stopRotation, startRotation);

    // Initialize: show first section and start rotation
    showService(serviceSections.eq(currentIndex));
    startRotation();
});

