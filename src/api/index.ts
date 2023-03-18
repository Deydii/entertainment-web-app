import axios from 'axios';

export const fetcher = (url: string) => axios.get(url).then(res => res.data);

export const baseUrl = "https://api.themoviedb.org/3/";
