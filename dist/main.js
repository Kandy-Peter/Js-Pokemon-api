/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHNCQUFzQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStEO0FBQy9EO0FBQ0EsS0FBSztBQUNMLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsU0FBUztBQUNwRCxxQ0FBcUMsTUFBTSxJQUFJLFFBQVE7QUFDdkQseUNBQXlDLFFBQVE7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Kcy1Qb2tlbW9uLWFwaS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQZXIgc2NlZ2xpZXJlIGwnaW50ZXJ2YWxsbyBkaSBwb2vDqW1vbiBjaGUgdm9nbGlvIHZpc3VhbGl6emFyZVxyXG5sZXQgcGFnZU51bSA9IDE7XHJcbmxldCBvZmZzZXRQb2tlbW9uID0gMDtcclxuY29uc3QgY2FyZHNGb3JQYWdlID0gMTI7XHJcblxyXG5jb25zdCBjYXJkQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjYXJkQ29udGFpbmVyXCIpO1xyXG5cclxubG9hZENhcmRzKCk7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uTmFtZVVybChvZmZzZXRQb2tlbW9uKSB7XHJcbiAgY29uc3QgcmVzID0gYXdhaXQgZmV0Y2goXHJcbiAgICBcImh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbj9vZmZzZXQ9XCIgK1xyXG4gICAgICBvZmZzZXRQb2tlbW9uICtcclxuICAgICAgXCImbGltaXQ9XCIgK1xyXG4gICAgICBjYXJkc0ZvclBhZ2VcclxuICApO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBnZXRQb2tlbW9uRGF0YSh1cmwpIHtcclxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwpO1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vLyBTT0xVWklPTkUgMSAtIGFzeW5jL2F3YWl0XHJcbi8vIFBpw7kgdmVsb2NlIHNlY29uZG8gaWwgcGFubmVsbG8gcGVyZm9ybWFjZVxyXG5cclxuLy8gTW9kaWZpY28gUG9seWZpbGwgZm9yRWFjaCBwZXIgZmFybG8gZnVuemlvbmFyZSBjb24gY2hpYW1hdGUgYXNpbmNyb25lXHJcbmFzeW5jIGZ1bmN0aW9uIGFzeW5jRm9yRWFjaChhcnJheSwgY2FsbGJhY2spIHtcclxuICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyYXkubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICBhd2FpdCBjYWxsYmFjayhhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkQ2FyZHMoKSB7XHJcbiAgY2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGxvYWRpbmdQYWdlKCk7XHJcbiAgbGV0IHBva2Vtb24gPSBbXTtcclxuICBnZXRQb2tlbW9uTmFtZVVybChvZmZzZXRQb2tlbW9uKS50aGVuKGFzeW5jIChub21lVXJsKSA9PiB7XHJcbiAgICBhd2FpdCBhc3luY0ZvckVhY2gobm9tZVVybC5yZXN1bHRzLCAoZWwpID0+XHJcbiAgICAgIGdldFBva2Vtb25EYXRhKGVsLnVybCkudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgIHBva2Vtb24ucHVzaCh7XHJcbiAgICAgICAgICBuYW1lOiBkYXRhLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBlbC5uYW1lLnN1YnN0cigxKSxcclxuICAgICAgICAgIGltYWdlOiBkYXRhLnNwcml0ZXMuZnJvbnRfZGVmYXVsdCxcclxuICAgICAgICAgIGlkOiBkYXRhLmlkLFxyXG4gICAgICAgICAgdHlwZTogZGF0YS50eXBlcy5tYXAoKHRwKSA9PiB0cC50eXBlLm5hbWUpLmpvaW4oXCIsIFwiKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIGNyZWF0ZUNhcmRzKHBva2Vtb24pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBsb2FkaW5nUGFnZSgpIHtcclxuICBsZXQgbG9hZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoNVwiKTtcclxuICBsb2FkaW5nLmlubmVyVGV4dCA9IFwiTG9hZGluZy4uLlwiO1xyXG4gIGxvYWRpbmcuY2xhc3NOYW1lID0gXCJsb2FkaW5nXCI7XHJcbiAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChsb2FkaW5nKTtcclxufVxyXG4vLyBTT0xVWklPTkUgMiAtIFByb21pc2UuYWxsXHJcbi8vIFBpw7kgbGVudGEgc2Vjb25kbyBpbCBwYW5uZWxsbyBwZXJmb3JtYWNlXHJcbi8qXHJcbmxldCBwcm9taXNlc0RhdGFQb2tlbW9uID0gW107XHJcblxyXG5nZXRQb2tlbW9uTmFtZVVybChwYWdlTnVtKS50aGVuKG5vbWVVcmwgPT4ge1xyXG4gICAgbm9tZVVybC5yZXN1bHRzLm1hcChlbCA9PiBwcm9taXNlc0RhdGFQb2tlbW9uLnB1c2goZ2V0UG9rZW1vbkRhdGEoZWwudXJsKSkpO1xyXG4gICAgUHJvbWlzZS5hbGwocHJvbWlzZXNEYXRhUG9rZW1vbikudGhlbihkYXRhID0+IHtcclxuICAgICAgICBwb2tlbW9uID0gZGF0YS5tYXAoZWwgPT4gKHsgXHJcbiAgICAgICAgICAgIG5hbWU6IGVsLm5hbWUuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBlbC5uYW1lLnN1YnN0cigxKSwgXHJcbiAgICAgICAgICAgIGltYWdlOiBlbC5zcHJpdGVzLmZyb250X2RlZmF1bHQsIFxyXG4gICAgICAgICAgICBpZDogZWwuaWQsIFxyXG4gICAgICAgICAgICB0eXBlOiBlbC50eXBlcy5tYXAodHAgPT4gdHAudHlwZS5uYW1lKS5qb2luKCcsICcpIH0pKTtcclxuICAgICAgICBjcmVhdGVDYXJkcyhwb2tlbW9uKTtcclxuICAgIH0pO1xyXG59KTtcclxuKi9cclxuXHJcbi8vIFNPTFVaSU9ORSAxIC0gaW5uZXJIVE1MXHJcbi8qXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmRzKHBva2Vtb24pIHtcclxuICAgIGNvbnN0IHN0cmluZ1RvSW5zZXJ0ID0gcG9rZW1vbi5tYXAoKGVsKSA9PlxyXG4gICAgICAgIGA8ZGl2IGNsYXNzPVwiY29sLXhsLTMgY29sLWxnLTQgY29sLW1kLTEyIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYXJvdW5kXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZCBteS00XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiPlxyXG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiY2FyZC1pbWFnZVwiIHNyYz1cIiR7ZWwuaW1hZ2V9XCIgYWx0PVwiSW1hZ2UgUG9rZW1vblwiPlxyXG4gICAgICAgICAgICA8aDUgY2xhc3M9XCJjYXJkLXRpdGxlXCI+JHtlbC5pZH0uICR7ZWwubmFtZX08L2g1PlxyXG4gICAgICAgICAgICA8cCBjbGFzcz1cImNhcmQtdGV4dFwiPlR5cGU6ICR7ZWwudHlwZX08L3A+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+YFxyXG4gICAgKS5qb2luKFwiXCIpO1xyXG4gICAgY2FyZENvbnRhaW5lci5pbm5lckhUTUwgPSBzdHJpbmdUb0luc2VydDtcclxufTsgXHJcbiovXHJcblxyXG4vLyBTT0xVWklPTkUgMiAtIGNyZWF0ZUVsZW1lbnRcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUNhcmRzKHBva2Vtb24pIHtcclxuICBjYXJkQ29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgcG9rZW1vbi5tYXAoKGVsKSA9PiB7XHJcbiAgICBsZXQgY29sdW1uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNvbHVtbi5jbGFzc05hbWUgPVxyXG4gICAgICBcImNvbC14bC0zIGNvbC1sZy00IGNvbC1tZC0xMiBkLWZsZXgganVzdGlmeS1jb250ZW50LWFyb3VuZFwiO1xyXG5cclxuICAgIGxldCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNhcmQuY2xhc3NOYW1lID0gXCJjYXJkIG15LTRcIjtcclxuXHJcbiAgICBsZXQgY2FyZEJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgY2FyZEJvZHkuY2xhc3NOYW1lID0gXCJjYXJkLWJvZHlcIjtcclxuXHJcbiAgICBsZXQgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xyXG4gICAgaW1hZ2Uuc2V0QXR0cmlidXRlKFwic3JjXCIsIGVsLmltYWdlKTtcclxuICAgIGltYWdlLnNldEF0dHJpYnV0ZShcImFsdFwiLCBcIkltYWdlIFBva2Vtb25cIik7XHJcbiAgICBpbWFnZS5jbGFzc05hbWUgPSBcImNhcmQtaW1hZ2VcIjtcclxuXHJcbiAgICBsZXQgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDVcIik7XHJcbiAgICB0aXRsZS5pbm5lclRleHQgPSBlbC5pZCArIFwiLiBcIiArIGVsLm5hbWU7XHJcbiAgICB0aXRsZS5jbGFzc05hbWUgPSBcImNhcmQtdGl0bGVcIjtcclxuXHJcbiAgICBsZXQgdHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgdHlwZS5pbm5lclRleHQgPSBcIlR5cGU6IFwiICsgZWwudHlwZTtcclxuICAgIHR5cGUuY2xhc3NOYW1lID0gXCJjYXJkLXRleHRcIjtcclxuXHJcbiAgICBjYXJkQm9keS5hcHBlbmRDaGlsZChpbWFnZSk7XHJcbiAgICBjYXJkQm9keS5hcHBlbmRDaGlsZCh0aXRsZSk7XHJcbiAgICBjYXJkQm9keS5hcHBlbmRDaGlsZCh0eXBlKTtcclxuICAgIGNhcmQuYXBwZW5kQ2hpbGQoY2FyZEJvZHkpO1xyXG4gICAgY29sdW1uLmFwcGVuZENoaWxkKGNhcmQpO1xyXG4gICAgY2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChjb2x1bW4pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCBhcnJvd1JpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignKltkYXRhLXRhcmdldD1cImFycm93UmlnaHRcIl0nKTtcclxuYXJyb3dSaWdodC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGFnZVVwKTtcclxuXHJcbmNvbnN0IGFycm93TGVmdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJypbZGF0YS10YXJnZXQ9XCJhcnJvd0xlZnRcIl0nKTtcclxuYXJyb3dMZWZ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwYWdlRG93bik7XHJcblxyXG5mdW5jdGlvbiBwYWdlVXAoKSB7XHJcbiAgaWYgKHBhZ2VOdW0gPCBNYXRoLmNlaWwoOTY0IC8gY2FyZHNGb3JQYWdlKSkge1xyXG4gICAgcGFnZU51bSsrO1xyXG4gICAgb2Zmc2V0UG9rZW1vbiA9IHBhZ2VOdW0gKiBjYXJkc0ZvclBhZ2U7XHJcbiAgICBsb2FkQ2FyZHMoKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBhZ2VEb3duKCkge1xyXG4gIGlmIChwYWdlTnVtID4gMCkge1xyXG4gICAgcGFnZU51bS0tO1xyXG4gICAgb2Zmc2V0UG9rZW1vbiA9IHBhZ2VOdW0gKiBjYXJkc0ZvclBhZ2U7XHJcbiAgICBsb2FkQ2FyZHMoKTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9