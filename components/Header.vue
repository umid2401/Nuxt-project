<template>
  <header class="weather-header">
    <div class="logo">
      <img src="../assets/images/weather.png" alt="Logo" width="55" />
      <span>Vue weather</span>
    </div>

    <div class="header-actions">
      <!-- Dark-Light Mode Toggle Button -->
      <button @click="toggleDarkMode" class="dark-mode-toggle">
        <img src="../assets/images/dark-light.png" alt="Logo" />
      </button>
      <div class="city-input-container">
        <input
          type="text"
          v-model="city"
          placeholder="Выбрать город"
          class="city-input"
          @input="handleChange"
        />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
const store = useStore();
const isDarkMode = ref(false);
const city = ref("");
const weather = computed(() => store.getters["weather/weather"]);
const fetchDefaultWeather = async () => {
  if (city.value) {
    try {
      store.dispatch("loader/showLoader");
      const res = await store.dispatch("weather/fetchWeather", city.value);
      store.dispatch("loader/hideLoader");
    } catch (error) {
      store.dispatch("loader/hideLoader");
      console.error("Error fetching default weather:", error);
    }
  } else {
    try {
      store.dispatch("loader/showLoader");
      await store.dispatch("weather/fetchWeather", "Tashkent");
      store.dispatch("loader/hideLoader");
    } catch (error) {
      store.dispatch("loader/hideLoader");
      console.error("Error fetching default weather:", error);
    }
  }
};
const handleChange = () => {
  fetchDefaultWeather();
  console.log(city.value);
};
onMounted(() => {
  store.dispatch("weather/fetchWeather", "Tashkent");
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  document.body.classList.toggle("dark-mode", isDarkMode.value);
};
</script>

<style lang="scss">
$primary-color: #3b82f6;
$dark-bg: black;
$light-bg: #ffffff;
$input-bg: #f1f5f9;
$input-border: #e2e8f0;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.weather-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-radius: 5px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  .logo {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
      font-family: "Montserrat";
      font-weight: 700;
      font-size: 25px;
      line-height: 30px;
      text-transform: uppercase;
      color: #4793ff;
    }
  }
  .header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    .dark-mode-toggle {
      background: transparent;
      border: none;
      color: #fff;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
    .city-input-container {
      position: relative;
      display: flex;
      align-items: center;
      .city-input {
        padding: 0.6rem 1rem;
        outline: none;
        border: none;
        background-color: $input-bg;
        font-size: 1rem;
        color: black;
        background: rgba(71, 147, 255, 0.2);
        border-radius: 10px;
        text-align: center;
        &::placeholder {
          color: #94a3b8;
        }
        //   &:focus {
        //     border-color: $primary-color;
        //     box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        //   }
      }
    }
  }
}

body.dark-mode {
  background-color: $dark-bg;
  color: $light-bg;
  .weather-header {
    background-color: $dark-bg;
    .city-input {
      background-color: #2d3748;
      color: #fff;
      border-color: #4a5568;
      &::placeholder {
        color: #a0aec0;
      }
    }

    .icon {
      color: #a0aec0;
    }
  }
  .container {
    .first-box {
      h3 {
        color: white;
      }
    }
    .second-box {
      .weather-info {
        p {
          color: white;
          strong {
            color: #939cb0;
          }
        }
      }
    }
  }
  .weather-container {
    .card {
      .weather-card {
        .weather-date {
          h3 {
            color: wheat;
          }
        }
      }
    }
  }
}

/* Responsive Styles */
@media (max-width: 992px) {
  .weather-header {
    padding: 1rem;
  }
  .logo {
    span {
      font-size: 20px;
    }
  }
  .header-actions {
    gap: 0.5rem;
    .city-input-container {
      width: 100%;
    }
  }
}

@media (max-width: 600px) {
  .weather-header {
    padding: 0.5rem;
    flex-direction: column;
    gap: 10px;
  }
  .logo {
    span {
      font-size: 18px;
    }
    img {
      width: 50px;
    }
  }

  .header-actions {
    align-items: center;
    .city-input-container {
      width: 100%;
    }

    .dark-mode-toggle {
      width: 100%;
    }
  }
}
</style>
