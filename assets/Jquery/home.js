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

// ****************************** Home Page Services Page Aniamtion 
$(document).ready(function () {
    const serviceData = {
        Cfo: {
            img: "https://via.placeholder.com/500x300?text=Virtual+CFO",
            text: "The CFO oversees financial planning, maintains reports, and manages financial risks."
        },
        Bussiness: {
            img: "https://via.placeholder.com/500x300?text=Business+Support",
            text: "Our support services streamline your business operations for productivity and scalability."
        },
        Entity: {
            img: "https://via.placeholder.com/500x300?text=Entity+Restructuring",
            text: "We help organizations restructure efficiently for optimized performance and compliance."
        },
        Fund: {
            img: "https://via.placeholder.com/500x300?text=Entity+Restructuring",
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