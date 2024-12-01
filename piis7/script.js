const svg = document.getElementById('drawingArea');
const colorPicker = document.getElementById('colorPicker'); // Получаем элемент цветового input

let drawing = false;
let shape = 'circle';
let startX, startY;
let tempShape; // Временная фигура

// Функция для выбора фигуры
function selectShape(selectedShape) {
    shape = selectedShape;
}

// Начало рисования
svg.addEventListener('mousedown', (event) => {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    // Создаем временную фигуру
    const strokeColor = colorPicker.value;
    const fillColor = document.querySelector('input[name="fill"]:checked').value === 'filled' ? strokeColor : 'transparent';

    if (shape === 'circle') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        svg.appendChild(tempShape);
    } else if (shape === 'rectangle') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        svg.appendChild(tempShape);
    } else if (shape === 'line') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", "line");
        svg.appendChild(tempShape);
    } else if (shape === 'triangle') {
        tempShape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        svg.appendChild(tempShape);
    }

    // Настройки временной фигуры
    updateTempShape(tempShape, startX, startY, startX, startY, strokeColor, fillColor);
});

// Рисование фигуры
svg.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Обновляем временную фигуру
    updateTempShape(tempShape, startX, startY, currentX, currentY, colorPicker.value, document.querySelector('input[name="fill"]:checked').value === 'filled' ? colorPicker.value : 'transparent');
});

// Завершение рисования
svg.addEventListener('mouseup', () => {
    drawing = false;

    // Перемещение временной фигуры в окончательную
    const finalShape = tempShape.cloneNode(true);
    svg.appendChild(finalShape);
    tempShape = null; // Сбрасываем временную фигуру
});

svg.addEventListener('mouseleave', () => {
    drawing = false; // Если мышь покидает область svg, прекращаем рисование
});

// Функция для обновления временной фигуры
function updateTempShape(shapeElement, startX, startY, currentX, currentY, strokeColor, fillColor) {
    shapeElement.setAttribute('stroke', strokeColor);
    shapeElement.setAttribute('stroke-width', '5');

    if (shape === 'circle') {
        updateCircle(shapeElement, startX, startY, currentX, currentY);
    } else if (shape === 'rectangle') {
        updateRectangle(shapeElement, startX, startY, currentX, currentY);
    } else if (shape === 'line') {
        updateLine(shapeElement, startX, startY, currentX, currentY);
    } else if (shape === 'triangle') {
        updateTriangle(shapeElement, startX, startY, currentX, currentY);
    }
    shapeElement.setAttribute('fill', fillColor); // Установка цвета заливки
}

// Функции для обновления атрибутов фигур
function updateCircle(circle, startX, startY, currentX, currentY) {
    const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
    circle.setAttribute('cx', startX);
    circle.setAttribute('cy', startY);
    circle.setAttribute('r', radius);
}

function updateRectangle(rect, startX, startY, currentX, currentY) {
    const width = currentX - startX;
    const height = currentY - startY;
    rect.setAttribute('x', startX);
    rect.setAttribute('y', startY);
    rect.setAttribute('width', width);
    rect.setAttribute('height', height);
}

function updateLine(line, startX, startY, currentX, currentY) {
    line.setAttribute('x1', startX);
    line.setAttribute('y1', startY);
    line.setAttribute('x2', currentX);
    line.setAttribute('y2', currentY);
}

function updateTriangle(triangle, startX, startY, currentX, currentY) {
    const points = calculateTrianglePoints(startX, startY, currentX, currentY);
    triangle.setAttribute('points', points);
}

// Функция для расчета координат треугольника
function calculateTrianglePoints(startX, startY, endX, endY) {
    const baseX1 = startX;
    const baseY1 = startY;
    const baseX2 = endX;
    const baseY2 = endY;
    const heightX = (startX + endX) / 2; // середина основания
    const heightY = Math.min(startY, endY) - Math.abs(endX - startX) / 2; // вершина
    return `${baseX1},${baseY1} ${baseX2},${baseY2} ${heightX},${heightY}`;
}

// Очистка полотна
function clearSVG() {
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }
}

// Кнопка очистки
document.getElementById('clearSVG').addEventListener('click', clearSVG);