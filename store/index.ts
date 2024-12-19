import { createStore } from 'vuex'
import weather from '@/store/modules/weather'
import loader from '@/store/modules/loader'
const store = createStore({
  modules: {
        weather,
      loader
  }
});

export default store;
