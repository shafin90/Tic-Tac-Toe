// Game state
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a cell click
function makeMove(cellIndex) {
    if (gameState[cellIndex] === "" && gameActive) {
        gameState[cellIndex] = currentPlayer;
        document.getElementsByClassName("cell")[cellIndex].innerText = currentPlayer;
        document.getElementsByClassName("cell")[cellIndex].classList.add(currentPlayer);
        checkResult();
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        if (currentPlayer === "O" && gameActive) {
            setTimeout(makeAIMove, 500); // Delay AI move by 500 milliseconds
        }
    }
}

// Function for AI to make a move
function makeAIMove() {
    const emptyCells = [];
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] === "") {
            emptyCells.push(i);
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const cellIndex = emptyCells[randomIndex];
        makeMove(cellIndex);
    }
}

// Function to check for a winner
function checkResult() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameState[a] !== "" && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            highlightWinningCells(a, b, c);
            announceWinner(gameState[a]);
            break;
        }
    }

    if (gameActive && !gameState.includes("")) {
        gameActive = false;
        announceDraw();
    }
}

// Function to highlight the winning cells
function highlightWinningCells(a, b, c) {
    document.getElementsByClassName("cell")[a].classList.add("win");
    document.getElementsByClassName("cell")[b].classList.add("win");
    document.getElementsByClassName("cell")[c].classList.add("win");
}

// Function to announce the winner
function announceWinner(winner) {
    alert("Player " + winner + " wins!");
}

// Function to announce a draw
function announceDraw() {
    alert("It's a draw!");
}

// Function to reset the game
function resetGame() {
    currentPlayer = "X";
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("X", "O", "win");
    }
}
