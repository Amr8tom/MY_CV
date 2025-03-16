// Rain Effect Script
const rainContainer = document.getElementById('rain-container');

// Generate 100 raindrops
for (let i = 0; i < 70; i++) {
    const raindrop = document.createElement('div');
    raindrop.classList.add('raindrop');
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDuration = `${Math.random() * 4 + 7.5}s`;
    raindrop.style.animationDelay = `${Math.random() * 6}s`;
    rainContainer.appendChild(raindrop);
}

// Certificate Download Function
function downloadCertificate(title, issuer, date) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont('Times', 'bold');
    doc.setFontSize(24);
    doc.text("Certificate of Completion", 105, 40, { align: "center" });

    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    doc.text(`This certifies that`, 105, 60, { align: "center" });

    doc.setFont('Times', 'bold');
    doc.setFontSize(20);
    doc.text("Amr Alaa Ali", 105, 80, { align: "center" });

    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    doc.text(`has successfully completed`, 105, 100, { align: "center" });

    doc.setFont('Times', 'bold');
    doc.setFontSize(18);
    doc.text(title, 105, 120, { align: "center" });

    doc.setFont('Times', 'normal');
    doc.setFontSize(16);
    doc.text(`Issued by ${issuer} on ${date}`, 105, 140, { align: "center" });

    doc.setFont('Times', 'italic');
    doc.setFontSize(12);
    doc.text("Powered by jsPDF", 200, 290, { align: "right" });

    // Save the PDF
    doc.save(`${title}_Certificate.pdf`);
}

function showImageModal(imageSrc, title) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('imageModalLabel').innerText = title;
    $('#imageModal').modal('show');
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'flex';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
