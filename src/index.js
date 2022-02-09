// Per scegliere l'intervallo di pokémon che voglio visualizzare
let pageNum = 1;
let offsetPokemon = 0;
const cardsForPage = 12;

const cardContainer = document.querySelector("#cardContainer");

loadCards();

async function getPokemonNameUrl(offsetPokemon) {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=" +
      offsetPokemon +
      "&limit=" +
      cardsForPage
  );
  const data = await res.json();
  return data;
}

async function getPokemonData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

// SOLUZIONE 1 - async/await
// Più veloce secondo il pannello performace

// Modifico Polyfill forEach per farlo funzionare con chiamate asincrone
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

function loadCards() {
  cardContainer.innerHTML = "";
  loadingPage();
  let pokemon = [];
  getPokemonNameUrl(offsetPokemon).then(async (nomeUrl) => {
    await asyncForEach(nomeUrl.results, (el) =>
      getPokemonData(el.url).then((data) => {
        pokemon.push({
          name: data.name.charAt(0).toUpperCase() + el.name.substr(1),
          image: data.sprites.front_default,
          id: data.id,
          type: data.types.map((tp) => tp.type.name).join(", ")
        });
      })
    );
    createCards(pokemon);
  });
}

function loadingPage() {
  let loading = document.createElement("h5");
  loading.innerText = "Loading...";
  loading.className = "loading";
  cardContainer.appendChild(loading);
}
// SOLUZIONE 2 - Promise.all
// Più lenta secondo il pannello performace
/*
let promisesDataPokemon = [];

getPokemonNameUrl(pageNum).then(nomeUrl => {
    nomeUrl.results.map(el => promisesDataPokemon.push(getPokemonData(el.url)));
    Promise.all(promisesDataPokemon).then(data => {
        pokemon = data.map(el => ({ 
            name: el.name.charAt(0).toUpperCase() + el.name.substr(1), 
            image: el.sprites.front_default, 
            id: el.id, 
            type: el.types.map(tp => tp.type.name).join(', ') }));
        createCards(pokemon);
    });
});
*/

// SOLUZIONE 1 - innerHTML
/*
function createCards(pokemon) {
    const stringToInsert = pokemon.map((el) =>
        `<div class="col-xl-3 col-lg-4 col-md-12 d-flex justify-content-around">
    <div class="card my-4">
        <div class="card-body">
            <img class="card-image" src="${el.image}" alt="Image Pokemon">
            <h5 class="card-title">${el.id}. ${el.name}</h5>
            <p class="card-text">Type: ${el.type}</p>
        </div>
    </div>
</div>`
    ).join("");
    cardContainer.innerHTML = stringToInsert;
}; 
*/

// SOLUZIONE 2 - createElement

function createCards(pokemon) {
  cardContainer.innerHTML = "";
  pokemon.map((el) => {
    let column = document.createElement("div");
    column.className =
      "col-xl-3 col-lg-4 col-md-12 d-flex justify-content-around";

    let card = document.createElement("div");
    card.className = "card my-4";

    let cardBody = document.createElement("div");
    cardBody.className = "card-body";

    let image = document.createElement("img");
    image.setAttribute("src", el.image);
    image.setAttribute("alt", "Image Pokemon");
    image.className = "card-image";

    let title = document.createElement("h5");
    title.innerText = el.id + ". " + el.name;
    title.className = "card-title";

    let type = document.createElement("p");
    type.innerText = "Type: " + el.type;
    type.className = "card-text";

    cardBody.appendChild(image);
    cardBody.appendChild(title);
    cardBody.appendChild(type);
    card.appendChild(cardBody);
    column.appendChild(card);
    cardContainer.appendChild(column);
  });
}

const arrowRight = document.querySelector('*[data-target="arrowRight"]');
arrowRight.addEventListener("click", pageUp);

const arrowLeft = document.querySelector('*[data-target="arrowLeft"]');
arrowLeft.addEventListener("click", pageDown);

function pageUp() {
  if (pageNum < Math.ceil(964 / cardsForPage)) {
    pageNum++;
    offsetPokemon = pageNum * cardsForPage;
    loadCards();
  }
}

function pageDown() {
  if (pageNum > 0) {
    pageNum--;
    offsetPokemon = pageNum * cardsForPage;
    loadCards();
  }
}
