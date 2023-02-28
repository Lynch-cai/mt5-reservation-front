<template>
  <v-calendar :attributes="attributes" />
</template>

<script>
import 'v-calendar/dist/style.css'

export default {
  data() {
    return {
      date: '',
      attributes: [
        {
          dot: true,
          highlight: true,
          excludeDates: []
        }
      ]
    }
  }
}
</script>
