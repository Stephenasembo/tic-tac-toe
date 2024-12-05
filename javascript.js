const gameBoard = function(){
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
};