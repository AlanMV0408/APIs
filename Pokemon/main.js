const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"; //Endpoint de la API

//Crearemos la estructura del HTML 
//Seleccionando los elementos del DOM
//Botones para la paginación
const container = document.getElementById("pokemons-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//Variables para la paginación
let currentPage = 1; //Pagina actual    
let totalPages = 5; //Total de paginas



//Funcion para obtener los pokemones 
async function getPokemons() {
    try {
       //Pagina actual
        const limit = 4;
        const offset = (currentPage - 1) * limit;
        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
         //Solicitar los pokemones a la API
        //en caso de error de respuesta
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
        }
        //Extraer los datos de la respuesta de un JSON a un objeto de JavaScript
        const data = await response.json();
        const pokemonsDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return await res.json();
            })
        );
        showPokemons(pokemonsDetails);

        udateButtons();
        //Actualizar el total de paginas
    }
    catch (error) {
        //Mostrar un error en el contenedor de los personajes 
        container.innerHTML = `<p> ❌ Error al obtener los pokemones: ${error.message} </p>`;
    }
}  

//Funcion para mostrar los pokemones
 function showPokemons(pokemons) {
    //Limpiar el contenedor de los pokemones
    container.innerHTML = "";
    //Recorrer los pokemones
    pokemons.forEach((param) => {
        //Crear un elemento div para cada pokemon
        const cardPoke = document.createElement("div");
        //Añadimos una clase al div
        cardPoke.className = "card";
        //Estructura del card en el HTML de cada pokemon
        cardPoke.innerHTML = `
            <img class = "pokemon-image" src="${param.sprites.front_default}" alt="${param.name}"/>
            <h2>${param.name}</h2>
            <p style="font-size: 1.2em;">  🪪 ID: ${param.id}</p>
            <p style="font-size: 1.2em;"> Habilidades 🤛: ${param.abilities.map(ability => ability.ability.name).join(", ")}</p>
            <p style="font-size: 1.2em;"> 🐊 Tipo : ${param.types.map(type => type.type.name).join(", ")}</p>
            `;

            //Añadir el card al contenedor
            container.appendChild(cardPoke);
    });
 }

//Funcion para la paginacion
function udateButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

//Eventos de los botones
prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getPokemons(currentPage);
    }
})

nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        getPokemons(currentPage);
    }
})


getPokemons();