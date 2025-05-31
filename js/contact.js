// Contact form functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Simulate form submission
                setTimeout(() => {
                    // Show success message
                    formSuccess.classList.add('active');
                    
                    // Reset form
                    contactForm.reset();
                }, 1000);
            }
        });
        
        // Close success message
        const closeSuccess = document.querySelector('.close-success');
        if (closeSuccess) {
            closeSuccess.addEventListener('click', function() {
                formSuccess.classList.remove('active');
            });
        }
    }
    
    // Form validation function
    function validateForm(formData) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        // Reset previous error states
        const formInputs = [nameInput, emailInput, subjectInput, messageInput];
        formInputs.forEach(input => {
            input.style.borderColor = '';
            
            const existingError = input.parentElement.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
        });
        
        // Validate name
        if (!formData.name || formData.name.trim() === '') {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!formData.email || !isValidEmail(formData.email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!formData.subject || formData.subject.trim() === '') {
            showError(subjectInput, 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (!formData.message || formData.message.trim() === '') {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Show error message
    function showError(input, message) {
        input.style.borderColor = '#e74c3c';
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';
        
        input.parentElement.appendChild(errorMessage);
    }
    
    // Add CSS for form validation if not already added
    if (!document.querySelector('#form-validation-css')) {
        const style = document.createElement('style');
        style.id = 'form-validation-css';
        style.textContent = `
            .form-group input:focus,
            .form-group textarea:focus {
                border-color: var(--primary);
            }
            
            .form-group input.error,
            .form-group textarea.error {
                border-color: #e74c3c;
            }
            
            .form-group .error-message {
                color: #e74c3c;
                font-size: 12px;
                margin-top: 5px;
            }
        `;
        document.head.appendChild(style);
    }
});