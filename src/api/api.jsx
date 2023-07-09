import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_key = "5c1e2c8e53568c0c88102e828ea347fd";


const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};


export const fetchData = (param)=>{
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_key}`);
}