// certification_slider.js
function initializeCertificationsSlider() {
    const track = document.querySelector(".certification-track");
    const prevButton = document.querySelector(".certifications-prev");
    const nextButton = document.querySelector(".certifications-next");
    const certificationCards = document.querySelectorAll(".certification-card");

    if (!track || !prevButton || !nextButton || certificationCards.length === 0) {
        console.error("Certifications slider elements not found!");
        return;
    }

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

    document.addEventListener("DOMContentLoaded", function () {
        fetch('certifications.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error! Status: " + response.status);
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('certification-content').innerHTML = data;
                setTimeout(initializeCertificationsSlider, 500);
            })
            .catch(error => console.error('Error loading certifications:', error));
    });
