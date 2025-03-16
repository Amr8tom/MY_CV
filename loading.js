let loadProgress = 0;
let navMenu = document.getElementById("navMenu"); // Get nav menu reference

// Ensure the nav is hidden initially
navMenu.style.display = "none";

let loadingInterval = setInterval(() => {
    if (loadProgress < 99) {
        loadProgress++;
        document.getElementById("loadingScreen").innerText = loadProgress + "";
        drawMobileFrame(loadProgress); // Draw the frame based on progress
    } else {
        clearInterval(loadingInterval);

        // Hide the loading screen
        document.getElementById("loadingScreen").style.display = "none";

        // Show main content
        document.getElementById("mainContent").style.display = "block";
        document.getElementById("mobileContent").style.display = "block";
        document.getElementById("mobileContent").classList.add("show");

        // Show canvas
        document.getElementById("spiderCanvas").style.display = "block";
        startAnimation(); // Start the spider web animation

        // Ensure the navigation menu is displayed
        navMenu.style.display = "flex"; // Make it visible
        setTimeout(() => {
            navMenu.classList.add("show"); // Apply smooth fade-in effect
        }, 200); // Small delay for transition
    }
}, 30);
