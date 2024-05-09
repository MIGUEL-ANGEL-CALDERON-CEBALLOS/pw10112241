<script setup>
import { RouterView } from 'vue-router'
import MenuView from './views/MenuView.vue'
</script>

<template>
  <header>
    <!-- la tipografia tiene derecho de autor -->
    <!-- <h1>Hola</h1>  -->
    <MenuView/>
  </header>
  
  <RouterView />
</template>

<style scoped>

</style>
