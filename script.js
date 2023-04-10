const URL_API = "https://pokeapi.co/api/v2/pokemon?limit=8&offset=0";
let pokemons = [];
//Funcion para traer todos los pokemons;
const getPokemonsFromApi = async (url) => {
    try {
        const { data } = await axios.get(url);
        console.log(data.results)
        // Mapeamos los resultados para obtener la imagen de cada pokemon
        const pokemonsData = await Promise.all(data.results.map(async (pokemon) => {
            const { data: pokemonData } = await axios.get(pokemon.url);
            return {
                name: pokemon.name,
                image: pokemonData.sprites.front_default,
                id: pokemonData.id,
                level: pokemonData.base_experience,
                type: pokemonData.types[0].type.name,
                abilityOne: pokemonData.abilities[0].ability.name,
                abilityTwo: pokemonData.abilities[1].ability.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                imageMain: pokemonData.sprites.other.dream_world.front_default,
                imageIcon: pokemonData.sprites.other.home.front_default,
            };

        }));

        console.log(pokemonsData);
        return pokemonsData;
    } catch (error) {
        console.log(error);
        alert("Error");
        return {};
    }
};

const containerBtns = document.querySelector(".footer");
console.log(containerBtns);
const printImage = (poke, container) => {
    container.innerHTML = "";
    poke.forEach(pokemon => {
        container.innerHTML += `
        <figure class = "pokemon">
            <img src= ${pokemon.image} alt = ${pokemon.name} data-img = ${pokemon.id}>
        </figure>
        `;
    });
}


const table = document.querySelector('.main__table');
const title = document.querySelector(".title_main ");
const image = document.querySelector(".main_figure");
const printPokemonInfo = (pokemon) => {

    // Crea un string con el HTML para mostrar la información del pokemon en la tabla
    const pokemonInfo = `
        <tr>
            <td><span class="caracterisiticas_table">N°</span> <br> <span class="info_avatar">${pokemon.id}</span></td>
            <td><span class="caracterisiticas_table"> NIVEL </span> <br><span class="info_avatar">${pokemon.level}</span></td>
        </tr>

        <tr>
            <td><span class="caracterisiticas_table"> TIPO </span> <br><span class="info_avatar">${pokemon.type}</span></td>
            <td><span class="caracterisiticas_table">HABILIDAD</span> <br><span class="info_avatar">${pokemon.abilityOne} y ${pokemon.abilityTwo}</span> </td>
        </tr>

        <tr>
            <td><span class="caracterisiticas_table"> ALTURA </span><br> <span class="info_avatar">${pokemon.height} m</span></td>
            <td><span class="caracterisiticas_table"> PESO </span> <br><span class="info_avatar">${pokemon.weight} kg</span></td>
        </tr>

        
    `;
    const pokemonTitle = `
    <figure>
        <img src=${pokemon.imageIcon} alt=${pokemon.name}>
    </figure>
    <p>${pokemon.name}</p>`;
    const pokemonImage = `
    <img src=${pokemon.imageMain} alt=${pokemon.name} class="image">
    `



    // Actualiza el contenido del elemento de la tabla con el HTML creado
    table.innerHTML = pokemonInfo;
    title.innerHTML = pokemonTitle;
    image.innerHTML = pokemonImage;
};

// Agrega un listener de eventos click a cada imagen
containerBtns.addEventListener('click', (e) => {
    const pokemonId = e.target.getAttribute('data-img');
    const selectedPokemon = pokemons.find(pokemon => pokemon.id == pokemonId);

    if (selectedPokemon) {
        printPokemonInfo(selectedPokemon);
    }
});


const headerPokemons = document.querySelector("#searchInput");
const searchInput = document.querySelector('.container_pokemons');

//Input de búsqueda
headerPokemons.addEventListener('input', (e) => {
    const searchValue = e.target.value.toLowerCase();
    console.log(searchValue)
    const filteredPokemons = pokemons.filter((pokemon) =>
        pokemon.name.includes(searchValue)

    );
    console.log("filter", filteredPokemons);
    printImage(filteredPokemons, searchInput)
    
});
searchInput.addEventListener('click', (e) => {
    const pokemonId = e.target.getAttribute('data-img');
    const selectedPokemon = pokemons.find(pokemon => pokemon.id == pokemonId);

    if (selectedPokemon) {
        printPokemonInfo(selectedPokemon);
    }
});



document.addEventListener("DOMContentLoaded", async () => {
    //Ejecutamos Función que obtiene los pokemones cada vez que se recargue la pagina
    pokemons = await getPokemonsFromApi(URL_API);
    console.log(pokemons)
    printImage(pokemons, containerBtns);
});
