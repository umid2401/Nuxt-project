<template>
  <div class="container" v-if="weatherData">
    <div class="box first-box">
      <h2>{{ weatherData.main?.temp }}°</h2>
      <h3>Сегодня</h3>
      <p>Время: {{ formattedDate }}</p>
      <p>Город: {{ cyrillicCityName }}</p>
      <img :src="icon" alt="Error" width="100" />
    </div>
    <div class="box second-box">
      <div class="weather-info">
        <div class="img-icon">
          <img src="@/assets/images/Group-1.png" alt="Error" />
        </div>
       <div>
        <p>
          <strong>Температура:</strong> {{ weatherData.main?.temp }} ° -
          Ощущается как {{ weatherData.main?.feels_like }} °
        </p>
       </div>
      </div>
      <div class="weather-info">
        <div class="img-icon">
          <img src="@/assets/images/Group-4.png" alt="Error" />
        </div>
        <div>

          <p>
            <strong>Давление:</strong>
            {{ pressureInMmHg }} мм ртутного столба - нормальное
          </p>
        </div>
      </div>
      <div class="weather-info">
        <div class="img-icon">
          <img src="@/assets/images/Group-2.png" alt="Error" />
        </div>
        <div>
          <p><strong>Осадки:</strong> {{ weatherData.weather?.[0]?.main }}</p>
        </div>
      </div>
      <div class="weather-info">
        <div class="img-icon">
          <img src="@/assets/images/Group-3.png" alt="Error" />
        </div>
        <div>
          <p>
            <strong>Ветер:</strong> {{ weatherData.wind?.speed }} м/с
            {{ windDirection }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="weather-container">
    <div class="button-container">
      <button class="button button-week">На неделю</button>
      <button class="button button-cancel">Отменить</button>
    </div>
    <div class="card">
      <div
        class="weather-card"
        v-for="(day, index) in weatherForecast"
        :key="index"
      >
        <div class="weather-date">
          <h3>{{ weatherData.name }}</h3>
          <p>{{ day.date }}</p>
          <img src="@/assets/images/wheater.png" alt="" />
          <h3>{{ day.temperature }}</h3>
          <p>+15</p>
          <p>{{ day.conditions }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { latinToCyrillic } from "~/utils/crillToLotin";
import { formatTimestamp } from "~/utils/formatDate";
import { getWindDirection } from "~/utils/getdeg";
import sun from "@/assets/images/sun.png";
import rain from "@/assets/images/rain.png";
import main_cloudly from "@/assets/images/mainly_cloudy.png";
import smal_rain_sun from "@/assets/images/small_rain_sun.png";
import defaultweather from "@/assets/images/weather.png";

interface WeatherData {
  main?: {
    temp?: number;
    feels_like?: number;
    pressure?: number;
  };
  weather?: { main?: string }[];
  wind?: {
    speed?: number;
    deg?: number;
  };
  name?: string;
  dt?: number;
}

interface ForecastDay {
  date: string;
  temperature: string;
  conditions: string;
}

const store = useStore();

const weatherForecast: ForecastDay[] = reactive([
  { date: "26 авг", temperature: "+18°", conditions: "Облачно" },
  { date: "27 авг", temperature: "+15°", conditions: "Небольшая дождь" },
  { date: "28 авг", temperature: "+18°", conditions: "Облачно" },
  { date: "29 авг", temperature: "+18°", conditions: "Облачно" },
  { date: "30 авг", temperature: "+18°", conditions: "Облачно" },
  { date: "31 авг", temperature: "+18°", conditions: "Облачно" },
  { date: "1 сен", temperature: "+18°", conditions: "Облачно" },
]);

const weatherData = computed<WeatherData>(
  () => store.getters["weather/weather"] || {}
);

const cyrillicCityName = computed(() =>
  latinToCyrillic(weatherData.value.name || "Неизвестный город")
);

const formattedDate = computed(() =>
  formatTimestamp(weatherData.value.dt || 0)
);

const windDirection = computed(() =>
  getWindDirection(weatherData.value.wind?.deg || 0)
);

const pressureInMmHg = computed(() =>
  weatherData.value.main?.pressure
    ? Math.round(weatherData.value.main.pressure * 0.750062)
    : "--"
);
const icon = computed(() => {
  const weatherState = weatherData.value?.weather?.[0]?.main?.toLowerCase();

  if (!weatherState) {
    return defaultweather;
  }

  switch (weatherState) {
    case "clear":
      return sun;
    case "clouds":
      return main_cloudly;
    case "rain":
      return rain;
    case "snow":
      return smal_rain_sun;
    default:
      return defaultweather;
  }
});

onMounted(() => {
  store.dispatch("weather/fetchWeather", "Tashkent");
});
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: space-between;
  gap: 5%;
  padding: 1rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  .box {
    padding: 20px;
    border-radius: 20px;
    box-shadow: 2px 5px 25px -3px #b4b4b440;
    p {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }
  .first-box {
    width: 35%;
    min-height: 270px;
    position: relative;
    img {
      position: absolute;
      right: 40px;
      top: 35px;
    }
    h2 {
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 70px;
      margin: 0px 0 5px 0;
      color: #4793ff;
      line-height: 70px;
    }
    h3 {
      font-family: "Montserrat", sans-serif;
      margin: 0 0 5px 0;
      font-weight: 400;
      font-size: 35px;
      line-height: 49px;
      color: #000000;
    }
    p {
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 30px;
      color: #939cb0;
      margin: 5px 0;
    }
    @media (max-width: 500px){
      h2{
        font-size: 50px;
      }
    }
  }
  .second-box {
    width: 60%;
    min-height: 270px;
    background-image: url("../assets/images/cloud.png");
    background-repeat: no-repeat;
    background-position: top right;
    display: grid;
    align-content: space-evenly;
    flex-direction: column;
    .weather-info {
      margin-bottom: 10px;
      display: flex;
      align-items: center; 
      .img-icon{
        background-color: white;
        padding: 20px;
        border-radius: 50%;
        box-shadow: 1px 4px 10px -1px #4793FF33;
        position: relative;
        display: block;
        margin-right: 15px;
        img{
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      p {
        margin: 0;
        font-size: 1em;
        color: #000000;
        font-family: "Montserrat";
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 17px;
        strong {
          margin-right: 20px;
          color: #939cb0;
        }
      }
      @media (max-width: 500px) {
      p{
        line-height: 30px;
      }        
  }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
  @media (max-width: 768px) {
    .first-box {
      width: 100%;
      img{
        width: 60px;
        position: absolute;
      right: 20px;
      top: 35px;
      }
    }
    .second-box {
      width: 100%;
    }
  }
}
.weather-container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin: 0px 0 15px 0;
    }
    .button-week {
      background-color: #007bff;
      color: white;
    }
    .button-cancel {
      background-color: white;
      color: black;
      border: 1px solid #ccc;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 20px 10px;
    box-shadow: 2px 5px 25px -3px #b4b4b440;
    gap: 10px;
    .weather-card {
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 10px 7px;
      width: 13%;
      flex-wrap: wrap;
      text-align: left;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      background: #4793ff33;

      .weather-date {
        h3 {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #000000;
          margin: 5px 0;
        }
        p {
          font-family: "Montserrat";
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 17px;
          color: #939cb0;
          margin: 5px 0;
        }
      }
    }

    @media (max-width: "1000px") {
      .weather-card {
        width: 23%;
        margin: 5px 0;
      }
    }
    @media (max-width: "768px") {
      .weather-card {
        width: 48%;
        margin: 5px 0;
      }
    }
    @media (max-width: "500px") {
      .weather-card {
        width: 100%;
        margin: 5px 0;
      }
    }
  }
}
</style>
