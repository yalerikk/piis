// Находим все элементы с классом target
const targets = document.querySelectorAll('.target');
// возвращает статический список всех элементов в документе, которые имеют класс target

// Для хранения состояния перетаскивания
let isDragging = false; // перетаскивается
let isPinned = false; // закреплено
let offsetX, offsetY; // верхнего левого угла элемента
let originalPosition = {}; // объект, который будет хранить оригинальные координаты
const body = document.body; // элемент body для отключения прокрутки

// Отключаем прокрутку
const disableScroll = () => {
    body.style.overflow = 'hidden';
};

// Включаем прокрутку
const enableScroll = () => {
    body.style.overflow = '';
};

// Обработчик для перемещения элементов
const handleMouseMove = (event) => {
    // Вычисляем новые координаты
    let newX = event.pageX - offsetX;
    let newY = event.pageY - offsetY;
    
    if (isDragging) {
        // обновляем позицию элемента, если движется
        const target = event.target;
        // event.target - объект - элемент, на к-й указывает курсор мыши

        // Получаем размеры окна
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Проверяем границы
        if (newX < 0) newX = 0; // Левый край
        if (newY < 0) newY = 0; // Верхний край
        if (newX + target.offsetWidth > windowWidth) newX = windowWidth - target.offsetWidth; // Правый край
        if (newY + target.offsetHeight > windowHeight) newY = windowHeight - target.offsetHeight; // Нижний край

        target.style.left = `${newX}px`;
        // текущие коор -  расстояние между курсором мыши и левым краем элемента
        target.style.top = `${newY}px`;
        // обновляют CSS-свойства, чтобы переместить элемент.
    } else if (isPinned) {
        // двойной клик
        const target = document.querySelector('.target.pinned');
        if (target) {
            target.style.left = `${newX}px`;
            target.style.top = `${newY}px`;
        }
    }
};

// Обработчик для отпускания мыши
const handleMouseUp = () => {
    isDragging = false;
    isPinned = false;
    enableScroll(); // Включаем прокрутку
};

// Обработчик для нажатия клавиши Esc
const handleKeyDown = (event) => {
    // если нажато Escape и эл закреплен
    if (event.key === 'Escape' && isPinned) {
        const target = document.querySelector('.target.pinned');
        if (target) {
            // возврат на начальную позицию
            target.style.left = `${originalPosition.x}px`; // 150px
            target.style.top = `${originalPosition.y}px`;
            // удаляем pinned, открепляем эл
            target.classList.remove('pinned');
            isPinned = false;
        }
    }
};

// Добавляем обработчики событий для каждого эл
targets.forEach(target => {
    target.addEventListener('mousedown', (event) => {
        // Отключаем прокрутку
        disableScroll();

        // Устанавливаем начальную позицию
        offsetX = event.clientX - target.getBoundingClientRect().left;
        offsetY = event.clientY - target.getBoundingClientRect().top;

        // эл начинает перетаскиваться
        isDragging = true;
    });

    target.addEventListener('dblclick', (event) => {
        // Запоминаем оригинальную позицию
        originalPosition.x = target.getBoundingClientRect().left;
        originalPosition.y = target.getBoundingClientRect().top;

        // Устанавливаем флаг закрепили
        isPinned = true;
        target.classList.add('pinned');
        target.style.backgroundColor = 'green'; // Изменяем цвет
    });

    // Обработчики событий для движения мыши и отпускания
    document.addEventListener('mousemove', handleMouseMove);
    // Связывает обработчик handleMouseUp, который завершает процесс перетаскивания
    document.addEventListener('mouseup', handleMouseUp);
    // Связывает обработчик handleKeyDown, чтобы отслеживать нажатие клавиши Escape.
    document.addEventListener('keydown', handleKeyDown);
});