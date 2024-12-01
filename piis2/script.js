const personalMovieDB = {
    privat: false, // или true, в зависимости от того, хотите ли вы скрыть таблицу
    movies: {
        "Сваты": 10,
        "Оно": 9,
        "Матрица": 8
    }
};

// Функция для вывода объекта movies в виде таблицы
function displayMovies() {
    // получение элемента HTML с идентификатором movieTableContainer
    const container = document.getElementById('movieTableContainer');

    // Создаем таблицу
    let table = '<table><tr><th>Название фильма</th><th>Оценка</th></tr>';

    // добавление ячейки <tr> - строка, <td> - ячейки
    for (const movie in personalMovieDB.movies) {
        table += `<tr><td>${movie}</td><td>${personalMovieDB.movies[movie]}</td></tr>`;
    }

    // закрыли таблицу
    table += '</table>';

    // Вставляем таблицу в контейнер
    container.innerHTML = table;
}

// Проверка свойства privat
if (!personalMovieDB.privat) {
    displayMovies(); // Вызываем функцию, если privat равно false
}