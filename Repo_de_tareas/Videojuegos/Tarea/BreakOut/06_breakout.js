"use strict";


const canvasWidth = 800;
const canvasHeight = 600;

let oldTime;
const paddleVelocity = 1.0;
const speedIncrease = 1.1;
const initialSpeed = 0.5;

let ctx;

class Ball extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "ball");
        this.reset();
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));
    }

    initVelocity() {
        this.inPlay = true;
        let minAngle = 225 * (Math.PI / 180); 
        let maxAngle = 275 * (Math.PI / 180); 
        let angle = -(Math.random() * (maxAngle - minAngle) + minAngle); 
        this.velocity = new Vec(Math.cos(angle), Math.sin(angle)).times(initialSpeed);
        this.velocity.x *= (Math.random() < 0.5) ? 1 : -1;
    }

    reset() {
        this.inPlay = false;
        this.position = new Vec(canvasWidth / 2, canvasHeight / 2);
        this.velocity = new Vec(0, 0);
    }
}

class Paddle extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime) {
        this.position = this.position.plus(this.velocity.times(deltaTime));

        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
}

class Brick extends GameObject {
    constructor(position, width, height, color) {
        super(position, width, height, color, "brick");
        this.active = true;
    }

    draw(ctx) {
        if (this.active) {
            super.draw(ctx);
        }
    }
}


const brickRows = 5;
const brickCols = 8;
const brickWidth = 83;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let score = 0;
let lives =3;

let bricks = [];

function initBricks() {
    for (let c = 0; c < brickCols; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRows; r++) {
            let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r] = new Brick(new Vec(brickX, brickY), brickWidth, brickHeight, "blue");
        }
    }
}


const ball = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 20, 20, "red");
const paddle = new Paddle(new Vec(canvasWidth / 2, canvasHeight - 50), 100, 20, "blue");
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 20, "black", "obstacle");
const bottomBar = new GameObject(new Vec(0, canvasHeight - 20), canvasWidth, 20, "red", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 20, canvasHeight, "black", "left");
const rightBar = new GameObject(new Vec(canvasWidth - 20, 0), 20, canvasHeight, "black", "right");
const scoreLabel = new TextLabel(10, 30, "20px Arial", "white");
const livesLabel = new TextLabel(canvasWidth - 100, 30, "20px Arial", "white");
const gameOverLabel = new TextLabel(canvasWidth / 2 - 100, canvasHeight / 2, "40px Arial", "red");
const repeat =  new TextLabel(canvasWidth / 2 - 100, canvasHeight / 2 + 100, "30px Arial", "white");



function main() {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx = canvas.getContext('2d');

    initBricks();
    createEventListeners();

    drawScene(0);


}

function resetGame(){
    score=0;
    lives=3;
    ball.reset();
    paddle.position= new Vec(canvasWidth / 2, canvasHeight - 50);
    initBricks();
    gameOver=false;
}

function createEventListeners() {
    window.addEventListener('keydown', (event) => {
        if (event.code == 'ArrowLeft') {
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.code == 'ArrowRight') {
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.code == 'ArrowLeft' || event.code == 'ArrowRight') {
            paddle.velocity = new Vec(0, 0);
        }

        if (event.key == 's' && !ball.inPlay) {
            ball.initVelocity();
        }

        if (event.key == 'r' && !ball.inPlay) {
            resetGame();
        }
    });
}

function drawScene(newTime) {
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;


    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    leftBar.draw(ctx);
    rightBar.draw(ctx);
    topBar.draw(ctx);
    bottomBar.draw(ctx);
    paddle.draw(ctx);
    ball.draw(ctx);



    for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
            bricks[c][r].draw(ctx);
        }
    }

    scoreLabel.draw(ctx, `Score: ${score}`)
    livesLabel.draw(ctx, `Lives: ${lives}`)


    ball.update(deltaTime);
    paddle.update(deltaTime);

    if (boxOverlap(ball, leftBar) || boxOverlap(ball, rightBar)) {
        ball.velocity.x *= -1;
    }
    if (boxOverlap(ball, topBar) || boxOverlap(ball, paddle)) {
        ball.velocity.y *= -1 ;
    }
    if (boxOverlap(ball, bottomBar)) {
        ball.reset();
        lives--;
        if (lives==0){
            gameOverLabel.draw(ctx, "Game Over");
            return;
        }
    }


    for (let c = 0; c < brickCols; c++) {
        for (let r = 0; r < brickRows; r++) {
            let brick = bricks[c][r];
            if (brick.active && boxOverlap(ball, brick)) {
                brick.active = false;
                ball.velocity.y *= -1;
                score += 10;
            }
        }
    }

    if (score >= brickRows * brickCols *10){
        gameOverLabel.draw(ctx, "You Win!");
        return;
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}

