const BASE_URL = "https://pokeapi.co/api/v2/pokemon/"; //Endpoint de la API

//Crearemos la estructura del HTML 
//Seleccionando los elementos del DOM
//Botones para la paginación
const container = document.getElementById("pokemons-container");
const prevButton = document.getElementById("prev");
const pageNum = document.getElementById("pageNum");
const nextButton = document.getElementById("next");

//Variables para la paginación
const limit = 5; 
let offset = 0;
let totalPokemons = 0;



//Funcion para obtener los pokemones 
async function getPokemons() {
    try {

        const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
         //Solicitar los pokemones a la API
        //en caso de error de respuesta
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status} ${response.statusText}`);
        }
        //Extraer los datos de la respuesta de un JSON a un objeto de JavaScript
        const data = await response.json();
        totalPokemons = data.count; //Total de pokemones

        //Es una promesa que recorre el array de pokemones
        //y obtiene los detalles de cada uno de ellos
        const pokemonsDetails = await Promise.all(
            data.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return await res.json();
            })
        );

        showPokemons(pokemonsDetails);  //Mostrar los pokemones
        MostrarPageNum();              //Mostrar el numero de la pagina 
        updateButtons();              //Actualizar el total de paginas
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
            <p class = "Voz"></p>
            <p class = "circle">🔴🟡🟢</p>
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

 function MostrarPageNum(){
    //Mostrar el numero de la pagina
    let NewpageNum = (offset / limit) + 1;
    pageNum.textContent = NewpageNum
    pageNum.textContent = `Página ${NewpageNum}`;
 }

//Funcion para la paginacion
function updateButtons() {
    prevButton.disabled = offset <= 0;
    nextButton.disabled = offset + limit >= totalPokemons;
}

//Eventos de los botones 

prevButton.addEventListener('click', () => { 
    if (offset >= limit) {
        offset -= limit;
        getPokemons();
    }
});

nextButton.addEventListener('click', () => {
    if (offset +  limit < totalPokemons) {
        offset += limit;
        getPokemons();
    }
});


getPokemons();