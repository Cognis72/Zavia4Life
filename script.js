// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeLoadingScreen();
    initializeNavigation();
    initializeSmoothScrolling();
    initializeFormValidation();
    initializeCrewHoverEffects();
    initializeParallaxEffect();
    initializeMobileMenu();
});

// Loading Screen Functionality
function initializeLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 3000);
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
}

// Navigation Functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Highlight active nav link based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth Scrolling Functionality
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.remove('active');
        });
    });
}

// Global scroll to section function
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Form Validation Functionality
function initializeFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    
    // Check if form elements exist before adding listeners
    if (!form || !nameInput || !emailInput || !subjectSelect || !messageTextarea) {
        return; // Exit if form elements don't exist
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectSelect.addEventListener('change', () => validateSubject());
    messageTextarea.addEventListener('blur', () => validateMessage());
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Simulate form submission
            showSuccessMessage();
            form.reset();
        }
    });
    
    function validateName() {
        const name = nameInput.value.trim();
        const errorElement = document.getElementById('name-error');
        
        if (name.length < 2) {
            showError(errorElement, 'Name must be at least 2 characters long');
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(errorElement, 'Name can only contain letters and spaces');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showError(errorElement, 'Please enter a valid email address');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function validateSubject() {
        const subject = subjectSelect.value;
        const errorElement = document.getElementById('subject-error');
        
        if (subject === '') {
            showError(errorElement, 'Please select a subject');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageTextarea.value.trim();
        const errorElement = document.getElementById('message-error');
        
        if (message.length < 10) {
            showError(errorElement, 'Message must be at least 10 characters long');
            return false;
        } else if (message.length > 500) {
            showError(errorElement, 'Message cannot exceed 500 characters');
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }
    
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }
    
    function hideError(element) {
        element.classList.remove('show');
    }
    
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #ff0000, #00ff00);
                color: #000000;
                padding: 20px 40px;
                border-radius: 10px;
                font-family: 'Russo One', sans-serif;
                font-weight: bold;
                z-index: 10000;
                box-shadow: 0 0 30px rgba(255, 0, 0, 0.5);
                text-align: center;
            ">
                <h3>MESSAGE SENT!</h3>
                <p>We'll get back to you faster than a beat drop!</p>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            document.body.removeChild(successMessage);
        }, 3000);
    }
}

// Crew Hover Effects
function initializeCrewHoverEffects() {
    const crewMembers = document.querySelectorAll('.crew-member');
    
    crewMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.style.transform = 'scale(1.05) rotate(1deg)';
            member.style.boxShadow = '0 20px 50px rgba(255, 0, 0, 0.4)';
        });
        
        member.addEventListener('mouseleave', () => {
            member.style.transform = 'scale(1) rotate(0deg)';
            member.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.7)';
        });
    });
}

// Parallax Effect (for desktop only)
function initializeParallaxEffect() {
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero, .crew-section, .events-section, .contact-section');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.backgroundPosition = `center ${yPos}px`;
            });
        });
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Check if elements exist before adding listeners
    if (!hamburger || !navMenu) {
        return;
    }
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Intersection Observer for animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.crew-member, .media-item, .timeline-item, .merch-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Initialize scroll animations after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeScrollAnimations();
});

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-konamiSequence.length);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Create special effect
    const body = document.body;
    body.style.animation = 'rainbow 2s infinite';
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show easter egg message
    const easterEggMessage = document.createElement('div');
    easterEggMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ff00ff);
            color: #ffffff;
            padding: 30px;
            border-radius: 15px;
            font-family: 'Press Start 2P', cursive;
            z-index: 10000;
            text-align: center;
            box-shadow: 0 0 50px rgba(255, 255, 255, 0.8);
            animation: pulse 1s infinite;
        ">
            <h2>🎉 KONAMI CODE ACTIVATED! 🎉</h2>
            <p>You found the secret! Z4L RESPECTS THE CLASSICS!</p>
        </div>
    `;
    
    document.body.appendChild(easterEggMessage);
    
    // Remove effects after 5 seconds
    setTimeout(() => {
        body.style.animation = '';
        document.head.removeChild(style);
        document.body.removeChild(easterEggMessage);
    }, 5000);
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    // Your scroll handling logic here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://pixabay.com/get/g3121eb68df58f8128fc686e6ce26d1551ff844f9e13733e0dfeb813ac05985d0085099ddc609589ee0dc7cdd76a7feb995b3b95e2b82036bd4146034803fc333_1280.jpg',
        'https://pixabay.com/get/g33e62d081792b49552d652d8f5c8d887534cfeb0d7b1acf04ab83f1b3c145953cc0c89f1f46e0bdef7dfa921c07d44283f1f9168e40d7a110439d91ad5b6846a_1280.jpg',
        'https://pixabay.com/get/g602d088399b796e782f304f723823b63e15bc0c1abb3acd48dfe9e60728cce4be44abb06b5495b1b64a954ff3e94c960235efa7b05b849a79c59213f594b2cad_1280.jpg',
        'https://pixabay.com/get/g513c7d899528e60fa03b22b828e2bff0b9858af423aa6df30dddb95d41ce8a0877a0f5268e87208cefca0be9b05852ff6f05c76a9ccc6c6cc07306aa071d337b_1280.jpg',
        'https://pixabay.com/get/g725df88d03f159388a4832199794f8206ea70b44728f5fc7c901e18720ea2c4db8cd8280814856384640df34f4efb342655f2349e8bdff36201e78f7fccdd95c_1280.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);
