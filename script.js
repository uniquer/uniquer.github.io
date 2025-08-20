// Karthik R Iyer Portfolio - Interactive JavaScript

// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const projectCards = document.querySelectorAll('.project-card');
const skillCategories = document.querySelectorAll('.skill-category');

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add background blur effect when scrolling
    if (scrollTop > 100) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollTop = scrollTop;
});

// Smooth scrolling for navigation links
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
        
        // Update active nav link
        updateActiveNavLink(targetId);
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink(targetId = null) {
    if (targetId) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked link
        const activeLink = document.querySelector(`a[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // Auto-detect based on scroll position
        let current = '';
        const scrollPosition = window.pageYOffset + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            
            // Special handling for project cards staggered animation
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.animationDelay = `${index * 0.2}s`;
                        card.classList.add('fade-in');
                    }, index * 100);
                });
            }
            
            // Special handling for skill categories staggered animation
            if (entry.target.classList.contains('skill-category')) {
                const skills = document.querySelectorAll('.skill-category');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.style.animationDelay = `${index * 0.15}s`;
                        skill.classList.add('fade-in');
                    }, index * 150);
                });
            }
        }
    });
}, observerOptions);

// Observe elements for animations
const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
animateElements.forEach(el => observer.observe(el));

// Enhanced hover effects for project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // Add subtle rotation and scale effect
        card.style.transform = 'translateY(-8px) rotateX(5deg)';
        card.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Enhanced hover effects for skill categories
skillCategories.forEach(category => {
    const skills = category.querySelectorAll('.skill-list li');
    
    category.addEventListener('mouseenter', () => {
        // Animate skill items on hover
        skills.forEach((skill, index) => {
            setTimeout(() => {
                skill.style.transform = 'translateX(10px)';
                skill.style.color = '#06b6d4';
            }, index * 50);
        });
    });
    
    category.addEventListener('mouseleave', () => {
        skills.forEach(skill => {
            skill.style.transform = 'translateX(0)';
            skill.style.color = '#94a3b8';
        });
    });
});

// Typewriter effect for hero subtitle
function typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        }
    }
    
    typeChar();
}

// Initialize typewriter effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const originalText = heroSubtitle.textContent;
    
    // Delay the typewriter effect slightly for better UX
    setTimeout(() => {
        typewriterEffect(heroSubtitle, originalText, 80);
    }, 1500);
});

// Parallax effect for geometric background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxBg = document.querySelector('.geometric-bg');
    
    if (parallaxBg) {
        // Subtle parallax movement
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Enhanced button interactions
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);
        
        // Position ripple at mouse coordinates
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleCSS = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Contact link interactions
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add click feedback
        link.style.transform = 'scale(0.95)';
        setTimeout(() => {
            link.style.transform = 'translateY(-2px)';
        }, 150);
    });
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

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', throttledScrollHandler);

// Keyboard navigation accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Ensure focused elements are visible
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// Enhanced focus styles for keyboard navigation
const keyboardCSS = `
    .keyboard-navigation *:focus {
        outline: 2px solid #06b6d4 !important;
        outline-offset: 2px !important;
    }
`;

const keyboardStyle = document.createElement('style');
keyboardStyle.textContent = keyboardCSS;
document.head.appendChild(keyboardStyle);

// Smooth page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Error handling for external links
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', (e) => {
        try {
            // Add analytics or tracking here if needed
            console.log(`External link clicked: ${link.href}`);
        } catch (error) {
            console.warn('Error handling external link:', error);
        }
    });
});

// Performance monitoring (basic)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// Initialize all interactive features
document.addEventListener('DOMContentLoaded', () => {
    console.log('Karthik R Iyer Portfolio loaded successfully');
    
    // Initialize any additional features
    updateActiveNavLink();
    
    // Add loaded class for CSS animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});