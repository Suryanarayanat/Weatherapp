//  WHEATHER APP

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "ca7ab973fa51548ed44e33bd28cbd9a2";


weatherform.addEventListener("submit", async event => {
    
    event.preventDefault();         // this will automaticallyy relodes the ppage
    const city = cityinput.value;

    if(city)
    {
        try
        {
            const weatherData = await getweatherdata(city);
            displayweatherinfo(weatherData);

        }
        catch(error)
        {
            console.error(error);
            displayError(error);
        }
    }
    else
    {
        displayError("Please enter a city");
    }
});

async function getweatherdata(city)
{
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
    const response = await fetch(apiurl);

    if(!response.ok)
    {
        throw new Error("could not fetch weather data");

    }

    return await response.json();

}

function displayweatherinfo(data)
{
    const {name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;
            
    card.textContent ="";
    card.style.display ="flex";

    const citydisplay = document.createElement("h1");
    const tempdisplay = document.createElement("p");
    const humiditydisplay = document.createElement("p");
    const descriptiondisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    citydisplay.textContent = city;
    tempdisplay.textContent = `${((temp - 273.15) * (9/5) + 32).toFixed(2)}°F`;         // kelvin to celcius (temp - 273.15)  and celcius to ferinheat (temp - 273.15) * (9/5) + 32  this is the formula  
    humiditydisplay.textContent = `humidity: ${humidity}%`;
    descriptiondisplay.textContent = description;
    weatherEmoji.textContent = getweatheremoji(id);

    citydisplay.classList.add("citydisplay");
    tempdisplay.classList.add("tempdisplay");
    humiditydisplay.classList.add("humiditydisplay");
    descriptiondisplay.classList.add("descriptiondisplay");
    weatherEmoji.classList.add("weatheremoji")

    card.appendChild(citydisplay);
    card.appendChild(tempdisplay);
    card.appendChild(humiditydisplay);
    card.appendChild(descriptiondisplay);
    card.appendChild(weatherEmoji);
  
}

function getweatheremoji(wheatherid)
{
    switch(true)
    {
        case (wheatherid >= 200 && wheatherid < 300):
            return "⛈️";
        case (wheatherid >= 300 && wheatherid < 400):
            return "🌧️";
        case (wheatherid >= 500 && wheatherid < 600):
            return "🌦️";
        case (wheatherid >= 600 && wheatherid < 700):
            return "❄️";
        case (wheatherid >= 700 && wheatherid < 800):
            return  "🌫️";
        case (wheatherid === 800):
            return "🌞";
        case (wheatherid >= 801 && wheatherid < 810):
            return "💭";
        default:
            return "❓";
    }
}

function displayError(message)
{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";      // this will resets the data 
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}



































