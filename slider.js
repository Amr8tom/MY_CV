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
    let slidesPerView = 1; // Default mobile first
    
    // Enhanced responsive function
    function updateSlidesPerView() {
        if (window.innerWidth <= 480) {
            slidesPerView = 1; // Small mobile
        } else if (window.innerWidth <= 768) {
            slidesPerView = 1; // Mobile
        } else if (window.innerWidth <= 1024) {
            slidesPerView = 2; // Tablet
        } else {
            slidesPerView = 3; // Desktop
        }
    }
    
    // Set initial slider styles
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.width = '100%'; // Fixed width calculation
    slider.style.height = 'auto';
    slider.style.minHeight = '600px';
    
    function updateSlideStyles() {
        updateSlidesPerView();
        
        // Apply CSS styles to slides for proper mobile display
        slides.forEach(slide => {
            slide.style.minWidth = `${100 / slidesPerView}%`;
            slide.style.maxWidth = `${100 / slidesPerView}%`;
            slide.style.flex = '0 0 auto';
            slide.style.boxSizing = 'border-box';
            slide.style.height = 'auto';
            slide.style.display = 'flex';
            slide.style.alignItems = 'stretch';
            slide.style.justifyContent = 'center';
            
            // Ensure project cards are properly sized
            const projectCard = slide.querySelector('.project-card');
            if (projectCard) {
                projectCard.style.width = '100%';
                projectCard.style.maxWidth = '100%';
                projectCard.style.display = 'flex';
                projectCard.style.flexDirection = 'column';
                projectCard.style.height = 'auto';
                projectCard.style.minHeight = window.innerWidth <= 480 ? '500px' : '550px';
            }
        });
        
        console.log(`Updated for ${slidesPerView} slides per view on ${window.innerWidth}px screen`);
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



