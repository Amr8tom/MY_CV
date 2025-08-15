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
    // function updateSlidesPerView() {

    //     if (window.innerWidth <= 480) {
    //         slidesPerView = 1; // Small mobile
    //     } else if (window.innerWidth <= 768) {
    //         slidesPerView = 1; // Mobile
    //     } else if (window.innerWidth <= 1024) {
    //         slidesPerView = 2; // Tablet
    //     } 
    //     else if (window.innerWidth <= 1200) {
    //         slidesPerView = 3; // Small Desktop
    //     } 
    //     else if (window.innerWidth <= 1400) {
    //         slidesPerView = 4; // Large Desktop
    //     } 
    //     /// iphone pro max

    //     else if (window.innerWidth   <= 1600) {
    //         slidesPerView = 1; // Extra Large Desktop
    //     } 
    //     else {
    //         slidesPerView = 3; // Desktop
    //     }
    // }
    function updateSlidesPerView() {
    const width = window.innerWidth;

    if (width <= 768) {
        // Mobile (including iPhone)
        slidesPerView = 1;
    } else if (width <= 1024) {
        // Tablet
        slidesPerView = 2;
    } else {
        // Desktop
        slidesPerView = 4;
    }
}
    
    // Set initial slider styles with enhanced animations
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smoother easing
    slider.style.width = '100%';
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
            
            // Ensure project cards are properly sized with enhanced animations
            const projectCard = slide.querySelector('.project-card');
            if (projectCard) {
                projectCard.style.width = '100%';
                projectCard.style.maxWidth = '100%';
                projectCard.style.display = 'flex';
                projectCard.style.flexDirection = 'column';
                projectCard.style.height = 'auto';
                projectCard.style.minHeight = window.innerWidth <= 480 ? '500px' : '550px';
                projectCard.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                projectCard.style.transformOrigin = 'center';
                
                // Add dynamic hover effects
                projectCard.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = '0 20px 40px rgba(0, 255, 255, 0.4), 0 0 30px rgba(0, 162, 255, 0.3)';
                    this.style.filter = 'brightness(1.1)';
                });
                
                projectCard.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)';
                    this.style.filter = 'brightness(1)';
                });
            }
        });
        
        console.log(`Updated for ${slidesPerView} slides per view on ${window.innerWidth}px screen`);
    }
    
    // Enhanced navigation with visual feedback
    function addButtonEffects() {
        [prevButton, nextButton].forEach(button => {
            if (button) {
                button.style.transition = 'all 0.3s ease';
                button.style.backdropFilter = 'blur(10px)';
                button.style.border = '2px solid rgba(0, 255, 255, 0.3)';
                
                button.addEventListener('mouseenter', function() {
                    this.style.transform = 'scale(1.15)';
                    this.style.background = 'rgba(0, 255, 255, 0.8)';
                    this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.6)';
                });
                
                button.addEventListener('mouseleave', function() {
                    this.style.transform = 'scale(1)';
                    this.style.background = 'rgba(0, 0, 0, 0.3)';
                    this.style.boxShadow = 'none';
                });
                
                button.addEventListener('click', function() {
                    this.style.animation = 'pulse 0.6s ease-out';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 600);
                });
            }
        });
    }
    
    updateSlideStyles();
    addButtonEffects();

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



