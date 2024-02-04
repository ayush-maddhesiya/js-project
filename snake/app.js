let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
//ctx.fill = "blue"
// ctx.fillRect(0,0,5,5);

let boardHeight = 250
let boardWidth = 500
let square = 20;

let snakeCells = [[0,0]];

let direction  = 'right';

let gameOver = false;

let foodCell = generateRandomCell();
console.log(foodCell);

let score = 0;
let increaseScore  = 5;

function generateRandomCell(){
    return [
        (Math.floor(Math.random()*(500/20))*20),
        (Math.floor(Math.random()*(250/20))*20)
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
    }
})


let gameLoop = setInterval(function () {
    updateSnake();
    drawSnake();
6},500);


function updateSnake() {

    //this will contain head for snake to compute various operation like food and collion funtion
    let headX = snakeCells[snakeCells.length-1][0];
    let headY = snakeCells[snakeCells.length-1][1];

    //this is contain new cells for adding lenght of snake.
    let newX,newY;

    //actully updating new postion of cells.

    if (direction === 'right') {
        newX = headX + square;
        newY = headY;
    
        if (newX === boardWidth) {
          gameOver = true;
        }
        
      } else if (direction === 'left') {
        newX = headX - square;
        newY = headY;
    
        if (newX < 0) {
          gameOver = true;
        }
    
      } else if (direction === 'up') {
        newX = headX;
        newY = headY - square;
    
        if (newY < 0) {
          gameOver = true;
        }
    
      } else {
        newX = headX;
        newY = headY + square;
    
        if (newY === boardHeight) {
          gameOver = true;
        }
      }
    
    snakeCells.push([newX,newY]);

    if(foodCell[0] === headX && foodCell[1]  === headY){
        foodCell = generateRandomCell();
        score  +=  increaseScore;
    }
    else{
        snakeCells.shift();
    }
}

function drawSnake(){
    if(gameOver === true){
        clearInterval(gameLoop);
        ctx.fillStyle = 'red';
        ctx.font = '40px sans-serif';
        ctx.fillText('Game over', 100, 250);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    for(let cell of snakeCells){
        ctx.fillStyle = 'red'; // You can change the color if you want
        ctx.fillRect(cell[0], cell[1], square, square);
        
        ctx.fillStyle = 'pink'; // You can change the color if you want
        ctx.fillRect(cell[0], cell[1], square, square);
        

    }

    // Draw the food cell
    ctx.fillStyle = 'yellow';
    ctx.fillRect(foodCell[0], foodCell[1], square, square);

    // Display the score
    ctx.font = '20px sans-serif';
    ctx.fillStyle = 'black'; // You can change the color if you want
    ctx.fillText(`Score: ${score}`, 50, 50);
}
