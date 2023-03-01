<template>
  <div class="create-container">
    <div class="window">
      <h3>Indiquer vos horaires</h3>
      <div class="create-interval-container">
        <label class="label">Durée de vos rendez-vous</label>
        <select class="select" v-model="interval">
          <option value="15">15 min</option>
          <option selected value="30">30 min</option>
          <option value="45">45 min</option>
          <option value="60">60 min</option>
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
                <option v-for="time in times" :value="time" :selected="time === '09:00:00'">{{ time.slice(0, 5) }}</option>
              </select>
              <span>-</span>
              <select class="select" :disabled="day.disable" v-model="day.end_time1">
                <option v-for="time in times" :value="time" :selected="time === '12:00:00'">{{ time.slice(0, 5) }}</option>
              </select>
            </div>
            <div class="create-time-container">
              <select class="select" :disabled="day.disable" v-model="day.start_time2">
                <option v-for="time in times" :value="time" :selected="time === '13:00:00'">{{ time.slice(0, 5) }}</option>
              </select>
              <span>-</span>
              <select class="select" :disabled="day.disable" v-model="day.end_time2">
                <option v-for="time in times" :value="time" :selected="time === '17:00:00'">{{ time.slice(0, 5) }}</option>
              </select>
            </div>
          </div>
          <div class="create-checkbox-container">
            <label class="label" :for="'checkbox-' + index">Absent</label>
            <input type="checkbox" :id="'checkbox-' + index" v-model="day.disable" />
          </div>
        </div>

        <div class="create-footer">
          <button class="button" @click.prevent="getSavedTimes()">Enregistrer</button>
          <div v-if="showSavedMessage">Vos horaires ont été enregistrés</div>
        </div>
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
        {
          text: 'monday',
          frenchiesText: 'Lundi',
          disable: false,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'tuesday',
          frenchiesText: 'Mardi',
          disable: false,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'wednesday',
          frenchiesText: 'Mercredi',
          disable: false,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'thursday',
          frenchiesText: 'Jeudi',
          disable: false,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'friday',
          frenchiesText: 'Vendredi',
          disable: false,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'saturday',
          frenchiesText: 'Samedi',
          disable: true,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        },
        {
          text: 'sunday',
          frenchiesText: 'Dimanche',
          disable: true,
          start_time1: '09:00:00',
          end_time1: '12:00:00',
          start_time2: '13:00:00',
          end_time2: '17:00:00'
        }
      ],
      times: [
        '06:00:00',
        '06:30:00',
        '07:00:00',
        '07:30:00',
        '08:00:00',
        '08:30:00',
        '09:00:00',
        '09:30:00',
        '10:00:00',
        '10:30:00',
        '11:00:00',
        '11:30:00',
        '12:00:00',
        '12:30:00',
        '13:00:00',
        '13:30:00',
        '14:00:00',
        '14:30:00',
        '15:00:00',
        '15:30:00',
        '16:00:00',
        '16:30:00',
        '17:00:00',
        '17:30:00',
        '18:00:00',
        '18:30:00',
        '19:00:00'
      ],
      savedTimes: [],
      showSavedMessage: false
    }
  },
  async mounted() {
    const availabilities = await getAvailabilities()
    const daysText = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    const isStartSet = { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false }
    const isEndSet = { monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false }

    // disable everyday
    if (availabilities.length) {
      for (const day of this.days) {
        day.disable = true
      }
    }

    for (let i = 0; i < availabilities.length; i++) {
      for (const day of this.days) {
        if (availabilities[i].day === day.text) {
          day.disable = false
        }
      }

      for (const dayText of daysText) {
        // get the start
        if (!isStartSet[dayText] && availabilities[i].day === dayText) {
          isStartSet[dayText] = true
          this.days.find((day) => day.text === dayText).start_time1 = availabilities[i].start_time
        }

        // get the splited moment
        if (i + 1 < availabilities.length && availabilities[i].day === dayText && availabilities[i + 1].day === dayText) {
          if (availabilities[i + 1].start_time !== availabilities[i].end_time) {
            this.days.find((day) => day.text === dayText).end_time1 = availabilities[i].end_time
            this.days.find((day) => day.text === dayText).start_time2 = availabilities[i + 1].start_time
          }
        }

        // get the end
        if (!isEndSet[dayText] && i + 1 < availabilities.length && availabilities[i].day === dayText && availabilities[i + 1].day !== dayText) {
          isEndSet[dayText] = true
          this.days.find((day) => day.text === dayText).end_time2 = availabilities[i].end_time
        }
      }
    }
  },
  methods: {
    getTimeWithInterval(day, starttime, endtime) {
      const slots = []
      let current = starttime
      while (current < endtime) {
        slots.push({
          day: day,
          start_time: current,
          end_time: this.addMinutes(current, Number(this.interval))
        })
        current = this.addMinutes(current, Number(this.interval))
      }
      return slots
    },

    addMinutes(time, minutes) {
      const [hours, mins] = time.split(':').map(Number)
      const totalMinutes = hours * 60 + mins + minutes
      const newHours = Math.floor(totalMinutes / 60)
      const newMins = totalMinutes % 60
      return `${this.padZero(newHours)}:${this.padZero(newMins)}:00`
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

      this.showSavedMessage = true
    }
  }
}
</script>
