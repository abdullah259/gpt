const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');
// Game Variable
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 100;
const BALL_START_SPEED = 1;
let rightPressed = false;
let leftPressed = false;
// Game object
const player = {
    x: 0,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#9336B4",
    score: 0,
};
const computer = {
    x: canvas.width - PLAYER_WIDTH,
    y: canvas.height / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    color: "#9336B4",
    score: 0,
};
const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height:10,
    color: "#9336B4",
};
const   ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: BALL_START_SPEED,
    dirx: 5,
    diry: 5,
    color: "#19A7CE",
};
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}
function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
function drawText(text, x, y, color) {
    ctx.fillStyle = color;
    ctx.font = "45px fantasy";
    ctx.fillText(text, x, y);
}
drawText("1", 50, 50, "BLACK");
function drawNet() {
    for (var i = 0; i <= canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}
// check collisions
// Updated collision function
function collision(b, p) {
    var paddleTopEdge = p.y;
    var paddleBottomEdge = p.y + p.height;
    var paddleLeftEdge = p.x;
    var paddleRightEdge = p.x + p.width;
    var ballTopEdge = b.y - b.radius;
    var ballBottomEdge = b.y + b.radius;
    var ballLeftEdge = b.x - b.radius;
    var ballRightEdge = b.x + b.radius;
    if (ballRightEdge > paddleLeftEdge &&
        ballLeftEdge < paddleRightEdge &&
        ballBottomEdge > paddleTopEdge &&
        ballTopEdge < paddleBottomEdge) {
        // Determine which side the ball hit
        var hitTop = Math.abs(ballBottomEdge - paddleTopEdge);
        var hitBottom = Math.abs(ballTopEdge - paddleBottomEdge);
        var hitLeft = Math.abs(ballRightEdge - paddleLeftEdge);
        var hitRight = Math.abs(ballLeftEdge - paddleRightEdge);
        var minHit = Math.min(hitTop, hitBottom, hitLeft, hitRight);
        if (minHit === hitTop || minHit === hitBottom) {
            b.diry = -b.diry;
        }
        else {
            b.dirx = -b.dirx;
        }
        return true;
    }
    return false;
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Variable to keep track of the player's movement
var playerMovement = 0;
function keyDownHandler(event) {
    if (event.key === "w" || event.key === "W") {
        // Move the player paddle up
        playerMovement = -7;
    }
    else if (event.key === "s" || event.key === "S") {
        // Move the player paddle down
        playerMovement = 7;
    }
}
function keyUpHandler(event) {
    if (event.key === "w" || event.key === "W" || event.key === "s" || event.key === "S") {
        // Stop moving the player paddle when key is released
        playerMovement = 0;
    }
}
function update() {
    // Check for scoring
    if (ball.x - ball.radius < 0) {
        // Ball has passed the left edge, point for computer    
        computer.score += 1;
        // Reset ball to the center
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
    else if (ball.x + ball.radius > canvas.width) {
        // Ball has passed the right edge, point for player
        player.score += 1;
        // Reset ball to the center
        ball.x = canvas.width / 2;
        ball.y = canvas.height / 2;
    }
    {
        ball.x += ball.dirx;
        ball.y += ball.diry;
        if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
            ball.diry = -ball.diry;
        }
        // which player
        var selectedPlayer = ball.x < canvas.width / 2 ? player : computer;
        var collisionSide = collision(ball, selectedPlayer);
        if (collisionSide) {
            // ball.dirx = -ball.dirx;
        }
        // computer controal
        var targetPos = ball.y - computer.height / 2;
        // let current
        computer.y = targetPos;
        // Update the player's position based on playerMovement
        player.y += playerMovement;
        // Ensure the player paddle stays within the canvas boundaries
        player.y = Math.max(0, Math.min(player.y, canvas.height - player.height));
    }
}
function render() {
    // Clear the entire canvas
    drawRect(0, 0, canvas.width, canvas.height, "#F6F1F1");
    // Draw elements as before
    drawNet();
    drawText(player.score, canvas.width / 4.5, canvas.height / 5, "#9336B4");
    drawText(computer.score, (3 * canvas.width) / 4, canvas.height / 5, "#9336B4");
    drawRect(player.x, player.y, player.width, player.height, player.color);
    drawRect(computer.x, computer.y, computer.width, computer.height, computer.color);
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}
function game() {
    update();
    render();
    requestAnimationFrame(game);
}
var FPS = 60;
requestAnimationFrame(game);