<template>
  <div class="join-container">
    <div class="window">
      <h3>Sélectionner une date</h3>
      <div class="join-date-container">
        <v-date-picker :attributes="attributes" :disabled-dates="disabledDates" v-model="date" />
        <div class="join-times-container">
          <template v-for="availability in availabilities">
            <div
              class="time-button"
              :class="{ active: payload.start_time === availability.start_time }"
              v-if="availability.day === getDayFromDate(date) && checkIfTimeIsTaken(availability.start_time)"
              @click.prevent=";(payload.start_time = availability.start_time), (payload.end_time = availability.end_time)"
            >
              {{ availability.start_time.slice(0, 5) }}
            </div>
          </template>
        </div>
      </div>

      <hr />
      <h3>Indiquer vos informations</h3>
      <div class="join-inputs-container">
        <div class="join-input-container">
          <label class="label" for="last-name">Nom</label>
          <input required v-model="payload.last_name" class="input" placeholder="Nom" id="last-name" />
        </div>
        <div class="join-input-container">
          <label class="label" for="first-name">Prénom</label>
          <input required v-model="payload.first_name" class="input" placeholder="Prénom" id="first-name" />
        </div>
      </div>
      <div class="join-footer">
        <button class="button" @click.prevent="addReservation()">Réserver</button>
        <span class="color-error" v-if="showError">Veuillez sélectionner une date et remplir les informations</span>
        <span class="color-error" v-if="showError2">Quelqu'un d'autre à déjà choisi cette heure ! Soyez plus rapide !</span>
      </div>
    </div>
  </div>
</template>

<script>
import 'v-calendar/dist/style.css'
import { getReservations, getAvailabilities, addReservation } from '../modules/axios'
import { usePayloadStore } from '../stores/usePayload'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const payloadStore = usePayloadStore()
    const { payload } = storeToRefs(payloadStore)
    return { payload }
  },
  data() {
    return {
      date: '',
      attributes: [
        {
          dot: true,
          highlight: true,
          excludeDates: []
        }
      ],
      disabledDates: [],
      times: [],
      availabilities: [],
      showError: false,
      showError2: false
    }
  },
  async mounted() {
    const today = new Date()
    const yesteday = new Date()
    yesteday.setDate(today.getDate() - 1)

    const start = today.setMonth(today.getMonth() + 1)

    const startDisabledDates = {
      start: null,
      end: yesteday
    }

    const endDisabledDates = {
      start,
      end: null
    }

    this.disabledDates.push(startDisabledDates)
    this.disabledDates.push(endDisabledDates)

    //
    this.availabilities = await getAvailabilities()

    this.getDisabledDate()
  },
  methods: {
    formatDate(dateString) {
      return new Date(dateString).toISOString().slice(0, 10)
    },
    getDayFromDate(date) {
      return new Date(date).toLocaleString('en-us', { weekday: 'long' }).toLowerCase()
    },
    checkIfTimeIsTaken(startTime) {
      if (this.times && this.times.find((time) => time.start_time === startTime)) {
        return false
      }
      return true
    },
    checkIfTimeIsNotTaken(startTime) {
      if (this.times && this.times.find((time) => time.start_time !== startTime)) {
        return false
      }
      return true
    },
    objIsEmpty(obj) {
      for (let key in obj) {
        if (obj[key] === '') {
          return false
        }
      }
      return true
    },
    async addReservation() {
      if (this.objIsEmpty(this.payload)) {
        this.showError = false
        const response = await addReservation(this.payload)
        if (response.status === 200) {
          this.$router.push({ name: 'finish' })
        } else {
          this.showError2 = true
        }
      } else {
        this.showError = true
      }
    },
    async getDisabledDate() {
      const oneMonthLater = new Date().setMonth(new Date().getMonth() + 1)
      this.times = await getReservations(this.formatDate(new Date()), this.formatDate(oneMonthLater))

      let countAppear = 0
      let countTotal = 0
      for (const availability of this.availabilities) {
        if (availability.day == this.getDayFromDate(new Date())) {
          countTotal++
          if (!this.checkIfTimeIsTaken(availability.start_time)) {
            countAppear++
          }
        }
      }
      if (countTotal === countAppear) {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()
        const day = new Date().getDate()
        this.disabledDates.push({
          start: new Date(year, month, day),
          end: new Date(year, month, day)
        })
      }
    }
  },
  watch: {
    async date() {
      this.payload.reservation_date = this.formatDate(this.date)
      this.times = []
      this.times = await getReservations(this.formatDate(this.date), this.formatDate(this.date))
    }
  }
}
</script>
