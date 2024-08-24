// script.js

// Array para almacenar los datos de Pokémon
let pokemons = [];

// Clase Pokémon
class Pokemon {
    constructor(name, type, weight, moves) {
        this.name = name;
        this.type = type;
        this.weight = weight;
        this.moves = moves;
    }
}

// Función para crear tarjetas de Pokémon
function createPokemonCard(pokemon) {
    const col = document.createElement('div');
    col.classList.add('col-md-4', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card', 'pokemon-card');
    card.setAttribute('data-toggle', 'modal');
    card.setAttribute('data-target', '#pokemonModal');
    card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <p class="card-text">Tipo: ${pokemon.type}</p>
        </div>
    `;

    card.addEventListener('click', () => {
        showPokemonDetails(pokemon);
    });

    col.appendChild(card);
    return col;
}

// Función para mostrar detalles del Pokémon en el modal
function showPokemonDetails(pokemon) {
    const modalTitle = document.getElementById('pokemonModalLabel');
    const modalBody = document.getElementById('pokemonInfo');

    modalTitle.textContent = pokemon.name;
    modalBody.innerHTML = `
        <p><strong>Tipo:</strong> ${pokemon.type}</p>
        <p><strong>Peso:</strong> ${pokemon.weight}</p>
        <p><strong>Movimientos:</strong> ${pokemon.moves.join(', ')}</p>
    `;
}

// Función para cargar los datos de Pokémon desde el archivo JSON local
async function loadPokemonData() {
    try {
        const response = await fetch('pokemons.json');
        const data = await response.json();
        pokemons = data.map(p => new Pokemon(p.name, p.type.join(', '), p.weight, p.moves));

        // Mostrar todos los Pokémon al cargar
        displayPokemons(pokemons);
    } catch (error) {
        console.error('Error al cargar los datos de Pokémon:', error);
    }
}

// Función para mostrar los Pokémon en el contenedor
function displayPokemons(pokemonList) {
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = ''; // Limpiar el contenedor

    pokemonList.forEach(pokemon => {
        const card = createPokemonCard(pokemon);
        pokemonContainer.appendChild(card);
    });
}

// Función para buscar Pokémon por nombre
function searchPokemon() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(filter)
    );

    displayPokemons(filteredPokemons);
}

// Event listener para el botón de BUSCAR
document.getElementById('searchButton').addEventListener('click', searchPokemon);

// Cargar datos de Pokémon al cargar la página
document.addEventListener('DOMContentLoaded', loadPokemonData);
