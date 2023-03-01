import axios from 'axios'

export async function getAvailabilities() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_availability')
    return response.data
  } catch (error) {
    return
  }
}

export async function addAvailability(savedTimes) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/add_availability', savedTimes)
    return response
  } catch (error) {
    return
  }
}

export async function getReservations(start_date, end_date) {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_reservations', { params: { start_date, end_date } })
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
    return
  }
}

// TODO : FINIR
export async function removeReservation(id) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/removeReservation', id)
    return response
  } catch (error) {
    return
  }
}

// export async function getArticlesCount(type) {
//     try {
//         const response = await axiosInstance.get('article/get-articles-count', { params: { type } });
//         return response.data.count;
//     } catch (error) {
//         return error;
//     }
// }

// export async function saveArticle(articleData) {
//     try {
//         const response = await axiosInstance.post('article/save', { articleData });
//         return response.data;
//     } catch (error) {
//         return error;
//     }
// }
