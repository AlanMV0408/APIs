BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'; 

//Crearemos la estructura del HTML 
//Seleccionando los elementos del DOM

const container = document.getElementById("characters-container");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//Variables para la paginación
let currentPage = 1; //Pagina actual    
let totalPages = 1; //Total de paginas