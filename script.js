// Base url and api key
const tmdbApiKey = "74c1eda1a478bc791ab265d00c837f8c"
const tmdbBaseUrl = "http://api.themoviedb.org/3";
const apiQuery = `?api_key=${tmdbApiKey}`


const imageBase = "https://image.tmdb.org/t/p/w500";


const movieImages = tmdbBaseUrl + "/movie/550/images" + apiQuery;

const movie = tmdbBaseUrl + "/movie/550" + apiQuery;


const movieCardContainer = document.querySelector(".movieCardContainer")
const getMoviesBtn = document.querySelector(".getMovies-btn");
const emptyDiv = document.querySelector(".fillWithMovie");

const randomNumber = endNumber => Math.floor(Math.random() * endNumber);


// Get a random page out of the movie discover endpoint
const languageQuery = "&language=de"
const discoverMoviesBase = tmdbBaseUrl + "/discover/movie"+ apiQuery + languageQuery;
/*
const pageQuery = "&page=" + getRandomNumber;
const discoverMoviesPage = discoverMoviesBase + pageQuery;*/



const getMaxId = async() => {

    try {
        const movieList = await fetch(discoverMoviesBase);
        if (movieList.ok) {
            const movieListRespone = await movieList.json();
            const totalIds = movieListRespone.total_results;
            return randomNumber(totalIds);
        }
    } catch(error) {
        console.log(error);
    }
}
/*
const getRandomMovie = async() => {
    const randomId = await getMaxId();
    const movieQuery = "/movie/";

    const randomMovieUrl = tmdbBaseUrl + movieQuery + randomId + apiQuery + languageQuery;
    try {
        const randomMovieResponse = await fetch(randomMovieUrl);
        if (randomMovieResponse.ok) {
            const randomMovie = await randomMovieResponse.json();
            console.log(randomMovie)
        }
    } catch(error) {
        console.log(error);
    }
}
*/



/*
const getRandomMovie = async() => {
    const randomMoviePage = await getRandomPage();
    //const pageQuery = `&page=${randomMoviePage}`;
    const pageQuery = `&page=501`
    console.log(pageQuery)
    const discoverMoviesPage = discoverMoviesBase + pageQuery;
    try {
        const page = await fetch(discoverMoviesPage);
        if (page.ok) {
            const pageResponse = await page.json();
            console.log(pageResponse)
        }
    } catch (error) {
        console.log(error);
    }
}

getRandomMovie();*/






const getMovie = async() => {
    try {
        const response = await fetch(movie);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            const posterPath = jsonResponse.poster_path;
            const posterUrl = imageBase + posterPath;
            const elem = document.createElement("img");
            elem.setAttribute("src", posterUrl);
            emptyDiv.appendChild(elem);
            elem.classList.add("movieCard")
        }
    } catch (error) {
        console.log(error)
    }
}


const getList = async() => {
    fetch(discoverMoviesBase)
        .then((response) =>  response.json())
        .then((jsonData) => {
            console.log(jsonData)
        } )
        
}

let counter = 0;


const getTrending = async() => {
    const trendingEndpoint = "/trending/all/week";
    let random = rndNumber();
    const randomPage = "&page=" + random; 
    const trendingUrl = tmdbBaseUrl + trendingEndpoint + apiQuery + randomPage;
    try {
        const trendingResponse = await fetch (trendingUrl);
        if (trendingResponse.ok) {
            const trendingJson = await trendingResponse.json();
            const resultsArray = trendingJson.results;
            const randomMovie = resultsArray[randomIndex(resultsArray)];
            return randomMovie;
            

        }
    } catch(error) {
        getTrending();
    }
}

const getFiveImages = async() => {
    removeElementsByClass("movieCard")
    for (let i = 0; i < 5; i++) {
        const newMovie = await getTrending();
        addAsCard(newMovie);
    }
}

function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}


function rndNumber() {
    // 1000 pages are in trending
    const randomNumber = Math.floor(Math.random()*1001)
    if (randomNumber == 0) {
        rndNumber();
    } 
    return randomNumber;

}


function randomIndex(array) {
    const randomIndex = Math.floor(Math.random()*array.length);
    return randomIndex;
}

function addAsCard(movie) {
    const imageUrl = imageBase + movie.poster_path;

    let element = document.createElement("img");
    element.setAttribute("src", imageUrl);
    element.classList.add("movieCard");
    movieCardContainer.appendChild(element);
}

getMoviesBtn.addEventListener("click", getFiveImages)

