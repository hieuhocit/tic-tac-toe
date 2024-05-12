import Player from "./player.js";

const Board = (function () {
    const message = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");
    const restartBtn = document.querySelector("#restart");

    const x = document.querySelector("#x");
    const o = document.querySelector("#o");

    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const player1 = new Player();
    const player2 = new Player();

    function init() {
        player1.setSign("✖️");
        player2.setSign("⭕");
        x.classList.add("active");
        o.classList.remove("active");
    }

    function handleEvents() {
        x.addEventListener("click", changeSign);
        o.addEventListener("click", changeSign);

        cells.forEach(cell => {
            cell.addEventListener("click", playerStep);
        });

        restartBtn.addEventListener("click", restart);

        message.addEventListener("click", () => {
            message.textContent = "";
            message.style.display = "none";
        });
    }

    function playerStep(e) {
        if (!e.target.classList.contains("selected")) {
            const sign = !player1.isSelected ? player1.getSign() : player2.getSign();

            player1.isSelected = !player1.isSelected;
            player2.isSelected = !player2.isSelected;

            board[e.target.dataset.index] = sign;

            e.target.textContent = sign;
            e.target.classList.add("selected");
            check(sign);
        }
    }

    function check(sign) {
        if (checkWin(sign)) {
            console.log(sign + "WON");
            endGame();
            message.innerHTML = `The Winner is <span>${sign}</span>`;
            message.style.display = "grid";
        }
        if (checkFull()) {
            console.log("DRAW");
            endGame();
            message.innerHTML = "It's draw!";
        }
    }

    function restart() {
        endGame();
        clearBoard();
        init();
        player1.isSelected = false;
        player2.isSelected = false;
    }

    function endGame() {
        cells.forEach((cell) => cell.classList.add("selected"));
        for (let i = 0; i < board.length; i++) { board[i] = 0 };
    }

    function clearBoard() {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("selected");
        });
    }

    function changeSign(e) {
        if (!e.target.classList.contains("active")) {
            endGame();
            clearBoard();
            x.classList.remove("active");
            o.classList.remove("active");
            e.target.classList.add("active");

            player1.setSign(player1.getSign() === "⭕" ? "✖️" : "⭕");
            player2.setSign(player1.getSign() === "⭕" ? "✖️" : "⭕");
            player1.isSelected = false;
            player2.isSelected = false;
        }
    }

    function checkWin(sign) {
        return checkColumn(sign) || checkRow(sign) || checkDiagonal(sign);
    }

    function checkFull() {
        return board.every(element => element !== 0);
    }

    function checkColumn(sign) {
        for (let i = 0; i < 3; i++) {
            const column = [];
            for (let j = 0; j < 9; j += 3) {
                column.push(board[i + j]);
            }
            if (column.every(element => element === sign)) return true;
        }
        return false;
    }

    function checkRow(sign) {
        for (let i = 0; i < 9; i += 3) {
            const row = [];
            for (let j = 0; j < 3; j++) {
                row.push(board[i + j]);
            }
            if (row.every(element => element === sign)) return true;
        }
        return false;
    }

    function checkDiagonal(sign) {
        const diagonalLR = [];
        const diagonalRL = [];
        let l = 0;
        let r = 3 - 1; // n - 1;
        diagonalLR.push(board[l]);
        diagonalRL.push(board[r]);
        for (let i = 1; i <= 2; i++) {
            diagonalLR.push(board[l + 3 + 1]);  // board[l + n + 1]
            diagonalRL.push(board[r + 3 - 1]);  // board[r + n - 1]
            l += 3 + 1;
            r += 3 - 1;
        }
        if (diagonalLR.every(element => element === sign) || diagonalRL.every(element => element === sign)) return true;
        return false;
    }

    return {
        start() {
            init();
            handleEvents();
        }
    };
})();

export default Board;