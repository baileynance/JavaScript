// Declaring Starting Value for Score
let score = 0;

let changingDirection = true;

// Selecting Canvas Element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Styling Canvas to be Black Border with White Interior

ctx.fillStyle = "white";
ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeStyle = "black";
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

// Declaring Snake to Start with 5 Pieces Horizontally in Middle of Canvas
let snake = [  { x: 150, y: 150},  {x: 140, y: 150},  {x: 130, y: 150},  {x: 120, y: 150},  {x: 110, y: 150}, ];

// Function to Render Styling for a Block of Snake 
function drawSnakePart(snakePart) {  
    ctx.fillStyle = 'lightgreen';  
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokestyle = 'darkgreen';  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Function to Run drawSnakePart Function for Each Snake Part
function drawSnake() {  
    snake.forEach(drawSnakePart);
}

// Declaring Default Movement of Snake
let dx = 0;
let dy = 10;

// Function to Change Movement of the Snake Based of Keyboard Event
function changeDirection(event) {  
    const LEFT_KEY = 37;  
    const RIGHT_KEY = 39;  
    const UP_KEY = 38;  
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode; 

    if (changingDirection) {
        // Returns true if Snake is Going Up
        const goingUp = dy === -10;  

        // Returns true if Snake is Going Down
        const goingDown = dy === 10;  

            // Returns true if Snake is Going RIght
        const goingRight = dx === 10; 

            // Returns true if Snake is Going LEft
        const goingLeft = dx === -10;

        // If Left Key is Pressed and Snake is Not Moving Right, the Direction is Changed to Move Left
        if (keyPressed === LEFT_KEY && !goingRight) {    
            dx = -10;    
            dy = 0;  

        // If Up Key is Pressed and Snake is Not Moving Down, the Direction is Changed to Move Up
        } else if (keyPressed === UP_KEY && !goingDown) {    
            dx = 0;    
            dy = -10;  

        // If Right Key is Pressed and Snake is Not Moving Left, the Direction is Changed to Move Right
        } else  if (keyPressed === RIGHT_KEY && !goingLeft) { 
            dx = 10;    
            dy = 0;  

        // If Down Key is Pressed and Snake is Not Moving Up, the Direction is Changed to Move Down
        }  else if (keyPressed === DOWN_KEY && !goingUp) {
            dx = 0;    dy = 10;  
        }
    }
}

// Function to Shift Coordinate of Snake Head on Canvas
function advanceSnake() {  
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    // Checks to See if Snake Is Now Touching Food
    const didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
    if (didEatFood) {   
        // If Snake is Touching Food
        // Then it Will Keep Added Piece and Create New Food Placement 
        createFood();  
        // And it Will Update the Score to Add 10 Points
        score += 10;    
        document.getElementById('score').innerHTML = score;
    } else {    
        // If Snake is not Touching Food, then it Will Keep Food Placement and Remove Extra Piece of Snake
        snake.pop();  
    }
}

// Updating Movement of Snake to Move to the Right
function rightAdvanceSnake() {
    dx = 0;
    dy = -10;
}

// Clears Previous Snake Location Print
function clearCanvas() {  
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);  
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

// Function that Returns Random Integer Between Given Min and Max Value
function randomTen(min, max) {  
    return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

// Function that Uses Integers to Create Food on a Random Coordinate on Canvas
function createFood() {  
    // - 10 so that the Coordinate is not Outside the Canvas
    foodX = randomTen(0, gameCanvas.width - 10);  
    foodY = randomTen(0, gameCanvas.height - 10);
    // Checks to See if Snake is Currently in that Location, if so the the Function Runs Again
    snake.forEach(function isFoodOnSnake(part) {    
        const foodIsOnSnake = part.x == foodX && part.y == foodY    
        if (foodIsOnSnake) {     
            createFood();  
        }
    });
}

// Function that Renders Styling for Food Block
function drawFood() { 
    ctx.fillStyle = 'red'; 
    ctx.fillRect(foodX, foodY, 10, 10); 
    ctx.strokestyle = 'darkred'; 
    ctx.strokeRect(foodX, foodY, 10, 10);
}

// Function that Checks if Snake Collided with Itself
function didGameEnd() {  
    for (let i = 4; i < snake.length; i++) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        const hitLeftWall = snake[0].x < 0;  
        const hitRightWall = snake[0].x > gameCanvas.width - 10;  
        const hitToptWall = snake[0].y < 0;  
        const hitBottomWall = snake[0].y > gameCanvas.height - 10;
        if (didCollide || hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
            return true
        }  
    }
}

// Calls Functions to Clear Previous Snake, Advance Snake, Show New Snake, then Repeat Steps with 1 Second Delay
function main() {  
    // Checks to See if Snake Collided With Walls or Itself
    if (didGameEnd()) {
        return;
    }
    setTimeout(function onTick() {
        // Clears Everything Off the Canvas
        clearCanvas();   
        // Redraws the Food
        drawFood(); 
        // Sets changing Direction to False so No Bugs Occur Before SetTimeout Can Finish
        changingDirection = false;
        // Changes the Snake Coordinates to Move One Space
        advanceSnake(); 
        // Redraws the New Snakes Placement   
        drawSnake();
        // Runs Again
        // Sets changing Direction to False so No Bugs Occur Before SetTimeout Can Finish
        changingDirection = true;
        main();  
}, 100)}

// Renders Original Snake on Screen
drawSnake();
// Initializes Food Placement
createFood();
// Runs Main Function
main();
// Listens for Keys Being Pressed to Run changeDirection Function
document.addEventListener("keydown", changeDirection);


