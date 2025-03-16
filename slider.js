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
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slider-item");
    const prevButton = document.querySelector(".slider-nav.prev");
    const nextButton = document.querySelector(".slider-nav.next");

    if (!slider || slides.length === 0) {
        console.error("Slider elements not found!");
        return;
    }

    let currentIndex = 0;
    let slideInterval;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth;
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(slideInterval);
        startAutoSlide();
    }

    nextButton.addEventListener("click", function () {
        nextSlide();
        resetAutoSlide();
    });

    prevButton.addEventListener("click", function () {
        prevSlide();
        resetAutoSlide();
    });

    startAutoSlide();
}
