var board;  // variable to represent the game board , which is 4x4 grid
var score = 0; // variable to  keep track of the players score
var rows = 4;  // variables row and columns to define the numbers of rows and columns
var columns = 4;

window.onload = function() {  //event handler is used to execute the setGame function when the page is fully loaded
    setGame();
}

function setGame() {  // this function initializes the game board and sets up the initial state
    board = [    //the board is initially filled with zeros
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {  // it creates  a 4X4 grid by generating html elements (<div>) and assigns them, to the board array
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
    //two random tiles with the value of 2 or 4 are added to the board to start the game
    setTwoOrFour();
    setTwoOrFour();
}

function updateTile(tile, num) { //this function updates the appearance of a tile on the game board
    tile.innerText = "";   //is sets the text content of the tile to the specified number (or an empty string ) and adds css classes for styling
    tile.classList.value = ""; //clear the classList
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

document.addEventListener('keyup', (event) => {  //captures keypress events and handles the game logic for arrow keys(left , right , up ,down )
    if(
    event.code == "ArrowLeft" || event.key == "a" ||
    event.code == "ArrowRight" || event.key == "d" ||
    event.code == "ArrowUp" || event.key == "w" ||
    event.code == "ArrowDown" || event.key == "s"
    ){
    if (event.code == "ArrowLeft" || event.key == "a") { //calls the function slideleft ,slideright,slideup, slidedown based on the the arrow key pressed 
        slideLeft();
        setTwoOrFour();
    }
    else if (event.code == "ArrowRight" || event.key == "d") {
        slideRight();
        setTwoOrFour();
    }
    else if ( event.code == "ArrowUp" || event.key == "w") {
        slideUp();
        setTwoOrFour();
    }
    else if (event.code == "ArrowDown" || event.key == "s") {
        slideDown();
        setTwoOrFour();
    }
    document.getElementById("score").innerText = score;
    //after each move it updates the score displayed on the page
    }
});

//tile movement functions (sliderigth,slideleft, slideup , slidedown)
function filterZero(row){
    return row.filter(num => num != 0); //create new array of all nums != 0
}

function slide(row) {  //slide function is combing tiles of the same value and moving them, in the spesific direction
    //[0, 2, 2, 2]
    row = filterZero(row); //[2, 2, 2]
    for (let i = 0; i < row.length-1; i++){
        if (row[i] == row[i+1]) {
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    } //[4, 0, 2]
    row = filterZero(row); //[4, 2]
    //add zeroes
    while (row.length < columns) {
        row.push(0);
    } //[4, 2, 0, 0]
    return row;
}

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);  //after each move these functions update the board and the displayed tiles
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];         //[0, 2, 2, 2]
        row.reverse();              //[2, 2, 2, 0]
        row = slide(row)            //[4, 2, 0, 0]
        board[r] = row.reverse();   //[0, 0, 2, 4];
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
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
            let randomNumber = Math.random() < 0.7 ? 2 : 4; // math.random  with the prob ability of 2 being 70% more recent from 4
            board[r][c] = randomNumber;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = randomNumber.toString();
            tile.classList.add("x" + randomNumber.toString());
            found = true;
        }
    }
}

function hasEmptyTile() { //checks if there are any empty tiles on the game
    let count = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] == 0) { //if any tile is with value 0 it returns true otherwise false
                return true;
            }
        }
    }
    return false;
}

// Function to retrieve the best score for a specific user from local storage (if it exists)
function getBestScoreForUser(username) {
    return localStorage.getItem("bestScore_" + userId) || 0;
}

// Function to update the "Best Score" element for a specific user
function updateBestScoreForUser(username, bestScore) {
    document.getElementById("Best_score").innerText = bestScore;
    // Store the best score in local storage for the user
    localStorage.setItem("bestScore_" + userId, bestScore);
}

// Retrieve the best score from local storage (if it exists)
var bestScore = localStorage.getItem("bestScore") || 0;
// Update the "Best Score" element
document.getElementById("Best_score").innerText = bestScore;

function resetGame() {
    // Check if the current score is higher than the best score
    if (score > bestScore) {
        bestScore = score;
        // Update the displayed best score
        document.getElementById("Best_score").innerText = bestScore;
        // Store the best score in local storage
        localStorage.setItem("bestScore", bestScore);
    }

    // Reset the game board and score
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    score = 0;

    // Clear the existing tiles on the board
    clearBoard();

    // Update the displayed score
    document.getElementById("score").innerText = score;

    // Start a new game by adding two random tiles
    setTwoOrFour();
    setTwoOrFour();
}

function clearBoard() {
    // Remove all tiles from the board element
    const boardElement = document.getElementById("board");
    while (boardElement.firstChild) {
        boardElement.removeChild(boardElement.firstChild);
    }
    // Rebuild the game board by creating new tile elements
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile);
        }
    }
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