function handleFormSubmit(event) {
    event.preventDefault();

    // Get the values from the form
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Create a user object
    const user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
    };

    // Retrieve existing users from local storage or create an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Add the new user to the array of users
    users.push(user);

    // Store the updated array in local storage
    localStorage.setItem("users", JSON.stringify(users));

    // Clear the form fields after submission
    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    // Display a success message
    alert("Registration successful!");
}

// Function to check if a user exists in local storage
function userExists(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    for (const user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

// Function to handle form submission for registration
function handleRegistrationFormSubmit(event) {
    event.preventDefault();
}