import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5109'
});

export const apicsharp = axios.create({
    baseURL: 'http://localhost:5109'
})


export default api;