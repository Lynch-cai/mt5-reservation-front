<template>
  <div class="finish-container">
    <div class="window">
      <div class="finish-header">
        <font-awesome-icon icon="fa-solid fa-circle-check" />
        <h3>Votre réservation a bien été pris en compte !</h3>
      </div>
      <div class="box finish-box">
        <div class="finish-information-row">
          <label class="label" for="">Nom et prénom</label>
          <span>{{ payload.last_name }} {{ payload.first_name }}</span>
        </div>
        <div class="finish-information-row">
          <label class="label" for="">Date et horaire</label>
          <span> {{ formatDate(payload.reservation_date) }} | {{ payload.start_time }} à {{ payload.end_time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePayloadStore } from '../stores/usePayload'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const payloadStore = usePayloadStore()
    const { payload } = storeToRefs(payloadStore)
    return { payload }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const options = { day: 'numeric', month: 'long', year: 'numeric' }
      const formattedDate = date.toLocaleDateString('fr-FR', options)
      return formattedDate
    }
  }
}
</script>
