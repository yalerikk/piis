// Получаем данные о футболке из localStorage
const item = JSON.parse(localStorage.getItem('selectedShirt'));
let sideShirt = 'front';
let colorShirt = 'white';

// Находим контейнер для деталей футболки
const shirtDetailsContainer = document.getElementById('shirtDetailsContainer');

// Функция для установки изображения
const setImage = (element, item) => {
    element.src = item.colors[colorShirt][sideShirt];
    element.onerror = () => {
        element.src = item.default[sideShirt]; // Загружаем изображение по умолчанию в случае ошибки
        console.log('Ошибка: картинка не найдена, загружена картинка по умолчанию.');
    };
};

// Функция для отображения страницы
const displayPage = () => {
    // Создание контейнера для футболки
    const shirtContainer = document.createElement('div');
    shirtContainer.className = 'shirts-details-container'; // Применяем класс для стилей
    shirtDetailsContainer.appendChild(shirtContainer); // Добавляем контейнер в основной

    // Создаем контейнер для изображения
    const imagesContainer = document.createElement('div');
    imagesContainer.className = 'details-images-container'; // Применяем класс для стилей
    shirtContainer.appendChild(imagesContainer);

    // Создание изображения
    const shirtImage = document.createElement('img');
    shirtImage.id = 'shirtImage';
    setImage(shirtImage, item); // Устанавливаем изображение
    imagesContainer.appendChild(shirtImage); // Добавляем изображение в контейнер

    // Создаем контейнер для информации о футболке
    const infoContainer = document.createElement('div');
    infoContainer.className = 'info-container'; // Новый класс для информации
    shirtContainer.appendChild(infoContainer); // Добавляем контейнер информации

    // Создание заголовка
    const title = document.createElement('h1');
    title.className = 'card-title';
    title.textContent = item.name;
    infoContainer.appendChild(title); // Добавляем заголовок в контейнер информации

    // Создание цены
    const price = document.createElement('p');
    price.className = 'card-sub';
    price.textContent = item.price;
    infoContainer.appendChild(price); // Добавляем цену в контейнер информации

    // Создание описания
    const description = document.createElement('p');
    description.className = 'card-sub';
    description.textContent = item.description;
    infoContainer.appendChild(description); // Добавляем описание в контейнер информации

    // Создание заголовка для выбора стороны
    const sideHeader = document.createElement('h3');
    sideHeader.textContent = "Side:";
    infoContainer.appendChild(sideHeader); // Добавляем заголовок в контейнер информации

    const sideButtonsContainer = document.createElement('div');
    sideButtonsContainer.className = 'btn-keeper'; // Применяем класс для стилей
    infoContainer.appendChild(sideButtonsContainer); // Добавляем контейнер для кнопок в информацию

    const frontButton = document.createElement('button');
    frontButton.className = 'btn btnFront';
    frontButton.textContent = 'Front';
    sideButtonsContainer.appendChild(frontButton); // Добавляем кнопку в контейнер

    const backButton = document.createElement('button');
    backButton.className = 'btn btnBack';
    backButton.textContent = 'Back';
    sideButtonsContainer.appendChild(backButton); // Добавляем кнопку в контейнер

    // Создание заголовка для выбора цвета
    const colorHeader = document.createElement('h3');
    colorHeader.textContent = "Color:";
    infoContainer.appendChild(colorHeader); // Добавляем заголовок в контейнер информации

    const colorButtonsContainer = document.createElement('div');
    colorButtonsContainer.className = 'color-btns-container'; // Класс для контейнера цветных кнопок
    infoContainer.appendChild(colorButtonsContainer); // Добавляем контейнер для цветных кнопок

    for (const color in item.colors) {
        const btnColor = document.createElement('button');
        btnColor.className = `color-btn ${color}`;
        btnColor.textContent = color.charAt(0).toUpperCase() + color.slice(1);
        btnColor.style.backgroundColor = color; // Устанавливаем цвет кнопки

        if (['white', 'pink', 'yellow'].includes(color)) {
            btnColor.style.color = 'black'; // Меняем цвет текста
        }
        if (color === 'white') {
            btnColor.style.border = '1px solid black'; // Граница для белого цвета
        }

        colorButtonsContainer.appendChild(btnColor); // Добавляем кнопку цвета в контейнер

        btnColor.addEventListener('click', () => {
            colorShirt = color; // Устанавливаем выбранный цвет
            setImage(shirtImage, item); // Обновляем изображение

            // Обновляем обработчик для кнопки Back
            backButton.onclick = () => {
                sideShirt = 'back';
                setImage(shirtImage, item);
            };
        });
    }

    // Обработчики для кнопок "Front" и "Back"
    frontButton.addEventListener('click', () => {
        sideShirt = 'front'; // Устанавливаем сторону
        setImage(shirtImage, item); // Обновляем изображение
    });

    backButton.addEventListener('click', () => {
        sideShirt = 'back'; // Устанавливаем сторону
        setImage(shirtImage, item); // Обновляем изображение
    });

    // Создание кнопки "Close"
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.className = 'btn close-btn';
    closeButton.onclick = () => {
        window.history.back(); // Возврат на предыдущую страницу
    };
    infoContainer.appendChild(closeButton); // Добавляем кнопку "Close" в контейнер информации
};

// Вызов функции для отображения страницы
displayPage();