import './style.css';
import createCards from './modules/render';

let pageNum = 1;
let offsetPokemon = 0;
const cardsForPage = 12;

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

loadCards();