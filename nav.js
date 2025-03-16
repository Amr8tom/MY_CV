document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".screen");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% of the section is visible
        }
    );

    sections.forEach((section) => {
        observer.observe(section);
    });
});
