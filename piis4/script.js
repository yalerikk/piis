//import shirts from './shirts.js'

const wrapper = document.querySelector('.wrapper');
const shirtsContainer = document.getElementById('shirtsContainer');

// Функция для создания заголовка
function createTitle() {
    const heading = document.createElement('h1');
    heading.textContent = 'T-Shirts';
    wrapper.insertBefore(heading, shirtsContainer); // Вставляем заголовок перед контейнером
}

// генерация контента на основе shirts
function displayShirts() {
    shirts.forEach(shirt => {
        // получает контейнер с карточками
        const shirtCard = document.createElement('div'); // создал новый див
        shirtCard.className = 'shirt-card'; // присвоили стиль

        const frontImage = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;

        // заполняет карточку хтмл-разметкой
        shirtCard.innerHTML = `
            <div class="card-content">
                <img src="${frontImage}" alt="${shirt.name} Front" class="shirt-image" />
                <h2 class="card-title">${shirt.name}</h2>
                <p class="card-price">${shirt.price}</p>
                <div class="btn-keeper">
                    <button class="btn" onclick='openQuickView(${JSON.stringify(shirt)})'>Quick View</button>
                    <button class="btn" onclick='seePage(${JSON.stringify(shirt)})'>See Page</button>
                </div>
            </div>
        `;

        // добавить в контейнер
        shirtsContainer.appendChild(shirtCard);
    });
}

// открытие модального окна для предпросмотра
function openQuickView(shirt) {
    const quickViewModal = document.createElement('div');
    quickViewModal.id = 'quickViewModal';
    quickViewModal.className = 'modal';
    quickViewModal.innerHTML = `
        <div class="modal-content">
            <div class="images-container">
                <img id="quickViewFrontImage" src="${shirt.colors.white.front}" alt="${shirt.name} Front" />
                <img id="quickViewBackImage" src="${shirt.colors.white.back}" alt="${shirt.name} Back" />
            </div>
            <h2 id="quickViewTitle">${shirt.name}</h2>
            <p id="quickViewDescription">${shirt.description}</p>
            <p id="quickViewPrice">${shirt.price}</p>
            <div class="btn-keeper">
                <button class="btn" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(quickViewModal);
    quickViewModal.style.display = 'block'; // Показывает окно
}

// Закрытие модального окна
function closeModal() {
    const modal = document.getElementById('quickViewModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal); // Удаляем модальное окно после закрытия
    }
}

// Сохранение выбранной футболки и переход на страницу деталей
function seePage(shirt) {
    localStorage.setItem('selectedShirt', JSON.stringify(shirt));
    window.location.href = 'details.html'; // Переход на страницу деталей
}

// Инициализация
window.onload = () => {
    createTitle(); // Создание заголовка
    displayShirts(); // Отображение футболок
};