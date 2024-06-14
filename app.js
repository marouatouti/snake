const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const levelSelection = document.getElementById('levelSelection');
const controls = document.getElementById('controls');
const restartButton = document.getElementById('restartButton');
let snake, direction, food, score, gameInterval, speed;

function initGame() {
    snake = [{ x: 20, y: 20 }];
    direction = { x: 5, y: 0 };
    food = getRandomPosition();
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameArea.innerHTML = ''; // Clear the game area
    createFood();
    updateSnake();
}

function createFood() {
    const foodElement = document.createElement('div');
    foodElement.id = 'food';
    foodElement.style.left = `${food.x}%`;
    foodElement.style.top = `${food.y}%`;
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
        segmentElement.style.left = `${segment.x}%`;
        segmentElement.style.top = `${segment.y}%`;
        segmentElement.classList.add('snake-segment');
        gameArea.appendChild(segmentElement);
    });
}

function getRandomPosition() {
    const x = Math.floor(Math.random() * (100 / 5)) * 5; // Using 5% steps
    const y = Math.floor(Math.random() * (100 / 5)) * 5; // Using 5% steps
    return { x, y };
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= 100 || head.y < 0 || head.y >= 100) {
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
        direction = { x: 0, y: -5 };
    } else if (e.key === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: 5 };
    } else if (e.key === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -5, y: 0 };
    } else if (e.key === 'ArrowRight' && direction.x === 0) {
        direction = { x: 5, y: 0 };
    }
});

document.getElementById('upButton').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: -5 };
});
document.getElementById('downButton').addEventListener('click', () => {
    if (direction.y === 0) direction = { x: 0, y: 5 };
});
document.getElementById('leftButton').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: -5, y: 0 };
});
document.getElementById('rightButton').addEventListener('click', () => {
    if (direction.x === 0) direction = { x: 5, y: 0 };
});

function startGame(level) {
    switch (level) {
        case 1:
            speed = 200; // Facile
            break;
        case 2:
            speed = 100; // Moyen
            break;
        case 3:
            speed = 50; // Difficile
            break;
    }

    levelSelection.style.display = 'none';
    gameArea.style.display = 'block';
    scoreDisplay.style.display = 'block';
    controls.style.display = 'flex';
    restartButton.style.display = 'block';

    initGame();
    gameInterval = setInterval(gameLoop, speed);
}

function restartGame() {
    clearInterval(gameInterval);
    initGame();
    gameInterval = setInterval(gameLoop, speed);
}
