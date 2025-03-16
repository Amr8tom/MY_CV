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
