import { defineStore } from 'pinia'

export const usePayloadStore = defineStore('payload', {
  state: () => {
    return {
      payload: {
        reservation_date: '',
        start_time: '',
        end_time: '',
        last_name: '',
        first_name: ''
      }
    }
  }
})
