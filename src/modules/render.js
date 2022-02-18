const cardContainer = document.querySelector("#cardContainer");

export default function createCards(pokemon) {
    const stringToInsert = pokemon.map((el) =>
        `
    <div class="card card-${el.id}">
        <div class="card-body">
            <img class="card-image" src="${el.image}" alt="Image ${el.name}">
            <h5 class="card-title">${el.id}. ${el.name}</h5>
            <p class="card-text">Type: ${el.type}</p>
        </div>
    </div>
    `
    ).join("");
    cardContainer.innerHTML = stringToInsert;
}; 