function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const gameBoard = (function () {
    let player1=createPlayer('Ale','X')
    let defaultSymbol = '-';
    board = [[defaultSymbol,defaultSymbol,defaultSymbol],
    [defaultSymbol,defaultSymbol,defaultSymbol],
    [defaultSymbol,defaultSymbol,defaultSymbol]];
    const boardSize= 3;

    const addMark = (fila,colum,symbol) => { //if there are a symbol already return false
        if (board[fila][colum] === defaultSymbol) {
            board[fila][colum]=symbol;  
            showBoard();
            checkWinner();
            return true; 
        }
        else 
            return false;
    }
    const checkWinner = () => {
        let thereAreATie=true;
        for (let index = 0; index < boardSize; index++) {
            if ((board[index][0] === board[index][1])&(board[index][0] === board[index][2])){
                announceWinner(board[index][0]);
                return false;
            }
            if ((board[0][index] === board[1][index])&(board[0][index] === board[2][index])){
                announceWinner(board[0][index]);
                return false;
            }
            for (let j = 0; j < boardSize; j++){
                if (board[index][j] ===  defaultSymbol){
                    thereAreATie=false;
                }  
            }
        }
        if ((board[0][0] === board[1][1])&(board[0][0] === board[2][2])){
            announceWinner(board[0][0]);
            return false;
        }
        if ((board[0][2] === this.board[1][1])&(board[1][1] === board[2][0])){
            announceWinner(board[0][2]);
            return false;
        }
        if (thereAreATie){
            announceTie();
            return false;
        }
        return true; 
    }
    const announceWinner = (symbol) => {
        if(symbol!==defaultSymbol){
            if(player1.getSymbol()===symbol)
                displayOnScreen.addWin();
            else 
                displayOnScreen.addLose();
            showBoard();
            alert('Player '+symbol+' has been the winner');
            resetBoard();
            displayOnScreen.cleanCells();
        }
    }
    const announceTie = (symbol) => {
        displayOnScreen.addTie();
        showBoard();
        alert('Has been a tie');
        resetBoard();
        displayOnScreen.cleanCells();
    }
    const showBoard = () => {
        console.table(board);
    }
    const resetBoard = () => {
        board = [[defaultSymbol,defaultSymbol,defaultSymbol],
        [defaultSymbol,defaultSymbol,defaultSymbol],
        [defaultSymbol,defaultSymbol,defaultSymbol]];
    }
    const verifiedIfThereAreXorO = (fila,colum) => (board[fila][colum] === defaultSymbol) ? false : true;

    return {boardSize,addMark,showBoard,checkWinner,verifiedIfThereAreXorO,resetBoard};
})();

function createPlayer (n,s) {
    let name = n;
    let symbol = s;
    let victories = 0;
    let ties = 0;
    let defeats = 0;

    const win = () => victories++;
    const lose = () => defeats++;
    const tie = () => ties++;

    const getName = () => name;
    const getSymbol = () => symbol;
    const getVictories = () => victories;
    const getTies = () => ties;
    const getDefeats = () => defeats;

    return {win,lose,tie,getName,getSymbol,getVictories,getTies,getDefeats};
}

const displayOnScreen = (function () {
    let cells = document.querySelectorAll(".ttt-cell button");
    $board = [[cells[0],cells[1],cells[2]],
    [cells[3],cells[4],cells[5]],
    [cells[6],cells[7],cells[8]]];

    const $name = document.querySelector('#name');
    const $victories = document.querySelector('#victories');
    const $defeats = document.querySelector('#defeats');
    const $ties = document.querySelector('#ties');
    const $star = document.querySelector('#star');
    const $reStar = document.querySelector('#re-star');

    const addWin = () => $victories.textContent=Number($victories.textContent)+1;
    const addLose = () => $defeats.textContent=Number($defeats.textContent)+1;
    const addTie = () => $ties.textContent=Number($ties.textContent)+1;

    const getCell = (x,y) => $board[x][y];
    const setCell = (symbol,enemySymbol) => {
        for (let x = 0; x < gameBoard.boardSize; x++) {
            for (let y = 0; y < gameBoard.boardSize; y++) {
                $board[x][y].addEventListener('click',() => {
                    if (!gameBoard.verifiedIfThereAreXorO(x,y)){
                        $board[x][y].textContent = symbol;
                        gameBoard.addMark(x,y,symbol);
                        let i = j = 0;
                        do {
                            i = getRandomInt(3);
                            j = getRandomInt(3);            
                        } while (gameBoard.verifiedIfThereAreXorO(i,j));
                        $board[i][j].textContent = enemySymbol;
                        gameBoard.addMark(i,j,enemySymbol);
                    }
                });
            }
        }
    }
    const cleanCells = () => {
        for (let x = 0; x < gameBoard.boardSize; x++){
            for (let y = 0; y < gameBoard.boardSize; y++){
                $board[x][y].textContent = '';
            }
        }
    }
   
    //$star.addEventListener('click',setCell('X','O'));
    $star.addEventListener('click', function(event) { 
        event.stopPropagation;
        alert('READY TO STAR THIS ROUND');
        setCell('X','O');
    });

    $reStar.addEventListener('click', function(event) { 
        event.stopPropagation;
        cleanCells();
        $ties.textContent=0;
        $defeats.textContent=0;
        $victories.textContent=0;
        gameBoard.resetBoard();
        alert('THE GAME HAS BEEN RESET');
    });

    return {getCell,setCell,cleanCells,$victories,addWin,addLose,addTie,$reStar};
})();

let player1 = createPlayer('ale','X')
//displayOnScreen.setCell('X','O');