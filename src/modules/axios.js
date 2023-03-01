import axios from 'axios'

export async function getUser(id) {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_user', { params: { id } })
    return response.data
  } catch (error) {
    return error
  }
}

export async function getAvailabilities() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_availability')
    return response.data
  } catch (error) {
    return error
  }
}

export async function addAvailability(savedTimes) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/add_availability', savedTimes)
    return response
  } catch (error) {
    return error
  }
}

export async function getReservations(start_date, end_date) {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_reservations', { params: { start_date, end_date } })
    return response.data
  } catch (error) {
    return error
  }
}

export async function adminGetReservations(start_date, end_date) {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/admin_get_reservations', { params: { start_date, end_date } })
    return response.data
  } catch (error) {
    return
  }
}

export async function addReservation(data) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/reservations', data)
    return response
  } catch (error) {
    return error
  }
}

export async function removeReservation(id) {
  try {
    const response = await axios.delete(import.meta.env.VITE_API_URL + '/delete_reservation', { params: { reservation_id: id } })
    return response
  } catch (error) {
    return error
  }
}
