<template>
  <div class="reservations-container">
    <div class="window">
      <h3>Les réservations</h3>
      <div class="box reservations-box">
        <h4>Jean Paul - <span>27 février 2023 | 9:00 à 9:30</span></h4>
        <div class="reservations-information-row">
          <label class="label" for="">E-mail</label>
          <span>jeanpaul@gmail.com</span>
        </div>
        <div class="reservations-remove-container" tabindex="0" @click.prevent="deleteReservation()">
          <font-awesome-icon icon="fa-solid fa-xmark" /> Annuler
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeReservation } from '../modules/axios'

export default {
  data() {
    return {}
  },
  methods: {
    deleteReservation() {
      removeReservation(id)
    }
  }
}
</script>
