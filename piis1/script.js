let numberOfFilms;

do {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?');
} while (isNaN(numberOfFilms) || numberOfFilms <= 0); // проверка

const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

function askForMovie() {
    let movieTitle, movieRating;

    do {
        movieTitle = prompt('Один из последних просмотренных фильмов?');
    } while (!movieTitle || movieTitle.length > 50);

    // Первая с большой, остальные с маленькой
    movieTitle = movieTitle.charAt(0).toUpperCase() + movieTitle.slice(1).toLowerCase();

    do {
        movieRating = prompt('На сколько оцените его?');
    } while (!movieRating || isNaN(movieRating) || movieRating <= 0 || movieRating > 10);

    return { title: movieTitle, rating: movieRating };
}

for (let i = 0; i < numberOfFilms; i++) {
    const { title, rating } = askForMovie(); // вернет
    personalMovieDB.movies[title] = rating; // добавляет информацию о фильме в объект и ключ-объект
}

console.log(personalMovieDB);