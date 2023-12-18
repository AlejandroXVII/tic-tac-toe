const gameBoard = (function () {
    let defaultSymbol = '-';
    board = [[defaultSymbol,defaultSymbol,defaultSymbol],
    [defaultSymbol,defaultSymbol,defaultSymbol],
    [defaultSymbol,defaultSymbol,defaultSymbol]];
    const boardSize= 3;

    const addMark = (fila,colum,symbol) => { //if there are a symbol already return false
        if (board[fila][colum] === defaultSymbol) {
            board[fila][colum]=symbol;  
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
            showBoard();
            console.log('Has been a '+symbol+' the winner');
            resetBoard();
        }
    }
    const announceTie = (symbol) => {
        showBoard();
        console.log('Has been a tie');
        resetBoard();
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

    return {addMark,showBoard,checkWinner,verifiedIfThereAreXorO};
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

/*const play = (function (player1,player2) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    do {
        gameBoard.showBoard();
        let array = prompt ('Ingress X corn: ').split(" ");
        array[0]=Number(array[0]);
        array[1]=Number(array[1]);
        gameBoard.addMark(array[0],array[1],'X');
        let x = y = 0;
        do {
            x = getRandomInt(3);
            y = getRandomInt(3);   
        } while (gameBoard.verifiedIfThereAreXorO(x,y));
        gameBoard.addMark(x,y,'O');

    } while (true);
})('Ale','Pancho');*/
