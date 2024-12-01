// генерация контента на основе shirts
function displayShirts() {
    const shirtsContainer = document.getElementById('shirtsContainer');

    shirts.forEach(shirt => {
        // получает контейнер с карточками
        const shirtCard = document.createElement('div'); // создал новый див
        shirtCard.className = 'shirt-card'; // присвоили стиль

        // проверка наличия изображения
        const frontImage = shirt.colors.white ? shirt.colors.white.front : shirt.default.front;

        // заполняет карточку хтмл-разметкой
        shirtCard.innerHTML = `
            <div class="card-content">
                <img src="${frontImage}" alt="${shirt.name} Front" class="shirt-image" />
                <h2 class="card-title">${shirt.name}</h2>
                <p class="card-price">${shirt.price}</p>
                <div class="btn-keeper">
                    <button class="btn" onclick='openQuickView(${JSON.stringify(shirt)})'>Quick View</button>
                    <button class="btn">See Page</button>
                </div>
            </div>
        `;

        // добавить в контейнер
        shirtsContainer.appendChild(shirtCard);
    });
}

// открытие модального окна для предпросмотра
function openQuickView(shirt) {
    document.getElementById('quickViewFrontImage').src = shirt.colors.white.front;
    document.getElementById('quickViewBackImage').src = shirt.colors.white.back;
    document.getElementById('quickViewTitle').textContent = shirt.name;
    document.getElementById('quickViewDescription').textContent = shirt.description;
    document.getElementById('quickViewPrice').textContent = shirt.price;
    document.getElementById('quickViewModal').style.display = 'block'; // показывает окно
}

// Закрытие модального окна
function closeModal() {
    document.getElementById('quickViewModal').style.display = 'none';
}

// Привязка события к кнопке закрытия
document.getElementById('closeModal').onclick = closeModal;
document.getElementById('closeModalButton').onclick = closeModal;

// Инициализация
window.onload = displayShirts;