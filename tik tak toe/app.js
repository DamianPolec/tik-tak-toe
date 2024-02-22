const fieldsElement = document.querySelectorAll('.board__item');
const statement = document.querySelector('.panel');
const restart = document.querySelector('.btn__reset');


let fields;

let activePlayer;
let gameActive;
const resetGameState = () =>{
    fields = ["", "", "", "", "","","","",""];
    activePlayer = 'X';
    gameActive = true;
};
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]; 
let gameWon;
const checkRemis = () =>{
    return fields.every(field => field !== '');
};


const validateGame = () =>{
    let remis= checkRemis();
    
    for(i=0; i<=7; i++) {
        const [pos0, pos1, pos2] = winningConditions[i];
        const value0 = fields[pos0];
        const value1 = fields[pos1];
        const value2 = fields[pos2];
        
        
        if(value0 !=='' && value0 === value1 && value0 === value2){
            gameActive = false;
            statement.innerText = `Gratulacje ${activePlayer} Wygrałeś!`
            gameWon = true;
        }
         else if(remis)
            statement.innerText = "Remis! Spróbuj jeszcze raz!"
         }  
    };
    
resetGameState();

fieldsElement.forEach((field) => {
    field.addEventListener('click',(e) =>{
        const {pos} = e.target.dataset;
        if(gameActive && fields[pos] === ''){
            fields [pos] = activePlayer;
            e.target.classList.add(`board__item--filled-${activePlayer}`);
            validateGame();
        activePlayer = activePlayer ==='X' ? 'O': 'X';
        
        }


        
    })
});

const handleButtonClick = () =>{
    fieldsElement.forEach(field => {
        field.classList.remove("board__item--filled-X", "board__item--filled-O");
    });
    statement.innerText = "";
    resetGameState();
};

restart.addEventListener('click', handleButtonClick );