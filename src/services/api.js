import axios from "axios";

// Base da URL : https://api.themoviedb.org/3/
//ULR: https://api.themoviedb.org/3/movie/now_playing?api_key=8a0278d19c3f376840f4e9258b59c306&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api