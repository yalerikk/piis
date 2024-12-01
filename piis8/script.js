const canvas = document.getElementById('drawingArea');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker'); // Получаем элемент цветового input

let drawing = false;
let shape = 'circle';
let startX, startY;

// массив для фигур
let shapes = [];

// Функция для выбора фигуры
function selectShape(selectedShape) {
    shape = selectedShape;
}

// Начало рисования
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

// Рисование фигуры
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    // очищаем полотно ^з^
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Перерисовываем все сохраненные фигуры
    renderShapes();

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // по цветам, по заливке
    const strokeColor = colorPicker.value;
    const fillColor = document.querySelector('input[name="fill"]:checked').value === 'filled' ? strokeColor : 'transparent';

    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        drawCircle(startX, startY, radius, strokeColor, fillColor);
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        drawRect(startX, startY, width, height, strokeColor, fillColor);
    } else if (shape === 'line') {
        drawLine(startX, startY, currentX, currentY, strokeColor);
    } else if (shape === 'triangle') {
        drawTriangle(startX, startY, currentX, currentY, strokeColor, fillColor);
    }
});

// Завершение рисования
canvas.addEventListener('mouseup', (event) => {
    drawing = false;

    const currentX = event.offsetX;
    const currentY = event.offsetY;
    const strokeColor = colorPicker.value;
    const fillColor = document.querySelector('input[name="fill"]:checked').value === 'filled' ? strokeColor : 'transparent';

    // Сохраняем фигуру в массив
    if (shape === 'circle') {
        const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
        shapes.push({ shape: 'circle', x: startX, y: startY, radius, strokeColor, fillColor });
    } else if (shape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        shapes.push({ shape: 'rectangle', x: startX, y: startY, width, height, strokeColor, fillColor });
    } else if (shape === 'line') {
        shapes.push({ shape: 'line', x1: startX, y1: startY, x2: currentX, y2: currentY, strokeColor });
    } else if (shape === 'triangle') {
        const heightX = (startX + currentX) / 2;
        const heightY = Math.min(startY, currentY) - Math.abs(currentX - startX) / 2;
        shapes.push({ shape: 'triangle', x1: startX, y1: startY, x2: currentX, y2: currentY, strokeColor, fillColor });
    }
});
canvas.addEventListener('mouseleave', () => {
    drawing = false; // Если мышь покидает область canvas, прекращаем рисование
});

// Функция для отрисовки всех фигур
function renderShapes() {
    shapes.forEach((shapeData) => {
        if (shapeData.shape === 'circle') {
            drawCircle(shapeData.x, shapeData.y, shapeData.radius, shapeData.strokeColor, shapeData.fillColor);
        } else if (shapeData.shape === 'rectangle') {
            drawRect(shapeData.x, shapeData.y, shapeData.width, shapeData.height, shapeData.strokeColor, shapeData.fillColor);
        } else if (shapeData.shape === 'line') {
            drawLine(shapeData.x1, shapeData.y1, shapeData.x2, shapeData.y2, shapeData.strokeColor);
        } else if (shapeData.shape === 'triangle') {
            drawTriangle(shapeData.x1, shapeData.y1, shapeData.x2, shapeData.y2, shapeData.strokeColor, shapeData.fillColor);
        }
    });
}

// Функция рисования окружности
function drawCircle(x, y, radius, strokeColor, fillColor) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fillStyle = fillColor;
    ctx.fill();
}

// Функция рисования прямоугольника
function drawRect(x, y, width, height, strokeColor, fillColor) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fillStyle = fillColor;
    ctx.fill();
}

// Функция рисования линии
function drawLine(x1, y1, x2, y2, strokeColor) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
}

// Функция рисования треугольника
function drawTriangle(x1, y1, x2, y2, strokeColor, fillColor) {
    const heightX = (x1 + x2) / 2;
    const heightY = Math.min(y1, y2) - Math.abs(x2 - x1) / 2;

    ctx.beginPath();
    ctx.moveTo(x1, y1); // Первая вершина
    ctx.lineTo(x2, y2); // Вторая вершина
    ctx.lineTo(heightX, heightY); // Третья вершина
    ctx.closePath();
    ctx.strokeStyle = strokeColor;
    ctx.stroke();
    ctx.fillStyle = fillColor;
    ctx.fill();
}

// Обработчик для кнопки очистки
document.getElementById('clearButton').addEventListener('click', () => {
    // Очищаем массив фигур
    shapes = [];
    // Очищаем холст
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});