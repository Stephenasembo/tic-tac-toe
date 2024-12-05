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
let player2 = player('Mark', '0')