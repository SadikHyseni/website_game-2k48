var board;  // Variable to represent the game board, which is a 4x4 grid
var score = 0; // Variable to keep track of the player's score
var rows = 4;  // Variables row and columns to define the number of rows and columns
var columns = 4;
var bestScore = 0;
var winner = false;

// Event handler is used to execute the setGame function when the page is fully loaded
window.onload = function() {
    setGame();
}

// This function initializes the game board and sets up the initial state
function setGame() {
    // The board is initially filled with zeros
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    // It creates a 4x4 grid by generating HTML elements (<div>) and assigns them to the board array
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    // Two random tiles with the value of 2 or 4 are added to the board to start the game
    setTwoOrFour();
    setTwoOrFour();
}

// This function updates the appearance of a tile on the game board
function updateTile(tile, num) {
    //is sets the text content of the tile to the specified number (or an empty string ) and adds css classes for styling
    tile.innerText = "";
    //clear the classList
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num.toString();
        if (num <= 4096) {
            tile.classList.add("x"+num.toString());
        } else {
            tile.classList.add("x8192");
        }
    }
}

// Event Listener: Listen for keys events on the document.
document.addEventListener('keyup', (event) => {
    if (
        event.code == "ArrowLeft" || event.key == "a" || event.key == "A" ||
        event.code == "ArrowRight" || event.key == "d" || event.key == "D" ||
        event.code == "ArrowUp" || event.key == "w" || event.key == "W" ||
        event.code == "ArrowDown" || event.key == "s" || event.key == "S"
    ) {
        // Play audio
        var audio = new Audio('../audio/swoosh.mp3');
        audio.play();
    
        if (event.code == "ArrowLeft" || event.key == "a" || event.key == "A") {
            slideLeft();
        } else if (event.code == "ArrowRight" || event.key == "d" || event.key == "D") {
            slideRight();
        } else if (event.code == "ArrowUp" || event.key == "w" || event.key == "W") {
            slideUp();
        } else if (event.code == "ArrowDown" || event.key == "s" || event.key == "S") {
            slideDown();
        }

        // Generate a new tile after each move
        setTwoOrFour();
        document.getElementById("score").innerText = score;

        // check if there is not any empty tile then check for game over
        if (!hasEmptyTile()) {
            checkGameOver();
        }

        // check if the user has reached the tile 8192 for win
        check_winner();

        // Update the local storage with the current user and best score
        updateCurrentUserAndBestScore();
    }
});

function filterZero(row) {
    // Create a new array of all nums != 0
    return row.filter(num => num !== 0);
}

function slide(row) {
     // Filter out the zeros
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
    }
    // Filter out zeros again after merging
    row = filterZero(row);
    // Add zeroes
    while (row.length < columns) {
        row.push(0);
    }
    return row;
}


// Slide Left
function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            let previousNum = c > 0 ? board[r][c - 1] : undefined;
            updateTile(tile, num, previousNum, "right");
        }
    }
}

// Slide Right
function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        board[r] = row.reverse();

        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            let previousNum = c < columns - 1 ? board[r][c + 1] : undefined;
            updateTile(tile, num, previousNum, "left");
        }
    }
}

// Slide Up
function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            let previousNum = r > 0 ? board[r - 1][c] : undefined;
            updateTile(tile, num, previousNum, "down");
        }
    }
}

// Slide Down
function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            let previousNum = r < rows - 1 ? board[r + 1][c] : undefined;
            updateTile(tile, num, previousNum, "up");
        }
    }
}

function setTwoOrFour() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            // Generate a random number (2 or 4)
            let randomNumber = Math.random() < 0.7 ? 2 : 4;
            board[r][c] = randomNumber;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = randomNumber.toString();

            // Clear existing classes and add classes based on the number
            tile.className = "tile";
            tile.classList.add("x" + randomNumber.toString());
             //class for the pop-out animation
            tile.classList.add("new-tile");

            setTimeout(() => {
                 // Remove the class after the animation duration (adjust as needed)
                tile.classList.remove("new-tile");
            }, 500);
            found = true;
        }
    }
}

//ckeck if there is an empty tile
function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
             // Check if the current tile is empty (denoted by 0).
            if (board[r][c] == 0) {
                return true;
            }
        }
    }
    return false;
}

//ckeck for any possible move in rows or columns
function canMoveInRowsAndColumns() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
             // Check if the current tile has the same value as the tile below it or if the tile below it is empty.
            if (board[r][c] === board[r + 1][c] || board[r + 1][c] === 0) {
                return true;
            }
        }
    }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            // Check if the current tile has the same value as the tile to the right of it or if the tile to the right is empty.
            if (board[r][c] === board[r][c + 1] || board[r][c + 1] === 0) {
                return true;
            }
        }
    }

    return false;
}

//game over
function checkGameOver() {
     //if there is no empty tiles and no possible moves in both rows and columns.
    if (!hasEmptyTile() && !canMoveInRowsAndColumns()) {
        //show message
        showGameOverMessage();
    }
}
function showGameOverMessage() {
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.classList.remove("hidden");
}
function hideGameOverMessage() {
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.classList.add("hidden");
}

//victory
function check_winner() {
    //if winner is true show message for win
    if (winner == true) {
    showWinnerMessage();
    }
}
function showWinnerMessage() {
    const gameOverElement = document.getElementById("Winner");
    gameOverElement.classList.remove("hidden");
}
function hideWinnerMessage() {
    const gameOverElement = document.getElementById("Winner");
    gameOverElement.classList.add("hidden");
}

//reset game
function resetGame() {
    // Check if the currentuser score is greater than the best score.
    if (score > bestScore) {
        bestScore = score;
        document.getElementById("Best_score").innerText = bestScore;
        localStorage.setItem("bestScore", bestScore);
    }
    // Reset the game board to an initial state with all tiles set to 0.
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    // Reset the score to 0.
    score = 0;
    // Clear the visual representation of the game board on the HTML page.
    clearBoard();
    // Hide the game over-winner message if it is currently displayed.
    hideGameOverMessage();
    hideWinnerMessage();
    // Update the score display on the HTML page.
    document.getElementById("score").innerText = score;
    // Set two initial tiles on the game board.
    setTwoOrFour();
    setTwoOrFour();
    // Update the display of the current user and best score.
    updateCurrentUserAndBestScore();
    // Display the leaderboard with new values.
    displayLeaderboard();
}

//clearBoard
function clearBoard() {
    const boardElement = document.getElementById("board");
    // Remove all child elements (tiles) from the game board element.
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // Create a new div element to represent a tile on the game board
            let tile = document.createElement("div");
            // Set the unique ID for the tile based on its row and column position.
            tile.id = r.toString() + "-" + c.toString();
            // Get the number (tile value) from the game board array for the current position.
            let num = board[r][c];
            // Update the visual representation of the tile based on its number.
            updateTile(tile, num);
            // Append the tile to the game board element
            document.getElementById("board").append(tile);
        }
    }
}

//display leaderboard
function displayLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard-table');
     // Retrieve user data from local storage and parse it as JSON, or use an empty array if no data is present.
    const userDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
    // Sort the user data array in descending order based on the score.
    userDataList.sort((a, b) => b.Score - a.Score);
    // Get all rows in the leaderboard table (excluding the header row).
    const rows = leaderboardTable.querySelectorAll('tr');
    // Remove all rows in the leaderboard table (excluding the header row).
    for (let i = 1; i < rows.length; i++) {
        rows[i].remove();
    }
    userDataList.forEach((user, index) => {
        // Create a new row for each user in the leaderboard table.
        const row = document.createElement('tr');
        // Set the inner HTML of the row with the user's rank, username, and score.
        row.innerHTML = `<td>${index + 1}</td><td>${user.username}</td><td>${user.Score}</td>`;
        // Append the row to the leaderboard table
        leaderboardTable.appendChild(row);
    });
}
window.addEventListener('load', displayLeaderboard);

document.addEventListener("DOMContentLoaded", function() {
    const showInstructionsButton = document.getElementById("showInstructionsButton");
    const instructions = document.querySelector(".instructions");
    //Listen for a click event on the "Show Instructions" button.
    showInstructionsButton.addEventListener("click", function() {
        instructions.classList.toggle("hidden");
    });
});

//Update the score of the current user and persist the change in the local storage user data list.
function updateCurrentUserAndBestScore() {
    //retrieve the current user
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    //if the is a crurent user
    if (currentUser) {
        currentUser.Score = score;
        //check if the score is higher than the current user's score
        if (bestScore > currentUser.Score) {
            currentUser.Score = bestScore;
        }
         // Retrieve the user data list from local storage or use an empty array if no data is present.
        const userDataList = JSON.parse(localStorage.getItem('userDataList')) || [];
         // Map through the existing user data list and update the score for the current user.
        const updatedUserDataList = userDataList.map(user => {
            if (user.username === currentUser.username) {
                // If the user is found, update the user's data.
                return currentUser;
            }
            return user;
        });
        // Store the updated user data list back in local storage.
        localStorage.setItem('userDataList', JSON.stringify(updatedUserDataList));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Get the audio element
    const audio = document.getElementById("backgroundMusic");
    const playMusic = document.getElementById("Music");

    // Function to toggle between play and pause
    function toggleAudio() {
        // Check if the audio is currently paused
        if (audio.paused) {
            audio.play().catch((error) => {
                console.error("Audio play error:", error.message);
            });
        } else {
            // If playing, pause the audio.
            audio.pause();
        }
    }
    // Event listener for the button click
    playMusic.addEventListener("click", toggleAudio);
});
