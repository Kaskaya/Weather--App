const main = document.getElementById("main");
const button = document.getElementById("submit-button");

//Covert characters to english
String.prototype.turkishtoEnglish = function () {
  return this.replace("Ğ", "g")
    .replaceAll("Ü", "u")
    .replaceAll("Ş", "s")
    .replaceAll("I", "i")
    .replaceAll("İ", "i")
    .replaceAll("Ö", "o")
    .replaceAll("Ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ü", "u")
    .replaceAll("ş", "s")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ç", "c");
};

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

    if (cityName.toLowerCase() == result.location.name.toLowerCase()) {
      addWeather(result);
    } else {
      alert("There is no city with that name");
    }
  } catch (error) {
    console.error(error);
  }
}
const addWeather = (data) => {
  const weatherIcon = data.current.condition.icon;
  const tempCelsius = data.current.temp_c;
  const region = data.location.name;
  const text = document.getElementById("maintext");
  text.innerHTML = "";
  const weather = document.createElement("div");

  weather.classList.add("weather");

  weather.innerHTML = `
  <h1 class="text-4xl">${region}</h1>
  <h1 class="flex justify-center text-4xl"><img src="${
    "https:" + weatherIcon
  }" width="110" 
  height="110"></h1>
  <h1 class="text-4xl font-bold text-white"> ${tempCelsius}°C </h1>
  `;
  text.appendChild(weather);
};

function handleSubmit() {
  const input = document.getElementById("input");
  const cityName = input.value.turkishtoEnglish();
  input.value = "";
  if (cityName) {
    getData(cityName);
  }
}
