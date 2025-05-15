BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'; //Endpoint de la API

//Crearemos la estructura del HTML 
//Seleccionando los elementos del DOM
//Botones para la paginación
const container = document.getElementById("characters-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//Variables para la paginación
let currentPage = 1; //Pagina actual    
let totalPages = 1; //Total de paginas

//Funcion para obtener los pokemones
async function getPokemons(page = 1) {
    try {
        //Solicitar los pokemones a la API
        const response = await fetch(`${BASE_URL}?page=${page}`);
        //en caso de error de respuesta
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
        }
        //Extraer los datos de la respuesta de un JSON a un objeto de JavaScript
    }
    catch (error) {
        //Mostrar un error en el contenedor de los personajes 
        container.innerHTML = `<p> ❌ Error al obtener los pokemones: ${error.message} </p>`;
    }
}  