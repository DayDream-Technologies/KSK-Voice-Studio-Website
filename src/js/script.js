document.getElementById('current-year').textContent = new Date().getFullYear();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initCounterAnimations();
    initSmoothScrolling();
    initParallaxEffects();
    initInteractiveElements();
    initPortfolioDropdowns();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.about-card, .service-card, .portfolio-item, .team-member, .contact-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('fade-in');
        observer.observe(header);
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-shapes .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Interactive Elements
function initInteractiveElements() {
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            const photo = this.querySelector('.photo-placeholder');
            if (photo) {
                photo.style.transform = 'scale(1.1)';
            }
        });
        
        member.addEventListener('mouseleave', function() {
            const photo = this.querySelector('.photo-placeholder');
            if (photo) {
                photo.style.transform = 'scale(1)';
            }
        });
    });

    // Hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Newsletter subscription
function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            this.reset();
        });
    }
}

// Initialize newsletter
document.addEventListener('DOMContentLoaded', function() {
    initNewsletter();
});

// Loading animation
window.addEventListener('load', function() {
    // Add loading animation
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading KSK VOICE STUDIO...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    document.body.appendChild(loader);
    
    // Hide loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1000);
});

// Add loader styles
const loaderStyle = document.createElement('style');
loaderStyle.textContent = `
    .loader-content {
        text-align: center;
        color: white;
    }
    
    .loader-spinner {
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyle);

// Scroll to top functionality
function createScrollToTop() {
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollToTop);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTop.style.opacity = '1';
            scrollToTop.style.visibility = 'visible';
        } else {
            scrollToTop.style.opacity = '0';
            scrollToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top on click
    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });
    
    scrollToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });
}

// Initialize scroll to top
document.addEventListener('DOMContentLoaded', function() {
    createScrollToTop();
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations and effects
}, 16)); // ~60fps

// Portfolio Dropdown Functionality
function initPortfolioDropdowns() {
    const exploreButtons = document.querySelectorAll('.portfolio-overlay .btn');
    
    // Sample data for dropdown items
    const portfolioData = {
        'Podcasts': [
            { title: 'No Podcasts as of yet', description: 'Weekly technology podcast', duration: '45 min' }
        ],
        'Broadcasts': [
            { title: 'No Broadcasts as of yet', description: 'Daily morning broadcast', duration: '2 hours' }
        ]
    };

    exploreButtons.forEach((button) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the portfolio item and check for existing dropdown
            const portfolioItem = this.closest('.portfolio-item');
            const existingDropdown = portfolioItem.querySelector('.portfolio-dropdown');
            
            // If dropdown already exists, remove it
            if (existingDropdown) {
                existingDropdown.style.opacity = '0';
                existingDropdown.style.transform = 'translateY(-10px)';
                setTimeout(() => existingDropdown.remove(), 300);
                return;
            }
            
            // Get the portfolio type based on the overlay text
            const overlay = this.closest('.portfolio-overlay');
            const portfolioType = overlay.querySelector('h3').textContent;
            
            // Create dropdown
            const dropdown = createPortfolioDropdown(portfolioData[portfolioType] || portfolioData['Podcasts']);
            
            // Position the dropdown below the portfolio-image
            const portfolioImage = this.closest('.portfolio-image');
            
            // Add to the portfolio item
            portfolioItem.style.position = 'relative';
            portfolioItem.appendChild(dropdown);
            
            // Animate in
            setTimeout(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.portfolio-overlay') && !e.target.closest('.portfolio-dropdown')) {
            const dropdowns = document.querySelectorAll('.portfolio-dropdown');
            dropdowns.forEach(dropdown => {
                dropdown.style.opacity = '0';
                dropdown.style.transform = 'translateY(-10px)';
                setTimeout(() => dropdown.remove(), 300);
            });
        }
    });
}

function createPortfolioDropdown(items) {
    const dropdown = document.createElement('div');
    dropdown.className = 'portfolio-dropdown';
    
    // Add styles to match portfolio-image card styling
    dropdown.style.cssText = `
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        padding: 1.5rem;
        margin-top: 1rem;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
        position: relative;
        overflow: hidden;
    `;
    
    // Create header
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
        padding-bottom: 0.75rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    const title = document.createElement('h4');
    title.textContent = 'Available Content';
    title.style.cssText = `
        margin: 0;
        color: #1f2937;
        font-size: 1.2rem;
        font-weight: 600;
    `;

    header.appendChild(title);
    dropdown.appendChild(header);
    
    // Create items list
    const itemsList = document.createElement('div');
    itemsList.style.cssText = `
        max-height: 300px;
        overflow-y: auto;
    `;
    
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.style.cssText = `
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
        `;
        
        itemElement.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h5 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 1rem; font-weight: 600;">${item.title}</h5>
                    <p style="margin: 0; color: #6b7280; font-size: 0.9rem;">${item.description}</p>
                </div>
                <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 0.5rem 0.75rem; border-radius: 8px; font-size: 0.8rem; font-weight: 500;">${item.duration}</span>
            </div>
        `;
        
        // Hover effects
        itemElement.addEventListener('mouseenter', () => {
            itemElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            itemElement.style.borderColor = 'rgba(102, 126, 234, 0.3)';
            itemElement.style.transform = 'translateY(-2px)';
        });
        
        itemElement.addEventListener('mouseleave', () => {
            itemElement.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
            itemElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            itemElement.style.transform = 'translateY(0)';
        });
        
        // Click handler
        itemElement.addEventListener('click', () => {
            // showNotification(`Playing: ${item.title}`, 'success');
            // Here you could add actual audio playback functionality
            showNotification(`Contact us to help build this protfolio`);
            // Redirect to contact form after a short delay
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const offsetTop = contactSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
        
        itemsList.appendChild(itemElement);
    });
    
    dropdown.appendChild(itemsList);
    
    return dropdown;
}

/********* Begin JS for the contact form *********/
// JavaScript for additional email validation
const form = document.querySelector('#contactForm');
const email = document.querySelector('#email');

form.addEventListener('submit', function (event) {
    // Simple email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
        // Prevent form submission if the email is invalid
        event.preventDefault();

        // Set a custom validity message
        email.setCustomValidity('Please enter a valid email address.');
    } else {
        // Reset the custom validity if the input is valid
        email.setCustomValidity('');
    }
});

// Reset custom validity message on every input change
email.addEventListener('input', function () {
    email.setCustomValidity(''); // Reset the custom error on input change
});
/********* End JS for the contact form *********/
