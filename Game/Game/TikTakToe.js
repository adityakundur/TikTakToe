let board;
let currentPlayer;
let gameActive = true;
let symbols = {X: 'X', O: 'O'};

function initializeBoard() {
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    currentPlayer = 'X';
    gameActive = true;
    updateBoard();
    document.getElementById('gameStatus').innerText = `Player ${symbols[currentPlayer]}'s turn`;
}

function cellClicked(row, col) {
    if(board[row][col] !== " " || !gameActive) {
        return;
    }
    board[row][col] = currentPlayer;
    updateBoard();
    checkGameState();
}

function checkGameState() {
    if(checkWin()) {
        document.getElementById('gameStatus').innerText = `Player ${symbols[currentPlayer]} wins!`;
        gameActive = false;
        return;
    }
    if(checkTie()) {
        document.getElementById('gameStatus').innerText = "It's a tie!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('gameStatus').innerText = `Player ${symbols[currentPlayer]}'s turn`;
}

function checkWin() {
    const lines = [
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        [[0, 0], [1, 1], [2, 2]],
        [[2, 0], [1, 1], [0, 2]]
    ];
    for(let line of lines) {
        const [a, b, c] = line;
        if(board[a[0]][a[1]] === currentPlayer &&
           board[b[0]][b[1]] === currentPlayer &&
           board[c[0]][c[1]] === currentPlayer) {
            return true;
        }
    }
    return false;
}

function checkTie() {
    return board.flat().every(cell => cell !== " ");
}

function updateBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for(let row = 0; row < 3; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'row';
        for(let col = 0; col < 3; col++) {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            // Check if the cell's value is a key in the symbols object; if not, display a space
            cellElement.innerText = board[row][col] === " " ? " " : symbols[board[row][col]];
            cellElement.addEventListener('click', () => cellClicked(row, col));
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}


function startGame() {
    initializeBoard();
}

window.onload = startGame;
