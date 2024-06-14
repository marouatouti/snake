const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
let snake, direction, food, score, gameInterval;

function initGame() {
    snake = [{ x: 100, y: 100 }];
    direction = { x: 20, y: 0 };
    food = getRandomPosition();
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameArea.innerHTML = ''; // Clear the game area
    createFood();
    updateSnake();
    gameInterval = setInterval(gameLoop, 100);
}

function createFood() {
    const foodElement = document.createElement('div');
    foodElement.id = 'food';
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    gameArea.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        gameArea.removeChild(document.getElementById('food'));
        food = getRandomPosition();
        createFood();
    } else {
        snake.pop();
    }
}

function updateSnake() {
    gameArea.querySelectorAll('.snake-segment').forEach(segment => segment.remove());

    snake.forEach(segment => {
        const segmentElement = document.createElement('div');
        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.top = `${segment.y}px`;
        segmentElement.classList.add('snake-segment');
        gameArea.appendChild(segmentElement);
    });
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (gameArea.offsetWidth / 20)) * 20;
    const y = Math.floor(Math.random() * (gameArea.offsetHeight / 20)) * 20;
    return { x, y };
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= gameArea.offsetWidth || head.y < 0 || head.y >= gameArea.offsetHeight) {
        clearInterval(gameInterval);
        alert('Game Over');
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            clearInterval(gameInterval);
            alert('Game Over');
            return true;
        }
    }

    return false;
}

function gameLoop() {
    moveSnake();
    if (checkCollision()) return;
    updateSnake();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -20 };
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 20 };
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -20, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 20, y: 0 };
    }
});

document.getElementById('upButton').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -20 };
});
document.getElementById('downButton').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 20 };
});
document.getElementById('leftButton').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -20, y: 0 };
});
document.getElementById('rightButton').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 20, y: 0 };
});

function restartGame() {
    clearInterval(gameInterval);
    initGame();
}

// Initialize the game for the first time
initGame();
