var span = document.getElementsByClassName("close")[0];
let pokemonBoxes = document.getElementsByClassName("boxButton")
const mainSection = document.getElementById("main-section")
const pokemonList = document.getElementById('pokemonList')
const maxRecords = 151
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0;
let selectedPokemon = {}
let modalName = document.getElementById("modal-name")
let modalNumber = document.getElementById("modal-number")
let modalImg = document.getElementById("modal-img")
let modalHeight = document.getElementById("modal-height")
let modalWeight = document.getElementById("modal-weight")
let modalBox = document.getElementById("modal-content")
const modalTypes = document.getElementById("modal-types")
const modalAbilities = document.getElementById("modal-abilities")


function loadPokemonItens(offset, limit) {


    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
            <button type="button" value="${pokemon.number}" class="boxButton">
            <span id="pokeId" class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" 
                alt="${pokemon.name}">
            </div>
            </button>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
        makingListeners()
    })
}

function makingListeners() {
    for (let i = 0; i < pokemonBoxes.length; i++) {
        pokemonBoxes[i].addEventListener("click", openPokemonModal(pokemonBoxes[i].value))
    }
    return
}

function openPokemonModal(pokeId){
    return function () {
        let selectedPokemon = pokeApi.getPokemon(pokeId)
        .then((pokemonDetails) => {
            modalBox.removeAttribute('class')            
            modalBox.classList.add(pokemonDetails.type, "type");

            modalName.innerHTML = pokemonDetails.name
            modalNumber.innerHTML = "#" + pokemonDetails.number
            modalImg.src = pokemonDetails.photo
            modalHeight.innerHTML = pokemonDetails.height + " cm"
            modalWeight.innerHTML = pokemonDetails.weight + " Kg"

            modal.style.display = "block"
            const newTypeHtml = pokemonDetails.types.map((type) => `
            <li class="type ${type}">${type}</li>
            `).join('')
            modalTypes.innerHTML = newTypeHtml

            const newMovesHtml = pokemonDetails.abilities.map((move) => `
            <p id="move" class="type">-${move.name} </p>
            `).join('')
            modalAbilities.innerHTML = newMovesHtml
        })
    };
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordNextPage = offset + limit

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }
})


span.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}
