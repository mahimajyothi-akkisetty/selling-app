// Toggle between Login and Signup forms
function toggleForms(formType) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const authTitle = document.getElementById('auth-title');
    const toggleLink = document.getElementById('toggle-link');

    if (formType === 'signup') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        authTitle.textContent = 'Sign Up';
        toggleLink.innerHTML = 'Already have an account? <a href="#" onclick="toggleForms(\'login\')">Login</a>';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        authTitle.textContent = 'Login';
        toggleLink.innerHTML = 'Don\'t have an account? <a href="#" onclick="toggleForms(\'signup\')">Sign Up</a>';
    }
}

// Form validation for Login and Signup
function validateForm(formType) {
    const email = document.getElementById(`${formType}-email`).value;
    const password = document.getElementById(`${formType}-password`).value;
    const name = formType === 'signup' ? document.getElementById('signup-name').value : null;

    if (!email || !password) {
        alert('Please fill out all required fields.');
        return false;
    }

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    // For signup form, check if name is provided
    if (formType === 'signup' && !name) {
        alert('Please provide your name.');
        return false;
    }

    alert(`${formType.charAt(0).toUpperCase() + formType.slice(1)} form submitted successfully.`);
    return true;
}

// On Login form submission
function handleLogin(event) {
    event.preventDefault();
    const isValid = validateForm('login');
    if (isValid) {
        // Logic to authenticate the user can go here (for now just a mock alert)
        alert('Login Successful!');
        // Redirect to the main page or user's dashboard
        window.location.href = 'index.html';  // Redirect to main page after successful login
    }
}

// On Signup form submission
function handleSignup(event) {
    event.preventDefault();
    const isValid = validateForm('signup');
    if (isValid) {
        // Logic to create a new user can go here (for now just a mock alert)
        alert('Signup Successful!');
        // Redirect to the login page or main page
        window.location.href = 'login.html';  // Redirect to login page after successful signup
    }
}
