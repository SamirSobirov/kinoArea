import axios from "axios"


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




