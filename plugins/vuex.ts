// plugins/vuex.ts
import { createStore } from 'vuex'
import weather from '@/store/modules/weather'
import loader from '@/store/modules/loader'
const store = createStore({
  modules: {
        weather,
      loader
  }
});


export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(store)
})
