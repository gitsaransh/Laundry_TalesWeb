// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');

    // Toggle icon
    const icon = hamburger.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Sticky Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'none';
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.service-modern-card, .process-step-card, .pricing-modern-card, .review-card, .value-card, .cta-text-content, .cta-image-wrapper');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

/* Apply initial styles for reveal */
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load


/* --- Booking Modal Logic --- */
const modal = document.getElementById('bookingModal');
const openButtons = document.querySelectorAll('.btn-cta-glow, .btn-plan, .btn-cta-large, .nav-btn, .btn-primary');
const closeButton = document.querySelector('.modal-close');
const bookingForm = document.getElementById('bookingForm');

function openModal() {
    if (modal) modal.classList.add('active');
}

function closeModal() {
    if (modal) modal.classList.remove('active');
}

// Open Modal on Button Click
openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
});

// Close Modal logic
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// WhatsApp Form Submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values from the NEW form IDs
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const address = document.getElementById('address').value;

        if (name && phone && service && address) {
            const message = `*New Pickup Request via Website*
            
*Name:* ${name}
*Phone:* ${phone}
*Service Type:* ${service}
*Address:* ${address}

Please confirm my pickup slot.`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/9591553482?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
            bookingForm.reset();
            closeModal();
        } else {
            alert('Please fill in all details.');
        }
    });
}
