import axios from 'axios'

export async function getAvailability() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_availability')
    return response
  } catch (error) {
    return error
  }
}

export async function addAvailability(savedTimes) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/addAvailability', savedTimes)
    return response
  } catch (error) {
    return error
  }
}

export async function getReservations() {
  const currentDate = new Date().toISOString().slice(0, 10).toString()
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/get_reservations', { params: { start_date: currentDate, end_date: '2999-01-01' } })
    return response.data
  } catch (error) {
    return error
  }
}

// TODO : FINIR
export async function removeReservation(id) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/removeReservation', id)
    return response
  } catch (error) {
    return error
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
