const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');
const restartButton = document.getElementById('restartButton');

canvas.width = 800;
canvas.height = 600;

let paddleWidth = 100;
let paddleHeight = 10;
let paddleX;
let rightPressed = false;
let leftPressed = false;

let ballRadius = 10;
let x;
let y;
let dx;
let dy;

let score;
let level;

const levelColors = [
    { paddle: '#0095DD', ball: '#0095DD' },
    { paddle: '#FF5733', ball: '#FF5733' },
    { paddle: '#33FF57', ball: '#33FF57' },
    { paddle: '#5733FF', ball: '#5733FF' },
];

function resetGame() {
    paddleX = (canvas.width - paddleWidth) / 2;
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2 * 1.2;
    dy = -2 * 1.2;
    score = 0;
    level = 1;
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = levelColors[level - 1].paddle;
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = levelColors[level - 1].ball;
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            score++;
            scoreDisplay.textContent = score;

            if (score % 5 === 0) {
                level++;
                levelDisplay.textContent = level;
                dx *= 1.2;
                dy *= 1.2;
                if (level > levelColors.length) {
                    alert('You won! Restarting game.');
                    resetGame();
                }
            }
        } else {
            restartButton.style.display = 'block';
            return;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    requestAnimationFrame(draw);
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
    } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
    }
});

function startGame() {
    resetGame();
    restartButton.style.display = 'none';
    draw();
}

resetGame();
draw();