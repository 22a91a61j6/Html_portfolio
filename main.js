// Simplified Portfolio JavaScript - Only Cursor and Skills Animation
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.initNavigation();
        this.initMouseFollowEffect();
        this.initSkillProgressBars();
        this.initSkillHoverEffects();
        this.initScrollAnimations();
        this.initContactForm();
        this.initAOS();
    }

    // Navigation functionality
    initNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Enhanced Mouse Follow Effect
    initMouseFollowEffect() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ffffff, #f8fafc);
            border: 2px solid rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
            opacity: 0;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        cursorFollower.style.cssText = `
            position: fixed;
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transition: all 0.3s ease;
            transform: translate(-50%, -50%);
            opacity: 0;
            backdrop-filter: blur(2px);
        `;
        document.body.appendChild(cursorFollower);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';

            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
            cursorFollower.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });

        // Enhanced cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, #3b82f6, #60a5fa)';
                cursor.style.borderColor = 'rgba(255, 255, 255, 0.8)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.borderColor = '#3b82f6';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'radial-gradient(circle, #ffffff, #f8fafc)';
                cursor.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            });
        });
    }

    // Skill Progress Bars Animation
    initSkillProgressBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const percentage = progressBar.dataset.percentage || 80;
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        progressBar.style.width = percentage + '%';
                    }, 200);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Skill Item Hover Effects
    initSkillHoverEffects() {
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-5px)';
                this.style.transition = 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                this.style.boxShadow = '0 10px 25px rgba(255, 255, 255, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.05)';
            });
        });
    }

    // Scroll animations
    initScrollAnimations() {
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

        // Observe elements for scroll animations
        document.querySelectorAll('.skill-category, .project-card, .contact-info, .contact-form').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Contact form handling
    initContactForm() {
        const form = document.getElementById('contactForm');
        const status = document.getElementById('form-status');

        if (form && status) {
            form.addEventListener('submit', async function (e) {
                e.preventDefault();
                const data = new FormData(form);
                const action = form.action;

                try {
                    const response = await fetch(action, {
                        method: 'POST',
                        body: data,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        status.textContent = "Thank you! Your message has been sent.";
                        status.style.color = "green";
                        form.reset();
                    } else {
                        status.textContent = "Oops! Something went wrong.";
                        status.style.color = "red";
                    }
                } catch (error) {
                    status.textContent = "Network error. Please try again.";
                    status.style.color = "red";
                }
            });
        }
    }

    // Initialize AOS (Animate On Scroll)
    initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100
            });
        }
    }
}

// Add CSS styles
function addSimplifiedCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Custom cursor styles */
        * {
            cursor: none;
        }
        
        a, button, input, textarea, select, .clickable {
            cursor: none !important;
        }
        
        /* Skill progress bars with white theme */
        .skill-progress {
            height: 8px;
            background: linear-gradient(90deg, #ffffff, #f8fafc, #e2e8f0);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
        }
        
        .skill-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        /* Skill items styling */
        .skill-item {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-radius: 8px;
        }
        
        .skill-item:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }
        
        /* Responsive - hide cursor on mobile */
        @media (max-width: 768px) {
            .custom-cursor,
            .cursor-follower {
                display: none !important;
            }
            
            * {
                cursor: auto !important;
            }
            
            a, button, input, textarea, select, .clickable {
                cursor: pointer !important;
            }
        }
        
        /* Accessibility - respect reduced motion preference */
        @media (prefers-reduced-motion: reduce) {
            .skill-progress,
            .skill-item,
            .custom-cursor,
            .cursor-follower {
                animation: none !important;
                transition: none !important;
            }
        }
        
        /* Focus indicators for accessibility */
        .skill-item:focus,
        button:focus,
        input:focus,
        textarea:focus {
            outline: 2px solid #ffffff;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addSimplifiedCSS();
    new Portfolio();
});

// Initialize immediately if DOM is already loaded
if (document.readyState !== 'loading') {
    addSimplifiedCSS();
    new Portfolio();
}

