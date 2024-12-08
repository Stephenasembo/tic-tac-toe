const dom = (function cacheDom (){
    const startGame = document.querySelector('#startGame');
    const dialog = document.querySelector('dialog');
    const close = document.querySelector('#cancel');
    const confirm = document.querySelector('#confirm');
    const player1Name = document.querySelector('#player1');
    const player2Name = document.querySelector('#player2');
    const restartRoundBtn = document.querySelector('#restartRound');
    const turnPara = document.querySelector('#turnPara');
    const winnerPara = document.querySelector('#winnerPara');

    const divBoard = Array.from(document.querySelectorAll('.spot'));
    return {
        startGame,
        dialog,
        close,
        confirm,
        player1Name,
        player2Name,
        restartRoundBtn,
        turnPara,
        winnerPara,
        divBoard,
    }
 })()

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
 })()

const gameController = function(){
    let gameWon = false;
    let winner = null;
    let boardLocation = null;
    let board = gameBoard.createBoard();
    let players = createPlayers();

    let activePlayer = players[0];
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

    function setUpBoard(){
        dom.divBoard.forEach((spot) => {
            spot.addEventListener('click', getSpotId);
        })
        function getSpotId(spot){
            boardLocation = spot.target.id;
            console.log(boardLocation);
            if (boardLocation){
                getLocation();
                playRound();
            }
            clearEventListeners();
        }
        function clearEventListeners(){
            dom.divBoard.forEach((spot) => {
                spot.removeEventListener('click', getSpotId)
            })
        }
    }

    function getLocation (){
        let locationArr = boardLocation.split('');
        console.log(locationArr)
        row = Number(locationArr[0]);
        col = Number(locationArr[1]);

        turnPlayed = markSpot(row,col);
        if (turnPlayed){
            activePlayer.userCombo.push(boardLocation);
            console.log(activePlayer.userCombo);
            gameWon = checkForWin();
            if (gameWon){
                winner = activePlayer.userName;
                display.displayWinner(`Game Won! By ${winner}`);
                return;
            }
            isGameOver = gameOver();
            if (isGameOver){
                display.displayWinner('Game Over! It was a tie');
                return
            }
            switchPlayer();
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
                return;    
            }
            else if(gameWon){
                return
            }
        }
    }
    function activePlayerRound(){
        let text = `It's ${activePlayer.userName}'s turn. Please select board location to mark`;
        display.displayTurn(text);
        setUpBoard();
    }

    function markSpot(x, y){
        if (board[x][y] == false){
            board[x][y] = activePlayer.marker;
            let id = '' + x + y;
            display.renderMark(activePlayer.marker, id);
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
        for(let i = 0; i < 3; i++)
        {
            for(let j = 0; j < 3; j++)
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
        activePlayer = players[0];
        winner = null;
        turnPlayed = false;
        board = gameBoard.createBoard();
        for (let player of players) {
            player['userCombo'] = [];
            player['moves'] = 0;
        }
        display.displayTurn(`The round is restarted. ${activePlayer.userName} it is now your turn`);
        if(isGameOver || gameWon){
            display.displayWinner('');
            isGameOver = false;
            gameWon = false;
            playRound();
        }
    }

    const restartGame = function (newP1, newP2){
        if(newP1 == undefined || newP2 == undefined){
            newP1 = players[0].userName;
            newP2 = players[1].userName;
        }
        players[0].userName = newP1;
        players[1].userName = newP2;
        restartRound();
        display.displayTurn(`A new game has been started. ${activePlayer.userName} it is now your turn`)
        }

    return{
        playRound,
        restartRound,
        restartGame,
    }
}

const handleForm = (function(){

    const showForm = function (){
            resetForm()
            formSubmitted = false;
            dom.dialog.showModal()
    }

    const resetForm = function(){
        dom.player1Name.value = '';
        dom.player2Name.value = '';
    }

    const closeForm =  function(){
        event.preventDefault();
        dom.dialog.close();
    }

    return{
        showForm,
        closeForm,
        resetForm,
    }
})()

const startGame = (function(){
    let game = null;
    let gameStarted = null;

    dom.startGame.addEventListener('click', handleForm.showForm);
    dom.close.addEventListener('click', handleForm.closeForm);
    dom.confirm.addEventListener('click', handleForm.closeForm);
    dom.confirm.addEventListener('click', playGame);
    dom.restartRoundBtn.addEventListener('click', restartRound);

    function playGame(){
        game = gameController();
        if(!gameStarted){
            game.playRound();
            gameStarted = true;
            dom.startGame.removeEventListener('click', handleForm.showForm);
            dom.startGame.addEventListener('click', restartEntireGame);
        }
    }

    function restartRound(){
        if(gameStarted){
            display.clearBoard();
            game.restartRound();
        }
    }

    function restartEntireGame(){
        let restartConfirmation = confirm('Do you want to restart the game ?');
        if (restartConfirmation){
            display.clearBoard();
            handleForm.showForm();
            dom.confirm.removeEventListener('click', playGame);
            dom.confirm.addEventListener('click', startRestartedGame);
        }
    }

    function startRestartedGame(){
        let newNames = createPlayers();
        let newP1 = newNames[0].userName;
        let newP2 = newNames[1].userName;    
        game.restartGame(newP1, newP2);
    }

})();

function getValues (){
    return{
        player1: dom.player1Name.value,
        player2: dom.player2Name.value,
    }
}

const display = (function(){
    function renderMark(mark, location){
        for(let div of dom.divBoard){
            if (div.id == location){
                div.textContent = mark;
                break;
            }
        }
    }

    function clearBoard(){
        for(let div of dom.divBoard){
            div.textContent = '';
        }
    }

    function displayTurn(text){
        dom.turnPara.textContent = text;
    }

    function displayWinner(text){
        dom.winnerPara.textContent = text;
    }

    return {
        renderMark,
        clearBoard,
        displayTurn,
        displayWinner,
    }
})()

const createPlayers = function() {
    const playerNames = getValues();

    const players = [
        {
            userName: playerNames['player1'],
            marker: 'x',
            moves: 0,
            userCombo: [],
        }, 
        {
            userName: playerNames['player2'],
            marker: 'o',
            moves: 0,
            userCombo: [],
        }]
    return players;
};
