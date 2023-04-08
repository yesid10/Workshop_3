//import axios from 'axios';


let infoPoke = [];
console.log("ya estoy enlasada con el javascript"); //hace peticion a la url de api pokemon.
const POKEDEX_URL = "https://pokeapi.co/api/v2/pokemon/"

//crear funcion para tener informacion del pokemon//

const infoApi = async (url) => {  //
    const InfoPokemons = [];

    try {
        const { data } = await axios.get(url); //try hace la peticion a la api, se ejecuta cuando no hay errores.
        console.log("estoy en la data:", data.results);
        return data;

    } catch (error) { //catch se utiliza para el manejo de errores.
        console.log("tienes un error");
        return [];
    }


}

document.addEventListener("DOMContentLoaded", async () => {
    infoPoke = await infoApi(POKEDEX_URL)
}) //hacemos peticion a la api, //DOMContentLoaded 