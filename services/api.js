import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://eventos-academicos-backend.herokuapp.com'
})

export default api;
