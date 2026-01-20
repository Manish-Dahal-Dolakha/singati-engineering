// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Calculate position
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Validation and Submission
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// Validation functions
function validateName() {
    const name = nameInput.value.trim();
    if (name === '') {
        nameError.textContent = 'Name is required';
        return false;
    } else if (name.length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        return false;
    } else {
        nameError.textContent = '';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    if (email === '') {
        emailError.textContent = 'Email is required';
        return false;
    } else if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        return false;
    } else {
        emailError.textContent = '';
        return true;
    }
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    if (phone === '') {
        phoneError.textContent = 'Phone number is required';
        return false;
    } else if (!phoneRegex.test(phone)) {
        phoneError.textContent = 'Please enter a valid phone number';
        return false;
    } else {
        phoneError.textContent = '';
        return true;
    }
}

function validateMessage() {
    const message = messageInput.value.trim();
    if (message === '') {
        messageError.textContent = 'Message is required';
        return false;
    } else if (message.length < 10) {
        messageError.textContent = 'Message must be at least 10 characters';
        return false;
    } else {
        messageError.textContent = '';
        return true;
    }
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
        // In a real application, you would send the form data to a server here
        // For this front-end only example, we'll just show a success message
        
        // Create form data object
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Log the form data (in a real app, you would send this to a server)