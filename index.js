let page = 1;
const btnsig = document.getElementById('buttonsig')
const btnant = document.getElementById('buttonant')
const form = document.getElementById('form')
const input = document.getElementById('input')




// FUNCION PRINCIPAL CONNECT API //

const connectAPI = async () => {
    const url = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=YOUR-API-KEY&lenguage=es-ES&page=${page}`)
    console.log(url)

    try {
        if (url.status === 200) {
            const data = await url.json()

            let cardInfo = '';
            data.results.forEach(movies => {
                cardInfo = cardInfo + `
                <div class="card" id="card">
                <img src="https://image.tmdb.org/t/p/w500/${movies.poster_path}">
                <h6/> ${movies.title}
            </div>
                `
            });

            let titles = `
            <h1/> PELÍCULAS
            `;

            let NUMPAGE = `
            ${page} /263
            `


            document.getElementById('hero').innerHTML = cardInfo;
            document.getElementById('titles').innerHTML = titles;
            document.getElementById('numpage').innerHTML = NUMPAGE;



            // manejo de errores
        } else if (url.status === 401) {
            console.log('error 401')
        } else if (url.status === 404) {
            console.log('La pelicula no existe')
        }

    } catch (error) {
        console.log(error)
    }

}




// FUNCIONES ANTERIOR Y SIGUIENTE //

btnsig.addEventListener('click', (e)=>{

    e.preventDefault()

    if(page < 1000){
        page += 1
        connectAPI()
    }
})

btnant.addEventListener('click', (e)=>{
    e.preventDefault()

    if(page > 1){
        page -= 1
        connectAPI()
    }
})


////////////////////////////////////////////////////







// QUERY SEARCH && BUSQUEDA CAMBIOS //


form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const inputvalue = input.value;
    const url = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR-API-KEY&lenguage=es-ES&query=${inputvalue}&page=${page}`)


    try {
        if (url.status === 200) {
            const data = await url.json()
            console.log(data)

            let cardInfo = '';
            data.results.forEach(movies => {
                cardInfo = cardInfo + `
                <div class="card" id="card">
                <img src="https://image.tmdb.org/t/p/w500/${movies.poster_path}">
                <h6/> ${movies.title}
            </div> `
            });

            
            let titles = `
            <h1/> RESULTADOS PARA: <span class="resStyle">${inputvalue}</span> 
            `;


            document.getElementById('hero').innerHTML = cardInfo;
            document.getElementById('titles').innerHTML = titles;
            document.getElementById('buttons').style.display = 'none';



            // manejo de errores
        } else if (url.status === 401) {
            console.log('error 401')
        } else if (url.status === 404) {
            console.log('La pelicula no existe')
        }

    } catch (error) {
        console.log(error)
    }
});

connectAPI();






