// Loading Animation
window.addEventListener('load', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressFill = document.querySelector('.progress-fill');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            // Hide loading screen
            setTimeout(() => {
                loadingScreen.classList.add('loaded');
                document.body.classList.add('loaded');
                
                // Initialize all animations
                initThemeToggle();
                initScrollAnimations();
                initParallaxEffects();
                initButtonEffects();
                initSmoothScroll();
                initNavbarScroll();
            }, 500);
        }
        progressFill.style.width = `${progress}%`;
    }, 200);
});

// Theme Toggle Functionality
// ...existing code...

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    const logoImg = document.querySelector('.logo-img');

    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);
    updateLogo(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
        updateLogo(newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    function updateThemeIcons(theme) {
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    }

    function updateLogo(theme) {
        if (logoImg) {
            if (theme === 'dark') {
                logoImg.src = 'SLM Logo (White).png';
            } else {
                logoImg.src = 'SLM Logo (Black).png';
            }
        }
    }
}

// ...existing code...

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
}

// Parallax Effects
function initParallaxEffects() {
    // Features section parallax
    const featuresSection = document.querySelector('.features');
    const parallaxBg = document.querySelector('.features-parallax-bg');
    
    window.addEventListener('scroll', () => {
        if (!featuresSection || !parallaxBg) return;
        
        const scrolled = window.pageYOffset;
        const featuresOffset = featuresSection.offsetTop;
        const windowHeight = window.innerHeight;
        
        if (scrolled > featuresOffset - windowHeight && scrolled < featuresOffset + featuresSection.offsetHeight) {
            const rate = (scrolled - featuresOffset + windowHeight) * 0.3;
            parallaxBg.style.transform = `translateZ(-1px) scale(2) translateY(${rate}px)`;
                   
        }
    });
    
    // Hero section parallax
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        }
    });
}

// Button Effects
function initButtonEffects() {
    // Ripple effect for all buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-destination, .btn-cta, .btn-register');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Placeholder functionality
            if (this.classList.contains('btn-primary') || 
                this.classList.contains('btn-destination') || 
                this.classList.contains('btn-cta')) {
                setTimeout(() => {
                    alert('Booking functionality would be implemented here!');
                }, 300);
            }
        });
    });
    
    // Login and Register buttons
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('.btn-register');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            alert('Login functionality would be implemented here!');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            alert('Register functionality would be implemented here!');
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
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
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = 'var(--shadow-md)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Enhanced destination card animations
document.addEventListener('DOMContentLoaded', function() {
    const destinationCards = document.querySelectorAll('.destination-card');
    
    destinationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = `
                translateY(-25px) 
                rotate3d(1, -1, 0, 20deg) 
                scale(1.08)
            `;
            this.style.boxShadow = `
                0 50px 100px rgba(0, 102, 255, 0.5),
                0 0 0 4px rgba(0, 102, 255, 0.2),
                inset 0 0 60px rgba(255, 255, 255, 0.3)
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});

console.log('Sea Leader Marine website loaded successfully! 🚤');