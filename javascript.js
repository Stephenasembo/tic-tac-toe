const gameBoard = (function(){
    const board = [];
    const rows = 3;
    const columns = 3;
    const cell = [];

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(cell);
        }
    }
    return {
        board,
    };
})();

function player(name, marker) {

    return {
        name,
        marker,
    };
};

let player1 = player('Andrew', '1');
let player2 = player('Mark', '0');

const gameController = function(){
    let activePlayer = player1;

    const switchPlayer = function(){
        if (activePlayer == player1){
            activePlayer = player2;
        }
    }

    const board = gameBoard.board
    const playRound = function() {
            console.log(`It's Player1's turn. Please select board location to mark`);
            row = prompt(`Board row location`, '0');
            col = prompt(`Board column location`, '0');
            board[row][col] = '1'
    }
    return{
        playRound
    }
}

let res = gameController()