let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

ctx.fillRect(0,0,5,5);

let boardHeight = 250
let boardWidth = 500
let square = 5;

let snakeCells = [[0,0]];

let direction  = 'right';

let gameOver = false;

let foodCell = generateRandomCell();

let score = 0;
let increaseScore  = 5;

function generateRandomCell(){
    return [
        Math.floor(Math.random()*500),
        Math.floor(Math.random()*250),
    ]
}

document.addEventListener("keydown",function (event) {
    console.log(event.key);
    switch (event.key) {

        case "ArrowLeft":
            direction = 'left'
            break;
        
        case "ArrowRight":
            direction = 'right'
                break;
        case "ArrowDown":
            direction = 'down'
                break;
        case "ArrowUp":
            direction = 'up'
                break;
               
        default:
            alert("Plz Press valid key!!")
            break;
    }
})


let gameLoop = setInterval(function () {
    updateSnake();
    // drawSnake();
},600);


function updateSnake() {

    //this will contain head for snake to compute various operation like food and collion funtion
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    //this is contain new cells for adding lenght of snake.
    let newX;
    let newY;

    //actully updating new postion of cells.

    if(newX === boardWidth || newY === boardWidth || newX < 0  || newY < 0){
        gameOver = true;
        return;
    }
    else{
        if(direction === 'right'){
            newX = headX + square;
            newY = headY;
        }
        else if(direction === 'left'){
            newX = headX - square;
            newY = headY;
        }
        else if(direction === 'up'){
            newX = headX ;
            newY = headY + square;
        }else{
            newX = headX ;
            newY = headY - square;
        }
    }
    snakeCells.push([newX,newY]);

    if(foodCell[0] = headX && foodCell[1]  === headY){
        foodCell = generateRandomCell();
        score+=increaseScore;
    }
    else{
        snakeCells.shift();
    }
}

function draw(){
    if(gameOver === true){
        clearInterval(gameLoop);
        ctx.fillStyle = 'red';
        ctx.font = '40px sans-serif';
        ctx.fillText('Game over', 100, 250);
    return;
    }

    ctx.clearRect(0,0,square,square);
    for(let cell of snakeCells){
        ctx.fillStyle = 'Red';
        ctx.fillRect(foodCell[0],foodCell[1],square,square);

    }

    ctx.fillStyle = 'pink';
    ctx.fillRect(foodCell[0], foodCell[1], square, square);
    ctx.font = '20px sans-serif';
    ctx.fillText(`Score: ${score}`, 50, 50);
}