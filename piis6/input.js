const targets = document.querySelectorAll('.target');

let activeElement = null;
let offsetX, offsetY;
let originalPosition = {};
let followFinger = false;

// Получаем текущие координаты элемента
function getElementPosition(element) {
    return {
        top: parseInt(element.style.top) || 0,
        left: parseInt(element.style.left) || 0
    };
}

// Обработчик для начала перетаскивания
function onMouseDown(event) {
    // передает коор курсора и сам элем
    startDragging(event.clientX, event.clientY, this);
}

function onTouchStart(event) {
    if (event.touches.length > 1) {
        // Если два пальца, сбрасываем элемент
        if (activeElement) {
            resetElement();
        }
        return;
    }
    if (followFinger) {
        // В режиме следования за пальцем - дабл клик
        moveElement(event.touches[0].clientX, event.touches[0].clientY);
    } else {
        // Начинаем перетаскивание
        startDragging(event.touches[0].clientX, event.touches[0].clientY, this);
    }
}

function startDragging(clientX, clientY, element) {
    if (activeElement && activeElement !== element) return;

    // текущий элем = актив
    activeElement = element;
    const position = getElementPosition(activeElement);
    offsetX = clientX - position.left;
    offsetY = clientY - position.top;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);
}

function onMouseMove(event) {
    moveElement(event.clientX, event.clientY);
}

function onTouchMove(event) {
    moveElement(event.touches[0].clientX, event.touches[0].clientY);
}

function moveElement(clientX, clientY) {
    if (!activeElement) return;

    activeElement.style.left = (clientX - offsetX) + 'px';
    activeElement.style.top = (clientY - offsetY) + 'px';
}

// закончили перетаскивание, когда отпустили мышь
function onMouseUp() {
    finishDragging();
}

// закончили перетаскивание, когда пальцы не на экране
function onTouchEnd(event) {
    if (event.touches.length === 0) {
        finishDragging();
    }
}

function finishDragging() {
    if (activeElement) {
        // сохранили позицию актива
        originalPosition[activeElement.id] = getElementPosition(activeElement);
        activeElement.style.backgroundColor = 'red';
        activeElement = null;
    }
    removeDraggingListeners();
}

// Обработчик для двойного клика
function onDoubleClick() {
    if (activeElement) return;

    followFinger = true; // Включаем следование за пальцем
    activeElement = this;
    this.style.backgroundColor = 'blue';

    // добавление обработчиков для следования
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClickDetach);
}

// Обработчик для "отклеивания" элемента
function onClickDetach(event) {
    if (activeElement) {
        activeElement.style.backgroundColor = 'red';
        activeElement = null;
        followFinger = false; // отключаем следование
        removeDraggingListeners();
    }
}

// Функция для сброса элемента
function resetElement() {
    if (activeElement) {
        const originalPos = originalPosition[activeElement.id];
        if (originalPos) {
            activeElement.style.left = originalPos.left + 'px';
            activeElement.style.top = originalPos.top + 'px';
        }
        activeElement.style.backgroundColor = 'red';
        activeElement = null;
    }
}

// Удаление обработчиков перетаскивания
function removeDraggingListeners() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
}

// Обработчик для клавиши Esc
function onKeyDown(event) {
    if (event.key === 'Escape') {
        resetElement();
    }
}

// Добавляем обработчики событий для каждого элемента
targets.forEach(target => {
    target.addEventListener('mousedown', onMouseDown);
    target.addEventListener('dblclick', onDoubleClick);
    target.addEventListener('touchstart', onTouchStart);
});

// Добавляем обработчик нажатия клавиш
document.addEventListener('keydown', onKeyDown);