<template>
  <div class="reservations-container">
    <div class="window">
      <h3>Les réservations</h3>
      <div class="reservations-boxes">
        <div class="box reservations-box" v-for="reservation in reservations" v-if="reservations">
          <h4>
            {{ reservation.last_name }} {{ reservation.first_name }} -
            <span>{{ reservation.reservation_date }} | {{ reservation.start_time }} à {{ reservation.end_time }}</span>
          </h4>
          <div class="reservations-remove-container" tabindex="0" @click.prevent="removeReservation(reservation.id)">
            <font-awesome-icon icon="fa-solid fa-xmark" /> Annuler
          </div>
        </div>
        <div v-else>Vous n'avez aucune réservation</div>
      </div>
    </div>
  </div>
</template>

<script>
import { adminGetReservations, removeReservation, getUser } from '../modules/axios'

export default {
  data() {
    return {
      reservations: []
    }
  },
  async mounted() {
    const currentDate = new Date().toISOString().slice(0, 10).toString()
    this.reservations = await adminGetReservations(currentDate, '2999-01-01')
    if (this.reservations) {
      this.reservations.forEach(async (reservation) => {
        reservation.reservation_date = this.formatDate(reservation.reservation_date)
        const user = await getUser(reservation.user_id)
        reservation.last_name = user.last_name
        reservation.first_name = user.first_name
      })
      this.reservations = this.reservations.sort((a, b) => new Date(a.reservation_date) - new Date(b.reservation_date))
    }
  },
  methods: {
    async removeReservation(id) {
      await removeReservation(id)

      this.reservations.splice(
        this.reservations.findIndex((reservation) => reservation.id === id),
        1
      )
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const formattedDate = date.toLocaleDateString('fr-FR', options)
      return formattedDate
    }
  }
}
</script>
