document.addEventListener("DOMContentLoaded", function () {
    fetch('projects.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('projects-content').innerHTML = data;

            // Now initialize the slider after content loads
            setTimeout(initializeSlider, 500);
        })
        .catch(error => console.error('Error loading projects:', error));
});

function initializeSlider() {
    const slider = document.querySelector("#projects-content");
    const slides = document.querySelectorAll(".slider-item");
    const prevButton = document.querySelector(".slider-nav.prev");
    const nextButton = document.querySelector(".slider-nav.next");

    if (!slider || slides.length === 0) {
        console.error("Slider elements not found!");
        console.log("Slider:", slider);
        console.log("Slides found:", slides.length);
        return;
    }

    let currentIndex = 0;
    let slideInterval;
    let slidesPerView = 3; // Default for desktop
    
    // Check if mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    function updateSlidesPerView() {
        slidesPerView = isMobile() ? 1 : 3;
    }
    
    // Set initial slider styles
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.width = `${slides.length * 100}%`;
    
    function updateSlideStyles() {
        updateSlidesPerView();
        slides.forEach(slide => {
            slide.style.minWidth = `${100 / slidesPerView}%`;
            slide.style.flex = '0 0 auto';
        });
    }
    
    updateSlideStyles();

    function updateSlider() {
        updateSlidesPerView();
        const slideWidth = slider.offsetWidth / slidesPerView;
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to start
        }
        updateSlider();
    }

    function prevSlide() {
        const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex; // Loop to end
        }
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    // Event listeners for buttons
    if (nextButton) {
        nextButton.addEventListener("click", function () {
            nextSlide();
            resetAutoSlide();
        });
    }

    if (prevButton) {
        prevButton.addEventListener("click", function () {
            prevSlide();
            resetAutoSlide();
        });
    }

    // Initialize slider position and start auto-slide
    updateSlider();
    startAutoSlide();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        updateSlideStyles();
        updateSlider();
    });
}



