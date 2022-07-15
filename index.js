import { modalBodyEl, createModal } from './src/functions.js';


(function () {
  let movies = [];
  let genresList = [];
  const selectEl = document.getElementById("filterGenre");

  const moviesListEl = document.querySelector('.moviesList');
  const movieListTopRated = document.querySelector('.moviesList__top_rated')
  const loadingEl = document.querySelector('.loading');
 
  const API_KEY = `ad6baf64ad75ee341315fda666f2d48e`;
  // const SITE_BASE = `https://api.themoviedb.org/4/list/534569?page=1&api_key=${API_KEY}`
  // const SITE_BASE = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=${API_KEY}&language=en-US`
  const SITE_BASE = `https://api.themoviedb.org/3/movie/top_rated?api_key=`;
  // const SITE_BASE_POP = `https://api.themoviedb.org/3/movie/popular?api_key=`;
  // const SITE_BASE = `https://api.themoviedb.org/3/find/{external_id}?api_key=ad6baf64ad75ee341315fda666f2d48e&external_source=imdb_id`;

  const SITE_BASE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=`


  
  const SITE_URL = `${SITE_BASE}${API_KEY}`;
  const SITE_URL_GENRES = `${SITE_BASE_GENRES}${API_KEY}`;

  /* primo FETCH su top rated api */
  fetch(SITE_URL)
  .then((res) => {
    console.log({ res });
    return res.json();
  })
  .then((json) => {
    console.log(json);
    
    const swiper_top_rated = new Swiper(".swiper_top_rated", {
      slidesPerView: 8,
      spaceBetween: 10,
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true,
      // },
      breakpoints: {
        "@0.00": {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        "@0.50": {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        "@0.75": {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        "@1.00": {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        "@1.50": {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        "@1.75": {
          slidesPerView: 6,
          spaceBetween: 10,
        },
        "@2.50": {
          slidesPerView: 8,
          spaceBetween: 10,
        }
      },
      // navigation: {
      //   nextEl: ".swiper-button-next__top_rated",
      //   prevEl: ".swiper-button-prev__top_rated",
      // },
    });
    
    movies = json.results;
    movieListTopRated.innerHTML = movies
    .map((item, index) => {
      
      return `
        <div class="swiper-slide">
          <a class="btnModal" href="">
            <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="mw-100 " data-index="${index}">
            <h3 class="mt-1">${item.original_title}</h3>
          </a>
        </div>
      `
    })
    .join('');
  })
  .then( () => {
    createModal();
    document.querySelectorAll('.btnModal').forEach((item, index, array) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        const dataIndex = event.target.getAttribute("data-index");
        // console.log('selected movie', movies[dataIndex])
        const modalClassEl = document.querySelector('.modal');
        const modalOverlayEl = document.querySelector('.modal-overlay');
        // console.log(movies[dataIndex].vote_average / 2)
        modalOverlayEl.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movies[dataIndex].poster_path})`;
        modalBodyEl.innerHTML = `
          <div class="flexible">
            <div class="fix-h">
              <img src="https://image.tmdb.org/t/p/w500/${movies[dataIndex].poster_path}" class="mw-100">
            </div>
            <div>
              <h3 class="mb-2">${movies[dataIndex].original_title}</h3>  
              <p>
                ${movies[dataIndex].overview}
              </p>
              <div class="Stars" style="--rating: ${movies[dataIndex].vote_average / 2};" aria-label="Rating of this product is ${movies[dataIndex].vote_average / 2} out of 5.">
            </div>
          </div>
        `;
        modalClassEl.style.display = 'block';
        // console.log('clicked')
      });
    })
    return loadingEl.style.display = 'none';
  })
  .catch((err) => {
    console.error(err);
    moviesListEl.innerHTML = `<li>C'è stato un errore, riprovare!</li>`;
    return []; // array vuoto
  })
  .finally( () => {
    
  });



  fetch(SITE_URL_GENRES)
  .then((res) => {
    console.log({ res });
    return res.json();
  })
  .then((json) => {
    console.log(json);
    genresList = json.genres
    // console.log(genresList, 'genres list')
    const emptyOptionEl = document.createElement('option');
    emptyOptionEl.textContent = 'Choose your movie genre...';
    selectEl.appendChild(emptyOptionEl);
    genresList.forEach( (genre, index) => {
      const optionEl = document.createElement('option');
      optionEl.value = genre.id;
      optionEl.textContent = genre.name;
      selectEl.appendChild(optionEl);
    })
    selectEl.addEventListener("change", (event) => {
    
      const swiper_filter = new Swiper(".swiper_filter", {
        slidesPerView: 8,
        spaceBetween: 10,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        // },
        breakpoints: {
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.50": {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          "@1.00": {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          "@1.75": {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          "@2.50": {
            slidesPerView: 8,
            spaceBetween: 10,
          }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      
      moviesListEl.innerHTML = genresList
      .filter( (item, index, array) => {
        // console.log('selected Index target', parseInt(selectEl.options[selectEl.selectedIndex].value))
        // console.log('item id', item.id)
        // console.log('are the two values equal to each other?', selectEl.options[selectEl.selectedIndex].value === item.id)
        return selectEl.options[selectEl.selectedIndex].value == item.id
      })
      .map((item, index) => {
        loadingEl.style.display = 'block';
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=ad6baf64ad75ee341315fda666f2d48e&with_genres=${item.id}`)
        .then( (res) => res.json())
        .then( ( data ) => {
          movies = data.results
          moviesListEl.innerHTML = movies
          .map((item, index) => {
            // console.log(item);
            return `
              <div class="swiper-slide">
                <a class="btnModal" href="">
                  <div class="fix-h">
                    <img src="https://image.tmdb.org/t/p/w500/${item.poster_path}" class="mw-100 " data-index="${index}">
                  </div>
                  <h3 class="mt-1">${item.original_title}</h3>
                </a>
              </div>
            `
          })
          .join('');
        })
        .then( () => {
          if(typeof modalClassEl != 'undefined' && modalClassEl != null) {
            createModal();
          }
          
          document.querySelectorAll('.btnModal').forEach((item, index, array) => {
            item.addEventListener("click", (event) => {
              event.preventDefault();
              const dataIndex = event.target.getAttribute("data-index");
              // console.log('selected movie', movies[dataIndex])
              const modalClassEl = document.querySelector('.modal');
              const modalOverlayEl = document.querySelector('.modal-overlay');
              // console.log(movies[dataIndex].vote_average / 2)
              modalOverlayEl.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500/${movies[dataIndex].poster_path})`;
              modalBodyEl.innerHTML = `
                <div class="flexible">
                  <img src="https://image.tmdb.org/t/p/w500/${movies[dataIndex].poster_path}" class="mw-100">
                  <div>
                    <h3 class="mb-2">${movies[dataIndex].original_title}</h3>  
                    <p>
                      ${movies[dataIndex].overview}
                    </p>
                    <div class="Stars" style="--rating: ${movies[dataIndex].vote_average / 2};" aria-label="Rating of this product is ${movies[dataIndex].vote_average / 2} out of 5.">
                  </div>
                </div>
              `;
              modalClassEl.style.display = 'block';
              // console.log('clicked')
            });
          })
          return loadingEl.style.display = 'none';
        })
      })
      
    })
  })
  

  

})();

