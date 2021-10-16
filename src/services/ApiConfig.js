import axios from 'axios'

// const API_URL = 'https://mdquilindo.pythonanywhere.com/'
const API_URL = 'http://localhost:8000/'

export default axios.create({
  baseURL: API_URL
})
