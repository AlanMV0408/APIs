//URL BASE de la API rick and morty (Characteres/Personajes)
const BASE_URL = 'https://rickandmortyapi.com/api/character';

//MANULIPAR EL DOM
//Seleccionar los elementos del DOM
//Referencias a los elementos del DOM: contenedor de los personajes 

const container = document.getElementById("characters-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//variables para la paginación
let currentPage = 1; //Pagina actual
let totalPages = 1 ; //Total de paginas

async function getCharacters(page = 1){
    try {
        const response = await fetch(`${BASE_URL}?page=${page}`);

        if(!response.ok){
            throw new Error('Error en la respuesta de la API');
        } 
        const data = await response.json();

        totalPages = data.info.pages; //Actualizar el total de paginas

        renderCharacters(data.results); 

        updateButtons(); //Actualizar los botones de paginación
    }
    catch(error){
       container.innerHTML = `<p> ❌ Error al obtener los personajes: ${error.message}</p>`;
    }
}

//Funcion para renderizar un array de personajes en el 
//contenedor HTML 

function renderCharacters(character){
    container.innerHTML = ''; //Limpiar el contenedor
    //Iterar sobre cada personaje en el array de personajes
    character.forEach(param => {
        const card = document.createElement('div'); 
        card.className = "card"; 

        card.innerHTML = `
            <img class="character-image" src="${param.image}" alt="${param.name}" /></img>
         <h2>${param.name}</h2>
         <p style="font-size: 1.2rem;"> 📛 Especie: ${param.species}</p>
         <p style="font-size: 1.2rem;"> ❤️ Estado: ${param.status}</p>
         <p style="font-size: 1.2rem;"> 🚻 Género: ${param.gender}</p>
         <p style="font-size: 1.2rem;"> 🌍 Origen: ${param.origin.name}</p>
         <p style="font-size: 1.2rem;"> 📍Ubicación: ${param.location.name}</p>
         <p style="font-size: 1.2rem;"> 🎬 Episodios: ${param.episode.length}</p>
            `;
            container.appendChild(card); //Agregar la tarjeta al contenedor
    })  
}

function updateButtons(){
    prevButton.disabled = currentPage === 1; //Deshabilitar el botón de anterior si estamos en la primera página
    nextButton.disabled = currentPage === totalPages; //Deshabilitar el botón de siguiente si estamos en la última página
}

prevButton.addEventListener('click', () => {
    if(currentPage > 1){
        currentPage--;
        getCharacters(currentPage);
    }
})
    
nextButton.addEventListener('click', () => {  
    if(currentPage < totalPages){
        currentPage++;
        getCharacters(currentPage);
    }
})

//Llamar a la función para obtener los personajes
getCharacters();
