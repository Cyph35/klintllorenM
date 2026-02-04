// ==========================================
// INTRO SPLASH SCREEN
// ==========================================

function initIntroScreen() {
    const introScreen = document.getElementById('introScreen');
    const progressRing = document.getElementById('progressRing');
    const loaderPercent = document.getElementById('loaderPercent');
    
    // SVG circle properties
    const radius = 54;
    const circumference = radius * 2 * Math.PI;
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;
    
    let progress = 0;
    const duration = 3500; // Total duration in ms
    const updateInterval = 50; // Update every 50ms
    const steps = duration / updateInterval;
    const increment = 100 / steps;
    
    // Skill cycling
    const skills = document.querySelectorAll('.intro-skill');
    let currentSkillIndex = 0;
    
    function updateProgress(value) {
        progress = Math.min(value, 100);
        loaderPercent.textContent = Math.floor(progress) + '%';
        
        const offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    
    function cycleSkill() {
        // Remove active class from current skill
        skills[currentSkillIndex].classList.remove('intro-skill--active');
        
        // Move to next skill
        currentSkillIndex = (currentSkillIndex + 1) % skills.length;
        
        // Add active class to new skill
        skills[currentSkillIndex].classList.add('intro-skill--active');
        
        // Trigger beat animation on entire screen
        introScreen.classList.remove('skill-beat');
        // Force reflow to restart animation
        void introScreen.offsetWidth;
        introScreen.classList.add('skill-beat');
    }
    
    // Start skill cycling every 800ms
    const skillInterval = setInterval(cycleSkill, 800);
    
    // Animate progress bar
    const progressInterval = setInterval(() => {
        updateProgress(progress + increment);
    }, updateInterval);
    
    // Auto-dismiss intro after 3.5 seconds
    setTimeout(() => {
        clearInterval(skillInterval);
        clearInterval(progressInterval);
        updateProgress(100);
        
        setTimeout(() => {
            introScreen.classList.add('fade-out');
            setTimeout(() => {
                introScreen.style.display = 'none';
            }, 800);
        }, 200);
    }, duration);
    
    // Allow clicking to skip intro
    introScreen.addEventListener('click', () => {
        clearInterval(skillInterval);
        clearInterval(progressInterval);
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 800);
    });
}

// ==========================================
// CYCLING "HI" IN DIFFERENT LANGUAGES
// ==========================================

function initCyclingHi() {
    const greetings = [
        'hi',      // English
        'hola',    // Spanish
        'bonjour', // French
        'ciao',    // Italian
        'hallo',   // German
        'olá',     // Portuguese
        'こんにちは', // Japanese
        '你好',     // Chinese
        '안녕',     // Korean
        'привет',  // Russian
        'مرحبا',   // Arabic
        'kumusta', // Filipino
        'hej',     // Swedish
        'hoi',     // Dutch
        'γεια'     // Greek
    ];
    
    const hiElement = document.getElementById('cyclingHi');
    let currentIndex = 0;
    
    function cycleGreeting() {
        hiElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % greetings.length;
            hiElement.textContent = greetings[currentIndex];
            hiElement.style.opacity = '1';
        }, 300);
    }
    
    hiElement.style.transition = 'opacity 0.3s ease';
    setInterval(cycleGreeting, 2500);
}

// ==========================================
// NAVIGATION MENU
// ==========================================

function initNavigation() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const body = document.body;
    
    function openMenu() {
        navMenu.classList.add('is-open');
        body.classList.add('nav-open');
    }
    
    function closeMenu() {
        navMenu.classList.remove('is-open');
        body.classList.remove('nav-open');
    }
    
    navToggle.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    navOverlay.addEventListener('click', closeMenu);
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });
}

// ==========================================
// DARK/LIGHT MODE TOGGLE
// ==========================================

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme, themeIcon);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
    });
}

function updateThemeIcon(theme, iconElement) {
    iconElement.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ==========================================
// MAGNETIC BUTTON EFFECT
// ==========================================

function initMagneticButton() {
    const magneticButtons = document.querySelectorAll('.btn--magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            const strength = 0.25;
            const maxDistance = 100;
            
            if (distance < maxDistance) {
                const pullX = deltaX * strength;
                const pullY = deltaY * strength;
                button.style.transform = `translate(${pullX}px, ${pullY}px)`;
            }
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// ==========================================
// CIRCULAR PROGRESS BARS
// ==========================================

function initCircularProgress() {
    const skillCircles = document.querySelectorAll('.skill__circle');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressRing = entry.target.querySelector('.skill__progress-ring-fill');
                const progress = progressRing.getAttribute('data-progress');
                
                const radius = progressRing.getAttribute('r');
                const circumference = 2 * Math.PI * radius;
                const offset = circumference - (progress / 100) * circumference;
                
                setTimeout(() => {
                    progressRing.style.strokeDashoffset = offset;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    skillCircles.forEach(circle => {
        observer.observe(circle);
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================

function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// CONTACT FORM HANDLER
// ==========================================

function initContactForm() {
    const contactForm = document.querySelector('.contact__form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! I will get back to you soon.');
            
            contactForm.reset();
        });
    }
}

// ==========================================
// MOUSE TRAIL EFFECT
// ==========================================

function initMouseTrail() {
    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(99, 102, 241, 0.6)';
        particle.style.boxShadow = '0 0 8px rgba(99, 102, 241, 0.8)';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animation = 'trailFade 0.8s ease-out forwards';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    });
}

// ==========================================
// RESUME & CV TABS AND ACCORDION
// ==========================================

function initResumeCVTabs() {
    const tabButtons = document.querySelectorAll('.resume-cv__tab-btn');
    const tabContents = document.querySelectorAll('.resume-cv__content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('resume-cv__tab-btn--active');
            });
            
            // Add active class to clicked button
            button.classList.add('resume-cv__tab-btn--active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.remove('resume-cv__content--active');
            });
            
            // Show selected tab content
            const selectedTab = document.getElementById(`${tabName}-tab`);
            if (selectedTab) {
                selectedTab.classList.add('resume-cv__content--active');
            }
        });
    });
}

function initCVAccordions() {
    const accordionBtns = document.querySelectorAll('.cv__accordion-btn');
    
    if (accordionBtns.length === 0) return;
    
    accordionBtns.forEach(button => {
        button.addEventListener('click', () => {
            const accordionGroup = button.getAttribute('data-accordion');
            const content = button.nextElementSibling;
            
            // Check if this button is already active
            const isActive = button.classList.contains('cv__accordion-btn--active');
            
            // If accordion group allows only one open at a time, close others in same group
            const siblingsInGroup = document.querySelectorAll(
                `.cv__accordion-btn[data-accordion="${accordionGroup}"]`
            );
            
            // Close all buttons in this group
            siblingsInGroup.forEach(btn => {
                if (btn !== button) {
                    btn.classList.remove('cv__accordion-btn--active');
                    btn.nextElementSibling?.classList.remove('cv__accordion-content--active');
                    
                    // Update icon
                    const icon = btn.querySelector('.cv__accordion-icon');
                    if (icon) {
                        icon.textContent = '+';
                    }
                }
            });
            
            // Toggle current button
            button.classList.toggle('cv__accordion-btn--active');
            
            // Animate content
            if (content) {
                if (isActive) {
                    content.classList.remove('cv__accordion-content--active');
                    button.querySelector('.cv__accordion-icon').textContent = '+';
                } else {
                    content.classList.add('cv__accordion-content--active');
                    button.querySelector('.cv__accordion-icon').textContent = '−';
                }
            }
        });
    });
}

// ==========================================
// ACHIEVEMENTS EXPAND/COLLAPSE
// ==========================================

function initAchievementsExpand() {
    const expandButtons = document.querySelectorAll('.achievements__expand-btn');
    
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const columnContent = button.previousElementSibling;
            
            if (!columnContent || !columnContent.classList.contains('achievements__column-content--expandable')) {
                return;
            }
            
            // Toggle expanded state
            const isExpanded = columnContent.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse
                columnContent.classList.remove('expanded');
                button.textContent = 'View More ↓';
                button.style.transform = 'translateY(0)';
            } else {
                // Expand
                columnContent.classList.add('expanded');
                button.textContent = 'View Less ↑';
                button.style.transform = 'translateY(-2px)';
            }
            
            // Show/hide hidden cards with animation
            const hiddenCards = columnContent.querySelectorAll('.achievement__card--hidden');
            
            if (!isExpanded) {
                // Expanding - add visible class to hidden cards
                hiddenCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            } else {
                // Collapsing - remove visible class from hidden cards
                hiddenCards.forEach(card => {
                    card.classList.remove('visible');
                });
            }
        });
    });
}

// ==========================================
// INITIALIZE ALL FEATURES
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    initIntroScreen();
    initCyclingHi();
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initMagneticButton();
    initCircularProgress();
    initSmoothScroll();
    initContactForm();
    initMouseTrail();
    initResumeCVTabs();
    initCVAccordions();
    initAchievementsExpand();
    
    console.log('Portfolio initialized! 🚀');
});

