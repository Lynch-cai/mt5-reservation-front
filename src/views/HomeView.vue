<template>
  <div class="home-container">
    <div class="window">
      <h3>Lien rapide</h3>
      <div class="home-links-container">
        <RouterLink :to="{ name: 'create' }"><button class="button">Accéder au dashboard</button></RouterLink>
        <RouterLink :to="{ name: 'join' }"><button class="button">Accéder au calendrier</button></RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>
