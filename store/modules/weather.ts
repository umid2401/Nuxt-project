import axios from 'axios';
import type { ActionContext } from 'vuex';

interface WeatherState {
  weather: any;
}

const state: WeatherState = {
  weather: null
};

const mutations = {
  setWeather(state: WeatherState, weather: any) {
    state.weather = weather;
  }
};

const actions = {
  async fetchWeather({ commit }: ActionContext<WeatherState, unknown>, city: string) {
        const apiKey = 'dc5b9022d1833fde8b9344a24b1d02d8'; 
        // const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await axios.get(url);
      commit('setWeather', response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  }
};

const getters = {
  weather: (state: WeatherState) => state.weather
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
