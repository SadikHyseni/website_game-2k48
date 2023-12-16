// Get a reference to the form element
const registrationForm = document.getElementById('registration-form');

// Add a submit event listener to the form
registrationForm.addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get the input values
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Username validation
    if (username.length < 3) {
        alert('Please enter at least 3 characters for the username.');
        return;
    }
    //password validation
    if (password.length > 12){
        alert('Password to long or to short it must be between 6 and 12 characters.');
        return;
    }
    else if (password.length < 6){
        alert('Password to long or to short it must be between 6 and 12 characters.');
        return;
    }
    else if (password.length >= 6 && password.length <= 12) {
        if (
            !password.toLowerCase() === password ||
            !password.toUpperCase() === password ||
            !password.match(/[0-9]/)
        ) {
            alert('Weak Password . Consider adding numbers or special characters for better security.');
            return;
    }
    }

    // Hash the password using SubtleCrypto
    try {
        const encoder = new TextEncoder();

        //has password
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashedPassword = Array.from(new Uint8Array(hashBuffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');

        // Check if the username already exists in local storage
        let userDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
        const isUsernameTaken = userDataList.some(user => user.username === username);
        if (isUsernameTaken) {
            // Username already exists
            alert('Username already exists. Please choose a different username.');
        } else {
            // Create a JavaScript object for the new user
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: hashedPassword,
                Score: 0,
            };

            // Add the new user data to the list
            userDataList.push(newUser);
            // Convert the list of user data to a JSON string
            const userDataListJSON = JSON.stringify(userDataList);

            try {
                // Save the updated list of user data to local storage
                localStorage.setItem('userDataList', userDataListJSON);
                // successful registration
                alert('Your data has been saved successfully.');
                // Clear the form fields
                registrationForm.reset();
                // Transfer to the login form if registration is successful
                window.location.href = 'login.html';
            } catch (error) {
                // Handle the error
                alert('Error: Data could not be saved.');
            }
        }
    } catch (error) {
        console.error('Error hashing password:', error);
        alert('Error hashing password. Please try again.');
    }
});
