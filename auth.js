// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Login form handler
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, remember });
            
            // For demo purposes, show success message
            alert('Login successful!');
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }

    // Signup form handler
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.getElementById('terms').checked;

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            if (!terms) {
                alert('Please agree to the Terms of Service and Privacy Policy');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { fullName, email, password, terms });
            
            // For demo purposes, show success message
            alert('Account created successfully!');
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }

    // Social login handlers
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const provider = button.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${provider} login integration will be implemented here`);
        });
    });
}); 