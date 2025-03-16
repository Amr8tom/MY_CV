const lines = document.querySelectorAll(".line");
let index = 0;

// Function to get animation speed based on screen size
function getAnimationSpeed() {
    return window.innerWidth <= 768 ? 800 : 600; // Slower for mobile
}

// Function to adjust text width dynamically
function adjustTextSize() {
    lines.forEach(line => {
        line.style.display = "block";
        line.style.width = `${Math.min(window.innerWidth * 0.9, 800)}px`; // Responsive width
    });
}

// Function to show lines one by one
function showLines() {
    if (index < lines.length) {
        lines[index].style.display = "block"; // Show line
        requestAnimationFrame(() => {
            lines[index].style.opacity = 1; // Fade in effect
            index++;
            setTimeout(showLines, getAnimationSpeed());
        });
    }
}

// Adjust text size on resize
window.addEventListener("resize", adjustTextSize);

// Start animation when DOM loads
document.addEventListener("DOMContentLoaded", () => {
    adjustTextSize(); // Ensure correct width on load
    showLines();
});
