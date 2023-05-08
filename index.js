const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const API_KEY = 'deb4b1e54d9c55fa267674416b68661d';
const SEARCHAPI = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Call returnMovies() with the default URL when the page loads
returnMovies(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`);

function returnMovies(url){
    fetch(url)
        .then(res => res.json())
        .then(function(data){
            console.log(data.results);
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');

                const div_col = document.createElement('div');
                div_col.setAttribute('class', 'col');

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');
                
                const title = document.createElement('h3');
                title.setAttribute('id' , 'title')

                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;

                div_card.appendChild(image);
                div_card.appendChild(title);
                div_col.appendChild(div_card);
                div_row.appendChild(div_col);

                main.appendChild(div_row);
            });
        });
} 

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    main.innerHTML = '';

    const searchTerm = search.value;

    // Update the URL with the search query
    if (searchTerm) {
        returnMovies(SEARCHAPI + searchTerm);
    } else {
        // If the search query is empty, return the default URL
        returnMovies(`https://api.themoviedb.org/3/movie/550?api_key=${API_KEY}`);
    }
});
