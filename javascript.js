const gameBoard = (function(){
    const board = [];
    const rows = 3;
    const columns = 3;
    const cell = [];

    function createBoard(){
        for(let i = 0; i < rows; i++){
            board[i] = [];
            for(let j = 0; j < columns; j++){
                board[i].push(cell);
            }
        }
        return board;
    }

    const getRows = () => rows;
    const getColumns = () => columns;
    return {
        createBoard,
        getRows,
        getColumns,
    };
})();

const gameController = function(){
    let gameWon = false;
    let winner;
    let board = gameBoard.createBoard();

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
                userCombo: [],
            }, 
            {
                userName: player2Name,
                marker: '2',
                moves: 0,
                userCombo: [],
            }]
        return { players };
    })()

    const players = gamePlayers.players;

    let activePlayer = players[0];
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
        if (!isGameOver && !gameWon){
            if (activePlayer == players[0]){
                activePlayerRound();
            }

            else if (activePlayer == players[1]){
                activePlayerRound()
            }
        }
        else if(isGameOver || gameWon){
            if(isGameOver){
                alert(`GAME OVER! It was a Tie!`);
                return;    
            }
            else if(gameWon){
                alert(`Game was won by ${winner}`)
            }
        }
    }
    function activePlayerRound(){

        console.log(`It's ${activePlayer.userName}'s turn. Please select board location to mark`);
        row = prompt(`Board row location`, '0');
        col = prompt(`Board column location`, '0');
        let boardLocation;
        turnPlayed = markSpot(row,col);
        
        if (turnPlayed){
            boardLocation = (row.toString()) + (col.toString());
            activePlayer.userCombo.push(boardLocation);
            console.log(activePlayer.userCombo);
            gameWon = checkForWin();
            if (gameWon){
                winner = activePlayer.userName
                alert(`Game Won by ${winner}`);
                return;
            }
            isGameOver = gameOver();
            if (isGameOver){
                alert('Game Over! It was a tie')
                return
            }
            switchPlayer();
        }
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

    function checkForWin(){
        if (activePlayer.moves >=3 ){
            let comboArray = activePlayer.userCombo;
            return winCombo.some(array => {
                let allFound = comboArray.every(el => array.includes(el));
                if (allFound){
                    return true;
                }
            })
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
        const diagonal = [['00','11','22'], ['02','11','20']];
        const winningCombo = [...horizontal, ...vertical, ...diagonal]
        return winningCombo;
    })();

    const restartRound = function(){
        isGameOver = false;
        gameWon = false;
        activePlayer = players[0];
        winner = null;
        turnPlayed = false;
        board = gameBoard.createBoard();
        for (let player of players) {
            player['userCombo'] = [];
            player['moves'] = 0;
        }
        playRound();
    }

    return{
        playRound,
        restartRound,
    }
}

 let test = gameController()