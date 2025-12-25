document.addEventListener('DOMContentLoaded', () => {
    // CSRF Token for security
    const csrfToken = generateCSRFToken();
    
    // Add CSRF token to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'csrf_token';
        csrfInput.value = csrfToken;
        form.appendChild(csrfInput);
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Enhanced frame hover effects
    const frames = document.querySelectorAll('.frame');
    frames.forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            frame.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        frame.addEventListener('mouseleave', () => {
            frame.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Custom candle form handler
    const customForm = document.getElementById('custom-candle-form');
    if (customForm) {
        customForm.addEventListener('submit', handleCustomOrder);
    }

    // Contact form handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Carousel functionality with proper error handling
    initializeCarousel();
});

// Generate CSRF token for security
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Handle custom candle orders
function handleCustomOrder(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        scent: formData.get('scent'),
        waxType: formData.get('wax-type'),
        color: formData.get('color'),
        message: formData.get('message'),
        csrf_token: formData.get('csrf_token')
    };
    
    // Validate required fields
    if (!orderData.scent || !orderData.waxType) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate order processing
    showNotification('Custom candle order submitted successfully!', 'success');
    e.target.reset();
}

// Handle contact form submissions
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        csrf_token: formData.get('csrf_token')
    };
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    if (typeof window.addContactMessage === 'function') {
        window.addContactMessage(contactData);
    }
    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Initialize carousel with proper error handling
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-prev');
    const nextButton = document.querySelector('.carousel-next');
    const items = document.querySelectorAll('.carousel-item');
    
    if (!track || !prevButton || !nextButton || items.length === 0) {
        return; // Carousel elements not found, skip initialization
    }
    
    let currentIndex = 0;
    const itemWidth = items[0] ? items[0].offsetWidth + 20 : 280; // Dynamic width calculation
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateCarouselPosition();
        }
    });
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarouselPosition();
        }
    });
    
    function updateCarouselPosition() {
        const translateX = -currentIndex * itemWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === items.length - 1;
    }
    
    // Initialize button states
    updateCarouselPosition();
}

// Show notifications to user
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: '#fff',
        fontWeight: 'bold',
        zIndex: '10000',
        maxWidth: '300px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    // Set background color based on type
    const colors = {
        success: '#27ae60',
        error: '#e74c3c',
        info: '#3498db'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}
