document.addEventListener("DOMContentLoaded", function () {
    const track = document.querySelector(".certification-track");
    const prevButton = document.querySelector(".certifications-prev"); // Use unique class
    const nextButton = document.querySelector(".certifications-next"); // Use unique class
    const certificationCards = document.querySelectorAll(".certification-card");

    let index = 0;
    const visibleCards = 2; // Show 2 cards at a time
    const cardWidth = certificationCards[0].offsetWidth + 20; // Include margin or padding

    // Update the slider to translate the track
    function updateSlider() {
        track.style.transition = 'transform 0.5s ease-in-out';
        track.style.transform = `translateX(-${index * cardWidth * visibleCards}px)`;
    }

    // Next slide function
    function nextCert() {
        if (index < certificationCards.length - visibleCards) {
            index++;
        } else {
            index = 0; // Loop back to the first card
        }
        updateSlider();
    }

    // Previous slide function
    function prevCert() {
        if (index > 0) {
            index--;
        } else {
            index = certificationCards.length - visibleCards; // Loop back to the last card
        }
        updateSlider();
    }

    // Attach event listeners to the buttons
    prevButton.addEventListener("click", prevCert);
    nextButton.addEventListener("click", nextCert);
});

