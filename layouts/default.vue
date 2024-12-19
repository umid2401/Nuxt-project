<template>
    <div>
        <Loader />
      <Header /> 
      <main>
        <NuxtPage /> 
      </main>
      
    </div>
  </template>
  
  <script setup>
  import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
  import Loader from '~/components/Loader.vue';
  import { onMounted } from 'vue';
import { useStore } from 'vuex';
  const store = useStore();
  onMounted(() => {
  store.dispatch("loader/showLoader");
  setTimeout(() => {
    store.dispatch("loader/hideLoader");
  }, 2000); // 2 soniya
});

  </script>
  
  <style scoped>
  /* You can add global styles here */
 
  </style>
  