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

// Function to get the best score for the current user from local storage
function getBestScore(username) {
    return localStorage.getItem(username + "_bestScore") || 0;
}

// Function to update the best score for the current user in local storage
function updateBestScore(username, newScore) {
    localStorage.setItem(username + "_bestScore", newScore);
}

// Function to handle form submission for login
function handleLoginFormSubmit(event) {
    event.preventDefault();
    // Get the values from the form
    const username = document.getElementById("usernameField").value;
    const password = document.getElementById("passwordField").value;
    if (userExists(username, password)) {
        // Successful login
        alert("Login successful!");
        // Store the current user in local storage
        localStorage.setItem("currentUser", username);
        // Retrieve and display the best score for the current user
        const bestScore = getBestScore(username);
        document.getElementById("Best_score").innerText = bestScore ;
        //redirect the user to another page
        window.location.href = "../html/game.html";
    } else {
        // Failed login
        alert("Username or password not found.");
    }
}

// Add event listener for login form
document.getElementById("login-form").addEventListener("submit", handleLoginFormSubmit);

// Check if a user is already logged in and update the best score
const currentUser = localStorage.getItem("currentUser");
if (currentUser) {
    const bestScore = getBestScore(currentUser);
    document.getElementById("Best_score").innerText = bestScore;
}
