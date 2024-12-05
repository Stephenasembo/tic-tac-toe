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
            }, 
            {
                userName: player2Name,
                marker: '2',
            }]
        return { players };
    })()

    const players = gamePlayers.players;

    let activePlayer = players[0];
    const board = gameBoard.board;

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
        if (activePlayer == players[0]){

            console.log(`It's Player1's turn. Please select board location to mark`);
            row = prompt(`Board row location`, '0');
            col = prompt(`Board column location`, '0');
            board[row][col] = players[0].marker;
            
            switchPlayer();
        }

        else if (activePlayer == players[1]){

            console.log(`It's Player2's turn. Please select board location to mark`);
            row = prompt(`Board row location`, '0');
            col = prompt(`Board column location`, '0');
            board[row][col] = players[1].marker;

            switchPlayer();
        }
    }
    return{
        playRound
    }
}

let res = gameController()