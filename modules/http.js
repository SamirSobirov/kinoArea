import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY


export const getData = async (path) => {
    const res = await axios.get(BASE_URL + path + "?api_key=" + API_KEY)

    return res
} 

export const multiSearch = async (query = '') => {
    const res = await axios.get(BASE_URL + "/search/multi?api_key=" + API_KEY + "&query=" + query)

    return res
} 