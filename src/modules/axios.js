import axios from 'axios'

export async function addAvailability(savedtimes) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/addAvailability', { data: savedtimes })
    console.log(response)
    return response
  } catch (error) {
    return error
  }
}

// TODO : FINIR
export async function getReservations() {
  try {
    const response = await axios.get(import.meta.env.VITE_API_URL + '/getReservations')
    console.log(response)
    return response
  } catch (error) {
    return error
  }
}

// TODO : FINIR
export async function removeReservation(id) {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + '/addAvailability', { data: savedtimes })
    console.log(response)
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
