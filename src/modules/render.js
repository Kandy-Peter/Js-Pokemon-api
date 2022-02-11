const cardContainer = document.querySelector("#cardContainer");

export default function createCards(pokemon) {
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