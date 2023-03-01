<template>
  <div class="create-container">
    <div class="window">
      <h3>Indiquer vos horaires</h3>
      <div class="create-interval-container">
        <label class="label">Durée de vos rendez-vous</label>
        <select class="select" disabled>
          <option value="30">30 min</option>
        </select>
      </div>

      <div class="box">
        <h4>Disponibilité</h4>

        <div class="create-days-container" v-for="(day, index) in days">
          <label class="label create-day-label">
            {{ day.frenchiesText }}
          </label>
          <div class="create-times-container">
            <div class="create-time-container">
              <select class="select" :disabled="day.disable" v-model="day.start_time1">
                <option v-for="time in times" :value="time" :selected="time === '09:00'">{{ time }}</option>
              </select>
              <span>-</span>
              <select class="select" :disabled="day.disable" v-model="day.end_time1">
                <option v-for="time in times" :value="time" :selected="time === '12:00'">{{ time }}</option>
              </select>
            </div>
            <div class="create-time-container">
              <select class="select" :disabled="day.disable" v-model="day.start_time2">
                <option v-for="time in times" :value="time" :selected="time === '13:00'">{{ time }}</option>
              </select>
              <span>-</span>
              <select class="select" :disabled="day.disable" v-model="day.end_time2">
                <option v-for="time in times" :value="time" :selected="time === '17:00'">{{ time }}</option>
              </select>
            </div>
          </div>
          <div class="create-checkbox-container">
            <label class="label" :for="'checkbox-' + index">Absent</label>
            <input type="checkbox" :id="'checkbox-' + index" v-model="day.disable" />
          </div>
        </div>

        <button class="button" @click.prevent="getSavedTimes()">Enregistrer</button>
      </div>
    </div>
  </div>
</template>

<script>
import { addAvailability, getAvailabilities } from '../modules/axios'

export default {
  data() {
    return {
      interval: '30',
      days: [
        { text: 'monday', frenchiesText: 'Lundi', disable: false, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'tuesday', frenchiesText: 'Mardi', disable: false, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'wednesday', frenchiesText: 'Mercredi', disable: false, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'thursday', frenchiesText: 'Jeudi', disable: false, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'friday', frenchiesText: 'Vendredi', disable: false, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'saturday', frenchiesText: 'Samedi', disable: true, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' },
        { text: 'sunday', frenchiesText: 'Dimanche', disable: true, start_time1: '09:00', end_time1: '12:00', start_time2: '13:00', end_time2: '17:00' }
      ],
      times: [
        '06:00',
        '06:30',
        '07:00',
        '07:30',
        '08:00',
        '08:30',
        '09:00',
        '09:30',
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '13:00',
        '13:30',
        '14:00',
        '14:30',
        '15:00',
        '15:30',
        '16:00',
        '16:30',
        '17:00',
        '17:30',
        '18:00',
        '18:30',
        '19:00'
      ],
      savedTimes: []
    }
  },
  mounted() {
    const availabilities = getAvailabilities()
  },
  methods: {
    getTimeWithInterval(day, starttime, endtime) {
      const slots = []
      let current = starttime
      while (current < endtime) {
        slots.push({
          day: day,
          start_time: current,
          end_time: this.addMinutes(current, 30)
        })
        current = this.addMinutes(current, 30)
      }
      return slots
    },

    addMinutes(time, minutes) {
      const [hours, mins] = time.split(':').map(Number)
      const totalMinutes = hours * 60 + mins + minutes
      const newHours = Math.floor(totalMinutes / 60)
      const newMins = totalMinutes % 60
      return `${this.padZero(newHours)}:${this.padZero(newMins)}`
    },

    padZero(num) {
      return num.toString().padStart(2, '0')
    },

    async getSavedTimes() {
      this.savedTimes = []
      for (const day of this.days) {
        const time1 = !day.disable ? this.getTimeWithInterval(day.text, day.start_time1, day.end_time1) : []
        const time2 = !day.disable ? this.getTimeWithInterval(day.text, day.start_time2, day.end_time2) : []
        this.savedTimes.push(...time1.concat(time2))
      }

      await addAvailability(this.savedTimes)
    }
  }
}
</script>
