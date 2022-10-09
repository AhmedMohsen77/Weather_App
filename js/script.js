const form = document.querySelector(".research_form");
const input = document.querySelector(".input");

const weatherFun = async function (city = "alexandria") {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=f2032f76b4604baa9fb124727221106&q=${city}&days=3&aqi=no&alerts=no`
    );

    const { forecast, location, current } = await data.json();

    const [today, tomorrow, afterTomorrow] = forecast.forecastday;

    const date = new Date(today.date);

    const weatherContainer = document.querySelector(".weather-Container");

    console.log(date.getDay(), today.date);

    const weekDays = [
      "Sundays",
      "Tuesday",
      "MonDay",
      "Wednesdays",
      "Thursdays",
      "Fridays",
      "Saturday",
    ];

    const windDir = (dirLet) => {
      const dir = {
        n: "North",
        s: "South",
        e: "East",
        w: "West",
        ne: "Northeast",
        nw: "northwest",
        se: "southeast",
        sw: "southwest",
        nne: "north-northeast",
        ene: "east-northeast",
        esr: "east-southeast",
        sse: "south-southeast",
        ssw: "south-southwest",
        wsw: "west-southwest",
        wnw: "west-northwest",
        nnw: "North-northwest",
      };

      return dir[dirLet.toLowerCase()];
    };

    input.classList.remove("text-danger");
    input.classList.add("text-white");

    const html = `
            <div class="col-lg-4 forecast p-0">
                <div class='forecast_head'>
                    <p class='m-0 d-flex justify-content-between p-2'>
                        <span class='day'>${weekDays[date.getDay()]}</span>
                        <span class='day'>${date.toLocaleDateString("en-gb", {
                          month: "short",
                          day: "numeric",
                        })}</span>
                    </p>
                </div>
                <div class='forecast_body p-2  py-3'>
                    <h2>${location.name}</h2>
        
                    <div class='weather-info d-flex gap-3 align-items-center flex-wrap'>
                        <h2 class="text-white" style="font-size: 4rem">${
                          today.day.maxtemp_c
                        }<sup>o</sup>C</h2>
                        <div class=img-fluid >
                            <img src=${today.day.condition.icon}>
                        </div>
                        <p class='lead w-100 main-color'>${
                          today.day.condition.text
                        }</p>
                        <div class='d-flex gap-3'>
                          <div class='d-flex gap-2'>
                            <img src='images/icon-umberella.png' >
                            <span>${current.precip_mm}%</span>
                          </div>
                          <div class='d-flex gap-2'>
                            <img src='images/icon-wind.png' >
                            <span>${current.wind_mph} m/h</span>
                          </div>
                          <div class='d-flex gap-2'>
                            <img src='images/icon-compass.png' >
                            <span>${windDir(current.wind_dir)}</span>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 forecast p-0">
                <div class='forecast_head'>
                    <p class='m-0 d-flex justify-content-center p-2'>
                        <span class='day'>${weekDays[date.getDay() + 1]}</span>
                    </p>
                </div>
                <div class='forecast_body p-2  py-3'>
                    <div class='weather-info d-flex gap-3 align-items-center flex-column'>
                        <div class=img-fluid >
                            <img src=${tomorrow.day.condition.icon}>
                        </div>
                        <h2 class="text-white" style="font-size: 2rem">${
                          tomorrow.day.maxtemp_c
                        }<sup>o</sup>C</h2>
                        <h3 style="font-size: 1rem">${
                          tomorrow.day.mintemp_c
                        }<sup>o</sup>C</h3>
                        
                        <p class='lead  main-color'>${
                          tomorrow.day.condition.text
                        }</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 forecast p-0">
                <div class='forecast_head'>
                    <p class='m-0 d-flex justify-content-center p-2 '>
                        <span class='day'>${weekDays[date.getDay() + 2]}</span>
                    </p>
                </div>
                <div class='forecast_body p-2  py-3'>
                    <div class='weather-info d-flex gap-3 align-items-center flex-column'>
                        <div class=img-fluid >
                          <img src=${afterTomorrow.day.condition.icon}>
                        </div>
                        <h2 class="text-white" style="font-size: 2rem">${
                          afterTomorrow.day.maxtemp_c
                        }<sup>o</sup>C</h2>
                        <h3 style="font-size: 1rem">${
                          afterTomorrow.day.mintemp_c
                        }<sup>o</sup>C</h3>
                        <p class='lead  main-color'>${
                          tomorrow.day.condition.text
                        }</p>
                    </div>
                </div>
            </div>
          `;

    weatherContainer.innerHTML = html;
  } catch {
    if (input.classList.contains("text-danger")) return;
    input.classList.remove("text-white");
    input.classList.add("text-danger");
  }
};

weatherFun();

input.addEventListener("keydown", function () {
  const inputValue = this.value;

  weatherFun(inputValue);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  weatherFun(input.value);
});
