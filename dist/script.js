const board = document.getElementById("board");
const status = document.getElementById("status");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// 創建 3x3 棋盤
function createBoard() {
    board.innerHTML = "";
    gameBoard.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.dataset.index = index;
        cellElement.addEventListener("click", handleMove);
        board.appendChild(cellElement);
    });
}

// 處理玩家移動
function handleMove(event) {
    const index = event.target.dataset.index;
    if (!gameActive || gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");

    if (checkWinner()) {
        status.textContent = `玩家 ${currentPlayer} 獲勝！`;
        gameActive = false;
    } else if (gameBoard.every(cell => cell !== "")) {
        status.textContent = "平手！";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        status.textContent = `輪到玩家 ${currentPlayer}`;
    }
}

// 檢查勝利條件
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 橫排
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 直排
        [0, 4, 8], [2, 4, 6]            // 斜線
    ];
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// 重新開始遊戲
function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    status.textContent = "輪到玩家 X";
    createBoard();
}

// 初始化遊戲
createBoard();