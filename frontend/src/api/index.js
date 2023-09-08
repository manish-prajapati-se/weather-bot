import axios from 'axios';
const url='http://localhost:5000';

const jwtToken = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

export const signIn=(user)=>axios.post(`${url}/auth/local/signin`,user);

export const getBotConfig=()=>axios.get(`${url}/configure`);

export const postBotConfig=(botConfig)=>axios.post(`${url}/configure`,botConfig);