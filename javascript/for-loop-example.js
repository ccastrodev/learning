const movies= [
    {name: "Movie One", category: "Fiction"},
    {name: "Movie Two", category: "Horor"},
    {name: "Movie Three", category: "Documentary"}
];
// for loop - (setup ; comparison; change)
for(let i = 0; i <= 3; i++) {
    console.log(movies[i]);
}
// forEach
movies.forEach(function(myMovies) {
    console.log(movies[i]);
}
// map - Create array of movie names
const movieNames = movies.map(function(myMovies) {
    return movies.name;
});
const movieTest = movies.map(myMovies => '${movies.name} [${movies.start} - ${movies.end}]');