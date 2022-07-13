// DOM Module Pattern
const domManip = (() => {
    const searchButton = document.querySelector(".search-button");
    const clearButton = document.querySelector(".reset-button");
    searchButton.addEventListener("click", fetchCurrentWeather);
        // e.preventDefault();
        // const searchCity = document.getElementById("search-city").value;
        // const searchState = document.getElementById("search-state").value;
        // const searchCountry = document.getElementById("search-country").value;
        // fetchCurrentWeather(searchCity, searchState, searchCountry);
        // console.log(searchCity);
        // console.log(searchState);
        // console.log(searchCountry);
        // clearSearch();

        
    
    clearButton.addEventListener("click", clearSearch);
})();

// Async function to fetch current forcast from user input on form
async function fetchCurrentWeather(searchCity, searchState, searchCountry) {
    try {
        const searchCity = document.getElementById("search-city").value;
        const searchState = document.getElementById("search-state").value;
        const searchCountry = document.getElementById("search-country").value;

        // Run check to ensure all fields have values
        if (searchCity == "" || searchState == "" || searchCountry == "") {
            alert("All fields are required.  Please try again!");
            return;
        }

        console.log(searchCity);
        console.log(searchState);
        console.log(searchCountry);

        // Run fetch and wait for response JSON
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "," + searchState + "," + searchCountry + "&units=imperial&APPID=d1f87e6c9c7218274f8b83bf9e900783", { mode: "cors"});
        const currentData = await response.json();
        console.log("Fetching current weather data from API....", currentData);
        
        // Construct object for my weather app from the API JSON data
        const currentWeather = {
            mainWeather: currentData.weather[0].main,
            place: currentData.name + ", " + searchState.toUpperCase() + " " + currentData.sys.country,
            description: currentData.weather[0].description.replace(/\b\w/g, letter => (letter.toUpperCase())),
            temp: Math.round(currentData.main.temp),
            humidity: currentData.main.humidity + "%",
            wind: Math.round(currentData.wind.speed) + " mph"
        };

        console.log(currentWeather);

    } catch (err) {
        console.log("Something has went wrong with fetching the current weather data....", err);
    }
}

function clearSearch() {
    document.getElementById("search-city").value = "";
    document.getElementById("search-state").value = "";
    document.getElementById("search-country").value = "";

}