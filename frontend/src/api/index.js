import axios from 'axios';
const url='http://localhost:5000';

const jwtToken = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

export const signIn=async (user)=>axios.post(`${url}/auth/local/signin`,user);

export const getBotConfig=async ()=>axios.get(`${url}/configure`);

export const postBotConfig=async (botConfig)=>axios.post(`${url}/configure`,botConfig);

export const getSubscribers=async()=>axios.get(`${url}/subscribers`);