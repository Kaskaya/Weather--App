/* const input = document.getElementById("input"); */
const main = document.getElementById("main");
const button = document.getElementById("submit-button");

const url = (cityName) =>
  `https://weatherapi-com.p.rapidapi.com/current.json?q=${cityName}.1%2C-0.13`;
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "13969c4b57msh1d9758d7beab3e0p1cf1a4jsn52e8767f7924",
    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
  },
};

async function getData(cityName) {
  try {
    const response = await fetch(url(cityName), options);
    const result = await response.json();

    addWeather(result, cityName);

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}
const addWeather = (data, cityName) => {
  const weatherText = data.current.condition.text;
  const tempCelsius = data.current.temp_c;
  const text = document.getElementById("maintext");
  text.innerHTML = "";
  const weather = document.createElement("div");

  weather.classList.add("weather");

  weather.innerHTML = `
  <h1 class="text-5xl font-bold text-white border-black">${tempCelsius}°C</h1>
  <h1>${weatherText}</h1>
  <h1>${cityName}</h1>
  `;
  text.appendChild(weather);
  console.log(weatherText, tempCelsius);
};

function handleSubmit() {
  const input = document.getElementById("input");
  const cityName = input.value;
  input.value = "";
  if (cityName) {
    getData(cityName);
  }
}

/* 
if (button) {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    handleSubmit(e);
  });
} */
