const getPokemonNameUrl = async (offsetPokemon) => {
    const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?offset=" +
        offsetPokemon +
        "&limit=" +
        12
    );
    const data = await res.json();
    return data;
}

const getPokemonData = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}

const asyncForEach = async (array, callback) => {
    for (let i = 0; i < array.length; i += 1) {
        await callback(array[i], i, array);
    }
}

export { getPokemonData, getPokemonNameUrl, asyncForEach };