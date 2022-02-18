import './style.css';
import createCards from './modules/render';
import { getPokemonData, getPokemonNameUrl, asyncForEach } from './modules/getApiData';

let pageNum = 1;
let offsetPokemon = 0;
const cardsForPage = 12;


const loadingPage = () => {
  let loading = document.createElement("h5");
  loading.innerText = "Loading...";
  loading.className = "loading";
  cardContainer.appendChild(loading);
}

const loadCards = () => {
  cardContainer.innerHTML = "";
  loadingPage();
  let pokemon = [];
  getPokemonNameUrl(offsetPokemon).then(async (nameUrl) => {
    await asyncForEach(nameUrl.results, (el) =>
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

const pageUp = () => {
  if (pageNum < Math.ceil(1118 / cardsForPage)) {
    pageNum++;
    offsetPokemon = pageNum * cardsForPage;
    loadCards();
  }
}

const pageDown = () => {
  if (pageNum > 0) {
    pageNum--;
    offsetPokemon = pageNum * cardsForPage;
    loadCards();
  }
}

const arrowRight = document.querySelector('*[data-target="arrowRight"]');
arrowRight.addEventListener("click", pageUp);

const arrowLeft = document.querySelector('*[data-target="arrowLeft"]');
arrowLeft.addEventListener("click", pageDown);

loadCards();