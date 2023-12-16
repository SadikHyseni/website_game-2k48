// Get a reference to the login form
const loginForm = document.getElementById('login-form');

// Add a submit event listener to the form
loginForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the input values
    const enteredUsername = document.getElementById('usernameField').value;
    const enteredPassword = document.getElementById('passwordField').value;

    // Check if user data exists in local storage
    const userDataList = JSON.parse(localStorage.getItem('userDataList')) || [];

    // Find a matching user
    const matchingUser = userDataList.find(user => user.username === enteredUsername);

    if (matchingUser) {
        // Hash the entered password using SubtleCrypto
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(enteredPassword);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            //SHA-256 is a cryptographic hash function that processes input data in blocks, applies a compression function,
            // and produces a fixed-size (256-bit) output, providing properties like collision resistance and pre-image resistance.
            
            const hashedEnteredPassword = Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
            //converts the raw binary hash data (hashBuffer) into a hexadecimal string representation using a Uint8Array and array manipulation functions.

            // Compare the hashed entered password with the stored hashed password
            if (hashedEnteredPassword === matchingUser.password) {
                // Successful login
                alert('Login successful!');
                // Store the current user in session storage
                sessionStorage.setItem('currentUser', JSON.stringify(matchingUser));
                // Redirect to the game.html
                window.location.href = 'game.html';
            } else {
                // Login failed: Display an alert message
                alert('Login failed. Please check your username and password.');
            }
        } catch (error) {
            console.error('Error hashing password during login:', error);
            alert('Error during login. Please try again.');
        }
    } else {
        // Login failed
        alert('Login failed. Please check your username and password.');
    }

    // Clear the form fields
    loginForm.reset();
});

// Create and save currentUser in session storage
const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
