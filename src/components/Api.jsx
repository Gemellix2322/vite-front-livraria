import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://realbacklivraria.onrender.com'
});

export const apicsharp = axios.create({
    baseURL: 'https://realbacklivraria.onrender.com'
})


export default api;