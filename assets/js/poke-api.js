
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    /*
    pokemon.abilities = pokeDetail.abilities.map((moveSlot) => {
        console.log(moveSlot, "essa eh uma abilidade")
        return moves.push(moveSlot.ability)
    })*/

    pokemon.abilities = pokeDetail.abilities.map((moveSlot) => moveSlot.ability)

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight


    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = function (offset = 0, limit = 10) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

pokeApi.getPokemon = function (pokemonId) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => convertPokeApiDetailToPokemon(jsonBody))
        .catch((error) => console.log(error))
}