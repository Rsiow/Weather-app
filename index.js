require("dotenv").config();
const appId = process.env.API_KEY;


const cityInput = document.querySelector('#city-input');
const submitInput = document.querySelector('#weather-button');
const weatherOutput = document.querySelector('#weather-output');

const getDataForCity = cityInput => fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${appId}&units=metric`)
    .then(response => response.json());

// Card template to show weather info
const createCardHtml = (name, temp, feelsLike, description) => {
    const html = `
    <div class="card">
        <div class="row no-gutters align-items-center">    
            <div class="col-10">
                <div class="card-body">
                    <div class="row card-title justify-content-between align-items-center mr-3 mb-1">
                        <h4>${name}</h4>
                        <h6>${temp}c, feels like ${feelsLike}c</h6>
                    </div>
                    <div class="row">
                        <h5 class="card-subtitle text-muted">${description}</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
};

// On click of submit button, fetch data to input in weather card template
submitInput.addEventListener('click', () => {
    let cityValue = cityInput.value
    getDataForCity(cityValue).then(data => {

        const name = data.name;
        const temp = data.main.temp;
        const feelsLike = data.main.feels_like;
        const description = data.weather[0].description;
        const cardHtml = createCardHtml(name, temp, feelsLike, description);
        weatherOutput.innerHTML = cardHtml
    })
});

// submitInput.addEventListener('click', async () => {
//     const city = cityInput.value;
//     const getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}&units=metric`);
//     const data = await getData.json();
//     const name = data.name;
//     const temp = data.main.temp;
//     const feelsLike = data.main.feels_like;
//     const description = data.weather[0].description;

//     const cardHtml = createCardHtml(name, temp, feelsLike, description);
//     // Place data-filled template into main HTML for display
//     weatherOutput.innerHTML = cardHtml;
// });