import axios from "axios"


const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const getData = async (path) => {
    try {
        const res = await axios.get("https://api.themoviedb.org/3" + path, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyMzEyYzU3MWU3NmQ4Yzg1NGNmODBhMDc3YmYyZDExMCIsInN1YiI6IjY1NWYzZTkzMjQ0MTgyMDBhZDVjZGQxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3vkzndGn2Hn4V9LVJ9ckQgkqOkYhHipSH9kmpeScT-c`,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};


export const getDataa = async (path) => {
    const res = await axios.get(BASE_URL + path + "?api_key=" + API_KEY)

    return res
}

export const multiSearch = async (query = '') => {
    const res = await axios.get(BASE_URL + "/search/multi?api_key=" + API_KEY + "&query=" + query)

    return res
}







