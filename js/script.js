// ===== WEBSITE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('Singati Engineering - Website Initializing...');
    
    // Initialize all components
    initLoadingScreen();
    initMobileMenu();
    initNavigation();
    initContactForm();
    initBackToTop();
    initCurrentYear();
    initAnimations();
    initImageHandling();
    initFormEnhancements();
    
    console.log('✅ Website Initialized Successfully');
});

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const body = document.body;
    
    if (!loadingScreen) return;
    
    // Hide loading screen after minimum 1.5 seconds
    setTimeout(() => {
        // Add hidden class for fade out
        loadingScreen.classList.add('hidden');
        
        // Remove loading class, add loaded class to body
        body.classList.remove('loading');
        body.classList.add('loaded');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('✅ Loading screen hidden');
        }, 500);
    }, 1500);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!mobileToggle || !navLinks) return;
    
    console.log('📱 Mobile menu initialized');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !mobileToggle.contains(event.target)) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== SMOOTH NAVIGATION =====
function initNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Calculate position with header offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active navigation
            updateActiveNav(targetId);
        });
    });
    
    // Update active nav on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNav(`#${sectionId}`);
            }
        });
    });
    
    function updateActiveNav(targetId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    console.log('📧 Contact form initialized');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            service: document.getElementById('service').value,
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (validateForm(formData)) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Send to WhatsApp
            setTimeout(() => {
                sendToWhatsApp(formData);
                
                // Show success message
                showFormMessage('success', '✅ Message sent successfully! We will contact you shortly.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    hideFormMessage();
                }, 5000);
            }, 1000);
        }
    });
    
    // Form validation
    function validateForm(data) {
        let isValid = true;
        
        // Clear previous errors
        clearFormErrors();
        
        // Name validation
        if (!data.name) {
            showFieldError('name', 'Name is required');
            isValid = false;
        } else if (data.name.length < 2) {
            showFieldError('name', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (!data.email) {
            showFieldError('email', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        if (!data.phone) {
            showFieldError('phone', 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(data.phone)) {
            showFieldError('phone', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Service validation
        if (!data.service) {
            showFieldError('service', 'Please select a service');
            isValid = false;
        }
        
        // Message validation
        if (!data.message) {
            showFieldError('message', 'Message is required');
            isValid = false;
        } else if (data.message.length < 10) {
            showFieldError('message', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    function isValidPhone(phone) {
        const re = /^[\+]?[1-9][\d]{9,}$/;
        return re.test(phone.replace(/\s/g, ''));
    }
    
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#E74C3C';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFormErrors() {
        document.querySelectorAll('.field-error').forEach(error => error.remove());
    }
    
    function showFormMessage(type, message) {
        // Remove existing message
        hideFormMessage();
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.padding = '15px';
        messageDiv.style.marginTop = '20px';
        messageDiv.style.borderRadius = '8px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = '600';
        
        if (type === 'success') {
            messageDiv.style.backgroundColor = '#2ECC71';
            messageDiv.style.color = 'white';
        } else {
            messageDiv.style.backgroundColor = '#E74C3C';
            messageDiv.style.color = 'white';
        }
        
        contactForm.appendChild(messageDiv);
    }
    
    function hideFormMessage() {
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }
    
    function sendToWhatsApp(data) {
        const phoneNumber = '9779765991313';
        
        // Map service values to readable names
        const serviceMap = {
            'construction': 'Civil Construction',
            'road': 'Road & Bridge Construction',
            'design': 'Design & Drawing',
            'valuation': 'Property Valuation',
            'contract': 'Contract Works'
        };
        
        const serviceName = serviceMap[data.service] || data.service;
        
        const message = `*New Inquiry - Singati Engineering*%0A%0A` +
                       `*Name:* ${data.name}%0A` +
                       `*Email:* ${data.email}%0A` +
                       `*Phone:* ${data.phone}%0A` +
                       `*Service Required:* ${serviceName}%0A` +
                       `*Message:* ${data.message}%0A%0A` +
                       `_Sent via Singati Engineering Website_`;
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Open in new tab
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SET CURRENT YEAR =====
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Create observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.service-card, .project-card, .stat-item, .feature').forEach(el => {
        observer.observe(el);
    });
}

// ===== IMAGE HANDLING =====
function initImageHandling() {
    console.log('🖼️ Image handling initialized');
    
    // Handle director photo
    const directorImg = document.querySelector('.director-photo-img');
    const directorPlaceholder = document.getElementById('directorPlaceholder');
    
    if (directorImg) {
        directorImg.onload = function() {
            if (directorPlaceholder) {
                directorPlaceholder.style.display = 'none';
            }
            directorImg.style.display = 'block';
        };
        
        directorImg.onerror = function() {
            if (directorPlaceholder) {
                directorPlaceholder.style.display = 'block';
            }
            directorImg.style.display = 'none';
        };
        
        // Trigger load check
        if (directorImg.complete) {
            directorImg.onload();
        }
    }
    
    // Handle project images
    const projectImages = document.querySelectorAll('.project-img');
    
    projectImages.forEach((img, index) => {
        img.onload = function() {
            this.style.display = 'block';
            // If there's an overlay, make sure it's visible
            const overlay = this.nextElementSibling;
            if (overlay && overlay.classList.contains('project-overlay')) {
                overlay.style.display = 'flex';
            }
        };
        
        img.onerror = function() {
            this.style.display = 'none';
            // Show placeholder content
            const overlay = this.nextElementSibling;
            if (overlay && overlay.classList.contains('project-overlay')) {
                overlay.style.display = 'flex';
                overlay.innerHTML = `
                    <div class="project-details">
                        <h4>Project ${index + 1}</h4>
                        <p>Image Coming Soon</p>
                    </div>
                `;
            }
        };
        
        // Trigger load check
        if (img.complete) {
            img.onload();
        }
    });
}

// ===== FORM ENHANCEMENTS =====
function initFormEnhancements() {
    // Add focus states to form inputs
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
}

// ===== ENHANCE PHONE AND EMAIL LINKS =====
function initEnhancedLinks() {
    // Make phone links clickable
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneNumber = this.getAttribute('href').replace('tel:', '');
            window.location.href = `tel:${phoneNumber}`;
        });
    });
    
    // Make email links clickable
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.getAttribute('href').replace('mailto:', '');
            window.location.href = `mailto:${email}`;
        });
    });
}

// Initialize enhanced links
initEnhancedLinks();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce scroll event
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Handle scroll-based actions here
    }, 100);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Website Error:', e.message);
});

// ===== WINDOW LOAD EVENT =====
window.addEventListener('load', function() {
    console.log('🎉 Website fully loaded');
    
    // Add any additional initialization after everything is loaded
    setTimeout(() => {
        // This ensures all resources are loaded
        document.body.classList.add('fully-loaded');
    }, 1000);
});

// ===== SOCIAL MEDIA LINKS =====
// Make sure social media links open in new tab
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

console.log('Singati Engineering - All scripts loaded and ready!');