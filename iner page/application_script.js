document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Handler ---
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
        const menuIcon = menuBtn.querySelector('svg');
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            if (mobileMenu.classList.contains('hidden')) {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>`;
            } else {
                menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`;
            }
        });
    }

    // --- Footer Year Handler ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Multi-Step Form Logic ---
    const form = document.getElementById('application-form');
    if (form) {
        const steps = Array.from(form.querySelectorAll('.form-step'));
        const nextButtons = form.querySelectorAll('.next-btn');
        const submitBtn = document.getElementById('submit-btn');
        const termsCheckbox = document.getElementById('terms');
        let currentStep = 0;

        const showStep = (stepIndex) => {
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === stepIndex);
            });
        };

        const validateStep = (stepIndex) => {
            const currentStepElement = steps[stepIndex];
            const inputs = currentStepElement.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = ''; // Reset border color
                }
            });
            return isValid;
        };

        nextButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (validateStep(currentStep) && currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            });
        });
        
        // --- Terms and Conditions Logic ---
        if (termsCheckbox && submitBtn) {
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed'); // Visually disable button
            termsCheckbox.addEventListener('change', () => {
                if (termsCheckbox.checked) {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                } else {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
                }
            });
        }


        form.addEventListener('submit', (e) => {
            if (!validateStep(currentStep)) {
                e.preventDefault(); // Prevent submission if last step is invalid
                alert('Please fill out all required fields.');
            } else if (!termsCheckbox.checked) {
                e.preventDefault();
                alert('You must agree to the Terms and Conditions to submit.');
            }
            else {
                // In a real application, you would handle form submission here (e.g., via AJAX)
                alert('Application submitted successfully!');
            }
        });

        // --- OTP Button Logic ---
        const otpButtons = form.querySelectorAll('.btn-otp');
        otpButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const inputGroup = e.target.closest('div');
                const otpInput = inputGroup.nextElementSibling;
                if (otpInput) {
                    otpInput.classList.remove('hidden');
                    e.target.textContent = 'Resend OTP';
                    e.target.disabled = true;
                    setTimeout(() => {
                        e.target.disabled = false;
                    }, 30000); // Disable resend for 30 seconds
                }
            });
        });

        showStep(currentStep); // Initialize the first step
    }
});
