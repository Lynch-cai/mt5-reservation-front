<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/join">User/join</RouterLink>
        <RouterLink to="/finish">User/finish</RouterLink>
        <RouterLink to="/create">Admin/create</RouterLink>
        <RouterLink to="/reservations">Admin/Réservation</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<!-- <style lang="scss">
@import './assets/styles/all.scss';
</style> -->
