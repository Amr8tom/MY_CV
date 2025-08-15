// Profile Section Enhanced Interactions
document.addEventListener("DOMContentLoaded", function() {
    
    // Animate stats numbers on scroll
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalNumber = parseInt(stat.textContent);
            let currentNumber = 0;
            const increment = finalNumber / 30; // Animation duration
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    stat.textContent = finalNumber + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(currentNumber) + '+';
                }
            }, 50);
        });
    }
    
    // Profile image hover effects
    const profileImage = document.querySelector('.profile-image');
    const profileCard = document.querySelector('.profile-card');
    
    if (profileImage) {
        profileImage.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) contrast(1.1)';
        });
        
        profileImage.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1) contrast(1)';
        });
    }
    
    // Social buttons enhanced interaction
    const socialBtns = document.querySelectorAll('.social-btn');
    
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.08)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        btn.addEventListener('click', function(e) {
            // Add click ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = e.offsetX + 'px';
            ripple.style.top = e.offsetY + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for profile card
    if (profileCard) {
        window.addEventListener('mousemove', function(e) {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            profileCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        profileCard.addEventListener('mouseenter', function() {
            this.style.transition = 'none';
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }
    
    // Initialize stats animation when section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateStats, 500); // Delay for better effect
                observer.unobserve(entry.target);
            }
        });
    });
    
    const profileSection = document.querySelector('.profile-container');
    if (profileSection) {
        observer.observe(profileSection);
    }
    
    // Typing effect for profile description
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Initialize typing effect
    const profileDesc = document.querySelector('.profile-description');
    if (profileDesc) {
        const originalText = profileDesc.textContent;
        setTimeout(() => {
            typeWriter(profileDesc, originalText, 30);
        }, 1000);
    }
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(rippleStyle);
