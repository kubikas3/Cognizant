import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:44375/',
    responseType: 'json',
    headers: { "Access-Control-Allow-Origin": "*" },
});

client.interceptors.response.use((res) => res.data);

export default client;