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
    const getRows = () => rows;
    const getColumns = () => columns;
    return {
        board,
        getRows,
        getColumns,
    };
})();

const gameController = function(){

    // Create players for the game as a module
    const gamePlayers = (function() {
        const getPlayerName = function(name){
            return name;
        }

        const player1Name = getPlayerName(prompt(`Player1 Enter your name: `));
        const player2Name = getPlayerName(prompt(`Player2 Enter your name: `));

        const players = [
            {
                userName: player1Name,
                marker: '1',
                moves: 0,
            }, 
            {
                userName: player2Name,
                marker: '2',
                moves: 0,
            }]
        return { players };
    })()

    const players = gamePlayers.players;

    let activePlayer = players[0];
    const board = gameBoard.board;
    const boardRows = gameBoard.getRows();
    const boardColumns = gameBoard.getColumns();
    let isGameOver = false;
    let turnPlayed = false;

    const switchPlayer = function(){
        if (activePlayer == players[0]){
            activePlayer = players[1];
        }
        else if (activePlayer == players[1])
        {
            activePlayer = players[0];
        }
    }

    const playRound = function() {
        if (!isGameOver){
            if (activePlayer == players[0]){
                activePlayerRound();
            }

            else if (activePlayer == players[1]){
                activePlayerRound()
            }
        }
        else if(isGameOver){
            alert(`GAME OVER!`)
        }
    }

    function activePlayerRound(){
        console.log(`It's ${activePlayer.userName}'s turn. Please select board location to mark`);
        row = prompt(`Board row location`, '0');
        col = prompt(`Board column location`, '0');
        turnPlayed = markSpot(row,col);
        
        if (turnPlayed){
            switchPlayer();
        }
        isGameOver = gameOver();
    }

    function markSpot(x, y){
        if (board[x][y] == false){
            board[x][y] = activePlayer.marker;
            activePlayer.moves++;
            return true;
        }
        else if(board[x][y]){
            alert(`This spot is marked.`);
            return false;
        }
    }

    function gameOver(){
        for(let i = 0; i < boardRows; i++)
        {
            for(let j = 0; j < boardColumns; j++)
            {
                if(board[i][j] == false)
                {
                    return false;
                }
            }
        }
        return true;
    }

    const winCombo = (function(){
        const horizontal = [['00','01','02'],['10','11','12'],['20','21','22']];
        const vertical = [['00','10','20'], ['01','11','21'], ['02','12','22']];
        const diagonal = [['00','11','22'], ['22','11','00']];
        return {
            horizontal,
            vertical,
            diagonal,
        };
    })();

    return{
        playRound
    }
}

let res = gameController()