const BASE_URL = 'https://rickandmortyapi.com/api/character';

async function getCharacters(){
    //Promesas
    try{
        const response = await fetch(BASE_URL);
        if(!response.status !== 200){
            throw new Error(`Error en la petición ${response.status}`);
        }
            const data = await response.json();
            const characters = data.results.map(param => param.name);
            console.log(characters);
    }
    catch(error){
        console.error('Hubo un problema al obtener el personaje: ', error);

    }
}

//lamada a la función
getCharacters();