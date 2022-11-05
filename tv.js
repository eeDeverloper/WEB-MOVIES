let page = 1;
const btnsig = document.getElementById('buttonsig')
const btnant = document.getElementById('buttonant')
const form = document.getElementById('form')
const input = document.getElementById('input')



// FUNCION PRINCIPAL CONNECT API //

const connectAPI = async () => {
    const url = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=YOUR-API-KEY&lenguage=es-ES&page=${page}`)
    console.log(url)

    try {
        if (url.status === 200) {
            const data = await url.json()
            console.log(data)


            let cardTVInfo = '';
            data.results.forEach(program => {
                cardTVInfo = cardTVInfo + `
                <div class="card" id="card">
                <img src="https://image.tmdb.org/t/p/w500/${program.poster_path}">
                <h6/> ${program.original_name}
                </div>
                `
            });

            let titleTV = `
            <h1/> PROGRAMAS DE TV
            `

            
            let NUMPAGE = `
            ${page}
            `;

            document.getElementById('hero').innerHTML = cardTVInfo;
            document.getElementById('titles').innerHTML = titleTV;
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

btnsig.addEventListener('click', (e)=>{
    e.preventDefault()

    if(page < 1000){
        page += 1
        connectAPI();
    }
})

btnant.addEventListener('click', (e)=>{
    e.preventDefault()

    if(page > 1){
        page -= 1
        connectAPI();
    }
})

form.addEventListener('submit', async (e)=>{

    e.preventDefault()

    const inputvalue = input.value;
    const url = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=YOUR-API-KEY&lenguage=es-ES&query=${inputvalue}`)


    try {
        if (url.status === 200) {
            const data = await url.json()
            console.log(data)

            let cardTVInfo = '';
            data.results.forEach(program => {
                cardTVInfo = cardTVInfo + `
                <div class="card" id="card">
                <img src="https://image.tmdb.org/t/p/w500/${program.poster_path}">
                <h6/> ${program.original_name}
            </div> `
            });

            
            let titles = `
            <h1/> RESULTADOS PARA: <span class="resStyle">${inputvalue}</span> 
            `;


            document.getElementById('hero').innerHTML = cardTVInfo;
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

})


connectAPI();
